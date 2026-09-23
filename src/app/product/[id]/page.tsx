import type { Metadata } from "next";
import CmsSections from "@/components/cms/CmsSections";
import { getStorefrontProducts } from "@/lib/cms/server";
import ProductDetail from "@/views/ProductDetail";

type ProductPageProps = { params: Promise<{ id: string }> };

async function findProduct(id: string) {
  const products = await getStorefrontProducts();
  return products.find((product) => String(product.id) === id || product.slug === id);
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
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await getStorefrontProducts();
  return products.map((product) => ({ id: String(product.id) }));
}

export default function ProductDetailPage() {
  return (
    <CmsSections modules={["shop"]}>
      <ProductDetail />
    </CmsSections>
  );
}
