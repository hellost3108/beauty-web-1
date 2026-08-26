import { Suspense } from "react";
import Collection from "@/views/Collection2026";
import { getPublicProducts } from "@/services/public-content.service";

export const revalidate = 60;

export default async function CollectionPage() {
  const products = await getPublicProducts();
  return (
    <Suspense fallback={null}>
      <Collection initialProducts={products} />
    </Suspense>
  );
}
