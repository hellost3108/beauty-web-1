import Index from "@/views/Index";
import { getHomepageContent, getPublicProducts } from "@/services/public-content.service";

export const revalidate = 60;

export default async function Home() {
  const [content, products] = await Promise.all([getHomepageContent(), getPublicProducts()]);
  return <Index heroSlides={content.heroSlides} whyMelalogy={content.whyMelalogy} products={products} />;
}
