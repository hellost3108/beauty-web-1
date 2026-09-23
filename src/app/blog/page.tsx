import type { Metadata } from "next";
import CmsSections from "@/components/cms/CmsSections";
import { getArticles, getSection } from "@/lib/cms/server";
import Blog from "@/views/Blog";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSection("journal.blog");
  const image = content.heroImage || "/assets/melalogy-blog-hero-2026.png";
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${content.seoTitle} | Melalogy`,
      description: content.seoDescription,
      type: "website",
      url: "/blog",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.seoTitle} | Melalogy`,
      description: content.seoDescription,
      images: [image],
    },
  };
}

export default async function Page() {
  const posts = await getArticles("blog");
  return (
    <CmsSections modules={["journal"]}>
      <Blog posts={posts} />
    </CmsSections>
  );
}
