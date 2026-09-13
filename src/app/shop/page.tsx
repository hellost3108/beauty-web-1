import Shop from "@/views/Shop";
import { getPublicProducts } from "@/services/public-content.service";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getPublicProducts();
  return <Shop products={products} />;
}
