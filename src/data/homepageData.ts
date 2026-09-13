import type { HeroSlide, HomepageSection } from "@/types/cms";

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    kicker: "Every skin state has a signal",
    headline: { part1: "Lắng Nghe", part2: "Tín Hiệu Làn Da" },
    subheadline: "Khi làn da lên tiếng bằng khô căng, nhạy cảm hay xỉn màu, Energy Shot giúp bạn chọn đúng công thức thay vì thêm nhiều bước.",
    image: "/assets/skincare-mask-application.jpg",
    primaryLabel: "Khám phá bộ sưu tập",
    primaryUrl: "/collection",
    secondaryLabel: "Triết lý Energy Shot",
    secondaryUrl: "/about",
  },
  {
    id: 2,
    kicker: "Hydrating Energy Shot",
    headline: { part1: "Cấp Ẩm", part2: "Chuyên Sâu" },
    subheadline: "Hyaluronic Acid và Ceramide NP đưa độ ẩm trở lại, giúp bề mặt da căng mượt và khỏe khoắn hơn.",
    image: "/assets/mask-hydrating-blue.png",
    primaryLabel: "Khám phá bộ sưu tập",
    primaryUrl: "/collection",
    secondaryLabel: "Triết lý Energy Shot",
    secondaryUrl: "/about",
  },
  {
    id: 3,
    kicker: "Recovery Energy Shot",
    headline: { part1: "Phục Hồi &", part2: "Làm Dịu" },
    subheadline: "Madecassic Acid và rau má hỗ trợ làm dịu cảm giác khó chịu, phù hợp với làn da nhạy cảm.",
    image: "/assets/mask-recovery-green-hero.png",
    primaryLabel: "Khám phá bộ sưu tập",
    primaryUrl: "/collection",
    secondaryLabel: "Triết lý Energy Shot",
    secondaryUrl: "/about",
  },
  {
    id: 4,
    kicker: "Brightening Energy Shot",
    headline: { part1: "Rạng Rỡ", part2: "Tự Nhiên" },
    subheadline: "Niacinamide và cám gạo giúp bề mặt da trông đều màu, trong trẻo và tràn đầy sức sống.",
    image: "/assets/mask-brightening-yellow.png",
    primaryLabel: "Khám phá bộ sưu tập",
    primaryUrl: "/collection",
    secondaryLabel: "Triết lý Energy Shot",
    secondaryUrl: "/about",
  },
];

export const defaultWhyMelalogy: HomepageSection = {
  sectionKey: "why_melalogy",
  eyebrow: "Melalogy standard",
  title: "Vì Sao Chọn",
  highlightedText: "Melalogy",
  subtitle: "Mỗi trạng thái da có một tín hiệu riêng.",
  body: "Melalogy giúp bạn nhận ra và chọn đúng công thức cần thiết.",
};
