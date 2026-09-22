"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, FileImage, FolderTree, House, Info, LayoutDashboard, Newspaper, Package } from "lucide-react";

const links = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/categories", label: "Danh mục", icon: FolderTree },
  { href: "/admin/banners", label: "Banner", icon: FileImage },
  { href: "/admin/homepage", label: "Trang chủ", icon: House },
  { href: "/admin/blog", label: "Blog", icon: BookOpenText },
  { href: "/admin/magazine", label: "Tạp chí", icon: Newspaper },
  { href: "/admin/about", label: "Giới thiệu", icon: Info },
];

export default function AdminNav({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={compact ? "flex gap-2" : "space-y-1"} aria-label="Điều hướng quản trị">
      {links.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active
                ? "bg-[#f52334] text-white shadow-lg shadow-red-950/20"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
