import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "@/app/admin/_actions/auth";
import { roleLabels } from "@/lib/cms/modules";
import type { AdminProfile } from "@/types/cms";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminShell({ profile, children }: { profile: AdminProfile; children: React.ReactNode }) {
  const displayName = profile.fullName || profile.email;

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#191716]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-[#191716] text-white lg:flex">
        <Link href="/admin" className="block border-b border-white/10 px-7 pb-6 pt-7">
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#ff5a66]">Melalogy</span>
          <span className="mt-2 block font-display text-2xl">Admin Studio</span>
        </Link>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <AdminNav role={profile.role} permissions={profile.permissions} />
        </div>
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link href="/admin/account" className="block rounded-xl px-4 py-2 text-xs leading-5 text-white/55 hover:bg-white/5">
            <strong className="block truncate text-sm text-white">{displayName}</strong>
            <span className="uppercase tracking-wider">{roleLabels[profile.role]}</span>
          </Link>
          <form action={signOut}>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-black/10 bg-[#f5f2ee]/90 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <AdminNav role={profile.role} permissions={profile.permissions} variant="mobile" />
            <span className="font-display text-xl">Melalogy Admin</span>
          </div>
          <div className="hidden text-sm text-black/45 lg:block">
            Xin chào, <strong className="text-black/75">{displayName}</strong>
          </div>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold transition hover:border-[#f52334] hover:text-[#f52334]"
          >
            Xem website <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
