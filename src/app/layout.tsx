import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
// Brand layer loads after globals so Melalogy tokens win over legacy theme values.
import "./melalogy-brand.css";
import "./rich-content.css";
import { richContentFontVariables } from "./rich-content-fonts";
import Providers from "@/components/Providers";
import { ProductsProvider } from "@/components/cms/ProductsProvider";
import { SectionsProvider } from "@/components/cms/SectionsProvider";
import { getSection, getSectionRows, getStorefrontProducts } from "@/lib/cms/server";

/*
 * Brand guideline: Mona Sans is the single typeface for the whole Melalogy
 * communication system — display, headline, body and data. Both custom
 * properties point at it so legacy `--font-display` call sites inherit the
 * brand type instead of the old serif.
 */
const monaSans = Mona_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-mona",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSection("global.seo");
  const images = seo.shareImage ? [{ url: seo.shareImage }] : undefined;

  return {
    metadataBase: new URL("https://melalogy.com"),
    title: {
      default: seo.siteTitle,
      template: "%s | Melalogy",
    },
    description: seo.description,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Melalogy",
      url: "/",
      title: seo.siteTitle,
      description: seo.shareDescription || seo.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteTitle,
      description: seo.shareDescription || seo.description,
      images: seo.shareImage ? [seo.shareImage] : undefined,
    },
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalSections, products] = await Promise.all([
    getSectionRows(["global"]),
    getStorefrontProducts(),
  ]);

  return (
    <html lang="vi" className={`${monaSans.variable} ${richContentFontVariables}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <SectionsProvider value={globalSections}>
            <ProductsProvider products={products}>{children}</ProductsProvider>
          </SectionsProvider>
        </Providers>
      </body>
    </html>
  );
}
