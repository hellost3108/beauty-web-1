import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm",
  description: "Thông tin công thức, thành phần và hướng dẫn sử dụng sản phẩm Melalogy.",
  robots: { index: true, follow: true },
};

export default function ProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
