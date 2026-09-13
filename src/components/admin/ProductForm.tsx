import Link from "next/link";
import { Save } from "lucide-react";
import { upsertProduct } from "@/app/admin/_actions/content";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#f52334] focus:ring-2 focus:ring-[#f52334]/10";
const labelClass = "block text-sm font-semibold text-black/70";

export default function ProductForm({
  product,
  categories,
}: {
  product?: any;
  categories: Array<{ id: number; name: string }>;
}) {
  return (
    <form action={upsertProduct} className="space-y-6">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Thông tin chung</p>
          <h2 className="mt-2 font-display text-2xl">Nội dung sản phẩm</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={`${labelClass} md:col-span-2`}>
            Tên sản phẩm
            <input className={inputClass} name="name" required defaultValue={product?.name ?? ""} />
          </label>
          <label className={labelClass}>
            Slug
            <input className={inputClass} name="slug" required defaultValue={product?.slug ?? ""} placeholder="mat-na-cap-am" />
          </label>
          <label className={labelClass}>
            SKU
            <input className={inputClass} name="sku" defaultValue={product?.sku ?? ""} placeholder="ML-ES-HYDRATE" />
          </label>
          <label className={labelClass}>
            Phụ đề
            <input className={inputClass} name="subtitle" defaultValue={product?.subtitle ?? ""} />
          </label>
          <label className={labelClass}>
            Danh mục
            <select className={inputClass} name="category_id" defaultValue={product?.category_id ?? ""}>
              <option value="">Chưa phân loại</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className={`${labelClass} md:col-span-2`}>
            Mô tả ngắn
            <textarea className={inputClass} name="short_description" rows={3} defaultValue={product?.short_description ?? ""} />
          </label>
          <label className={`${labelClass} md:col-span-2`}>
            Mô tả chi tiết
            <textarea className={inputClass} name="description" rows={7} defaultValue={product?.description ?? ""} />
          </label>
          <label className={labelClass}>
            Thành phần nổi bật
            <textarea className={inputClass} name="ingredients" rows={4} defaultValue={product?.ingredients ?? ""} />
          </label>
          <label className={labelClass}>
            Cách sử dụng
            <textarea className={inputClass} name="usage" rows={4} defaultValue={product?.usage ?? ""} />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <label className={labelClass}>
            Giá bán (VNĐ)
            <input className={inputClass} type="number" name="price" min="0" required defaultValue={product?.price ?? 0} />
          </label>
          <label className={labelClass}>
            Giá so sánh
            <input className={inputClass} type="number" name="compare_at_price" min="0" defaultValue={product?.compare_at_price ?? ""} />
          </label>
          <label className={labelClass}>
            Trạng thái
            <select className={inputClass} name="status" defaultValue={product?.status ?? "draft"}>
              <option value="draft">Bản nháp</option>
              <option value="published">Đang hiển thị</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </label>
          <label className={labelClass}>
            Thứ tự
            <input className={inputClass} type="number" name="sort_order" defaultValue={product?.sort_order ?? 0} />
          </label>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
          <input type="checkbox" name="featured" defaultChecked={Boolean(product?.featured)} className="h-4 w-4 accent-[#f52334]" />
          Sản phẩm nổi bật
        </label>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="font-display text-2xl">SEO cơ bản</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Tiêu đề SEO
            <input className={inputClass} name="seo_title" defaultValue={product?.seo_title ?? ""} />
          </label>
          <label className={labelClass}>
            Mô tả SEO
            <textarea className={inputClass} name="seo_description" rows={3} defaultValue={product?.seo_description ?? ""} />
          </label>
        </div>
      </section>

      <div className="flex flex-wrap justify-end gap-3">
        <Link href="/admin/products" className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold">Huỷ</Link>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/15">
          <Save className="h-4 w-4" /> Lưu sản phẩm
        </button>
      </div>
    </form>
  );
}
