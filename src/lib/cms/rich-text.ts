/* Options shared by the Admin rich text editor and the public stylesheet
 * (src/app/rich-content.css). Values are stored as data-* attributes so they
 * survive HTML sanitising and stay tied to the brand stylesheet. */

export const richFonts = [
  { value: "", label: "Phông mặc định" },
  { value: "playfair", label: "Playfair Display (serif sang trọng)" },
  { value: "lora", label: "Lora (serif dễ đọc)" },
  { value: "bevietnam", label: "Be Vietnam Pro (không chân)" },
  { value: "dancing", label: "Dancing Script (viết tay)" },
  { value: "mono", label: "Roboto Mono (đơn cách)" },
] as const;

export const richSizes = [
  { value: "", label: "Cỡ thường" },
  { value: "sm", label: "Nhỏ" },
  { value: "lg", label: "Lớn" },
  { value: "xl", label: "Rất lớn" },
] as const;

export const richImageWidths = [
  { value: "full", label: "Toàn khung" },
  { value: "medium", label: "Vừa" },
  { value: "small", label: "Nhỏ" },
] as const;

export const richImageAligns = [
  { value: "center", label: "Giữa" },
  { value: "left", label: "Trái (chữ chạy bên phải)" },
  { value: "right", label: "Phải (chữ chạy bên trái)" },
] as const;

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function imageFigureHtml(options: { src: string; alt: string; caption: string; width: string; align: string }) {
  const caption = options.caption.trim() ? `<figcaption>${escapeText(options.caption.trim())}</figcaption>` : "";
  return `<figure data-rt-image="" data-width="${escapeAttr(options.width)}" data-align="${escapeAttr(options.align)}"><img src="${escapeAttr(options.src)}" alt="${escapeAttr(options.alt)}" loading="lazy">${caption}</figure>`;
}
