import { notFound } from "next/navigation";
import ArticleForm, { type ArticleRecord } from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function EditBlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireModule("blog");
  const { id } = await params;
  const articleId = Number(id);
  if (!Number.isInteger(articleId)) notFound();

  const supabase = await createClient();
  const [{ data: article }, { data: rows }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", articleId).eq("channel", "blog").maybeSingle(),
    supabase.from("articles").select("category").eq("channel", "blog"),
  ]);
  if (!article) notFound();
  const categories = Array.from(new Set((rows ?? []).map((row) => row.category as string))).sort();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Blog / Chỉnh sửa" title={article.title} />
      <ArticleForm key={article.updated_at} channel="blog" article={article as ArticleRecord} categories={categories} />
    </div>
  );
}
