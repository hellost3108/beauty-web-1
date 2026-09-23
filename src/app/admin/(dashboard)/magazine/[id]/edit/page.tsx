import { notFound } from "next/navigation";
import ArticleForm, { type ArticleRecord } from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function EditMagazineArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireModule("magazine");
  const { id } = await params;
  const articleId = Number(id);
  if (!Number.isInteger(articleId)) notFound();

  const supabase = await createClient();
  const [{ data: article }, { data: rows }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", articleId).eq("channel", "magazine").maybeSingle(),
    supabase.from("articles").select("category").eq("channel", "magazine"),
  ]);
  if (!article) notFound();
  const categories = Array.from(new Set((rows ?? []).map((row) => row.category as string))).sort();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Tạp chí / Chỉnh sửa" title={article.title} />
      <ArticleForm key={article.updated_at} channel="magazine" article={article as ArticleRecord} categories={categories} />
    </div>
  );
}
