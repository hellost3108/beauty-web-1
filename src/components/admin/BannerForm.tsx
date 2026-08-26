import Link from "next/link";
import { Save } from "lucide-react";
import { upsertBanner } from "@/app/admin/_actions/content";
import ImageUploadField from "@/components/admin/ImageUploadField";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#f52334] focus:ring-2 focus:ring-[#f52334]/10";
const labelClass = "block text-sm font-semibold text-black/70";

export default function BannerForm({ banner }: { banner?: any }) {
  return (
    <form action={upsertBanner} className="space-y-6">
      {banner?.id && <input type="hidden" name="id" value={banner.id} />}
      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Tên nội bộ
            <input className={inputClass} name="name" required defaultValue={banner?.name ?? ""} placeholder="Hero cấp ẩm" />
          </label>
          <label className={labelClass}>
            Vị trí
            <select className={inputClass} name="placement" defaultValue={banner?.placement ?? "home_hero"}>
              <option value="home_hero">Hero trang chủ</option>
              <option value="home_promo">Khuyến mãi trang chủ</option>
            </select>
          </label>
          <label className={labelClass}>
            Dòng giới thiệu
            <input className={inputClass} name="eyebrow" defaultValue={banner?.eyebrow ?? ""} />
          </label>
          <label className={labelClass}>
            Tiêu đề chính
            <input className={inputClass} name="title" required defaultValue={banner?.title ?? ""} />
          </label>
          <label className={labelClass}>
            Phần tiêu đề nhấn màu
            <input className={inputClass} name="highlighted_text" defaultValue={banner?.highlighted_text ?? ""} />
          </label>
          <label className={`${labelClass} md:col-span-2`}>
            Mô tả
            <textarea className={inputClass} name="subtitle" rows={4} defaultValue={banner?.subtitle ?? ""} />
          </label>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
        <ImageUploadField
          name="desktop_image_url"
          label="Ảnh desktop"
          folder="banners/desktop"
          initialValue={banner?.desktop_image_url}
          required
        />
        <ImageUploadField
          name="mobile_image_url"
          label="Ảnh mobile (không bắt buộc)"
          folder="banners/mobile"
          initialValue={banner?.mobile_image_url}
        />
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Nút chính
            <input className={inputClass} name="button_label" defaultValue={banner?.button_label ?? ""} />
          </label>
          <label className={labelClass}>
            Link nút chính
            <input className={inputClass} name="button_url" defaultValue={banner?.button_url ?? ""} placeholder="/collection" />
          </label>
          <label className={labelClass}>
            Nút phụ
            <input className={inputClass} name="secondary_button_label" defaultValue={banner?.secondary_button_label ?? ""} />
          </label>
          <label className={labelClass}>
            Link nút phụ
            <input className={inputClass} name="secondary_button_url" defaultValue={banner?.secondary_button_url ?? ""} placeholder="/about" />
          </label>
          <label className={labelClass}>
            Trạng thái
            <select className={inputClass} name="status" defaultValue={banner?.status ?? "draft"}>
              <option value="draft">Bản nháp</option>
              <option value="published">Đang hiển thị</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </label>
          <label className={labelClass}>
            Thứ tự
            <input className={inputClass} type="number" name="sort_order" defaultValue={banner?.sort_order ?? 0} />
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Link href="/admin/banners" className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold">Huỷ</Link>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold text-white">
          <Save className="h-4 w-4" /> Lưu banner
        </button>
      </div>
    </form>
  );
}
