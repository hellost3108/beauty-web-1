import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseConfigured) redirect("/admin/setup");
  const params = await searchParams;

  return (
    <main className="grid min-h-screen bg-[#171414] text-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <img src="/assets/mask-recovery-green-hero.png" alt="Melalogy Energy Shot" className="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#171414]" />
        <div className="absolute bottom-16 left-16 max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff5a66]">Melalogy operations</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95]">Nội dung đúng.<br /><em>Không cần sửa code.</em></h1>
        </div>
      </section>
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff5a66]">← Melalogy.com</Link>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Admin Studio</p>
          <h2 className="mt-3 font-display text-4xl">Đăng nhập quản trị</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">Quản lý sản phẩm, hình ảnh, danh mục và nội dung trang chủ.</p>
          <AdminLoginForm initialError={params.error} />
        </div>
      </section>
    </main>
  );
}
