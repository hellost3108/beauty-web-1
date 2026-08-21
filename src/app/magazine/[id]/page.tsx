import type { Metadata } from "next";
import MagazineDetailEditorial from "@/views/MagazineDetailEditorial";
import { magazineEditorialPosts } from "@/data/melalogyMagazinePosts";

type MagazineDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MagazineDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = magazineEditorialPosts.find((item) => item.id === Number(id));

  if (!post) return { title: "Bài viết không tồn tại | Tạp chí Melalogy" };

  return {
    metadataBase: new URL("https://melalogy.com"),
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/magazine/${post.id}` },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: "article",
      url: `/magazine/${post.id}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export function generateStaticParams() {
  return magazineEditorialPosts.map((post) => ({ id: String(post.id) }));
}

export default async function MagazineDetailPage({ params }: MagazineDetailPageProps) {
  const { id } = await params;
  const post = magazineEditorialPosts.find((item) => item.id === Number(id));
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `https://melalogy.com${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Melalogy",
      logo: { "@type": "ImageObject", url: "https://melalogy.com/assets/logo-full.png" },
    },
    mainEntityOfPage: `https://melalogy.com/magazine/${post.id}`,
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <MagazineDetailEditorial />
    </>
  );
}
