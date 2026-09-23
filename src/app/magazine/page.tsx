import type { Metadata } from "next";
import CmsSections from "@/components/cms/CmsSections";
import { getArticles, getSection } from "@/lib/cms/server";
import MagazineEditorial from "@/views/MagazineEditorial";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSection("journal.magazine");
  const image = "/assets/melalogy-magazine-cover-2026.png";
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: "/magazine" },
    openGraph: {
      title: `${content.seoTitle} | Melalogy`,
      description: content.seoDescription,
      type: "website",
      url: "/magazine",
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
  const posts = await getArticles("magazine");
  return (
    <CmsSections modules={["journal"]}>
      <MagazineEditorial posts={posts} />
    </CmsSections>
  );
}
