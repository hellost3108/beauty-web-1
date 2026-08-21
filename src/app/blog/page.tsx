import type { Metadata } from "next";
import Blog from "@/views/Blog";

export const metadata: Metadata = {
  metadataBase: new URL("https://melalogy.com"),
  title: "Melalogy Journal | Góc nhìn làm đẹp dành cho người Việt",
  description:
    "Kiến thức chăm sóc da, trang điểm và câu chuyện thương hiệu được tuyển chọn bởi đội ngũ Melalogy.",
  openGraph: {
    title: "Melalogy Journal | Đọc chậm. Đẹp lâu.",
    description:
      "Kiến thức chăm sóc da và những góc nhìn làm đẹp có chiều sâu dành cho người Việt.",
    images: ["/assets/melalogy-blog-hero-2026.png"],
  },
};

export default function Page() {
  return <Blog />;
}
