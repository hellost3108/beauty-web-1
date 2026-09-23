import CategoryManager, { type CategoryRow } from "@/components/admin/CategoryManager";
import { Notice, PageHeader } from "@/components/admin/ui";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  await requireModule("products");
  const supabase = await createClient();
  const [{ data, error }, { data: products }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, description, image_url, is_active, sort_order").order("sort_order"),
    supabase.from("products").select("category_id"),
  ]);

  const counts = new Map<number, number>();
  (products ?? []).forEach((product) => {
    if (product.category_id) counts.set(product.category_id, (counts.get(product.category_id) ?? 0) + 1);
  });
  const categories: CategoryRow[] = (data ?? []).map((category) => ({ ...category, productCount: counts.get(category.id) ?? 0 }));

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Cửa hàng"
        title="Danh mục"
        description="Danh mục dùng làm nhãn trên thẻ sản phẩm và bộ lọc ở trang Shop. Ẩn danh mục không xoá sản phẩm."
      />
      {error && <Notice tone="error">{friendlyError(error)}</Notice>}
      <CategoryManager categories={categories} />
    </div>
  );
}
