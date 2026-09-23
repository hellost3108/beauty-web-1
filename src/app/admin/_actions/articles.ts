"use server";

import { friendlyError, refreshPublicSite } from "@/lib/admin/server-utils";
import { requireModuleForAction } from "@/lib/auth/admin";
import { sanitizeHtml } from "@/lib/cms/fields";
import { createClient } from "@/lib/supabase/server";
import { articleSchema, firstIssue } from "@/lib/validation/admin";
import type { ActionResult, PublicationStatus } from "@/types/cms";

export async function saveArticle(input: unknown): Promise<ActionResult<{ id: number }>> {
  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const values = parsed.data;

  try {
    await requireModuleForAction(values.channel);

    let publishedAt: string | null = null;
    if (values.publishedAt) {
      const date = new Date(values.publishedAt);
      if (Number.isNaN(date.getTime())) return { ok: false, error: "Ngày xuất bản không hợp lệ." };
      publishedAt = date.toISOString();
    } else if (values.status === "published") {
      publishedAt = new Date().toISOString();
    }

    const payload = {
      channel: values.channel,
      title: values.title,
      slug: values.slug,
      seo_title: values.seoTitle,
      meta_description: values.metaDescription,
      keywords: values.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      subtitle: values.subtitle,
      excerpt: values.excerpt,
      author: values.author,
      author_role: values.authorRole,
      date_label: values.dateLabel,
      published_at: publishedAt,
      category: values.category,
      image_url: values.imageUrl,
      image_alt: values.imageAlt || values.title,
      reading_time: values.readingTime,
      content_html: sanitizeHtml(values.contentHtml),
      status: values.status,
      featured: values.featured,
      sort_order: values.sortOrder,
    };

    const supabase = await createClient();
    const result = values.id
      ? await supabase.from("articles").update(payload).eq("id", values.id).select("id").single()
      : await supabase.from("articles").insert(payload).select("id").single();
    if (result.error) throw result.error;

    refreshPublicSite(["articles"]);
    return { ok: true, data: { id: result.data.id }, message: "Đã lưu bài viết." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

export async function setArticleStatus(
  id: number,
  channel: "blog" | "magazine",
  status: PublicationStatus,
): Promise<ActionResult> {
  if (!Number.isInteger(id) || !["blog", "magazine"].includes(channel)) {
    return { ok: false, error: "Bài viết không hợp lệ." };
  }
  try {
    await requireModuleForAction(channel);
    const supabase = await createClient();
    const patch: Record<string, unknown> = { status };
    if (status === "published") {
      const { data } = await supabase.from("articles").select("published_at").eq("id", id).single();
      if (!data?.published_at) patch.published_at = new Date().toISOString();
    }
    const { error } = await supabase.from("articles").update(patch).eq("id", id);
    if (error) throw error;
    refreshPublicSite(["articles"]);
    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}
