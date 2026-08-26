import BannerForm from "@/components/admin/BannerForm";

export default async function NewBannerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Homepage CMS / New</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Thêm banner</h1>
      </header>
      {params.error && <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-800">{params.error}</p>}
      <BannerForm />
    </div>
  );
}
