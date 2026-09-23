import { Be_Vietnam_Pro, Dancing_Script, Lora, Playfair_Display, Roboto_Mono } from "next/font/google";

/*
 * Optional typefaces editors can pick inside rich text (blog, magazine,
 * policy pages). All support Vietnamese. `preload: false` keeps them off the
 * critical path: the browser only downloads a face when text actually uses it.
 */
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-rt-playfair",
  display: "swap",
  preload: false,
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-rt-lora",
  display: "swap",
  preload: false,
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-rt-bevietnam",
  display: "swap",
  preload: false,
});

const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-rt-dancing",
  display: "swap",
  preload: false,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-rt-mono",
  display: "swap",
  preload: false,
});

export const richContentFontVariables = [playfair, lora, beVietnam, dancing, robotoMono]
  .map((font) => font.variable)
  .join(" ");
