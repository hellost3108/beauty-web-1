import { Save, Sparkles } from "lucide-react";
import { upsertHomepageSection } from "@/app/admin/_actions/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createClient } from "@/lib/supabase/server";

const inputClass = "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#f52334]";
const labelClass = "block text-sm font-semibold text-black/70";

export default async function HomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const [params, supabase] = await Promise.all([searchParams, createClient()]);
  const { data: section } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("section_key", "why_melalogy")
    .maybeSingle();

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Homepage CMS</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Nội dung trang chủ</h1>
        <p className="mt-2 text-sm text-black/50">Chỉnh sửa khối “Vì sao chọn Melalogy”. Hero được quản lý trong mục Banner.</p>
      </header>
      {params.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã cập nhật trang chủ.</p>}
      {params.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{params.error}</p>}

      <form action={upsertHomepageSection} className="space-y-6">
        {section?.id && <input type="hidden" name="id" value={section.id} />}
        <input type="hidden" name="section_key" value="why_melalogy" />
        <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-red-50 text-[#f52334]"><Sparkles className="h-5 w-5" /></div>
            <div><p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">why_melalogy</p><h2 className="font-display text-2xl">Vì sao chọn Melalogy</h2></div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>Dòng giới thiệu<input className={inputClass} name="eyebrow" defaultValue={section?.eyebrow ?? "Melalogy standard"} /></label>
            <label className={labelClass}>Tiêu đề<input className={inputClass} name="title" required defaultValue={section?.title ?? "Vì Sao Chọn"} /></label>
            <label className={labelClass}>Phần nhấn màu<input className={inputClass} name="highlighted_text" defaultValue={section?.highlighted_text ?? "Melalogy"} /></label>
            <label className={labelClass}>Phụ đề<input className={inputClass} name="subtitle" defaultValue={section?.subtitle ?? "Mỗi trạng thái da có một tín hiệu riêng."} /></label>
            <label className={`${labelClass} md:col-span-2`}>Nội dung<textarea className={inputClass} name="body" rows={5} defaultValue={section?.body ?? "Melalogy giúp bạn nhận ra và chọn đúng công thức cần thiết."} /></label>
            <label className={labelClass}>Nhãn nút<input className={inputClass} name="cta_label" defaultValue={section?.cta_label ?? ""} /></label>
            <label className={labelClass}>Link nút<input className={inputClass} name="cta_url" defaultValue={section?.cta_url ?? ""} placeholder="/about" /></label>
            <label className={labelClass}>Trạng thái<select className={inputClass} name="status" defaultValue={section?.status ?? "published"}><option value="draft">Bản nháp</option><option value="published">Đang hiển thị</option><option value="archived">Lưu trữ</option></select></label>
            <label className={labelClass}>Thứ tự<input className={inputClass} name="sort_order" type="number" defaultValue={section?.sort_order ?? 10} /></label>
          </div>
          <div className="mt-6"><ImageUploadField name="image_url" label="Ảnh phụ trợ (không bắt buộc)" folder="homepage" initialValue={section?.image_url} /></div>
        </section>
        <div className="text-right"><button className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold text-white"><Save className="h-4 w-4" /> Lưu nội dung</button></div>
      </form>
    </div>
  );
}
