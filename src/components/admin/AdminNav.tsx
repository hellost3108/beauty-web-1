"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  FlaskConical,
  FolderTree,
  House,
  Info,
  LayoutDashboard,
  LayoutTemplate,
  Menu,
  Newspaper,
  NotebookPen,
  Package,
  ShoppingBag,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { CmsModuleKey } from "@/lib/cms/modules";

type NavItem = { href: string; label: string; icon: LucideIcon; module?: CmsModuleKey; superOnly?: boolean; exact?: boolean };

const groups: Array<{ label: string; items: NavItem[] }> = [
  { label: "", items: [{ href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true }] },
  {
    label: "Nội dung website",
    items: [
      { href: "/admin/content/home", label: "Trang chủ", icon: House, module: "home" },
      { href: "/admin/content/science", label: "Melanin Science", icon: FlaskConical, module: "science" },
      { href: "/admin/content/shop", label: "Trang Shop", icon: ShoppingBag, module: "shop" },
      { href: "/admin/content/journal", label: "Trang Blog & Tạp chí", icon: NotebookPen, module: "journal" },
      { href: "/admin/content/info", label: "Trang thông tin", icon: Info, module: "info" },
      { href: "/admin/content/global", label: "Header, footer & chung", icon: LayoutTemplate, module: "global" },
    ],
  },
  {
    label: "Cửa hàng",
    items: [
      { href: "/admin/products", label: "Sản phẩm", icon: Package, module: "products" },
      { href: "/admin/categories", label: "Danh mục", icon: FolderTree, module: "products" },
    ],
  },
  {
    label: "Bài viết",
    items: [
      { href: "/admin/blog", label: "Blog", icon: BookOpenText, module: "blog" },
      { href: "/admin/magazine", label: "Tạp chí", icon: Newspaper, module: "magazine" },
    ],
  },
  {
    label: "Hệ thống",
    items: [
      { href: "/admin/users", label: "Tài khoản & phân quyền", icon: Users, superOnly: true },
      { href: "/admin/account", label: "Tài khoản của tôi", icon: UserCog },
    ],
  },
];

export default function AdminNav({
  role,
  permissions,
  variant = "sidebar",
}: {
  role: string;
  permissions: CmsModuleKey[];
  variant?: "sidebar" | "mobile";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const fullAccess = role === "admin" || role === "super_admin";

  useEffect(() => setOpen(false), [pathname]);

  const visible = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.superOnly) return role === "super_admin";
        if (!item.module) return true;
        return fullAccess || permissions.includes(item.module);
      }),
    }))
    .filter((group) => group.items.length > 0);

  const list = (
    <nav className="space-y-5" aria-label="Điều hướng quản trị">
      {visible.map((group) => (
        <div key={group.label || "root"}>
          {group.label && (
            <p className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">{group.label}</p>
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active ? "bg-[#f52334] text-white shadow-lg shadow-red-950/20" : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  if (variant === "sidebar") return list;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white lg:hidden"
        aria-label="Mở menu quản trị"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-label="Đóng menu" />
          <div className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] overflow-y-auto bg-[#191716] p-4 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between px-2">
              <span className="font-display text-xl">Melalogy Admin</span>
              <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10" aria-label="Đóng menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  );
}
