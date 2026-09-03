import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa hàng Energy Shot",
  description:
    "Khám phá các công thức mặt nạ hydrogel Melalogy Energy Shot theo tín hiệu và nhu cầu hiện tại của làn da.",
  alternates: { canonical: "/shop" },
};

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
