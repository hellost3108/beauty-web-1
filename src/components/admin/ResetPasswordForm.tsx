"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ResetState = "checking" | "ready" | "invalid" | "saved";

export default function ResetPasswordForm() {
  const [state, setState] = useState<ResetState>("checking");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const verifyRecoveryLink = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const type = params.get("type");
      const urlError = params.get("error_description");

      if (urlError || !tokenHash || type !== "recovery") {
        if (active) {
          setError(urlError ? decodeURIComponent(urlError.replace(/\+/g, " ")) : "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
          setState("invalid");
        }
        return;
      }

      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "recovery",
      });

      window.history.replaceState({}, "", "/admin/reset-password");

      if (!active) return;
      if (verifyError) {
        setError("Liên kết đã hết hạn hoặc đã được sử dụng. Hãy yêu cầu một email mới.");
        setState("invalid");
        return;
      }

      setState("ready");
    };

    void verifyRecoveryLink();
    return () => {
      active = false;
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Mật khẩu cần có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmation) {
      setError("Hai lần nhập mật khẩu chưa khớp.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || "Không thể cập nhật mật khẩu.");
      setBusy(false);
      return;
    }

    await supabase.auth.signOut();
    setPassword("");
    setConfirmation("");
    setState("saved");
    setBusy(false);
  };

  if (state === "checking") {
    return (
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/65">
        <LoaderCircle className="h-4 w-4 animate-spin text-[#ff5a66]" />
        Đang kiểm tra liên kết bảo mật…
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div className="mt-8 space-y-4">
        <p className="rounded-2xl bg-red-500/15 px-5 py-4 text-sm leading-6 text-red-100">{error}</p>
        <Link href="/admin/forgot-password" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f52334] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ff4352]">
          <Mail className="h-4 w-4" />
          Gửi lại email đặt mật khẩu
        </Link>
      </div>
    );
  }

  if (state === "saved") {
    return (
      <div className="mt-8 space-y-4">
        <p className="rounded-2xl bg-emerald-500/15 px-5 py-4 text-sm leading-6 text-emerald-100">
          Đã cập nhật mật khẩu. Bạn có thể đăng nhập tài khoản quản trị ngay bây giờ.
        </p>
        <Link href="/admin/login" className="flex w-full items-center justify-center rounded-2xl bg-[#f52334] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ff4352]">
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <PasswordField label="Mật khẩu mới" value={password} onChange={setPassword} show={showPassword} autoComplete="new-password" />
      <PasswordField label="Nhập lại mật khẩu" value={confirmation} onChange={setConfirmation} show={showPassword} autoComplete="new-password" />

      <label className="flex items-center gap-2 text-sm text-white/60">
        <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} className="h-4 w-4 accent-[#f52334]" />
        Hiện mật khẩu
      </label>

      {error && <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}

      <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f52334] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ff4352] disabled:opacity-60">
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {busy ? "Đang lưu…" : "Lưu mật khẩu mới"}
      </button>
    </form>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  autoComplete: string;
}) {
  return (
    <label className="block text-sm font-semibold text-white/75">
      {label}
      <span className="relative mt-2 block">
        <input
          type={show ? "text" : "password"}
          required
          minLength={8}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 pr-12 text-white outline-none placeholder:text-white/30 focus:border-[#ff5a66]"
          placeholder="Ít nhất 8 ký tự"
        />
        {show ? <EyeOff className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /> : <Eye className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />}
      </span>
    </label>
  );
}
