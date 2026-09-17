"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const { error: sendError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (sendError) {
      setError(sendError.message || "Chưa thể gửi email đặt lại mật khẩu.");
    } else {
      setSent(true);
    }
    setBusy(false);
  };

  if (sent) {
    return (
      <p className="mt-8 rounded-2xl bg-emerald-500/15 px-5 py-4 text-sm leading-6 text-emerald-100">
        Đã gửi email. Hãy mở email mới nhất và sử dụng liên kết trong vòng 60 phút.
      </p>
    );
  }

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
      {error && <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}
      <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f52334] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#ff4352] disabled:opacity-60">
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        {busy ? "Đang gửi…" : "Gửi email đặt mật khẩu"}
      </button>
    </form>
  );
}
