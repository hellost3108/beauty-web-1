import ProductForm from "@/components/admin/ProductForm";
import { PageHeader } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  await requireModule("products");
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name, is_active").order("sort_order");

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Sản phẩm / Thêm mới"
        title="Thêm sản phẩm"
        description="Lưu thông tin trước; sau đó bạn có thể tải nhiều ảnh ở màn hình chỉnh sửa. Chọn “Đang hiển thị” để sản phẩm xuất hiện trên website."
      />
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
