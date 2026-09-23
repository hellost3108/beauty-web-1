import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MagazineDetailEditorial from "@/views/MagazineDetailEditorial";
import { getArticle, getArticles } from "@/lib/cms/server";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

const absolute = (url: string) => (url.startsWith("http") ? url : `https://melalogy.com${url}`);

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getArticle("magazine", decodeURIComponent(id));

  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/magazine/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: "article",
      url: `/magazine/${post.slug}`,
      publishedTime: post.publishedAt || undefined,
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

export async function generateStaticParams() {
  const posts = await getArticles("magazine");
  return posts.map((post) => ({ id: post.slug }));
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const [post, posts] = await Promise.all([getArticle("magazine", decodeURIComponent(id)), getArticles("magazine")]);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: absolute(post.image),
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Melalogy",
      logo: { "@type": "ImageObject", url: "https://melalogy.com/assets/logo-full.png" },
    },
    mainEntityOfPage: `https://melalogy.com/magazine/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <MagazineDetailEditorial post={post} posts={posts} />
    </>
  );
}
