import { Save } from "lucide-react";
import { upsertAboutPage } from "@/app/admin/_actions/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { AboutPageContent } from "@/data/aboutContent";

const inputClass =
  "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#f52334] focus:ring-2 focus:ring-[#f52334]/10";
const labelClass = "block text-sm font-semibold text-black/70";

function Field({ name, label, value, area = false }: { name: string; label: string; value: string; area?: boolean }) {
  return (
    <label className={labelClass}>
      {label}
      {area
        ? <textarea className={inputClass} name={name} rows={4} required defaultValue={value} />
        : <input className={inputClass} name={name} required defaultValue={value} />}
    </label>
  );
}

function ListEditor({ prefix, items }: { prefix: "principle" | "value"; items: { title: string; body: string }[] }) {
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      {items.slice(0, 3).map((item, index) => (
        <div key={`${prefix}-${index}`} className="rounded-2xl border border-black/10 bg-[#f8f5f2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">Mục {index + 1}</p>
          <div className="mt-4 space-y-4">
            <Field name={`${prefix}_${index + 1}_title`} label="Tiêu đề" value={item.title} />
            <Field name={`${prefix}_${index + 1}_body`} label="Nội dung" value={item.body} area />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutForm({
  content,
  page,
}: {
  content: AboutPageContent;
  page?: any;
}) {
  return (
    <form action={upsertAboutPage} className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">01 · Mở đầu</p>
        <h2 className="mt-2 font-display text-2xl">Hero trang Giới thiệu</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="hero_eyebrow" label="Dòng giới thiệu" value={content.hero.eyebrow} />
          <Field name="hero_image_caption" label="Chú thích trên ảnh" value={content.hero.imageCaption} />
          <Field name="hero_title" label="Tiêu đề" value={content.hero.title} />
          <Field name="hero_highlighted_text" label="Phần tiêu đề màu đỏ" value={content.hero.highlightedText} />
          <div className="md:col-span-2"><Field name="hero_body" label="Đoạn giới thiệu" value={content.hero.body} area /></div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ImageUploadField name="hero_image_url" label="Ảnh hero" folder="pages/about/hero" initialValue={content.hero.imageUrl} required />
          <Field name="hero_image_alt" label="Mô tả ảnh" value={content.hero.imageAlt} area />
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">02 · Niềm tin</p>
        <h2 className="mt-2 font-display text-2xl">Điểm bắt đầu của Melalogy</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="premise_eyebrow" label="Nhãn phần" value={content.premise.eyebrow} />
          <div />
          <Field name="premise_title" label="Tiêu đề" value={content.premise.title} />
          <Field name="premise_highlighted_text" label="Phần tiêu đề mờ" value={content.premise.highlightedText} />
          <Field name="signal_title" label="Tiêu đề cột Tín hiệu" value={content.premise.signalTitle} />
          <Field name="answer_title" label="Tiêu đề cột Đáp án" value={content.premise.answerTitle} />
          <Field name="signal_body" label="Nội dung Tín hiệu" value={content.premise.signalBody} area />
          <Field name="answer_body" label="Nội dung Đáp án" value={content.premise.answerBody} area />
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">03 · Cách chúng tôi nghĩ</p>
        <h2 className="mt-2 font-display text-2xl">Triết lý và nguyên tắc</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="thinking_eyebrow" label="Nhãn phần" value={content.thinking.eyebrow} />
          <Field name="thinking_title" label="Tiêu đề" value={content.thinking.title} />
          <div className="md:col-span-2"><Field name="thinking_body" label="Nội dung" value={content.thinking.body} area /></div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ImageUploadField name="thinking_image_url" label="Ảnh câu chuyện" folder="pages/about/story" initialValue={content.thinking.imageUrl} required />
          <Field name="thinking_image_alt" label="Mô tả ảnh" value={content.thinking.imageAlt} area />
        </div>
        <ListEditor prefix="principle" items={content.thinking.principles} />
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">04 · Bộ sưu tập</p>
        <h2 className="mt-2 font-display text-2xl">Bản đồ nhu cầu</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="collection_eyebrow" label="Nhãn phần" value={content.collection.eyebrow} />
          <Field name="collection_title" label="Tiêu đề" value={content.collection.title} />
          <div className="md:col-span-2"><Field name="collection_body" label="Nội dung" value={content.collection.body} area /></div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">05 · Giá trị</p>
        <h2 className="mt-2 font-display text-2xl">Giá trị Melalogy theo đuổi</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="values_eyebrow" label="Nhãn phần" value={content.values.eyebrow} />
          <Field name="values_title" label="Tiêu đề" value={content.values.title} />
        </div>
        <ListEditor prefix="value" items={content.values.items} />
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f52334]">06 · Kết thúc và SEO</p>
        <h2 className="mt-2 font-display text-2xl">Lời kêu gọi hành động</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field name="cta_eyebrow" label="Dòng giới thiệu" value={content.cta.eyebrow} />
          <Field name="cta_title" label="Tiêu đề kết thúc" value={content.cta.title} />
          <Field name="cta_button_label" label="Nhãn nút" value={content.cta.buttonLabel} />
          <Field name="cta_button_url" label="Đường dẫn nút" value={content.cta.buttonUrl} />
          <label className={labelClass}>Tiêu đề SEO<input className={inputClass} name="seo_title" defaultValue={page?.seo_title ?? "Giới Thiệu Melalogy | Hiểu Làn Da, Chọn Đúng Điều Cần"} /></label>
          <label className={labelClass}>Trạng thái<select className={inputClass} name="status" defaultValue={page?.status ?? "published"}><option value="draft">Bản nháp</option><option value="published">Đang hiển thị</option><option value="archived">Lưu trữ</option></select></label>
          <label className={`${labelClass} md:col-span-2`}>Mô tả SEO<textarea className={inputClass} name="seo_description" rows={3} defaultValue={page?.seo_description ?? "Khám phá câu chuyện, triết lý và những giá trị Melalogy theo đuổi trong hành trình chăm sóc làn da Việt."} /></label>
        </div>
      </section>

      <div className="text-right">
        <button className="inline-flex items-center gap-2 rounded-full bg-[#f52334] px-6 py-3 text-sm font-semibold text-white"><Save className="h-4 w-4" /> Lưu trang Giới thiệu</button>
      </div>
    </form>
  );
}
