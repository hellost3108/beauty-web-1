import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditMagazineArticlePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ success?: string; error?: string }> }) {
  const [{ id }, query, supabase] = await Promise.all([params, searchParams, createClient()]);
  const articleId = Number(id);
  if (!Number.isInteger(articleId)) notFound();
  const { data: article } = await supabase.from("articles").select("*").eq("id", articleId).eq("channel", "magazine").single();
  if (!article) notFound();
  return (
    <div className="space-y-7">
      <header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Tạp chí / Chỉnh sửa</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">Chỉnh sửa bài Tạp chí</h1><p className="mt-2 text-sm text-black/50">{article.title}</p></header>
      {query.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã lưu thay đổi.</p>}
      {query.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{query.error}</p>}
      <ArticleForm channel="magazine" article={article} />
    </div>
  );
}
