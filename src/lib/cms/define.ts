import type { ContentRecord, Field } from "./fields";
import type { SectionModuleKey } from "./modules";

export type SectionDef<D extends ContentRecord = ContentRecord> = {
  key: string;
  module: SectionModuleKey;
  title: string;
  description?: string;
  /** Public page where the block appears, used for the "Xem trên web" link. */
  previewPath?: string;
  fields: Field[];
  defaults: D;
};

export function defineSection<D extends ContentRecord>(def: SectionDef<D>): SectionDef<D> {
  return def;
}

/* Small helpers to keep section files readable. */
export const text = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "text" }>, "type" | "name" | "label">> = {}): Field => ({ type: "text", name, label, ...extra });
export const area = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "textarea" }>, "type" | "name" | "label">> = {}): Field => ({ type: "textarea", name, label, ...extra });
export const rich = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "richtext" }>, "type" | "name" | "label">> = {}): Field => ({ type: "richtext", name, label, ...extra });
export const image = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "image" }>, "type" | "name" | "label">> = {}): Field => ({ type: "image", name, label, ...extra });
export const link = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "link" }>, "type" | "name" | "label">> = {}): Field => ({ type: "link", name, label, ...extra });
export const num = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "number" }>, "type" | "name" | "label">> = {}): Field => ({ type: "number", name, label, ...extra });
export const bool = (name: string, label: string, extra: Partial<Omit<Extract<Field, { type: "boolean" }>, "type" | "name" | "label">> = {}): Field => ({ type: "boolean", name, label, ...extra });
export const select = (
  name: string,
  label: string,
  options: ReadonlyArray<{ value: string; label: string }>,
  extra: Partial<Omit<Extract<Field, { type: "select" }>, "type" | "name" | "label" | "options">> = {},
): Field => ({ type: "select", name, label, options, ...extra });
export const list = (
  name: string,
  label: string,
  itemLabel: string,
  fields: Field[],
  extra: Partial<Omit<Extract<Field, { type: "list" }>, "type" | "name" | "label" | "itemLabel" | "fields">> = {},
): Field => ({ type: "list", name, label, itemLabel, fields, ...extra });

/** Common "eyebrow + title + accent" heading used across the brand system. */
export const heading = (options: { lines?: boolean } = {}): Field[] => [
  text("eyebrow", "Dòng nhỏ phía trên (eyebrow)", { width: "half" }),
  options.lines
    ? area("title", "Tiêu đề", { rows: 2, help: "Mỗi dòng sẽ là một dòng riêng trên điện thoại." })
    : text("title", "Tiêu đề"),
  options.lines
    ? area("titleAccent", "Tiêu đề nhấn (màu đỏ/nghiêng)", { rows: 2, help: "Mỗi dòng sẽ là một dòng riêng trên điện thoại." })
    : text("titleAccent", "Tiêu đề nhấn (màu đỏ/nghiêng)"),
];

export const linkPair = (prefix: string, label: string): Field[] => [
  text(`${prefix}Label`, `${label} — chữ trên nút`, { width: "half" }),
  link(`${prefix}Href`, `${label} — đường dẫn`, { width: "half", placeholder: "/shop" }),
];

export const skuOptions = [
  { value: "Cấp Ẩm", label: "Cấp Ẩm (xanh dương)" },
  { value: "Phục Hồi", label: "Phục Hồi (xanh lá)" },
  { value: "Làm Sáng", label: "Làm Sáng (vàng)" },
  { value: "Rạng Rỡ", label: "Rạng Rỡ (tím)" },
] as const;
