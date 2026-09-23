"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { resolveSection, type SectionContent, type SectionKey } from "@/lib/cms/registry";

type SectionRows = Record<string, unknown>;

const SectionsContext = createContext<SectionRows>({});

/**
 * Makes stored CMS content available to client components. Providers can be
 * nested: the root layout provides the global blocks, each page adds its own.
 */
export function SectionsProvider({ value, children }: { value: SectionRows; children: ReactNode }) {
  const parent = useContext(SectionsContext);
  const merged = useMemo(() => ({ ...parent, ...value }), [parent, value]);
  return <SectionsContext.Provider value={merged}>{children}</SectionsContext.Provider>;
}

/** Content of one block, with the built-in default copy filling any gap. */
export function useSection<K extends SectionKey>(key: K): SectionContent<K> {
  const rows = useContext(SectionsContext);
  const raw = rows[key];
  return useMemo(() => resolveSection(key, raw), [key, raw]);
}
