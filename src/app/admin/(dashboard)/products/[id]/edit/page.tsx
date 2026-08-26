import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import ProductImagesManager from "@/components/admin/ProductImagesManager";
import { createClient } from "@/lib/supabase/server";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const [{ id }, queryParams, supabase] = await Promise.all([params, searchParams, createClient()]);
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const [{ data: product }, { data: categories }, { data: images }] = await Promise.all([
    supabase.from("products").select("*").eq("id", productId).single(),
    supabase.from("categories").select("id, name").eq("is_active", true).order("sort_order"),
    supabase.from("product_images").select("id, image_url, storage_path, alt_text, sort_order, is_primary").eq("product_id", productId).order("sort_order"),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Catalogue / Edit</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Chỉnh sửa sản phẩm</h1>
        <p className="mt-2 text-sm text-black/50">{product.name}</p>
      </header>
      {queryParams.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã lưu thay đổi.</p>}
      {queryParams.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{queryParams.error}</p>}
      <ProductForm product={product} categories={(categories ?? []) as Array<{ id: number; name: string }>} />
      <ProductImagesManager productId={productId} initialImages={(images ?? []) as any} />
    </div>
  );
}
