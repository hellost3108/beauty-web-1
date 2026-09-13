import type { HeroSlide, HomepageSection } from "@/types/cms";

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    kicker: "The science of melanin",
    headline: { part1: "Khoa học", part2: "bắt đầu từ sắc tố" },
    subheadline: "Melalogy — The Science of Melanin.",
    image: "/assets/brand-banner-melanin.png",
  },
  {
    id: 2,
    kicker: "Pigmentation science",
    headline: { part1: "Khoa học", part2: "chuyên biệt về sắc tố" },
    subheadline: "Hiểu cơ chế trước khi thiết kế giải pháp.",
    image: "/assets/brand-banner-skincare.png",
  },
  {
    id: 3,
    kicker: "X50® Pure White",
    headline: { part1: "Công nghệ", part2: "dẫn truyền đúng đích" },
    subheadline: "Targeted delivery technology.",
    image: "/assets/brand-banner-x50.png",
  },
  {
    id: 4,
    kicker: "Energy Shot Hydrogel",
    headline: { part1: "Bốn công thức", part2: "bốn trạng thái da" },
    subheadline: "Chọn theo tín hiệu làn da.",
    image: "/assets/brand-banner-energy-shot.png",
  },
];

export const defaultWhyMelalogy: HomepageSection = {
  sectionKey: "science_portal",
  eyebrow: "Melanin Science",
  title: "Không bắt đầu từ lời hứa trắng nhanh.",
  highlightedText: "Bắt đầu từ cơ chế sắc tố.",
  subtitle: "Nền tảng khoa học Melalogy",
  body: "Khám phá nền tảng Melanin + Dermalogy, ba trụ cột khoa học và công nghệ dẫn truyền đúng đích phía sau Melalogy.",
  imageUrl: "/assets/brand-banner-x50.png",
  ctaLabel: "Khám phá Melanin Science",
  ctaUrl: "/melanin-science",
};
