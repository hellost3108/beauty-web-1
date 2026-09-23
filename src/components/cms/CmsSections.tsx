import type { ReactNode } from "react";
import { getSectionRows } from "@/lib/cms/server";
import { SectionsProvider } from "./SectionsProvider";

/** Server wrapper: loads the stored blocks of the given modules for a page. */
export default async function CmsSections({ modules, children }: { modules: string[]; children: ReactNode }) {
  const rows = await getSectionRows(modules);
  return <SectionsProvider value={rows}>{children}</SectionsProvider>;
}
