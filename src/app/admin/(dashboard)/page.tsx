import Link from "next/link";
import { ArrowRight, BookOpenText, History, Newspaper, Package, PenLine } from "lucide-react";
import { Card, Notice, PageHeader, formatDateTime } from "@/components/admin/ui";
import { canEdit, requireAdmin } from "@/lib/auth/admin";
import { friendlyError } from "@/lib/admin/server-utils";
import { cmsModules } from "@/lib/cms/modules";
import { getSectionDef, sectionsForModule } from "@/lib/cms/registry";
import { isServiceRoleConfigured } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const profile = await requireAdmin();
  const supabase = await createClient();

  const [sections, revisions, products, publishedProducts, blog, magazine] = await Promise.all([
    supabase.from("site_sections").select("key"),
    supabase
      .from("site_section_revisions")
      .select("id, section_key, created_at, created_by_email")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("channel", "blog").eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("channel", "magazine").eq("status", "published"),
  ]);

  const customized = new Set((sections.data ?? []).map((row) => row.key as string));
  const modules = cmsModules.filter((module) => canEdit(profile, module.key));

  const stats = [
    { label: "Sản phẩm đang bán", value: `${publishedProducts.count ?? 0}/${products.count ?? 0}`, icon: Package, href: "/admin/products", module: "products" as const },
    { label: "Bài Blog đang hiển thị", value: blog.count ?? 0, icon: BookOpenText, href: "/admin/blog", module: "blog" as const },
    { label: "Bài Tạp chí đang hiển thị", value: magazine.count ?? 0, icon: Newspaper, href: "/admin/magazine", module: "magazine" as const },
  ].filter((stat) => canEdit(profile, stat.module));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin Studio"
        title="Tổng quan"
        description="Chọn khu vực cần chỉnh sửa. Mọi thay đổi được lưu vào Supabase và hiển thị trên melalogy.com ngay sau khi bấm Lưu."
      />

      {params.error === "forbidden" && (
        <Notice tone="error">Tài khoản của bạn chưa được cấp quyền vào mục đó. Liên hệ Super Admin để được cấp quyền.</Notice>
      )}
      {sections.error && <Notice tone="warning">{friendlyError(sections.error)}</Notice>}
      {!sections.error && (products.count ?? 0) === 0 && canEdit(profile, "products") && (
        <Notice tone="warning">
          Chưa có sản phẩm nào trong database — trang Shop sẽ trống. Hãy thêm sản phẩm hoặc chạy lại migration CMS v2 để nhập 4 sản phẩm Energy Shot.
        </Notice>
      )}
      {profile.role === "super_admin" && !isServiceRoleConfigured && (
        <Notice tone="info">
          Để tạo tài khoản admin mới ngay trong trang quản trị, thêm biến <code>SUPABASE_SERVICE_ROLE_KEY</code> vào Vercel.
          Khi chưa có, bạn vẫn cấp quyền được cho người đã tự đăng ký tại /signup.
        </Notice>
      )}

      {stats.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Link key={stat.href} href={stat.href} className="group rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <stat.icon className="h-5 w-5 text-[#f52334]" />
              <strong className="mt-4 block font-display text-4xl">{stat.value}</strong>
              <span className="mt-1 block text-sm text-black/50">{stat.label}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const href = module.kind === "sections" ? `/admin/content/${module.key}` : module.key === "products" ? "/admin/products" : `/admin/${module.key}`;
            const defs = module.kind === "sections" ? sectionsForModule(module.key as never) : [];
            const edited = defs.filter((def) => customized.has(def.key)).length;
            return (
              <Link
                key={module.key}
                href={href}
                className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#f52334]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <PenLine className="h-5 w-5 text-[#f52334]" />
                    {module.kind === "sections" && (
                      <span className="rounded-full bg-[#f5f2ee] px-3 py-1 text-xs font-semibold text-black/50">
                        {defs.length} khối · {edited} đã chỉnh
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-display text-2xl">{module.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-black/55">{module.description}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f52334]">
                  Chỉnh sửa <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <Card className="h-fit">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#f52334]" />
            <h2 className="font-display text-xl">Chỉnh sửa gần đây</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {(revisions.data ?? []).map((revision) => {
              const def = getSectionDef(revision.section_key as string);
              const module = def?.module ?? (revision.section_key as string).split(".")[0];
              return (
                <li key={revision.id} className="text-sm">
                  <Link href={`/admin/content/${module}#${revision.section_key}`} className="font-semibold hover:text-[#f52334]">
                    {def?.title ?? revision.section_key}
                  </Link>
                  <span className="block text-xs text-black/45">
                    {formatDateTime(revision.created_at)} · {revision.created_by_email ?? "—"}
                  </span>
                </li>
              );
            })}
            {!revisions.data?.length && <li className="text-sm text-black/45">Chưa có chỉnh sửa nào.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
