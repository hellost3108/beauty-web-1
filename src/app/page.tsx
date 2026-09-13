import Index from "@/views/Index";
import { getHomepageContent, getPublicBlogPosts, getPublicProducts } from "@/services/public-content.service";

export const revalidate = 60;

export default async function Home() {
  const [content, products, posts] = await Promise.all([
    getHomepageContent(),
    getPublicProducts(),
    getPublicBlogPosts(),
  ]);
  return <Index heroSlides={content.heroSlides} whyMelalogy={content.whyMelalogy} products={products} posts={posts} />;
}
