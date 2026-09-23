"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { KeyRound, LoaderCircle, Save, Search, ShieldCheck, UserPlus, X } from "lucide-react";
import {
  createStaffAccount,
  findAccountByEmail,
  resetStaffPassword,
  updateStaff,
  type AccountRow,
} from "@/app/admin/_actions/users";
import { Card, Notice, buttonClass, helpClass, inputClass, labelClass } from "@/components/admin/ui";
import { cmsModules, roleLabels } from "@/lib/cms/modules";

type Role = AccountRow["role"];

const roleDescriptions: Record<Role, string> = {
  super_admin: "Toàn quyền, kể cả tạo tài khoản và phân quyền.",
  admin: "Sửa được mọi nội dung, sản phẩm, bài viết.",
  editor: "Chỉ sửa được các mục được tích bên dưới.",
  customer: "Không vào được Admin (tài khoản mua hàng).",
};

const randomPassword = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return `Mela-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
};

function PermissionPicker({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {cmsModules.map((module) => {
        const checked = value.includes(module.key);
        return (
          <label
            key={module.key}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
              checked ? "border-[#f52334]/50 bg-red-50/50" : "border-black/10 bg-white hover:border-black/25"
            }`}
          >
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[#f52334]"
              checked={checked}
              onChange={(event) =>
                onChange(event.target.checked ? [...value, module.key] : value.filter((item) => item !== module.key))
              }
            />
            <span>
              <strong className="block font-semibold">{module.label}</strong>
              <span className="text-xs text-black/45">{module.description}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function RoleSelect({ value, onChange, allowCustomer = true }: { value: Role; onChange: (role: Role) => void; allowCustomer?: boolean }) {
  const roles: Role[] = allowCustomer ? ["editor", "admin", "super_admin", "customer"] : ["editor", "admin", "super_admin"];
  return (
    <label className={labelClass}>
      Vai trò
      <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value as Role)}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role === "customer" ? "Gỡ quyền quản trị (khách hàng)" : roleLabels[role]}
          </option>
        ))}
      </select>
      <span className={helpClass}>{roleDescriptions[value]}</span>
    </label>
  );
}

function AccountEditor({
  account,
  meId,
  canResetPassword,
  onClose,
}: {
  account: AccountRow;
  meId: string;
  canResetPassword: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(account.role === "customer" ? "editor" : account.role);
  const [permissions, setPermissions] = useState<string[]>(account.permissions);
  const [isActive, setIsActive] = useState(account.isActive);
  const [fullName, setFullName] = useState(account.fullName ?? "");
  const [saving, setSaving] = useState(false);
  const isMe = account.id === meId;

  const save = async () => {
    setSaving(true);
    const result = await updateStaff({ userId: account.id, role, permissions, isActive, fullName });
    setSaving(false);
    if (!result.ok) return toast.error(result.error);
    toast.success(result.message ?? "Đã cập nhật.");
    onClose();
    router.refresh();
  };

  const resetPassword = async () => {
    const password = randomPassword();
    if (!window.confirm(`Đặt mật khẩu tạm mới cho ${account.email}?`)) return;
    const result = await resetStaffPassword(account.id, password);
    if (!result.ok) return toast.error(result.error);
    window.prompt("Mật khẩu tạm mới — sao chép và gửi cho người dùng:", password);
  };

  return (
    <Card className="border-[#f52334]/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Phân quyền</p>
          <h3 className="mt-1 font-display text-2xl">{account.email}</h3>
          {account.role === "customer" && <p className="mt-1 text-sm text-black/50">Tài khoản này hiện là khách hàng. Chọn vai trò để cấp quyền quản trị.</p>}
        </div>
        <button type="button" className={buttonClass.icon} onClick={onClose} aria-label="Đóng">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Tên hiển thị
          <input className={inputClass} value={fullName} onChange={(event) => setFullName(event.target.value)} />
        </label>
        <RoleSelect value={role} onChange={setRole} allowCustomer={!isMe} />
      </div>

      {role === "editor" && (
        <div className="mt-5">
          <p className={labelClass}>Được chỉnh sửa các mục</p>
          <div className="mt-2">
            <PermissionPicker value={permissions} onChange={setPermissions} />
          </div>
          {permissions.length === 0 && <p className="mt-2 text-xs font-medium text-amber-700">Chưa tích mục nào — biên tập viên sẽ chỉ xem được trang tổng quan.</p>}
        </div>
      )}

      <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
        <input type="checkbox" className="h-4 w-4 accent-[#f52334]" checked={isActive} disabled={isMe} onChange={(event) => setIsActive(event.target.checked)} />
        Tài khoản đang hoạt động (bỏ tích để khoá quyền truy cập Admin)
      </label>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
        {canResetPassword && !isMe ? (
          <button type="button" className={buttonClass.ghost} onClick={() => void resetPassword()}>
            <KeyRound className="h-4 w-4" /> Đặt mật khẩu tạm mới
          </button>
        ) : (
          <span />
        )}
        <button type="button" className={buttonClass.primary} disabled={saving} onClick={() => void save()}>
          {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Lưu phân quyền
        </button>
      </div>
    </Card>
  );
}

export default function UsersManager({
  staff,
  meId,
  serviceRoleReady,
}: {
  staff: AccountRow[];
  meId: string;
  serviceRoleReady: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<AccountRow | null>(null);
  const [lookup, setLookup] = useState("");
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newAccount, setNewAccount] = useState({ email: "", fullName: "", password: randomPassword(), role: "editor" as Exclude<Role, "customer">, permissions: [] as string[] });
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null);

  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    setSearching(true);
    const result = await findAccountByEmail(lookup);
    setSearching(false);
    if (!result.ok) return toast.error(result.error);
    if (!result.data) {
      toast.error("Không tìm thấy tài khoản với email này. Người dùng cần đăng ký tại /signup trước, hoặc tạo tài khoản mới bên dưới.");
      return;
    }
    setEditing(result.data);
  };

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    const result = await createStaffAccount(newAccount);
    setCreating(false);
    if (!result.ok) return toast.error(result.error);
    toast.success(result.message ?? "Đã tạo tài khoản.");
    setCreated({ email: newAccount.email, password: newAccount.password });
    setNewAccount({ email: "", fullName: "", password: randomPassword(), role: "editor", permissions: [] });
    router.refresh();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
      <div className="space-y-6">
        {editing && <AccountEditor key={editing.id} account={editing} meId={meId} canResetPassword={serviceRoleReady} onClose={() => setEditing(null)} />}

        <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-black/10 px-5 py-4">
            <ShieldCheck className="h-4 w-4 text-[#f52334]" />
            <h2 className="font-display text-xl">Tài khoản quản trị ({staff.length})</h2>
          </div>
          <ul className="divide-y divide-black/5">
            {staff.map((account) => (
              <li key={account.id} className="flex flex-wrap items-center gap-3 px-5 py-4 sm:flex-nowrap">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#191716] text-sm font-bold uppercase text-white">
                  {(account.fullName || account.email).slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="block truncate">
                    {account.fullName || account.email}
                    {account.id === meId && <span className="ml-2 text-xs font-normal text-black/40">(bạn)</span>}
                  </strong>
                  <span className="block truncate text-xs text-black/45">{account.email}</span>
                  {account.role === "editor" && (
                    <span className="mt-1 flex flex-wrap gap-1">
                      {account.permissions.length === 0 && <span className="text-xs text-amber-700">Chưa được cấp mục nào</span>}
                      {account.permissions.map((permission) => (
                        <span key={permission} className="rounded-full bg-[#f5f2ee] px-2 py-0.5 text-[11px] font-medium text-black/60">
                          {cmsModules.find((module) => module.key === permission)?.label ?? permission}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    !account.isActive
                      ? "bg-black/10 text-black/45"
                      : account.role === "super_admin"
                        ? "bg-[#191716] text-white"
                        : account.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {account.isActive ? roleLabels[account.role] : "Đã khoá"}
                </span>
                <button type="button" className={buttonClass.ghost} onClick={() => setEditing(account)}>
                  Phân quyền
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="font-display text-xl">Cấp quyền cho tài khoản có sẵn</h2>
          <p className="mt-1 text-sm leading-6 text-black/50">Người cần quyền tự đăng ký tại melalogy.com/signup, sau đó nhập email của họ ở đây.</p>
          <form onSubmit={search} className="mt-4 flex gap-2">
            <input type="email" required value={lookup} onChange={(event) => setLookup(event.target.value)} placeholder="email@melalogy.com" className={`${inputClass} mt-0`} />
            <button className={buttonClass.dark} disabled={searching}>
              {searching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </button>
          </form>
        </Card>

        <Card>
          <h2 className="font-display text-xl">Tạo tài khoản admin mới</h2>
          {!serviceRoleReady ? (
            <div className="mt-3">
              <Notice tone="info">
                Cần thêm biến môi trường <code>SUPABASE_SERVICE_ROLE_KEY</code> trên Vercel (không có tiền tố NEXT_PUBLIC) để tạo tài khoản trực tiếp. Trong lúc chờ, dùng cách “cấp quyền cho tài khoản có sẵn”.
              </Notice>
            </div>
          ) : (
            <form onSubmit={create} className="mt-4 space-y-4">
              <label className={labelClass}>
                Email
                <input type="email" required className={inputClass} value={newAccount.email} onChange={(event) => setNewAccount({ ...newAccount, email: event.target.value })} />
              </label>
              <label className={labelClass}>
                Tên hiển thị
                <input className={inputClass} value={newAccount.fullName} onChange={(event) => setNewAccount({ ...newAccount, fullName: event.target.value })} />
              </label>
              <label className={labelClass}>
                Mật khẩu tạm
                <span className="mt-2 flex gap-2">
                  <input required minLength={8} className={`${inputClass} mt-0 font-mono`} value={newAccount.password} onChange={(event) => setNewAccount({ ...newAccount, password: event.target.value })} />
                  <button type="button" className={buttonClass.ghost} onClick={() => setNewAccount({ ...newAccount, password: randomPassword() })}>
                    Tạo mới
                  </button>
                </span>
                <span className={helpClass}>Người dùng nên đổi mật khẩu ở mục “Tài khoản của tôi” sau khi đăng nhập.</span>
              </label>
              <RoleSelect value={newAccount.role} onChange={(role) => setNewAccount({ ...newAccount, role: role as Exclude<Role, "customer"> })} allowCustomer={false} />
              {newAccount.role === "editor" && (
                <PermissionPicker value={newAccount.permissions} onChange={(permissions) => setNewAccount({ ...newAccount, permissions })} />
              )}
              <button className={`${buttonClass.primary} w-full`} disabled={creating}>
                {creating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                Tạo tài khoản
              </button>
            </form>
          )}
          {created && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <strong className="block">Đã tạo tài khoản — gửi thông tin này cho người dùng:</strong>
              <span className="mt-2 block">Trang đăng nhập: melalogy.com/admin/login</span>
              <span className="block">Email: {created.email}</span>
              <span className="block">Mật khẩu tạm: <code className="font-mono">{created.password}</code></span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
