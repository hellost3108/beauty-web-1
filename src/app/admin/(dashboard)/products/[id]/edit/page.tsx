import { notFound } from "next/navigation";
import ProductForm, { type ProductRecord } from "@/components/admin/ProductForm";
import ProductImagesManager, { type ProductImage } from "@/components/admin/ProductImagesManager";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireModule("products");
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const supabase = await createClient();
  const [{ data: product }, { data: categories }, { data: images }] = await Promise.all([
    supabase.from("products").select("*").eq("id", productId).maybeSingle(),
    supabase.from("categories").select("id, name, is_active").order("sort_order"),
    supabase
      .from("product_images")
      .select("id, image_url, storage_path, alt_text, sort_order, is_primary")
      .eq("product_id", productId)
      .order("sort_order"),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Sản phẩm / Chỉnh sửa"
        title={product.name}
        description={
          <span className="inline-flex items-center gap-2">
            <StatusBadge status={product.status} /> /product/{product.id}
          </span>
        }
      />
      <ProductImagesManager productId={productId} productName={product.name} initialImages={(images ?? []) as ProductImage[]} />
      <ProductForm key={product.updated_at} product={product as ProductRecord} categories={categories ?? []} />
    </div>
  );
}
