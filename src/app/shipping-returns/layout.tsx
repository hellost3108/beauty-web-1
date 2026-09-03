import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vận chuyển và đổi trả",
  description: "Thông tin vận chuyển, giao nhận và chính sách đổi trả sản phẩm Melalogy.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
