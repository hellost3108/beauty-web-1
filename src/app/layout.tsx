import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
// Brand layer loads after globals so Melalogy tokens win over legacy theme values.
import "./melalogy-brand.css";
import Providers from "@/components/Providers";

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

export const metadata: Metadata = {
  title: "Melalogy | The Science of Melanin",
  description:
    "Melalogy là thương hiệu skincare khoa học chuyên biệt về sắc tố — được xây dựng từ sự thấu hiểu melanin và khoa học về làn da.",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={monaSans.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
