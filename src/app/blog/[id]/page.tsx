import type { Metadata } from "next";
import BlogDetail from "@/views/BlogDetail";
import { blogPosts } from "@/data/melalogyBlogPosts";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((item) => item.id === Number(id));

  if (!post) return { title: "Bài viết không tồn tại | Melalogy" };

  return {
    metadataBase: new URL("https://melalogy.com"),
    title: post.seoTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: "article",
      url: `/blog/${post.id}`,
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
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = blogPosts.find((item) => item.id === Number(id));
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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
    mainEntityOfPage: `https://melalogy.com/blog/${post.id}`,
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <BlogDetail />
    </>
  );
}
