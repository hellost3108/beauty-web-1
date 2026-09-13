import { ShieldCheck, UserRoundCog } from "lucide-react";
import { updateAdminAccess } from "@/app/admin/_actions/content";
import { requireSuperAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

const roleLabels: Record<string, string> = {
  customer: "Khách hàng",
  editor: "Biên tập viên",
  admin: "Quản trị viên",
  super_admin: "Super admin",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const [profile, params, supabase] = await Promise.all([
    requireSuperAdmin(),
    searchParams,
    createClient(),
  ]);
  const { data: users, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, created_at")
    .order("created_at", { ascending: true });
  if (error) throw error;

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Access control</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Tài khoản & phân quyền</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/50">
          Mời hoặc tạo người dùng trong Supabase Auth trước, sau đó quay lại đây để cấp quyền. Chỉ super admin nhìn thấy và thay đổi mục này.
        </p>
      </header>

      {params.success && (
        <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã cập nhật quyền tài khoản.</p>
      )}
      {params.error && (
        <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{params.error}</p>
      )}

      <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 bg-[#191716] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#ff5a66]" />
            <div>
              <h2 className="font-display text-2xl">Danh sách tài khoản</h2>
              <p className="mt-1 text-xs text-white/50">{users?.length ?? 0} tài khoản đã đồng bộ từ Supabase</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-black/10">
          {users?.map((user) => (
            <form key={user.id} action={updateAdminAccess} className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_180px_120px_auto] md:items-center md:px-6">
              <input type="hidden" name="id" value={user.id} />
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-50 text-[#f52334]">
                  <UserRoundCog className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <strong className="block truncate text-sm">{user.full_name || user.email}</strong>
                  <span className="block truncate text-xs text-black/45">{user.email}</span>
                  {user.id === profile.id && <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-[#f52334]">Tài khoản đang dùng</span>}
                </div>
              </div>

              <label className="text-xs font-semibold text-black/55">
                Quyền
                <select name="role" defaultValue={user.role} className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm text-black outline-none focus:border-[#f52334]">
                  {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-black/60 md:justify-center">
                <input name="is_active" type="checkbox" defaultChecked={user.is_active} className="h-4 w-4 accent-[#f52334]" />
                Hoạt động
              </label>

              <button className="rounded-full bg-[#191716] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#f52334]">Lưu quyền</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
