"use server";

import { friendlyError, refreshPublicSite } from "@/lib/admin/server-utils";
import { requireModuleForAction } from "@/lib/auth/admin";
import { sanitizeContent, type ContentRecord } from "@/lib/cms/fields";
import { getSectionDef } from "@/lib/cms/registry";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/cms";

export type SectionRevision = {
  id: number;
  content: ContentRecord;
  createdAt: string;
  createdByEmail: string | null;
};

/** Validates, sanitises and stores one block, then refreshes the website. */
export async function saveSection(
  key: string,
  content: unknown,
): Promise<ActionResult<{ content: ContentRecord; updatedAt: string; updatedByEmail: string | null }>> {
  const def = getSectionDef(key);
  if (!def) return { ok: false, error: "Không tìm thấy khối nội dung này." };

  try {
    await requireModuleForAction(def.module);
    const { content: clean, issues } = sanitizeContent(def.fields, content);
    if (issues.length) return { ok: false, error: issues[0].message, issues };

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_sections")
      .upsert({ key, content: clean }, { onConflict: "key" })
      .select("updated_at, updated_by_email")
      .single();
    if (error) throw error;

    refreshPublicSite(["sections"]);
    return {
      ok: true,
      data: { content: clean, updatedAt: data.updated_at, updatedByEmail: data.updated_by_email },
      message: "Đã lưu và cập nhật lên website.",
    };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}

/** The last saved versions of a block, newest first. */
export async function getSectionHistory(key: string): Promise<ActionResult<SectionRevision[]>> {
  const def = getSectionDef(key);
  if (!def) return { ok: false, error: "Không tìm thấy khối nội dung này." };

  try {
    await requireModuleForAction(def.module);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_section_revisions")
      .select("id, content, created_at, created_by_email")
      .eq("section_key", key)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;

    return {
      ok: true,
      data: (data ?? []).map((row) => ({
        id: row.id,
        content: row.content as ContentRecord,
        createdAt: row.created_at,
        createdByEmail: row.created_by_email,
      })),
    };
  } catch (error) {
    return { ok: false, error: friendlyError(error) };
  }
}
