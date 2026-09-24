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

/** Font sizes offered in the editor, in px. */
export const richFontSizes = [10, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64] as const;

export const richColors = [
  { value: "#111111", label: "Đen Melalogy" },
  { value: "#605c59", label: "Xám chữ" },
  { value: "#9b9590", label: "Xám nhạt" },
  { value: "#d3172b", label: "Đỏ cherry" },
  { value: "#8e0f1d", label: "Đỏ đậm" },
  { value: "#f7d9d9", label: "Hồng nhạt" },
  { value: "#2f8fc0", label: "Xanh Cấp Ẩm" },
  { value: "#638d39", label: "Xanh Phục Hồi" },
  { value: "#c89500", label: "Vàng Làm Sáng" },
  { value: "#8055a6", label: "Tím Rạng Rỡ" },
  { value: "#f3f0ea", label: "Kem" },
  { value: "#ffffff", label: "Trắng" },
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
