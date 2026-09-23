"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { KeyRound, LoaderCircle, Save } from "lucide-react";
import { updateOwnName } from "@/app/admin/_actions/users";
import { Card, buttonClass, helpClass, inputClass, labelClass } from "@/components/admin/ui";
import { createClient } from "@/lib/supabase/client";

export default function AccountSettings({ email, fullName }: { email: string; fullName: string }) {
  const router = useRouter();
  const [name, setName] = useState(fullName);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState<"name" | "password" | null>(null);

  const saveName = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy("name");
    const result = await updateOwnName(name);
    setBusy(null);
    if (!result.ok) return toast.error(result.error);
    toast.success(result.message ?? "Đã lưu.");
    router.refresh();
  };

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) return toast.error("Mật khẩu cần ít nhất 8 ký tự.");
    if (password !== confirm) return toast.error("Hai mật khẩu chưa khớp.");
    setBusy("password");
    const { error } = await createClient().auth.updateUser({ password });
    setBusy(null);
    if (error) return toast.error(error.message);
    setPassword("");
    setConfirm("");
    toast.success("Đã đổi mật khẩu.");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <form onSubmit={saveName} className="space-y-4">
          <h2 className="font-display text-2xl">Thông tin</h2>
          <label className={labelClass}>
            Email đăng nhập
            <input className={inputClass} value={email} disabled />
          </label>
          <label className={labelClass}>
            Tên hiển thị
            <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} />
            <span className={helpClass}>Hiển thị trong Admin và lịch sử chỉnh sửa.</span>
          </label>
          <button className={buttonClass.dark} disabled={busy !== null}>
            {busy === "name" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Lưu
          </button>
        </form>
      </Card>
      <Card>
        <form onSubmit={changePassword} className="space-y-4">
          <h2 className="font-display text-2xl">Đổi mật khẩu</h2>
          <label className={labelClass}>
            Mật khẩu mới
            <input type="password" autoComplete="new-password" className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <label className={labelClass}>
            Nhập lại mật khẩu mới
            <input type="password" autoComplete="new-password" className={inputClass} value={confirm} onChange={(event) => setConfirm(event.target.value)} />
          </label>
          <button className={buttonClass.primary} disabled={busy !== null}>
            {busy === "password" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Đổi mật khẩu
          </button>
        </form>
      </Card>
    </div>
  );
}
