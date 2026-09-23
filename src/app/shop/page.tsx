import type { Metadata } from "next";
import CmsSections from "@/components/cms/CmsSections";
import { getSection } from "@/lib/cms/server";
import Shop from "@/views/Shop";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSection("shop.seo");
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: "/shop" },
  };
}

export default function ShopPage() {
  return (
    <CmsSections modules={["shop"]}>
      <Shop />
    </CmsSections>
  );
}
