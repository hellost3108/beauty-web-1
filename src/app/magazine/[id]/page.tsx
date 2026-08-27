import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MagazineDetailEditorial from "@/views/MagazineDetailEditorial";
import { magazineEditorialPosts } from "@/data/melalogyMagazinePosts";
import { getPublicMagazinePost } from "@/services/public-content.service";

type MagazineDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MagazineDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const { post } = await getPublicMagazinePost(id);

  if (!post) return { title: "Bài viết không tồn tại | Tạp chí Melalogy" };

  return {
    metadataBase: new URL("https://melalogy.com"),
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/magazine/${post.slug ?? post.id}` },
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
  const { post, relatedPosts } = await getPublicMagazinePost(id);
  if (!post) notFound();
  const articlePath = post.slug ?? post.id;
  const articleImage = post.image.startsWith("http")
    ? post.image
    : `https://melalogy.com${post.image}`;
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: articleImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Melalogy",
      logo: { "@type": "ImageObject", url: "https://melalogy.com/assets/logo-full.png" },
    },
    mainEntityOfPage: `https://melalogy.com/magazine/${articlePath}`,
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <MagazineDetailEditorial post={post} relatedPosts={relatedPosts} />
    </>
  );
}
