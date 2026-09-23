import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { isModuleKey, type CmsModuleKey } from "@/lib/cms/modules";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { AdminProfile, AdminRole } from "@/types/cms";

const adminRoles: AdminRole[] = ["editor", "admin", "super_admin"];

/**
 * The signed-in staff member, or null. Cached per request so layouts, pages
 * and actions can all call it without extra round trips.
 */
export const getAdminProfile = cache(async (): Promise<AdminProfile | null> => {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return null;

  // `permissions` arrives with the CMS v2 migration; fall back gracefully if
  // the column is not there yet so the Admin can still open.
  let { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, permissions")
    .eq("id", userId)
    .single();
  if (error) {
    const fallback = await supabase
      .from("profiles")
      .select("id, email, full_name, role, is_active")
      .eq("id", userId)
      .single();
    data = fallback.data ? { ...fallback.data, permissions: [] } : null;
    error = fallback.error;
  }

  if (error || !data || !data.is_active || !adminRoles.includes(data.role as AdminRole)) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role as AdminRole,
    permissions: ((data.permissions as string[] | null) ?? []).filter(isModuleKey),
  };
});

export function canEdit(profile: AdminProfile, module: CmsModuleKey) {
  return profile.role === "admin" || profile.role === "super_admin" || profile.permissions.includes(module);
}

export const isSuperAdmin = (profile: AdminProfile) => profile.role === "super_admin";

export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/setup");

  const profile = await getAdminProfile();
  if (!profile) redirect("/admin/login?error=not_authorized");
  return profile;
}

/** For pages: sends staff without the right back to the dashboard. */
export async function requireModule(module: CmsModuleKey) {
  const profile = await requireAdmin();
  if (!canEdit(profile, module)) redirect("/admin?error=forbidden");
  return profile;
}

export async function requireSuperAdminPage() {
  const profile = await requireAdmin();
  if (!isSuperAdmin(profile)) redirect("/admin?error=forbidden");
  return profile;
}

export class AdminAccessError extends Error {}

/** For server actions: throws a readable error instead of redirecting. */
export async function requireModuleForAction(module: CmsModuleKey) {
  const profile = await getAdminProfile();
  if (!profile) throw new AdminAccessError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  if (!canEdit(profile, module)) {
    throw new AdminAccessError("Tài khoản của bạn chưa được cấp quyền chỉnh sửa mục này.");
  }
  return profile;
}

export async function requireSuperAdminForAction() {
  const profile = await getAdminProfile();
  if (!profile) throw new AdminAccessError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  if (!isSuperAdmin(profile)) throw new AdminAccessError("Chỉ Super Admin mới quản lý được tài khoản.");
  return profile;
}

export async function requireAdminForAction() {
  const profile = await getAdminProfile();
  if (!profile) throw new AdminAccessError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  return profile;
}
