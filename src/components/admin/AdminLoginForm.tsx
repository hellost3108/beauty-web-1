"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(
    initialError === "not_authorized"
      ? "Tài khoản đã đăng nhập nhưng chưa được cấp quyền quản trị."
      : "",
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      router.replace("/admin");
      router.refresh();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Không thể đăng nhập.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block text-sm font-semibold text-white/75">
        Email quản trị
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-white/30 focus:border-[#ff5a66]"
          placeholder="admin@melalogy.com"
        />
      </label>
      <label className="block text-sm font-semibold text-white/75">
        Mật khẩu
        <span className="relative mt-2 block">
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 pr-12 text-white outline-none placeholder:text-white/30 focus:border-[#ff5a66]"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>

      {error && <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}

      <button
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f52334] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ff4352] disabled:opacity-60"
      >
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        {busy ? "Đang xác thực..." : "Đăng nhập Admin"}
      </button>
    </form>
  );
}
