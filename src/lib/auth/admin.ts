import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { AdminProfile, AdminRole } from "@/types/cms";

const adminRoles: AdminRole[] = ["editor", "admin", "super_admin"];

export async function getAdminProfile(): Promise<AdminProfile | null> {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active")
    .eq("id", userId)
    .single();

  if (error || !data || !data.is_active || !adminRoles.includes(data.role as AdminRole)) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role as AdminRole,
  };
}

export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/setup");

  const profile = await getAdminProfile();
  if (!profile) redirect("/admin/login?error=not_authorized");
  return profile;
}

export async function requireAdminForAction() {
  const profile = await getAdminProfile();
  if (!profile) throw new Error("Bạn không có quyền thực hiện thao tác này.");
  return profile;
}
