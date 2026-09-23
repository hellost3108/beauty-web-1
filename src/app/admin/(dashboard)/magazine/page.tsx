import ArticleAdminList, { type ArticleListRow } from "@/components/admin/ArticleAdminList";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMagazinePage() {
  await requireModule("magazine");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, author, category, image_url, status, featured, published_at")
    .eq("channel", "magazine")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false, nullsFirst: false });

  return <ArticleAdminList channel="magazine" articles={(data ?? []) as ArticleListRow[]} error={error ? friendlyError(error) : undefined} />;
}
