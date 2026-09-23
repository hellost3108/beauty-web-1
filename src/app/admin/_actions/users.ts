"use server";

import { revalidatePath } from "next/cache";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireAdminForAction, requireSuperAdminForAction } from "@/lib/auth/admin";
import { isModuleKey } from "@/lib/cms/modules";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { createStaffSchema, firstIssue, staffUpdateSchema } from "@/lib/validation/admin";
import type { ActionResult, UserRole } from "@/types/cms";

export type AccountRow = {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  isActive: boolean;
  permissions: string[];
};

const cleanPermissions = (role: string, permissions: string[]) =>
  role === "editor" ? Array.from(new Set(permissions.filter(isModuleKey))) : [];

/** Looks up any registered account (customer or staff) by exact email. */
export async function findAccountByEmail(email: string): Promise<ActionResult<AccountRow | null>> {
  try {
    await requireSuperAdminForAction();
    const normalized = email.trim().toLowerCase();
    if (!normalized.includes("@")) return { ok: false, error: "Nhập email đầy đủ để tìm tài khoản." };

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, is_active, permissions")
      .ilike("email", normalized)
      .maybeSingle();
    if (error) throw error;
    if (!data) return { ok: true, data: null };

    return {
      ok: true,
      data: {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        role: data.role,
        isActive: data.is_active,
        permissions: data.permissions ?? [],
      },
    };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** Changes role, module permissions, name or active state of an account. */
export async function updateStaff(input: unknown): Promise<ActionResult> {
  const parsed = staffUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const values = parsed.data;

  try {
    const me = await requireSuperAdminForAction();
    const supabase = await createClient();

    if (values.userId === me.id && (values.role !== "super_admin" || !values.isActive)) {
      return { ok: false, error: "Bạn không thể tự hạ quyền hoặc khoá tài khoản Super Admin của chính mình." };
    }

    if (values.role !== "super_admin" || !values.isActive) {
      const { data: current } = await supabase.from("profiles").select("role").eq("id", values.userId).single();
      if (current?.role === "super_admin") {
        const { count } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "super_admin")
          .eq("is_active", true);
        if ((count ?? 0) <= 1) return { ok: false, error: "Hệ thống cần ít nhất một Super Admin đang hoạt động." };
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        role: values.role,
        permissions: cleanPermissions(values.role, values.permissions),
        is_active: values.isActive,
        full_name: values.fullName,
      })
      .eq("id", values.userId)
      .select("id")
      .maybeSingle();
    if (error) throw error;
    if (!data) return { ok: false, error: "Không cập nhật được tài khoản (không tìm thấy hoặc không có quyền)." };

    revalidatePath("/admin/users");
    return { ok: true, data: undefined, message: "Đã cập nhật quyền tài khoản." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** Creates a login for a new staff member with a temporary password. */
export async function createStaffAccount(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = createStaffSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const values = parsed.data;

  try {
    await requireSuperAdminForAction();
    const service = createServiceClient();
    if (!service) {
      return {
        ok: false,
        error:
          "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trên server. Hãy nhờ người mới tự đăng ký tại /signup rồi cấp quyền bằng email, hoặc thêm khoá này vào Vercel.",
      };
    }

    const { data: created, error: createError } = await service.auth.admin.createUser({
      email: values.email,
      password: values.password,
      email_confirm: true,
      user_metadata: values.fullName ? { full_name: values.fullName } : undefined,
    });
    if (createError) {
      if (/already|registered|exists/i.test(createError.message)) {
        return { ok: false, error: "Email này đã có tài khoản. Dùng ô “Cấp quyền cho tài khoản có sẵn” bên trên." };
      }
      throw createError;
    }

    const userId = created.user.id;
    // The on_auth_user_created trigger inserts the profile as a customer;
    // upsert makes this independent of trigger timing.
    const { error: profileError } = await service.from("profiles").upsert(
      {
        id: userId,
        email: values.email,
        full_name: values.fullName,
        role: values.role,
        permissions: cleanPermissions(values.role, values.permissions),
        is_active: true,
      },
      { onConflict: "id" },
    );
    if (profileError) throw profileError;

    revalidatePath("/admin/users");
    return { ok: true, data: { id: userId }, message: "Đã tạo tài khoản. Gửi email và mật khẩu tạm cho người dùng." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** Sets a new temporary password for a staff member (service role only). */
export async function resetStaffPassword(userId: string, password: string): Promise<ActionResult> {
  if (password.length < 8) return { ok: false, error: "Mật khẩu tạm cần ít nhất 8 ký tự." };
  try {
    await requireSuperAdminForAction();
    const service = createServiceClient();
    if (!service) return { ok: false, error: "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY trên server." };
    const { error } = await service.auth.admin.updateUserById(userId, { password });
    if (error) throw error;
    return { ok: true, data: undefined, message: "Đã đặt mật khẩu tạm mới." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** Lets any staff member update the name shown in the Admin. */
export async function updateOwnName(fullName: string): Promise<ActionResult> {
  try {
    const me = await requireAdminForAction();
    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null })
      .eq("id", me.id);
    if (error) throw error;
    revalidatePath("/admin", "layout");
    return { ok: true, data: undefined, message: "Đã cập nhật tên hiển thị." };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}
