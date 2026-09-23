/* Client-safe shapes the public website renders. */

export type StorefrontProduct = {
  id: number;
  slug: string;
  sku?: string | null;
  image: string;
  images: string[];
  name: string;
  subtitle: string;
  price: string;
  rawPrice: number;
  compareAtPrice?: number | null;
  category: string;
  description: string;
  shortDescription?: string;
  ingredients: string;
  usage: string;
  featured?: boolean;
  /** Short line of key actives shown on the homepage cards. */
  actives?: string;
  /** Small label such as "Hydration / Barrier" on the shop cards. */
  formulaNote?: string;
  /** SKU accent colour (#rrggbb). */
  accentColor?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ArticleChannel = "blog" | "magazine";

export type Article = {
  /** Used in the URL: /blog/{slug} or /magazine/{slug}. */
  slug: string;
  channel: ArticleChannel;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  subtitle: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  publishedAt: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  /** HTML body; empty on listing pages. */
  content: string;
  featured: boolean;
};

export const formatVndNumber = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

/** SKU colour tokens of the brand guideline, keyed by category name. */
export const skuAccentByCategory: Record<string, string> = {
  "Cấp Ẩm": "#2f8fc0",
  "Phục Hồi": "#638d39",
  "Làm Sáng": "#c89500",
  "Rạng Rỡ": "#8055a6",
};

export const formulaNoteByCategory: Record<string, string> = {
  "Cấp Ẩm": "Hydration / Barrier",
  "Phục Hồi": "Recovery / Calm",
  "Làm Sáng": "Brightening / Tone",
  "Rạng Rỡ": "Radiance / Firming",
};
