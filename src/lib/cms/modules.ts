/*
 * Permission units of the Admin. A Super Admin can tick any subset of these
 * for an editor; admins and super admins can edit every module.
 * Keep the keys in sync with public.can_edit() in the Supabase migration.
 */
export const cmsModules = [
  {
    key: "global",
    label: "Header, footer & thông tin chung",
    description: "Logo, menu, footer, liên hệ, mạng xã hội, tài khoản ngân hàng, bản tin, SEO mặc định.",
    kind: "sections",
  },
  {
    key: "home",
    label: "Trang chủ",
    description: "Banner chạy, brand film, Melanin Science, Energy Shot, blog, đánh giá, liên hệ.",
    kind: "sections",
  },
  {
    key: "science",
    label: "Melanin Science",
    description: "Toàn bộ nội dung trang /melanin-science.",
    kind: "sections",
  },
  {
    key: "shop",
    label: "Trang Shop & sản phẩm",
    description: "Nội dung trang /shop, trang chi tiết sản phẩm và đánh giá khách hàng.",
    kind: "sections",
  },
  {
    key: "info",
    label: "Trang thông tin",
    description: "Liên hệ, FAQ, vận chuyển & đổi trả, chính sách bảo mật, điều khoản.",
    kind: "sections",
  },
  {
    key: "journal",
    label: "Trang Blog & Tạp chí",
    description: "Tiêu đề, giới thiệu của trang danh sách Blog và Tạp chí.",
    kind: "sections",
  },
  {
    key: "products",
    label: "Sản phẩm & danh mục",
    description: "Thêm/sửa sản phẩm, giá, ảnh, danh mục.",
    kind: "records",
  },
  {
    key: "blog",
    label: "Bài viết Blog",
    description: "Viết, sửa, ẩn bài viết The Melanin Journal.",
    kind: "records",
  },
  {
    key: "magazine",
    label: "Bài viết Tạp chí",
    description: "Viết, sửa, ẩn bài viết Magazine.",
    kind: "records",
  },
] as const;

export type CmsModuleKey = (typeof cmsModules)[number]["key"];
export type SectionModuleKey = Extract<(typeof cmsModules)[number], { kind: "sections" }>["key"];

export const moduleKeys = cmsModules.map((module) => module.key) as CmsModuleKey[];

export const isModuleKey = (value: string): value is CmsModuleKey =>
  (moduleKeys as string[]).includes(value);

export const getModule = (key: string) => cmsModules.find((module) => module.key === key);

export const roleLabels = {
  customer: "Khách hàng",
  editor: "Biên tập viên",
  admin: "Quản trị viên",
  super_admin: "Super Admin",
} as const;
