import AboutForm from "@/components/admin/AboutForm";
import { defaultAboutContent, type AboutPageContent } from "@/data/aboutContent";
import { createClient } from "@/lib/supabase/server";

function mergeContent(content?: Partial<AboutPageContent> | null): AboutPageContent {
  if (!content) return defaultAboutContent;
  return {
    hero: { ...defaultAboutContent.hero, ...content.hero },
    premise: { ...defaultAboutContent.premise, ...content.premise },
    thinking: {
      ...defaultAboutContent.thinking,
      ...content.thinking,
      principles: content.thinking?.principles?.length ? content.thinking.principles : defaultAboutContent.thinking.principles,
    },
    collection: { ...defaultAboutContent.collection, ...content.collection },
    values: {
      ...defaultAboutContent.values,
      ...content.values,
      items: content.values?.items?.length ? content.values.items : defaultAboutContent.values.items,
    },
    cta: { ...defaultAboutContent.cta, ...content.cta },
  };
}

export default async function AdminAboutPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const [query, supabase] = await Promise.all([searchParams, createClient()]);
  const { data: page } = await supabase.from("content_pages").select("*").eq("slug", "about").maybeSingle();
  const content = mergeContent(page?.content as Partial<AboutPageContent> | null);

  return (
    <div className="space-y-7">
      <header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Page CMS</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">Trang Giới thiệu</h1><p className="mt-2 text-sm text-black/50">Chỉnh sửa câu chuyện, triết lý, hình ảnh và giá trị thương hiệu.</p></header>
      {query.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã cập nhật trang Giới thiệu.</p>}
      {query.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{query.error}</p>}
      <AboutForm content={content} page={page} />
    </div>
  );
}
