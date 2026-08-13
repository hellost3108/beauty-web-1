import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

const ivyMode = localFont({
  src: [
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Thin_Italic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Light_Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_SemiBold_Italic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-IvyMode_Bold_Italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-button",
});

export const metadata: Metadata = {
  title: "Blushora | Premium Beauty & Skincare",
  description: "Discover the best in beauty and skincare with Blushora.",
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
    <html lang="en" className={`${ivyMode.variable} ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
