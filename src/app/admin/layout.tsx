import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị nội dung",
  description: "Không gian quản trị nội dung cục bộ dành cho Melalogy.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
