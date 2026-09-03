import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản dịch vụ",
  description: "Điều khoản sử dụng website và dịch vụ của Melalogy.",
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
