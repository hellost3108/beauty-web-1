import type { Metadata } from "next";
import BlogDetail from "@/views/BlogDetail";
import { blogPosts } from "@/data/blogData";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((item) => item.id === Number(id));

  if (!post) return { title: "Bài viết không tồn tại | Melalogy" };

  return {
    metadataBase: new URL("https://melalogy.com"),
    title: `${post.title} | Melalogy Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default function BlogDetailPage() {
  return <BlogDetail />;
}
