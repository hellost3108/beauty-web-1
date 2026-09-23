import "server-only";

import { revalidatePath, updateTag } from "next/cache";
import { AdminAccessError } from "@/lib/auth/admin";
import { CMS_TAGS } from "@/lib/cms/server";

type RefreshKind = keyof typeof CMS_TAGS;

/**
 * Makes the public website show new content on the very next request:
 * expires the cached Supabase reads and the pre-rendered pages.
 */
export function refreshPublicSite(kinds: RefreshKind[]) {
  for (const kind of kinds) updateTag(CMS_TAGS[kind]);
  revalidatePath("/", "layout");
}

type DbError = { message?: string; code?: string; details?: string | null } | null | undefined;

/** Turns Supabase/Postgres errors into messages an editor can act on. */
export function friendlyError(error: unknown): string {
  if (error instanceof AdminAccessError) return error.message;
  const dbError = error as DbError;
  const message = dbError?.message ?? (error instanceof Error ? error.message : "");
  const code = dbError?.code ?? "";

  if (code === "42501" || /row-level security/i.test(message)) {
    return "Tài khoản của bạn không có quyền thực hiện thao tác này.";
  }
  if (code === "42P01" || code === "PGRST205" || /does not exist|could not find the table/i.test(message)) {
    return "Database chưa được cập nhật. Hãy chạy file supabase/migrations/202609240001_cms_v2.sql trong Supabase SQL Editor.";
  }
  if (code === "42703" || /column .* does not exist|could not find the .* column/i.test(message)) {
    return "Database thiếu cột mới. Hãy chạy file supabase/migrations/202609240001_cms_v2.sql trong Supabase SQL Editor.";
  }
  if (code === "23505" || /duplicate key/i.test(message)) {
    if (/slug/i.test(message)) return "Slug (đường dẫn) này đã được dùng. Hãy chọn slug khác.";
    if (/sku/i.test(message)) return "Mã SKU này đã tồn tại.";
    return "Dữ liệu bị trùng với một mục đã có.";
  }
  if (code === "23514" || /violates check constraint/i.test(message)) {
    return "Dữ liệu chưa đúng định dạng (ví dụ slug chỉ gồm chữ thường, số và dấu gạch ngang).";
  }
  if (/JWT|session|not authenticated/i.test(message)) {
    return "Phiên đăng nhập đã hết hạn. Vui lòng tải lại trang và đăng nhập lại.";
  }
  return message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
}
