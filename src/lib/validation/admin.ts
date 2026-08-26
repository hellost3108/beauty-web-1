import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().trim().nullable().optional(),
);

const optionalInteger = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? null : Number(value)),
  z.number().int().nullable().optional(),
);

const slug = z
  .string()
  .trim()
  .min(2, "Slug phải có ít nhất 2 ký tự")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang");

export const productSchema = z.object({
  id: optionalInteger,
  categoryId: optionalInteger,
  name: z.string().trim().min(2, "Tên sản phẩm quá ngắn"),
  slug,
  sku: optionalText,
  subtitle: optionalText,
  shortDescription: optionalText,
  description: optionalText,
  ingredients: optionalText,
  usage: optionalText,
  price: z.coerce.number().int().min(0, "Giá không hợp lệ"),
  compareAtPrice: optionalInteger,
  status: z.enum(["draft", "published", "archived"]),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: optionalText,
  seoDescription: optionalText,
});

export const categorySchema = z.object({
  id: optionalInteger,
  parentId: optionalInteger,
  name: z.string().trim().min(2, "Tên danh mục quá ngắn"),
  slug,
  description: optionalText,
  imageUrl: optionalText,
  isActive: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export const bannerSchema = z.object({
  id: optionalInteger,
  name: z.string().trim().min(2, "Tên nội bộ quá ngắn"),
  placement: z.string().trim().min(2),
  eyebrow: optionalText,
  title: z.string().trim().min(2, "Tiêu đề quá ngắn"),
  highlightedText: optionalText,
  subtitle: optionalText,
  desktopImageUrl: z.string().trim().min(1, "Cần ảnh desktop"),
  mobileImageUrl: optionalText,
  buttonLabel: optionalText,
  buttonUrl: optionalText,
  secondaryButtonLabel: optionalText,
  secondaryButtonUrl: optionalText,
  status: z.enum(["draft", "published", "archived"]),
  sortOrder: z.coerce.number().int().default(0),
});

export const homepageSectionSchema = z.object({
  id: optionalInteger,
  sectionKey: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, "Mã section không hợp lệ"),
  eyebrow: optionalText,
  title: z.string().trim().min(2, "Tiêu đề quá ngắn"),
  highlightedText: optionalText,
  subtitle: optionalText,
  body: optionalText,
  imageUrl: optionalText,
  ctaLabel: optionalText,
  ctaUrl: optionalText,
  status: z.enum(["draft", "published", "archived"]),
  sortOrder: z.coerce.number().int().default(0),
});
