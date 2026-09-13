import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/views/ProductDetail";
import { getPublicProduct } from "@/services/public-content.service";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getPublicProduct(id);
  if (!product) return { title: "Sản phẩm không tồn tại | Melalogy" };
  return {
    title: `${product.name} | Melalogy`,
    description: product.shortDescription || product.description,
    alternates: { canonical: `/product/${product.slug || product.id}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, relatedProducts } = await getPublicProduct(id);
  if (!product) notFound();
  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
