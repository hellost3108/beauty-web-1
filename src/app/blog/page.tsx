import type { Metadata } from "next";
import Blog from "@/views/Blog";
import { getPublicBlogPosts } from "@/services/public-content.service";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://melalogy.com"),
  title: "Bí Kíp Làm Đẹp & Chăm Sóc Da | Melalogy Journal",
  description:
    "9 bài viết chuyên sâu về Melalogy Energy Shot, bí kíp chăm sóc da và trang điểm phù hợp với người Việt.",
  keywords: ["Melalogy", "bí kíp làm đẹp", "chăm sóc da", "mặt nạ hydrogel", "Melalogy Energy Shot"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Bí Kíp Làm Đẹp & Chăm Sóc Da | Melalogy Journal",
    description:
      "Kiến thức chăm sóc da, trang điểm và cách chọn Melalogy Energy Shot dành cho người Việt.",
    type: "website",
    url: "/blog",
    images: ["/assets/melalogy-blog-hero-2026.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melalogy Journal | Bí Kíp Làm Đẹp",
    description: "9 bài chăm da và làm đẹp được biên tập riêng cho người Việt.",
    images: ["/assets/melalogy-blog-hero-2026.png"],
  },
};

export default async function Page() {
  const posts = await getPublicBlogPosts();
  return <Blog posts={posts} />;
}
