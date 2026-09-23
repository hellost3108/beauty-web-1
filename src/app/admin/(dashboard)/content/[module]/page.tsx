import { notFound } from "next/navigation";
import ModuleEditor from "@/components/admin/cms/ModuleEditor";
import { Notice, PageHeader } from "@/components/admin/ui";
import { requireModule } from "@/lib/auth/admin";
import { friendlyError } from "@/lib/admin/server-utils";
import { normalizeContent } from "@/lib/cms/fields";
import { getModule, type SectionModuleKey } from "@/lib/cms/modules";
import { sectionsForModule } from "@/lib/cms/registry";
import { createClient } from "@/lib/supabase/server";

export default async function ContentModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: moduleKey } = await params;
  const moduleInfo = getModule(moduleKey);
  if (!moduleInfo || moduleInfo.kind !== "sections") notFound();
  await requireModule(moduleInfo.key);

  const defs = sectionsForModule(moduleInfo.key as SectionModuleKey);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_sections")
    .select("key, content, updated_at, updated_by_email")
    .in(
      "key",
      defs.map((def) => def.key),
    );
  const rows = new Map((data ?? []).map((row) => [row.key as string, row]));

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Nội dung website"
        title={moduleInfo.label}
        description={
          <>
            {moduleInfo.description} Mỗi khối lưu riêng; sau khi bấm <strong>Lưu &amp; cập nhật</strong>, website
            melalogy.com hiển thị nội dung mới ngay ở lần tải trang tiếp theo.
          </>
        }
      />

      {error && <Notice tone="warning">{friendlyError(error)}</Notice>}

      <ModuleEditor
        sections={defs.map((def) => {
          const row = rows.get(def.key);
          return {
            sectionKey: def.key,
            title: def.title,
            initialContent: normalizeContent(def.fields, row?.content, def.defaults),
            updatedAt: row?.updated_at ?? null,
            updatedByEmail: row?.updated_by_email ?? null,
          };
        })}
      />
    </div>
  );
}
