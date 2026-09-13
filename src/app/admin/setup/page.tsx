import Link from "next/link";
import { CheckCircle2, Database, KeyRound, Rocket } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminSetupPage() {
  return (
    <main className="min-h-screen bg-[#f5f2ee] px-5 py-14 text-[#191716] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f52334]">Melalogy Admin</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight">Kết nối Supabase để kích hoạt trang quản trị.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-black/55">
          Code Admin đã sẵn sàng. Hoàn thành bốn bước dưới đây để bật đăng nhập, database và kho ảnh.
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: Database, title: "1. Tạo project Supabase", text: "Tạo một project mới gần khu vực người dùng chính của Melalogy." },
            { icon: CheckCircle2, title: "2. Chạy migration và seed", text: "Chạy file migration trước, sau đó seed dữ liệu sản phẩm hiện tại." },
            { icon: KeyRound, title: "3. Tạo tài khoản Admin", text: "Tạo user email/password rồi cấp role super_admin trong bảng profiles." },
            { icon: Rocket, title: "4. Thêm biến môi trường", text: "Thêm URL và Publishable Key vào local cùng Vercel rồi redeploy." },
          ].map((step) => (
            <li key={step.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <step.icon className="h-6 w-6 text-[#f52334]" />
              <h2 className="mt-5 font-display text-2xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/55">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-[#191716] p-5 text-sm text-white">
          <span className={`h-2.5 w-2.5 rounded-full ${isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"}`} />
          {isSupabaseConfigured ? "Đã phát hiện cấu hình Supabase." : "Chưa phát hiện biến môi trường Supabase."}
          {isSupabaseConfigured && <Link href="/admin/login" className="ml-auto font-semibold text-[#ff6672]">Đi tới đăng nhập →</Link>}
        </div>
      </div>
    </main>
  );
}
