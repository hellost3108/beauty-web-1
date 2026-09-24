"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ExternalLink, LoaderCircle, Save } from "lucide-react";
import { saveProduct } from "@/app/admin/_actions/catalog";
import { Card, buttonClass, helpClass, inputClass, labelClass, slugify } from "@/components/admin/ui";
import { productPath } from "@/lib/cms/types";

export type ProductRecord = {
  id: number;
  category_id: number | null;
  name: string;
  slug: string;
  sku: string | null;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  ingredients: string | null;
  usage: string | null;
  actives?: string | null;
  formula_note?: string | null;
  accent_color?: string | null;
  price: number;
  compare_at_price: number | null;
  status: "draft" | "published" | "archived";
  featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

type FormState = {
  id: number | null;
  categoryId: string;
  name: string;
  slug: string;
  sku: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  usage: string;
  actives: string;
  formulaNote: string;
  accentColor: string;
  price: string;
  compareAtPrice: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  sortOrder: string;
  seoTitle: string;
  seoDescription: string;
};

const toState = (product?: ProductRecord): FormState => ({
  id: product?.id ?? null,
  categoryId: product?.category_id ? String(product.category_id) : "",
  name: product?.name ?? "",
  slug: product?.slug ?? "",
  sku: product?.sku ?? "",
  subtitle: product?.subtitle ?? "",
  shortDescription: product?.short_description ?? "",
  description: product?.description ?? "",
  ingredients: product?.ingredients ?? "",
  usage: product?.usage ?? "",
  actives: product?.actives ?? "",
  formulaNote: product?.formula_note ?? "",
  accentColor: product?.accent_color ?? "",
  price: String(product?.price ?? 0),
  compareAtPrice: product?.compare_at_price != null ? String(product.compare_at_price) : "",
  status: product?.status ?? "draft",
  featured: product?.featured ?? false,
  sortOrder: String(product?.sort_order ?? 0),
  seoTitle: product?.seo_title ?? "",
  seoDescription: product?.seo_description ?? "",
});

export default function ProductForm({
  product,
  categories,
}: {
  product?: ProductRecord;
  categories: Array<{ id: number; name: string; is_active: boolean }>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toState(product));
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const result = await saveProduct(form);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    toast.success(result.message ?? "Đã lưu sản phẩm.");
    if (!product) router.replace(`/admin/products/${result.data.id}/edit`);
    else router.refresh();
  };

  const text = (key: keyof FormState, label: string, options: { help?: string; required?: boolean; placeholder?: string; span?: boolean } = {}) => (
    <label className={`${labelClass} ${options.span ? "md:col-span-2" : ""}`}>
      {label}
      {options.required && <span className="text-[#f52334]"> *</span>}
      <input
        className={inputClass}
        value={String(form[key] ?? "")}
        required={options.required}
        placeholder={options.placeholder}
        onChange={(event) => set(key, event.target.value as never)}
      />
      {options.help && <span className={helpClass}>{options.help}</span>}
    </label>
  );

  const area = (key: keyof FormState, label: string, rows = 4, help?: string) => (
    <label className={`${labelClass} md:col-span-2`}>
      {label}
      <textarea className={`${inputClass} resize-y leading-6`} rows={rows} value={String(form[key] ?? "")} onChange={(event) => set(key, event.target.value as never)} />
      {help && <span className={helpClass}>{help}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">{error}</p>}

      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Thông tin chung</p>
        <h2 className="mt-2 font-display text-2xl">Nội dung sản phẩm</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className={`${labelClass} md:col-span-2`}>
            Tên sản phẩm<span className="text-[#f52334]"> *</span>
            <input
              className={inputClass}
              required
              value={form.name}
              onChange={(event) => {
                const name = event.target.value;
                setForm((current) => ({ ...current, name, slug: slugTouched ? current.slug : slugify(name) }));
              }}
            />
          </label>
          <label className={labelClass}>
            Slug (đường dẫn)<span className="text-[#f52334]"> *</span>
            <input
              className={inputClass}
              required
              value={form.slug}
              onChange={(event) => {
                setSlugTouched(true);
                set("slug", slugify(event.target.value) || event.target.value.toLowerCase());
              }}
            />
            <span className={helpClass}>Chữ thường không dấu, dùng dấu gạch ngang. Tự tạo từ tên sản phẩm.</span>
          </label>
          {text("sku", "Mã SKU", { placeholder: "ML-ES-HYDRATE" })}
          {text("subtitle", "Phụ đề", { placeholder: "Cấp Ẩm Chuyên Sâu" })}
          <label className={labelClass}>
            Danh mục
            <select className={inputClass} value={form.categoryId} onChange={(event) => set("categoryId", event.target.value)}>
              <option value="">Chưa phân loại</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                  {category.is_active ? "" : " (đang ẩn)"}
                </option>
              ))}
            </select>
          </label>
          {area("shortDescription", "Mô tả ngắn", 2, "Dùng cho SEO và các thẻ ngắn.")}
          {area("description", "Mô tả chi tiết", 6)}
          {area("ingredients", "Thành phần chính", 3)}
          {area("usage", "Cách sử dụng", 3)}
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Hiển thị trên website</p>
        <h2 className="mt-2 font-display text-2xl">Thẻ sản phẩm</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {text("actives", "Hoạt chất nổi bật (trang chủ)", { placeholder: "Hyaluronic Acid · Ceramide NP" })}
          {text("formulaNote", "Nhãn công thức (trang Shop)", { placeholder: "Hydration / Barrier" })}
          <label className={labelClass}>
            Màu nhấn
            <span className="mt-2 flex items-center gap-2">
              <input
                type="color"
                value={/^#[0-9a-fA-F]{6}$/.test(form.accentColor) ? form.accentColor : "#d3172b"}
                onChange={(event) => set("accentColor", event.target.value)}
                className="h-11 w-14 cursor-pointer rounded-lg border border-black/15 bg-white p-1"
              />
              <input
                className={`${inputClass} mt-0`}
                value={form.accentColor}
                placeholder="Theo danh mục"
                onChange={(event) => set("accentColor", event.target.value)}
              />
            </span>
            <span className={helpClass}>Để trống để dùng màu theo danh mục.</span>
          </label>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Bán hàng</p>
        <h2 className="mt-2 font-display text-2xl">Giá & trạng thái</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <label className={labelClass}>
            Giá bán (VNĐ)<span className="text-[#f52334]"> *</span>
            <input className={inputClass} type="number" min="0" step="1000" required value={form.price} onChange={(event) => set("price", event.target.value)} />
            <span className={helpClass}>{Number(form.price || 0).toLocaleString("vi-VN")}đ</span>
          </label>
          <label className={labelClass}>
            Giá gốc (gạch ngang)
            <input className={inputClass} type="number" min="0" step="1000" value={form.compareAtPrice} onChange={(event) => set("compareAtPrice", event.target.value)} />
          </label>
          <label className={labelClass}>
            Trạng thái
            <select className={inputClass} value={form.status} onChange={(event) => set("status", event.target.value as FormState["status"])}>
              <option value="published">Đang hiển thị (đang bán)</option>
              <option value="draft">Bản nháp (ẩn)</option>
              <option value="archived">Lưu trữ (ẩn)</option>
            </select>
          </label>
          <label className={labelClass}>
            Thứ tự hiển thị
            <input className={inputClass} type="number" value={form.sortOrder} onChange={(event) => set("sortOrder", event.target.value)} />
            <span className={helpClass}>Số nhỏ hiển thị trước.</span>
          </label>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
          <input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => set("featured", event.target.checked)} className="h-4 w-4 accent-[#f52334]" />
          Sản phẩm nổi bật
        </label>
      </Card>

      <Card>
        <h2 className="font-display text-2xl">SEO</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {text("seoTitle", "Tiêu đề SEO", { help: "Để trống sẽ dùng tên sản phẩm." })}
          <label className={labelClass}>
            Mô tả SEO
            <textarea className={`${inputClass} resize-y`} rows={3} value={form.seoDescription} onChange={(event) => set("seoDescription", event.target.value)} />
          </label>
        </div>
      </Card>

      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-end gap-3 rounded-full border border-black/10 bg-white/90 p-2 shadow-lg backdrop-blur">
        {product && (
          <a href={productPath(product)} target="_blank" rel="noreferrer" className={buttonClass.ghost}>
            <ExternalLink className="h-4 w-4" /> Xem trên web
          </a>
        )}
        <Link href="/admin/products" className={buttonClass.ghost}>
          Quay lại
        </Link>
        <button className={buttonClass.primary} disabled={saving}>
          {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Đang lưu..." : product ? "Lưu thay đổi" : "Tạo sản phẩm"}
        </button>
      </div>
    </form>
  );
}
