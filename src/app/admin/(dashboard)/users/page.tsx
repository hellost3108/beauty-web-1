import UsersManager from "@/components/admin/UsersManager";
import type { AccountRow } from "@/app/admin/_actions/users";
import { Notice, PageHeader } from "@/components/admin/ui";
import { friendlyError } from "@/lib/admin/server-utils";
import { requireSuperAdminPage } from "@/lib/auth/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";

export default async function UsersPage() {
  const me = await requireSuperAdminPage();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, permissions")
    .in("role", ["editor", "admin", "super_admin"])
    .order("role", { ascending: false })
    .order("email");

  const staff: AccountRow[] = (data ?? []).map((row) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    isActive: row.is_active,
    permissions: row.permissions ?? [],
  }));

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Hệ thống"
        title="Tài khoản & phân quyền"
        description={
          <>
            <strong>Super Admin</strong>: toàn quyền · <strong>Quản trị viên</strong>: sửa mọi nội dung · <strong>Biên tập viên</strong>: chỉ sửa
            các mục được tích. Quyền được kiểm tra cả trên máy chủ và trong database.
          </>
        }
      />
      {error && <Notice tone="error">{friendlyError(error)}</Notice>}
      <UsersManager staff={staff} meId={me.id} serviceRoleReady={isServiceRoleConfigured} />
    </div>
  );
}
