import ArticleForm from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function NewBlogArticlePage() {
  await requireModule("blog");
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("category").eq("channel", "blog");
  const categories = Array.from(new Set((data ?? []).map((row) => row.category as string))).sort();

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Blog / Bài mới" title="Viết bài Blog" />
      <ArticleForm channel="blog" categories={categories} />
    </div>
  );
}
