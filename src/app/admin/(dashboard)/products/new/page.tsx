import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [params, supabase] = await Promise.all([searchParams, createClient()]);
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Catalogue / New</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Thêm sản phẩm</h1>
        <p className="mt-2 text-sm text-black/50">Lưu thông tin trước; sau đó bạn có thể upload nhiều ảnh ở màn hình chỉnh sửa.</p>
      </header>
      {params.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{params.error}</p>}
      <ProductForm categories={(categories ?? []) as Array<{ id: number; name: string }>} />
    </div>
  );
}
