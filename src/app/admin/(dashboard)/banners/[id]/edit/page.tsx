import { notFound } from "next/navigation";
import BannerForm from "@/components/admin/BannerForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditBannerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const [{ id }, queryParams, supabase] = await Promise.all([params, searchParams, createClient()]);
  const bannerId = Number(id);
  if (!Number.isInteger(bannerId)) notFound();
  const { data: banner } = await supabase.from("banners").select("*").eq("id", bannerId).single();
  if (!banner) notFound();

  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Homepage CMS / Edit</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Chỉnh sửa banner</h1>
        <p className="mt-2 text-sm text-black/50">{banner.name}</p>
      </header>
      {queryParams.success && <p className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm text-emerald-800">Đã lưu thay đổi.</p>}
      {queryParams.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{queryParams.error}</p>}
      <BannerForm banner={banner} />
    </div>
  );
}
