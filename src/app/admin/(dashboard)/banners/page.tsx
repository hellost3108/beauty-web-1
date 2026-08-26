import Link from "next/link";
import { Archive, Edit3, ImageOff, Plus } from "lucide-react";
import { archiveBanner } from "@/app/admin/_actions/content";
import { createClient } from "@/lib/supabase/server";

const statusLabel: Record<string, string> = {
  draft: "Bản nháp",
  published: "Đang hiển thị",
  archived: "Lưu trữ",
};

export default async function BannersPage() {
  const supabase = await createClient();
  const { data: banners, error } = await supabase
    .from("banners")
    .select("id, name, placement, eyebrow, title, highlighted_text, desktop_image_url, status, sort_order")
    .order("sort_order");
  if (error) throw error;

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Homepage CMS</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Banner</h1>
          <p className="mt-2 text-sm text-black/50">Quản lý slide hero, hình ảnh, thông điệp và nút điều hướng.</p>
        </div>
        <Link href="/admin/banners/new" className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-5 py-3 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Thêm banner
        </Link>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {banners?.map((banner) => (
          <article key={banner.id} className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="grid h-56 place-items-center overflow-hidden bg-[#eee9e4]">
              {banner.desktop_image_url ? <img src={banner.desktop_image_url} alt="" className="h-full w-full object-cover" /> : <ImageOff className="h-7 w-7 text-black/30" />}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">{banner.placement}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${banner.status === "published" ? "bg-emerald-100 text-emerald-800" : banner.status === "archived" ? "bg-black/10 text-black/45" : "bg-amber-100 text-amber-800"}`}>
                  {statusLabel[banner.status]}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl">{banner.title} <em className="text-[#f52334]">{banner.highlighted_text}</em></h2>
              <p className="mt-2 text-xs text-black/45">{banner.name} · Thứ tự {banner.sort_order}</p>
              <div className="mt-5 flex gap-2">
                <Link href={`/admin/banners/${banner.id}/edit`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#191716] px-4 py-2.5 text-xs font-semibold text-white">
                  <Edit3 className="h-3.5 w-3.5" /> Chỉnh sửa
                </Link>
                {banner.status !== "archived" && (
                  <form action={archiveBanner}>
                    <input type="hidden" name="id" value={banner.id} />
                    <button className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-red-600" aria-label="Lưu trữ banner"><Archive className="h-4 w-4" /></button>
                  </form>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
      {!banners?.length && <p className="rounded-3xl border border-dashed border-black/15 p-12 text-center text-sm text-black/45">Chưa có banner. Hãy tạo banner đầu tiên.</p>}
    </div>
  );
}
