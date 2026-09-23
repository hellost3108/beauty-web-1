import type { CmsModuleKey } from "@/lib/cms/modules";

export type PublicationStatus = "draft" | "published" | "archived";
export type AdminRole = "editor" | "admin" | "super_admin";
export type UserRole = "customer" | AdminRole;

export type AdminProfile = {
  id: string;
  email: string;
  fullName: string | null;
  role: AdminRole;
  /** Modules an editor may change. Admins and super admins can edit all. */
  permissions: CmsModuleKey[];
};

/** Result shape returned by every Admin server action. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T; message?: string }
  | { ok: false; error: string; issues?: Array<{ path: string; message: string }> };
