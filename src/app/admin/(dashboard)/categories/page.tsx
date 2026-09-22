import { Archive, ChevronDown, FolderTree, Plus } from "lucide-react";
import { deactivateCategory, upsertCategory } from "@/app/admin/_actions/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createClient } from "@/lib/supabase/server";

const inputClass = "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#f52334]";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const [params, supabase] = await Promise.all([searchParams, createClient()]);
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, parent_id, name, slug, description, image_url, is_active, sort_order")
    .order("sort_order");
  if (error) throw error;

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Catalogue structure</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Danh mục</h1>
        <p className="mt-2 text-sm text-black/50">Tạo nhóm sản phẩm, ảnh đại diện và thứ tự hiển thị.</p>
      </header>
      {params.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã lưu danh mục.</p>}
      {params.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{params.error}</p>}

      <details className="group rounded-3xl border border-black/10 bg-[#191716] text-white shadow-sm" open={!categories?.length}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
          <span className="flex items-center gap-3 font-display text-2xl"><Plus className="h-5 w-5 text-[#ff5a66]" /> Thêm danh mục</span>
          <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
        </summary>
        <form action={upsertCategory} className="grid gap-5 border-t border-white/10 p-6 lg:grid-cols-2">
          <label className="text-sm font-semibold text-white/70">Tên danh mục<input className={`${inputClass} mt-2 text-black`} name="name" required /></label>
          <label className="text-sm font-semibold text-white/70">Slug<input className={`${inputClass} mt-2 text-black`} name="slug" required placeholder="cap-am" /></label>
          <label className="text-sm font-semibold text-white/70 lg:col-span-2">Mô tả<textarea className={`${inputClass} mt-2 text-black`} name="description" rows={3} /></label>
          <label className="text-sm font-semibold text-white/70">Thứ tự<input className={`${inputClass} mt-2 text-black`} name="sort_order" type="number" defaultValue={0} /></label>
          <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold"><input type="checkbox" name="is_active" defaultChecked className="h-4 w-4 accent-[#f52334]" /> Đang hoạt động</label>
          <div className="lg:col-span-2 [&_label]:text-white/70"><ImageUploadField name="image_url" label="Ảnh danh mục" folder="categories" /></div>
          <button className="rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold lg:col-span-2 lg:justify-self-end">Tạo danh mục</button>
        </form>
      </details>

      <section className="grid gap-4 xl:grid-cols-2">
        {categories?.map((category: any) => (
          <details key={category.id} className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#eee9e4]">
                {category.image_url ? <img src={category.image_url} alt="" className="h-full w-full object-cover" /> : <FolderTree className="h-5 w-5 text-black/30" />}
              </div>
              <div className="min-w-0 flex-1">
                <strong className="block truncate">{category.name}</strong>
                <span className="text-xs text-black/40">/{category.slug}</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category.is_active ? "bg-emerald-100 text-emerald-800" : "bg-black/10 text-black/45"}`}>
                {category.is_active ? "Hoạt động" : "Đã ẩn"}
              </span>
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </summary>
            <form action={upsertCategory} className="grid gap-4 border-t border-black/10 bg-[#faf8f5] p-5 sm:grid-cols-2">
              <input type="hidden" name="id" value={category.id} />
              <label className="text-xs font-semibold text-black/55">Tên<input className={`${inputClass} mt-2`} name="name" required defaultValue={category.name} /></label>
              <label className="text-xs font-semibold text-black/55">Slug<input className={`${inputClass} mt-2`} name="slug" required defaultValue={category.slug} /></label>
              <label className="text-xs font-semibold text-black/55 sm:col-span-2">Mô tả<textarea className={`${inputClass} mt-2`} name="description" rows={3} defaultValue={category.description ?? ""} /></label>
              <label className="text-xs font-semibold text-black/55">Thứ tự<input className={`${inputClass} mt-2`} name="sort_order" type="number" defaultValue={category.sort_order} /></label>
              <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold"><input type="checkbox" name="is_active" defaultChecked={category.is_active} className="h-4 w-4 accent-[#f52334]" /> Hoạt động</label>
              <div className="sm:col-span-2"><ImageUploadField name="image_url" label="Ảnh danh mục" folder="categories" initialValue={category.image_url} /></div>
              <div className="flex justify-end gap-2 sm:col-span-2">
                <button className="rounded-full bg-[#191716] px-5 py-2.5 text-xs font-semibold text-white">Lưu thay đổi</button>
              </div>
            </form>
            {category.is_active && (
              <form action={deactivateCategory} className="border-t border-black/5 bg-[#faf8f5] px-5 pb-5 text-right">
                <input type="hidden" name="id" value={category.id} />
                <button className="inline-flex items-center gap-2 text-xs font-semibold text-red-600"><Archive className="h-3.5 w-3.5" /> Ẩn danh mục</button>
              </form>
            )}
          </details>
        ))}
      </section>
    </div>
  );
}
