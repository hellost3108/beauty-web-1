import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description: "Giải đáp nhanh các câu hỏi về sản phẩm, đơn hàng và cách sử dụng Melalogy Energy Shot.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
