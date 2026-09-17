import Link from "next/link";
import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171414] px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl sm:p-10">
        <Link href="/admin/login" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5a66]">← Đăng nhập Admin</Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Melalogy Admin Studio</p>
        <h1 className="mt-3 font-display text-4xl">Quên mật khẩu</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">Nhập email tài khoản quản trị để nhận liên kết đặt mật khẩu mới.</p>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
