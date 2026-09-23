import "server-only";

import { unstable_cache } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { fallbackBlogPosts, fallbackMagazinePosts, fallbackProducts } from "./fallbacks";
import { resolveSection, type SectionContent, type SectionKey } from "./registry";
import { formatVndNumber, formulaNoteByCategory, skuAccentByCategory, type Article, type ArticleChannel, type StorefrontProduct } from "./types";

/*
 * Cache tags. Every Admin write calls updateTag()/revalidatePath() with these
 * so the public website shows the change on the very next request. The
 * `revalidate` window is only a safety net for edits made directly in the
 * Supabase dashboard.
 */
export const CMS_TAGS = {
  sections: "cms-sections",
  products: "cms-products",
  articles: "cms-articles",
} as const;

const SAFETY_REVALIDATE_SECONDS = 300;

type SectionRows = Record<string, unknown>;

const loadSectionRows = unstable_cache(
  async (): Promise<SectionRows> => {
    if (!isSupabaseConfigured) return {};
    try {
      const { data, error } = await createPublicClient().from("site_sections").select("key, content");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row) => [row.key as string, row.content as unknown]));
    } catch (error) {
      console.error("[cms] Không đọc được site_sections, dùng nội dung mặc định.", error);
      return {};
    }
  },
  ["cms:site_sections:v1"],
  { tags: [CMS_TAGS.sections], revalidate: SAFETY_REVALIDATE_SECONDS },
);

/** Raw stored content for every key that starts with one of the prefixes. */
export async function getSectionRows(prefixes: string[]): Promise<SectionRows> {
  const rows = await loadSectionRows();
  return Object.fromEntries(
    Object.entries(rows).filter(([key]) => prefixes.some((prefix) => key === prefix || key.startsWith(`${prefix}.`))),
  );
}

/** Typed, defaults-filled content for one section (server components, metadata). */
export async function getSection<K extends SectionKey>(key: K): Promise<SectionContent<K>> {
  const rows = await loadSectionRows();
  return resolveSection(key, rows[key]);
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

type ProductRow = {
  id: number;
  slug: string;
  sku: string | null;
  name: string;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  ingredients: string | null;
  usage: string | null;
  price: number;
  compare_at_price: number | null;
  featured: boolean;
  actives?: string | null;
  formula_note?: string | null;
  accent_color?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  categories: { name: string } | { name: string }[] | null;
  product_images: Array<{ image_url: string; sort_order: number; is_primary: boolean }> | null;
};

function mapProduct(row: ProductRow): StorefrontProduct {
  const category = (Array.isArray(row.categories) ? row.categories[0]?.name : row.categories?.name) ?? "";
  const images = [...(row.product_images ?? [])]
    .sort((left, right) => Number(right.is_primary) - Number(left.is_primary) || left.sort_order - right.sort_order)
    .map((image) => image.image_url)
    .filter(Boolean);
  const image = images[0] ?? "/assets/placeholder-600x600.png";

  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    image,
    images: images.length ? images : [image],
    name: row.name,
    subtitle: row.subtitle ?? "",
    price: formatVndNumber(row.price),
    rawPrice: row.price,
    compareAtPrice: row.compare_at_price,
    category,
    description: row.description ?? "",
    shortDescription: row.short_description ?? "",
    ingredients: row.ingredients ?? "",
    usage: row.usage ?? "",
    featured: row.featured,
    actives: row.actives || undefined,
    formulaNote: row.formula_note || formulaNoteByCategory[category] || undefined,
    accentColor: row.accent_color || skuAccentByCategory[category] || undefined,
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
  };
}

export const getStorefrontProducts = unstable_cache(
  async (): Promise<StorefrontProduct[]> => {
    if (!isSupabaseConfigured) return fallbackProducts;
    try {
      const { data, error } = await createPublicClient()
        .from("products")
        .select("*, categories(name), product_images(image_url, sort_order, is_primary)")
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as ProductRow[]).map(mapProduct);
    } catch (error) {
      console.error("[cms] Không đọc được products, dùng dữ liệu mặc định.", error);
      return fallbackProducts;
    }
  },
  ["cms:products:v1"],
  { tags: [CMS_TAGS.products], revalidate: SAFETY_REVALIDATE_SECONDS },
);

/* ------------------------------------------------------------------ */
/* Articles                                                            */
/* ------------------------------------------------------------------ */

type ArticleRow = {
  slug: string;
  channel: ArticleChannel;
  title: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  subtitle: string | null;
  excerpt: string;
  author: string;
  author_role: string | null;
  date_label: string | null;
  published_at: string | null;
  category: string;
  image_url: string;
  image_alt: string;
  reading_time: string;
  content_html?: string;
  featured: boolean;
};

const formatVietnameseDate = (iso: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("day")} Tháng ${get("month")}, ${get("year")}`;
};

function mapArticle(row: ArticleRow): Article {
  return {
    slug: row.slug,
    channel: row.channel,
    title: row.title,
    seoTitle: row.seo_title || row.title,
    metaDescription: row.meta_description || row.excerpt,
    keywords: row.keywords ?? [],
    subtitle: row.subtitle ?? "",
    excerpt: row.excerpt,
    author: row.author,
    authorRole: row.author_role ?? "",
    date: row.date_label || formatVietnameseDate(row.published_at),
    publishedAt: row.published_at ?? "",
    category: row.category,
    image: row.image_url,
    imageAlt: row.image_alt || row.title,
    readingTime: row.reading_time,
    content: row.content_html ?? "",
    featured: row.featured,
  };
}

const listColumns =
  "slug, channel, title, seo_title, meta_description, keywords, subtitle, excerpt, author, author_role, date_label, published_at, category, image_url, image_alt, reading_time, featured";

const fallbackFor = (channel: ArticleChannel) => (channel === "blog" ? fallbackBlogPosts : fallbackMagazinePosts);

/** Published articles for a listing page (without the HTML body). */
export const getArticles = unstable_cache(
  async (channel: ArticleChannel): Promise<Article[]> => {
    if (!isSupabaseConfigured) return fallbackFor(channel).map((post) => ({ ...post, content: "" }));
    try {
      const { data, error } = await createPublicClient()
        .from("articles")
        .select(listColumns)
        .eq("channel", channel)
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("sort_order", { ascending: true })
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return ((data ?? []) as ArticleRow[]).map(mapArticle);
    } catch (error) {
      console.error(`[cms] Không đọc được articles (${channel}), dùng dữ liệu mặc định.`, error);
      return fallbackFor(channel).map((post) => ({ ...post, content: "" }));
    }
  },
  ["cms:articles:list:v1"],
  { tags: [CMS_TAGS.articles], revalidate: SAFETY_REVALIDATE_SECONDS },
);

/** One published article with its HTML body, or null. */
export const getArticle = unstable_cache(
  async (channel: ArticleChannel, slug: string): Promise<Article | null> => {
    const fromFallback = () => fallbackFor(channel).find((post) => post.slug === slug) ?? null;
    if (!isSupabaseConfigured) return fromFallback();
    try {
      const { data, error } = await createPublicClient()
        .from("articles")
        .select(`${listColumns}, content_html`)
        .eq("channel", channel)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return data ? mapArticle(data as ArticleRow) : null;
    } catch (error) {
      console.error(`[cms] Không đọc được bài viết ${channel}/${slug}.`, error);
      return fromFallback();
    }
  },
  ["cms:articles:detail:v1"],
  { tags: [CMS_TAGS.articles], revalidate: SAFETY_REVALIDATE_SECONDS },
);
