import Cart2026 from "@/views/Cart2026";
import { getPublicProducts } from "@/services/public-content.service";

export const revalidate = 60;

export default async function Page() {
  const products = await getPublicProducts();
  return <Cart2026 availableProducts={products} />;
}
