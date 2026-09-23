"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ExternalLink, LoaderCircle, Save } from "lucide-react";
import { saveArticle } from "@/app/admin/_actions/articles";
import ImageInput from "@/components/admin/fields/ImageInput";
import RichTextInput from "@/components/admin/fields/RichTextInput";
import { Card, buttonClass, helpClass, inputClass, labelClass, slugify } from "@/components/admin/ui";

export type ArticleRecord = {
  id: number;
  channel: "blog" | "magazine";
  slug: string;
  title: string;
  seo_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  subtitle: string | null;
  excerpt: string;
  author: string;
  author_role: string | null;
  date_label: string | null;
  published_at: string | null;
  category: string;
  image_url: string;
  image_alt: string;
  reading_time: string;
  content_html: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  sort_order: number;
};

/** ISO timestamp → value for <input type="datetime-local"> in Vietnam time. */
const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const vietnam = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return vietnam.toISOString().slice(0, 16);
};

/** datetime-local (entered in Vietnam time) → ISO timestamp. */
const fromLocalInput = (value: string) => (value ? `${value}:00+07:00` : "");

export default function ArticleForm({
  channel,
  article,
  categories,
}: {
  channel: "blog" | "magazine";
  article?: ArticleRecord;
  categories: string[];
}) {
  const router = useRouter();
  const section = channel === "blog" ? "Blog" : "Tạp chí";
  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? categories[0] ?? "",
    excerpt: article?.excerpt ?? "",
    subtitle: article?.subtitle ?? "",
    author: article?.author ?? "Đội ngũ Melalogy",
    authorRole: article?.author_role ?? "",
    dateLabel: article?.date_label ?? "",
    publishedAt: toLocalInput(article?.published_at ?? null),
    readingTime: article?.reading_time ?? "5 phút đọc",
    imageUrl: article?.image_url ?? "",
    imageAlt: article?.image_alt ?? "",
    contentHtml: article?.content_html ?? "",
    seoTitle: article?.seo_title ?? "",
    metaDescription: article?.meta_description ?? "",
    keywords: (article?.keywords ?? []).join(", "),
    status: article?.status ?? ("draft" as "draft" | "published" | "archived"),
    featured: article?.featured ?? false,
    sortOrder: String(article?.sort_order ?? 0),
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const result = await saveArticle({
      ...form,
      id: article?.id ?? null,
      channel,
      publishedAt: fromLocalInput(form.publishedAt),
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    toast.success(result.message ?? "Đã lưu bài viết.");
    if (!article) router.replace(`/admin/${channel}/${result.data.id}/edit`);
    else router.refresh();
  };

  const input = (key: keyof typeof form, label: string, options: { required?: boolean; help?: string; placeholder?: string } = {}) => (
    <label className={labelClass}>
      {label}
      {options.required && <span className="text-[#f52334]"> *</span>}
      <input
        className={inputClass}
        value={String(form[key])}
        required={options.required}
        placeholder={options.placeholder}
        onChange={(event) => set(key, event.target.value as never)}
      />
      {options.help && <span className={helpClass}>{options.help}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-6">
        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">{error}</p>}
        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={`${labelClass} md:col-span-2`}>
              Tiêu đề<span className="text-[#f52334]"> *</span>
              <input
                className={`${inputClass} text-base`}
                required
                value={form.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setForm((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) }));
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
              <span className={helpClass}>melalogy.com/{channel}/{form.slug || "…"}</span>
            </label>
            <label className={labelClass}>
              Chuyên mục<span className="text-[#f52334]"> *</span>
              <input className={inputClass} required list={`${channel}-categories`} value={form.category} onChange={(event) => set("category", event.target.value)} />
              <datalist id={`${channel}-categories`}>
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
              <span className={helpClass}>Chọn chuyên mục có sẵn hoặc gõ tên mới.</span>
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              Mô tả ngắn<span className="text-[#f52334]"> *</span>
              <textarea className={`${inputClass} resize-y`} rows={3} required value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} />
              <span className={helpClass}>Hiển thị trên thẻ bài viết và phần mở đầu.</span>
            </label>
            {channel === "magazine" && (
              <label className={`${labelClass} md:col-span-2`}>
                Phụ đề
                <textarea className={`${inputClass} resize-y`} rows={2} value={form.subtitle} onChange={(event) => set("subtitle", event.target.value)} />
              </label>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-2xl">Nội dung bài viết</h2>
          <RichTextInput value={form.contentHtml} onChange={(contentHtml) => set("contentHtml", contentHtml)} minHeight={420} />
        </Card>

        <Card>
          <h2 className="font-display text-2xl">SEO</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {input("seoTitle", "Tiêu đề SEO", { help: "Để trống sẽ dùng tiêu đề bài." })}
            {input("keywords", "Từ khoá", { help: "Phân cách bằng dấu phẩy." })}
            <label className={`${labelClass} md:col-span-2`}>
              Mô tả SEO
              <textarea className={`${inputClass} resize-y`} rows={3} value={form.metaDescription} onChange={(event) => set("metaDescription", event.target.value)} />
              <span className={helpClass}>{form.metaDescription.length}/160 ký tự khuyến nghị.</span>
            </label>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="font-display text-xl">Xuất bản</h2>
          <div className="mt-4 space-y-4">
            <label className={labelClass}>
              Trạng thái
              <select className={inputClass} value={form.status} onChange={(event) => set("status", event.target.value as typeof form.status)}>
                <option value="published">Đang hiển thị</option>
                <option value="draft">Bản nháp (ẩn)</option>
                <option value="archived">Lưu trữ (ẩn)</option>
              </select>
            </label>
            <label className={labelClass}>
              Ngày xuất bản
              <input type="datetime-local" className={inputClass} value={form.publishedAt} onChange={(event) => set("publishedAt", event.target.value)} />
              <span className={helpClass}>Giờ Việt Nam. Bài hẹn giờ tương lai sẽ tự hiện khi tới giờ.</span>
            </label>
            {input("dateLabel", "Ngày hiển thị", { placeholder: "21 Tháng 8, 2026", help: "Để trống sẽ tự tạo từ ngày xuất bản." })}
            <div className="grid grid-cols-2 gap-4">
              {input("readingTime", "Thời gian đọc", { required: true })}
              <label className={labelClass}>
                Thứ tự
                <input type="number" className={inputClass} value={form.sortOrder} onChange={(event) => set("sortOrder", event.target.value)} />
              </label>
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input type="checkbox" checked={form.featured} onChange={(event) => set("featured", event.target.checked)} className="h-4 w-4 accent-[#f52334]" />
              Bài nổi bật (hiển thị đầu trang)
            </label>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-xl">Ảnh đại diện</h2>
          <ImageInput value={form.imageUrl} onChange={(imageUrl) => set("imageUrl", imageUrl)} folder={`articles/${channel}`} />
          <div className="mt-4">{input("imageAlt", "Mô tả ảnh (SEO)")}</div>
        </Card>

        <Card>
          <h2 className="font-display text-xl">Tác giả</h2>
          <div className="mt-4 space-y-4">
            {input("author", "Tên tác giả", { required: true })}
            {channel === "magazine" && input("authorRole", "Chức danh")}
          </div>
        </Card>

        <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-end gap-2 rounded-3xl border border-black/10 bg-white/90 p-2 shadow-lg backdrop-blur">
          {article && article.status === "published" && (
            <a href={`/${channel}/${article.slug}`} target="_blank" rel="noreferrer" className={buttonClass.ghost}>
              <ExternalLink className="h-4 w-4" /> Xem
            </a>
          )}
          <Link href={`/admin/${channel}`} className={buttonClass.ghost}>
            Quay lại
          </Link>
          <button className={buttonClass.primary} disabled={saving}>
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Đang lưu..." : article ? "Lưu bài" : `Tạo bài ${section}`}
          </button>
        </div>
      </div>
    </form>
  );
}
