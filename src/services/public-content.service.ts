import { allProducts } from "@/data/productsData";
import { defaultHeroSlides, defaultWhyMelalogy } from "@/data/homepageData";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import type { HeroSlide, HomepageSection, StorefrontProduct } from "@/types/cms";

const productSelect = `
  id,
  slug,
  sku,
  name,
  subtitle,
  short_description,
  description,
  ingredients,
  usage,
  price,
  compare_at_price,
  featured,
  sort_order,
  categories(name, slug),
  product_images(id, image_url, alt_text, sort_order, is_primary)
`;

function formatPrice(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function mapProduct(row: any): StorefrontProduct {
  const imageRows = [...(row.product_images ?? [])].sort(
    (a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order,
  );
  const images = imageRows.map((image) => image.image_url).filter(Boolean);
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const fallbackImage = "/assets/placeholder-600x600.png";

  return {
    id: Number(row.id),
    slug: row.slug,
    sku: row.sku ?? undefined,
    image: images[0] ?? fallbackImage,
    images: images.length > 0 ? images : [fallbackImage],
    name: row.name,
    subtitle: row.subtitle ?? "Melalogy Energy Shot",
    price: formatPrice(Number(row.price ?? 0)),
    rawPrice: Number(row.price ?? 0),
    compareAtPrice: row.compare_at_price,
    category: category?.name ?? "Chưa phân loại",
    description: row.description ?? row.short_description ?? "",
    shortDescription: row.short_description ?? undefined,
    ingredients: row.ingredients ?? "",
    usage: row.usage ?? "",
    featured: Boolean(row.featured),
  };
}

export async function getPublicProducts(): Promise<StorefrontProduct[]> {
  if (!isSupabaseConfigured) return allProducts;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select(productSelect)
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("sort_order", { ascending: true, referencedTable: "product_images" });

    if (error) throw error;
    return data?.length ? data.map(mapProduct) : allProducts;
  } catch (error) {
    console.error("Unable to load public products from Supabase", error);
    return allProducts;
  }
}

export async function getPublicProduct(identifier: string) {
  if (!isSupabaseConfigured) {
    const product = allProducts.find(
      (item) => String(item.id) === identifier || item.slug === identifier,
    );
    return {
      product: product ?? null,
      relatedProducts: allProducts.filter((item) => item.id !== product?.id),
    };
  }

  try {
    const supabase = createPublicClient();
    let query = supabase.from("products").select(productSelect).eq("status", "published");
    query = /^\d+$/.test(identifier)
      ? query.eq("id", Number(identifier))
      : query.eq("slug", identifier);

    const { data, error } = await query.single();
    if (error) throw error;

    const product = mapProduct(data);
    const related = await getPublicProducts();
    return {
      product,
      relatedProducts: related.filter((item) => item.id !== product.id),
    };
  } catch (error) {
    console.error("Unable to load public product from Supabase", error);
    const product = allProducts.find(
      (item) => String(item.id) === identifier || item.slug === identifier,
    );
    return {
      product: product ?? null,
      relatedProducts: allProducts.filter((item) => item.id !== product?.id),
    };
  }
}

export async function getHomepageContent(): Promise<{
  heroSlides: HeroSlide[];
  whyMelalogy: HomepageSection;
}> {
  if (!isSupabaseConfigured) {
    return { heroSlides: defaultHeroSlides, whyMelalogy: defaultWhyMelalogy };
  }

  try {
    const supabase = createPublicClient();
    const [{ data: banners, error: bannerError }, { data: section, error: sectionError }] =
      await Promise.all([
        supabase
          .from("banners")
          .select(
            "id, eyebrow, title, highlighted_text, subtitle, desktop_image_url, mobile_image_url, button_label, button_url, secondary_button_label, secondary_button_url, sort_order",
          )
          .eq("placement", "home_hero")
          .eq("status", "published")
          .order("sort_order", { ascending: true }),
        supabase
          .from("homepage_sections")
          .select(
            "id, section_key, eyebrow, title, highlighted_text, subtitle, body, image_url, cta_label, cta_url",
          )
          .eq("section_key", "why_melalogy")
          .eq("status", "published")
          .maybeSingle(),
      ]);

    if (bannerError) throw bannerError;
    if (sectionError) throw sectionError;

    const heroSlides: HeroSlide[] = banners?.length
      ? banners.map((banner) => ({
          id: Number(banner.id),
          kicker: banner.eyebrow ?? "Melalogy Energy Shot",
          headline: {
            part1: banner.title,
            part2: banner.highlighted_text ?? "",
          },
          subheadline: banner.subtitle ?? "",
          image: banner.desktop_image_url,
          mobileImage: banner.mobile_image_url,
          primaryLabel: banner.button_label,
          primaryUrl: banner.button_url,
          secondaryLabel: banner.secondary_button_label,
          secondaryUrl: banner.secondary_button_url,
        }))
      : defaultHeroSlides;

    const whyMelalogy: HomepageSection = section
      ? {
          id: Number(section.id),
          sectionKey: section.section_key,
          eyebrow: section.eyebrow,
          title: section.title,
          highlightedText: section.highlighted_text,
          subtitle: section.subtitle,
          body: section.body,
          imageUrl: section.image_url,
          ctaLabel: section.cta_label,
          ctaUrl: section.cta_url,
        }
      : defaultWhyMelalogy;

    return { heroSlides, whyMelalogy };
  } catch (error) {
    console.error("Unable to load homepage CMS content from Supabase", error);
    return { heroSlides: defaultHeroSlides, whyMelalogy: defaultWhyMelalogy };
  }
}
