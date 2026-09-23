import { allProducts } from "@/data/productsData";
import { blogPosts } from "@/data/melalogyBlogPosts";
import { magazineEditorialPosts } from "@/data/melalogyMagazinePosts";
import { formulaNoteByCategory, skuAccentByCategory, type Article, type StorefrontProduct } from "./types";

/*
 * Copy that ships with the code. Used only when Supabase is not configured or
 * cannot be reached, so the storefront never renders empty.
 */

const activesByCategory: Record<string, string> = {
  "Cấp Ẩm": "Hyaluronic Acid · Ceramide NP",
  "Phục Hồi": "Madecassic Acid · Centella Asiatica",
  "Làm Sáng": "Niacinamide · Rice Bran Extract",
  "Rạng Rỡ": "Sodium DNA · Acetyl Hexapeptide-8",
};


const slugs: Record<number, string> = {
  1: "mat-na-hydrogel-energy-shot-cap-am",
  2: "mat-na-hydrogel-energy-shot-phuc-hoi",
  3: "mat-na-hydrogel-energy-shot-lam-sang",
  4: "mat-na-hydrogel-energy-shot-rang-ro",
};

export const fallbackProducts: StorefrontProduct[] = allProducts.map((product) => ({
  ...product,
  slug: slugs[product.id] ?? String(product.id),
  actives: activesByCategory[product.category],
  formulaNote: formulaNoteByCategory[product.category],
  accentColor: skuAccentByCategory[product.category],
}));

export const fallbackBlogPosts: Article[] = blogPosts.map((post) => ({
  slug: String(post.id),
  channel: "blog",
  title: post.title,
  seoTitle: post.seoTitle,
  metaDescription: post.metaDescription,
  keywords: post.keywords,
  subtitle: "",
  excerpt: post.excerpt,
  author: post.author,
  authorRole: "",
  date: post.date,
  publishedAt: post.publishedAt,
  category: post.category,
  image: post.image,
  imageAlt: post.imageAlt,
  readingTime: post.readingTime,
  content: post.content,
  featured: post.id === 1,
}));

export const fallbackMagazinePosts: Article[] = magazineEditorialPosts.map((post) => ({
  slug: String(post.id),
  channel: "magazine",
  title: post.title,
  seoTitle: post.seoTitle,
  metaDescription: post.metaDescription,
  keywords: post.keywords,
  subtitle: post.subtitle,
  excerpt: post.excerpt,
  author: post.author,
  authorRole: post.role,
  date: post.date,
  publishedAt: post.publishedAt,
  category: post.category,
  image: post.image,
  imageAlt: post.imageAlt,
  readingTime: post.readTime,
  content: post.content,
  featured: post.id === 1,
}));
