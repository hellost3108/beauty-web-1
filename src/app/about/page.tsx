import type { Metadata } from "next";
import About from "@/views/About";
import { getPublicAboutPage } from "@/services/public-content.service";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublicAboutPage();
  return {
    metadataBase: new URL("https://melalogy.com"),
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const page = await getPublicAboutPage();
  return <About content={page.content} />;
}
