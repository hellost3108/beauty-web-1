import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import CmsSections from "@/components/cms/CmsSections";
import { getStorefrontProducts } from "@/lib/cms/server";
import ProductDetail from "@/views/ProductDetail";
import { productPath } from "@/lib/cms/types";

type ProductPageProps = { params: Promise<{ id: string }> };

async function findProduct(id: string) {
  const products = await getStorefrontProducts();
  return products.find((product) => product.slug === id) ?? products.find((product) => String(product.id) === id);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) return { title: "Sản phẩm" };

  const description = product.seoDescription || product.shortDescription || product.description;
  const title = product.seoTitle || product.name;
  return {
    title,
    description,
    alternates: { canonical: productPath(product) },
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await getStorefrontProducts();
  return products.map((product) => ({ id: product.slug || String(product.id) }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await findProduct(decodeURIComponent(id));
  // Old links (/product/1) and renamed slugs move to the current slug URL.
  if (product) {
    const canonical = productPath(product);
    if (canonical !== `/product/${encodeURIComponent(decodeURIComponent(id))}`) permanentRedirect(canonical);
  }
  return (
    <CmsSections modules={["shop"]}>
      <ProductDetail />
    </CmsSections>
  );
}
