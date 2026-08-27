import type { Metadata } from "next";
import MagazineEditorial from "@/views/MagazineEditorial";
import { getPublicMagazinePosts } from "@/services/public-content.service";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://melalogy.com"),
  title: "Tạp Chí Melalogy | Thương Hiệu, Khoa Học & Vẻ Đẹp Việt",
  description: "9 câu chuyện chuyên sâu về thương hiệu Melalogy, khoa học melanin, Energy Shot và văn hóa làm đẹp dành cho người Việt.",
  keywords: ["Tạp chí Melalogy", "thương hiệu Melalogy", "khoa học làn da", "vẻ đẹp Việt", "Melalogy Energy Shot"],
  alternates: { canonical: "/magazine" },
  openGraph: {
    title: "Tạp Chí Melalogy | Tạp chí của làn da",
    description: "Câu chuyện thương hiệu, khoa học sản phẩm và những góc nhìn mới về vẻ đẹp Việt.",
    type: "website",
    url: "/magazine",
    images: [{ url: "/assets/melalogy-magazine-cover-2026.png", alt: "Tạp chí Melalogy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tạp Chí Melalogy | Tạp chí của làn da",
    description: "9 câu chuyện về Melalogy và vẻ đẹp Việt.",
    images: ["/assets/melalogy-magazine-cover-2026.png"],
  },
};

export default async function Page() {
  const posts = await getPublicMagazinePosts();
  return <MagazineEditorial posts={posts} />;
}
