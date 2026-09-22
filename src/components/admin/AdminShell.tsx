import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "@/app/admin/_actions/auth";
import type { AdminProfile } from "@/types/cms";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminShell({
  profile,
  children,
}: {
  profile: AdminProfile;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#191716]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#191716] p-5 text-white lg:flex">
        <Link href="/admin" className="mb-8 block border-b border-white/10 px-3 pb-6">
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#ff5a66]">Melalogy</span>
          <span className="mt-2 block font-display text-2xl">Admin Studio</span>
        </Link>
        <AdminNav />
        <div className="mt-auto space-y-3 border-t border-white/10 pt-5">
          <div className="px-3 text-xs leading-5 text-white/55">
            <strong className="block truncate text-white">{profile.fullName || profile.email}</strong>
            <span className="uppercase tracking-wider">{profile.role.replace("_", " ")}</span>
          </div>
          <form action={signOut}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-black/10 bg-[#f5f2ee]/90 px-4 backdrop-blur-xl sm:px-8">
          <div className="lg:hidden">
            <span className="font-display text-xl">Melalogy Admin</span>
          </div>
          <div className="hidden flex-1 lg:block" />
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold transition hover:border-[#f52334] hover:text-[#f52334]"
          >
            Xem website <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </header>

        <div className="border-b border-black/10 bg-[#191716] p-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            <AdminNav compact />
          </div>
        </div>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
