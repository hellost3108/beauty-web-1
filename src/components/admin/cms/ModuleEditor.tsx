"use client";

import { useCallback, useEffect, useState } from "react";
import SectionEditor, { type SectionEditorProps } from "./SectionEditor";

type Item = Omit<SectionEditorProps, "onDirtyChange" | "defaultOpen"> & { title: string };

/** All blocks of one Admin module, with a jump list and an unsaved-changes guard. */
export default function ModuleEditor({ sections }: { sections: Item[] }) {
  const [dirtyKeys, setDirtyKeys] = useState<string[]>([]);

  const onDirtyChange = useCallback((key: string, dirty: boolean) => {
    setDirtyKeys((current) => {
      const has = current.includes(key);
      if (dirty && !has) return [...current, key];
      if (!dirty && has) return current.filter((item) => item !== key);
      return current;
    });
  }, []);

  useEffect(() => {
    if (dirtyKeys.length === 0) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirtyKeys.length]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="space-y-4">
        {sections.map((section, index) => (
          <SectionEditor key={section.sectionKey} {...section} defaultOpen={sections.length === 1 || index === 0} onDirtyChange={onDirtyChange} />
        ))}
      </div>

      <aside className="hidden xl:block">
        <nav className="sticky top-24 rounded-3xl border border-black/10 bg-white p-4 text-sm shadow-sm" aria-label="Các khối trong trang">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">Các khối</p>
          {sections.map((section) => (
            <a
              key={section.sectionKey}
              href={`#${section.sectionKey}`}
              className="flex items-center justify-between gap-2 rounded-xl px-2 py-2 text-black/65 transition hover:bg-[#f7f4f1] hover:text-black"
            >
              <span className="truncate">{section.title}</span>
              {dirtyKeys.includes(section.sectionKey) && <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" title="Chưa lưu" />}
            </a>
          ))}
          {dirtyKeys.length > 0 && (
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
              {dirtyKeys.length} khối chưa lưu. Nhớ bấm “Lưu & cập nhật” ở từng khối.
            </p>
          )}
        </nav>
      </aside>
    </div>
  );
}
