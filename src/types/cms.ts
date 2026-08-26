export type PublicationStatus = "draft" | "published" | "archived";
export type AdminRole = "editor" | "admin" | "super_admin";

export type StorefrontProduct = {
  id: number;
  slug?: string;
  sku?: string;
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
};

export type HeroSlide = {
  id: number;
  kicker: string;
  headline: {
    part1: string;
    part2: string;
  };
  subheadline: string;
  image: string;
  mobileImage?: string | null;
  primaryLabel?: string | null;
  primaryUrl?: string | null;
  secondaryLabel?: string | null;
  secondaryUrl?: string | null;
};

export type HomepageSection = {
  id?: number;
  sectionKey: string;
  eyebrow?: string | null;
  title: string;
  highlightedText?: string | null;
  subtitle?: string | null;
  body?: string | null;
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

export type AdminProfile = {
  id: string;
  email: string;
  fullName: string | null;
  role: AdminRole;
};
