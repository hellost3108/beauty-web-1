"use client";

import { useState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import { upsertArticle } from "@/app/admin/_actions/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextEditor from "@/components/admin/RichTextEditor";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#f52334] focus:ring-2 focus:ring-[#f52334]/10";
const labelClass = "block text-sm font-semibold text-black/70";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dateTimeValue(value?: string | null) {
  return value ? value.slice(0, 16) : "";
}

export default function ArticleForm({
  channel,
  article,
}: {
  channel: "blog" | "magazine";
  article?: any;
}) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(article?.slug));
  const section = channel === "blog" ? "Blog" : "Tạp chí";

  const updateTitle = (value: string) => {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  return (
    <form action={upsertArticle} className="space-y-6">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="channel" value={channel} />

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="font-display text-2xl">Thông tin bài viết</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className={`${labelClass} md:col-span-2`}>
            Tiêu đề
            <input className={inputClass} name="title" required value={title} onChange={(event) => updateTitle(event.target.value)} />
          </label>
          <label className={labelClass}>
            Đường dẫn bài viết
            <input
              className={inputClass}
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(slugify(event.target.value));
              }}
              placeholder="ten-bai-viet"
            />
          </label>
          <label className={labelClass}>
            Chuyên mục
            <input className={inputClass} name="category" required defaultValue={article?.category ?? (channel === "blog" ? "Chăm Sóc Da" : "Khoa Học & Làn Da")} />
          </label>
          {channel === "magazine" && (
            <label className={`${labelClass} md:col-span-2`}>
              Phụ đề
              <textarea className={inputClass} name="subtitle" rows={3} defaultValue={article?.subtitle ?? ""} />
            </label>
          )}
          <label className={`${labelClass} md:col-span-2`}>
            Mô tả ngắn
            <textarea className={inputClass} name="excerpt" rows={4} required defaultValue={article?.excerpt ?? ""} />
          </label>
          <label className={labelClass}>
            Tác giả
            <input className={inputClass} name="author" required defaultValue={article?.author ?? "Đội ngũ Melalogy"} />
          </label>
          {channel === "magazine" && (
            <label className={labelClass}>
              Vai trò tác giả
              <input className={inputClass} name="author_role" defaultValue={article?.author_role ?? "Ban biên tập Melalogy"} />
            </label>
          )}
          <label className={labelClass}>
            Ngày hiển thị
            <input className={inputClass} name="date_label" defaultValue={article?.date_label ?? ""} placeholder="21 Tháng 8, 2026" />
          </label>
          <label className={labelClass}>
            Ngày giờ xuất bản
            <input className={inputClass} type="datetime-local" name="published_at" defaultValue={dateTimeValue(article?.published_at)} />
          </label>
          <label className={labelClass}>
            Thời gian đọc
            <input className={inputClass} name="reading_time" required defaultValue={article?.reading_time ?? "7 phút đọc"} />
          </label>
          <label className={labelClass}>
            Thứ tự
            <input className={inputClass} type="number" name="sort_order" defaultValue={article?.sort_order ?? 0} />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="font-display text-2xl">Ảnh đại diện</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ImageUploadField name="image_url" label="Ảnh bài viết" folder={`articles/${channel}`} initialValue={article?.image_url} required />
          <label className={labelClass}>
            Mô tả ảnh
            <textarea className={inputClass} name="image_alt" rows={5} required defaultValue={article?.image_alt ?? ""} placeholder="Mô tả rõ nội dung ảnh để hỗ trợ SEO và khả năng tiếp cận" />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="font-display text-2xl">Nội dung</h2>
        <p className="mt-2 text-xs leading-5 text-black/45">Bôi đen đoạn chữ rồi chọn định dạng trên thanh công cụ.</p>
        <RichTextEditor name="content_html" initialValue={article?.content_html} />
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="font-display text-2xl">SEO và xuất bản</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>Tiêu đề SEO<input className={inputClass} name="seo_title" defaultValue={article?.seo_title ?? ""} /></label>
          <label className={labelClass}>Từ khóa, cách nhau bằng dấu phẩy<input className={inputClass} name="keywords" defaultValue={article?.keywords?.join(", ") ?? ""} /></label>
          <label className={`${labelClass} md:col-span-2`}>Mô tả SEO<textarea className={inputClass} name="meta_description" rows={3} defaultValue={article?.meta_description ?? ""} /></label>
          <label className={labelClass}>
            Trạng thái
            <select className={inputClass} name="status" defaultValue={article?.status ?? "draft"}>
              <option value="draft">Bản nháp</option>
              <option value="published">Đang hiển thị</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </label>
          <label className="mt-8 flex items-center gap-3 text-sm font-semibold text-black/70">
            <input type="checkbox" name="featured" defaultChecked={Boolean(article?.featured)} className="h-5 w-5 accent-[#f52334]" />
            Đặt làm bài nổi bật đầu trang
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Link href={`/admin/${channel}`} className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold">Huỷ</Link>
        <button className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold text-white">
          <Save className="h-4 w-4" /> Lưu bài {section}
        </button>
      </div>
    </form>
  );
}
