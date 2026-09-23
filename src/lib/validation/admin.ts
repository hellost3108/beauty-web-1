import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null),
  z.string().trim().nullable(),
);

const optionalInteger = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? null : Number(value)),
  z.number({ invalid_type_error: "Giá trị phải là số" }).int("Giá trị phải là số nguyên").nullable(),
);

const safeUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || (value.startsWith("/") && !value.startsWith("//")) || /^https?:\/\//i.test(value),
    "Đường dẫn ảnh phải bắt đầu bằng / hoặc https://",
  );

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Cần nhập slug (đường dẫn)")
  .max(120, "Slug quá dài")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang");

const status = z.enum(["draft", "published", "archived"], {
  errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
});

export const productSchema = z.object({
  id: optionalInteger,
  categoryId: optionalInteger,
  name: z.string().trim().min(2, "Tên sản phẩm quá ngắn").max(200, "Tên sản phẩm quá dài"),
  slug: slugSchema,
  sku: optionalText,
  subtitle: optionalText,
  shortDescription: optionalText,
  description: optionalText,
  ingredients: optionalText,
  usage: optionalText,
  actives: optionalText,
  formulaNote: optionalText,
  accentColor: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null),
    z
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/, "Màu nhấn phải có dạng #RRGGBB")
      .nullable(),
  ),
  price: z.coerce.number({ invalid_type_error: "Giá phải là số" }).int("Giá phải là số nguyên").min(0, "Giá không được âm"),
  compareAtPrice: optionalInteger,
  status,
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: optionalText,
  seoDescription: optionalText,
});

export type ProductInput = z.input<typeof productSchema>;

export const categorySchema = z.object({
  id: optionalInteger,
  name: z.string().trim().min(2, "Tên danh mục quá ngắn"),
  slug: slugSchema,
  description: optionalText,
  imageUrl: z.preprocess((value) => value ?? "", safeUrl),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export type CategoryInput = z.input<typeof categorySchema>;

export const articleSchema = z.object({
  id: optionalInteger,
  channel: z.enum(["blog", "magazine"]),
  title: z.string().trim().min(3, "Tiêu đề quá ngắn"),
  slug: slugSchema,
  seoTitle: optionalText,
  metaDescription: optionalText,
  keywords: z.string().default(""),
  subtitle: optionalText,
  excerpt: z.string().trim().min(10, "Mô tả ngắn cần ít nhất 10 ký tự"),
  author: z.string().trim().min(2, "Tên tác giả quá ngắn"),
  authorRole: optionalText,
  dateLabel: optionalText,
  publishedAt: optionalText,
  category: z.string().trim().min(2, "Chuyên mục quá ngắn"),
  imageUrl: safeUrl.refine((value) => value.length > 0, "Cần ảnh đại diện"),
  imageAlt: z.string().trim().default(""),
  readingTime: z.string().trim().min(2, "Thời gian đọc không hợp lệ"),
  contentHtml: z.string().trim().min(20, "Nội dung bài viết quá ngắn"),
  status,
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export type ArticleInput = z.input<typeof articleSchema>;

export const staffUpdateSchema = z.object({
  userId: z.string().uuid("Tài khoản không hợp lệ"),
  role: z.enum(["customer", "editor", "admin", "super_admin"]),
  permissions: z.array(z.string()).default([]),
  isActive: z.boolean(),
  fullName: optionalText,
});

export const createStaffSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tạm cần ít nhất 8 ký tự"),
  fullName: optionalText,
  role: z.enum(["editor", "admin", "super_admin"]),
  permissions: z.array(z.string()).default([]),
});

export const firstIssue = (error: z.ZodError) => error.issues[0]?.message ?? "Dữ liệu không hợp lệ.";
