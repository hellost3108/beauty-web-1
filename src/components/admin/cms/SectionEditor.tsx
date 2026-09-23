"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ExternalLink, History, LoaderCircle, RotateCcw, Save, X } from "lucide-react";
import { getSectionHistory, saveSection, type SectionRevision } from "@/app/admin/_actions/sections";
import { normalizeContent, type ContentRecord } from "@/lib/cms/fields";
import { getSectionDef } from "@/lib/cms/registry";
import { FieldGrid } from "./FieldControl";
import { buttonClass, formatDateTime } from "@/components/admin/ui";

export type SectionEditorProps = {
  sectionKey: string;
  initialContent: ContentRecord;
  updatedAt: string | null;
  updatedByEmail: string | null;
  defaultOpen?: boolean;
  onDirtyChange?: (key: string, dirty: boolean) => void;
};

const stable = (value: unknown) => JSON.stringify(value);

export default function SectionEditor({
  sectionKey,
  initialContent,
  updatedAt: initialUpdatedAt,
  updatedByEmail: initialUpdatedBy,
  defaultOpen = false,
  onDirtyChange,
}: SectionEditorProps) {
  const def = getSectionDef(sectionKey);
  const [value, setValue] = useState<ContentRecord>(initialContent);
  const [saved, setSaved] = useState(() => stable(initialContent));
  const [open, setOpen] = useState(defaultOpen);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [meta, setMeta] = useState({ updatedAt: initialUpdatedAt, updatedBy: initialUpdatedBy });
  const [history, setHistory] = useState<SectionRevision[] | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const dirty = useMemo(() => stable(value) !== saved, [value, saved]);

  useEffect(() => {
    onDirtyChange?.(sectionKey, dirty);
  }, [dirty, onDirtyChange, sectionKey]);

  // Open the block when the page is opened with #section-key in the URL.
  useEffect(() => {
    if (window.location.hash === `#${sectionKey}`) setOpen(true);
  }, [sectionKey]);

  const folder = sectionKey.replace(/\./g, "/");

  const save = useCallback(async () => {
    if (!def) return;
    setSaving(true);
    setErrors({});
    setFormError("");
    const result = await saveSection(sectionKey, value);
    setSaving(false);

    if (!result.ok) {
      const nextErrors: Record<string, string> = {};
      result.issues?.forEach((issue) => {
        if (!nextErrors[issue.path]) nextErrors[issue.path] = issue.message;
      });
      setErrors(nextErrors);
      setFormError(result.error);
      setOpen(true);
      toast.error(result.error);
      return;
    }

    const normalized = normalizeContent(def.fields, result.data.content, def.defaults);
    setValue(normalized);
    setSaved(stable(normalized));
    setMeta({ updatedAt: result.data.updatedAt, updatedBy: result.data.updatedByEmail });
    setHistory(null);
    toast.success(`Đã lưu “${def.title}”. Website đã được cập nhật.`);
  }, [def, sectionKey, value]);

  const loadHistory = async () => {
    setHistoryOpen(true);
    if (history) return;
    setHistoryLoading(true);
    const result = await getSectionHistory(sectionKey);
    setHistoryLoading(false);
    if (result.ok) setHistory(result.data);
    else toast.error(result.error);
  };

  if (!def) return null;

  return (
    <section
      id={sectionKey}
      className={`scroll-mt-24 rounded-3xl border bg-white shadow-sm transition ${dirty ? "border-amber-300" : "border-black/10"}`}
    >
      <header className="flex flex-wrap items-center gap-3 p-5 sm:px-7">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
          aria-expanded={open}
        >
          <ChevronDown className={`mt-1.5 h-5 w-5 shrink-0 text-black/40 transition ${open ? "rotate-180" : ""}`} />
          <span className="min-w-0">
            <span className="block font-display text-2xl leading-tight">{def.title}</span>
            {def.description && <span className="mt-1 block text-sm leading-6 text-black/50">{def.description}</span>}
            <span className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-black/40">
              {meta.updatedAt ? (
                <span>
                  Lưu lần cuối {formatDateTime(meta.updatedAt)}
                  {meta.updatedBy ? ` · ${meta.updatedBy}` : ""}
                </span>
              ) : (
                <span>Đang dùng nội dung gốc của website</span>
              )}
              {dirty && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">Chưa lưu thay đổi</span>
              )}
            </span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {def.previewPath && (
            <a href={def.previewPath} target="_blank" rel="noreferrer" className={buttonClass.icon} title="Xem trên website">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button type="button" className={buttonClass.icon} onClick={() => void loadHistory()} title="Lịch sử chỉnh sửa">
            <History className="h-4 w-4" />
          </button>
          <button type="button" className={buttonClass.primary} disabled={!dirty || saving} onClick={() => void save()}>
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Đang lưu..." : "Lưu & cập nhật"}
          </button>
        </div>
      </header>

      {open && (
        <div className="border-t border-black/10 p-5 sm:p-7">
          {formError && (
            <p className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{formError}</p>
          )}
          <FieldGrid fields={def.fields} value={value} onChange={setValue} folder={folder} errors={errors} />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={buttonClass.ghost}
                disabled={!dirty || saving}
                onClick={() => {
                  setValue(JSON.parse(saved));
                  setErrors({});
                  setFormError("");
                }}
              >
                <X className="h-4 w-4" /> Huỷ thay đổi
              </button>
              <button
                type="button"
                className={buttonClass.ghost}
                onClick={() => {
                  if (!window.confirm("Điền lại nội dung gốc của website cho khối này? Bạn vẫn cần bấm Lưu để áp dụng.")) return;
                  setValue(normalizeContent(def.fields, {}, def.defaults));
                }}
              >
                <RotateCcw className="h-4 w-4" /> Nội dung gốc
              </button>
            </div>
            <button type="button" className={buttonClass.primary} disabled={!dirty || saving} onClick={() => void save()}>
              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Đang lưu..." : "Lưu & cập nhật website"}
            </button>
          </div>
        </div>
      )}

      {historyOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" role="dialog" aria-modal="true">
          <div className="max-h-[80vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f52334]">Lịch sử</p>
                <h3 className="mt-1 font-display text-2xl">{def.title}</h3>
              </div>
              <button type="button" className={buttonClass.icon} onClick={() => setHistoryOpen(false)} aria-label="Đóng">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {historyLoading && (
                <p className="flex items-center gap-2 p-4 text-sm text-black/50">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Đang tải...
                </p>
              )}
              {history && history.length === 0 && (
                <p className="p-4 text-sm text-black/50">Chưa có phiên bản nào được lưu. Nội dung hiện tại là nội dung gốc.</p>
              )}
              {history?.map((revision, index) => (
                <div key={revision.id} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 hover:bg-[#f7f4f1]">
                  <div className="min-w-0 text-sm">
                    <strong className="block">
                      {formatDateTime(revision.createdAt)}
                      {index === 0 && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800">Đang dùng</span>}
                    </strong>
                    <span className="block truncate text-xs text-black/45">{revision.createdByEmail ?? "Không rõ người sửa"}</span>
                  </div>
                  <button
                    type="button"
                    className={buttonClass.ghost}
                    onClick={() => {
                      setValue(normalizeContent(def.fields, revision.content, def.defaults));
                      setHistoryOpen(false);
                      setOpen(true);
                      toast.message("Đã điền lại phiên bản cũ. Bấm “Lưu & cập nhật” để áp dụng lên website.");
                    }}
                  >
                    Dùng bản này
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
