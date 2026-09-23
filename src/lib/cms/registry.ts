import type { ContentRecord } from "./fields";
import { normalizeContent } from "./fields";
import type { SectionDef } from "./define";
import type { SectionModuleKey } from "./modules";
import * as globalSections from "./sections/global";
import * as homeSections from "./sections/home";
import * as scienceSections from "./sections/science";
import * as shopSections from "./sections/shop";
import * as infoSections from "./sections/info";
import * as journalSections from "./sections/journal";

/*
 * Single source of truth for every editable block of the website.
 * Order inside each module = order shown in the Admin.
 */
export const sections = {
  // Global
  "global.brand": globalSections.globalBrand,
  "global.navigation": globalSections.globalNavigation,
  "global.contact": globalSections.globalContact,
  "global.bank": globalSections.globalBank,
  "global.newsletter": globalSections.globalNewsletter,
  "global.seo": globalSections.globalSeo,
  // Homepage
  "home.hero": homeSections.homeHero,
  "home.film": homeSections.homeFilm,
  "home.science": homeSections.homeScience,
  "home.lineup": homeSections.homeLineup,
  "home.journal": homeSections.homeJournal,
  "home.reviews": homeSections.homeReviews,
  "home.contact": homeSections.homeContact,
  // Melanin Science
  "science.hero": scienceSections.scienceHero,
  "science.foundation": scienceSections.scienceFoundation,
  "science.mission": scienceSections.scienceMission,
  "science.delivery": scienceSections.scienceDelivery,
  "science.seo": scienceSections.scienceSeo,
  // Shop
  "shop.hero": shopSections.shopHero,
  "shop.catalog": shopSections.shopCatalog,
  "shop.product": shopSections.shopProductPage,
  "shop.reviews": shopSections.shopReviews,
  "shop.seo": shopSections.shopSeo,
  // Information pages
  "info.contact": infoSections.infoContact,
  "info.faq": infoSections.infoFaq,
  "info.shipping": infoSections.infoShipping,
  "info.privacy": infoSections.infoPrivacy,
  "info.terms": infoSections.infoTerms,
  // Journal listing pages
  "journal.blog": journalSections.journalBlog,
  "journal.magazine": journalSections.journalMagazine,
} as const;

export type SectionKey = keyof typeof sections;
export type SectionContent<K extends SectionKey> = (typeof sections)[K]["defaults"];

export const sectionKeys = Object.keys(sections) as SectionKey[];

export const isSectionKey = (value: string): value is SectionKey => value in sections;

export function getSectionDef(key: string): SectionDef | undefined {
  return isSectionKey(key) ? (sections[key] as unknown as SectionDef) : undefined;
}

export function sectionsForModule(module: SectionModuleKey): SectionDef[] {
  return sectionKeys
    .map((key) => sections[key] as unknown as SectionDef)
    .filter((section) => section.module === module);
}

/** Stored JSON (or nothing) → complete, typed content with defaults filled in. */
export function resolveSection<K extends SectionKey>(key: K, raw: unknown): SectionContent<K> {
  const def = sections[key] as unknown as SectionDef;
  return normalizeContent(def.fields, raw, def.defaults as ContentRecord) as SectionContent<K>;
}

/* Small rendering helpers shared by the public components. */
export const splitLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export const splitList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
