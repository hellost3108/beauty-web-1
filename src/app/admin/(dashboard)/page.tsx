import Link from "next/link";
import { ArrowRight, FileImage, FolderTree, Package, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [products, publishedProducts, categories, banners] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("categories").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("banners").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);

  const cards = [
    { label: "Tổng sản phẩm", value: products.count ?? 0, icon: Package, href: "/admin/products" },
    { label: "Đang hiển thị", value: publishedProducts.count ?? 0, icon: Sparkles, href: "/admin/products?status=published" },
    { label: "Danh mục hoạt động", value: categories.count ?? 0, icon: FolderTree, href: "/admin/categories" },
    { label: "Banner đang chạy", value: banners.count ?? 0, icon: FileImage, href: "/admin/banners" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Operations overview</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Tổng quan Melalogy</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">Theo dõi nội dung đang xuất bản và đi nhanh đến các module quản trị chính.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <card.icon className="h-6 w-6 text-[#f52334]" />
              <ArrowRight className="h-4 w-4 text-black/30 transition-transform group-hover:translate-x-1" />
            </div>
            <strong className="mt-8 block font-display text-5xl">{card.value}</strong>
            <span className="mt-2 block text-sm font-semibold text-black/50">{card.label}</span>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Link href="/admin/products/new" className="rounded-3xl bg-[#191716] p-8 text-white transition hover:bg-[#292321]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff5a66]">Quick action</p>
          <h2 className="mt-4 font-display text-3xl">Thêm sản phẩm mới</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">Tạo nội dung, giá bán và upload bộ ảnh sản phẩm.</p>
        </Link>
        <Link href="/admin/banners/new" className="rounded-3xl bg-[#f52334] p-8 text-white transition hover:bg-[#df1828]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Homepage CMS</p>
          <h2 className="mt-4 font-display text-3xl">Tạo banner trang chủ</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">Thay ảnh, tiêu đề và lời kêu gọi hành động không cần sửa code.</p>
        </Link>
      </section>
    </div>
  );
}
