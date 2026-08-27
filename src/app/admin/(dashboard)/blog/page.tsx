import ArticleAdminList from "@/components/admin/ArticleAdminList";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, excerpt, author, date_label, category, image_url, status, featured, sort_order")
    .eq("channel", "blog")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return <ArticleAdminList channel="blog" articles={data ?? []} />;
}
