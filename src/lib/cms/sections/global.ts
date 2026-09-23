import { area, defineSection, image, link, list, text } from "../define";

export const globalSeo = defineSection({
  key: "global.seo",
  module: "global",
  title: "SEO mặc định",
  description: "Tiêu đề và mô tả mặc định khi chia sẻ website lên Google, Facebook, Zalo.",
  previewPath: "/",
  fields: [
    text("siteTitle", "Tiêu đề website", { required: true }),
    area("description", "Mô tả website (Google)", { rows: 3 }),
    area("shareDescription", "Mô tả khi chia sẻ mạng xã hội", { rows: 3 }),
    image("shareImage", "Ảnh chia sẻ mạng xã hội (1200×630)", { folder: "seo" }),
  ],
  defaults: {
    siteTitle: "Melalogy | The Science of Melanin",
    description:
      "Melalogy là thương hiệu skincare khoa học chuyên biệt về sắc tố — được xây dựng từ sự thấu hiểu melanin và khoa học về làn da.",
    shareDescription: "Khoa học sắc tố và các giải pháp chăm sóc làn da được phát triển dựa trên cơ chế.",
    shareImage: "",
  },
});

export const globalBrand = defineSection({
  key: "global.brand",
  module: "global",
  title: "Logo & thương hiệu",
  description: "Logo trên thanh menu và footer, câu tagline, dòng bản quyền.",
  previewPath: "/",
  fields: [
    image("logo", "Logo (nền tối, chữ trắng)", { required: true, folder: "brand" }),
    area("navTagline", "Tagline cạnh logo trên menu", { rows: 2, help: "Xuống dòng để tách dòng." }),
    text("footerTagline", "Tagline ở footer"),
    text("copyright", "Dòng bản quyền"),
  ],
  defaults: {
    logo: "/assets/logo.png",
    navTagline: "The science\nof melanin",
    footerTagline: "The Science of Melanin.",
    copyright: "© 2026 Melalogy. Đã đăng ký bản quyền.",
  },
});

const linkFields = [
  text("label", "Tên hiển thị", { required: true, width: "half" }),
  link("href", "Đường dẫn", { required: true, width: "half", placeholder: "/shop" }),
];

export const globalNavigation = defineSection({
  key: "global.navigation",
  module: "global",
  title: "Menu & liên kết footer",
  description: "Các mục trên thanh menu, menu điện thoại và các liên kết ở footer.",
  previewPath: "/",
  fields: [
    list("mainLinks", "Menu chính", "liên kết", linkFields, { titleField: "label", max: 8 }),
    list("drawerExtraLinks", "Liên kết thêm trong menu điện thoại", "liên kết", linkFields, { titleField: "label", max: 6 }),
    text("searchPlaceholder", "Gợi ý trong ô tìm kiếm"),
    list("footerLinks", "Liên kết chính ở footer", "liên kết", linkFields, { titleField: "label", max: 8 }),
    list("legalLinks", "Liên kết pháp lý ở footer", "liên kết", linkFields, { titleField: "label", max: 8 }),
  ],
  defaults: {
    mainLinks: [
      { label: "Melanin Science", href: "/melanin-science" },
      { label: "Journal", href: "/blog" },
      { label: "Shop", href: "/shop" },
    ],
    drawerExtraLinks: [{ label: "Liên hệ", href: "/contact" }],
    searchPlaceholder: "Tìm công thức, hoạt chất hoặc trạng thái da…",
    footerLinks: [
      { label: "Melanin Science", href: "/melanin-science" },
      { label: "Journal", href: "/blog" },
      { label: "Shop", href: "/shop" },
    ],
    legalLinks: [
      { label: "Chính sách bảo mật", href: "/privacy" },
      { label: "Điều khoản dịch vụ", href: "/terms" },
      { label: "Vận chuyển & đổi trả", href: "/shipping-returns" },
      { label: "Liên hệ", href: "/contact" },
    ],
  },
});

export const globalContact = defineSection({
  key: "global.contact",
  module: "global",
  title: "Thông tin liên hệ & mạng xã hội",
  description: "Dùng chung cho trang chủ, footer, trang Liên hệ và các trang thông tin.",
  previewPath: "/contact",
  fields: [
    text("email", "Email", { required: true, width: "half" }),
    text("phoneDisplay", "Hotline (hiển thị)", { required: true, width: "half", placeholder: "0702 899 707" }),
    link("phoneHref", "Hotline (liên kết gọi)", { width: "half", placeholder: "tel:+84702899707" }),
    text("hours", "Giờ làm việc", { width: "half" }),
    area("address", "Địa chỉ đầy đủ", { rows: 2, help: "Xuống dòng để tách dòng trên trang chủ." }),
    text("addressShort", "Địa chỉ rút gọn (footer)"),
    link("instagram", "Instagram", { width: "half" }),
    link("facebook", "Facebook", { width: "half" }),
    link("tiktok", "TikTok", { width: "half" }),
    link("zalo", "Zalo", { width: "half" }),
  ],
  defaults: {
    email: "melalogyvietnam@gmail.com",
    phoneDisplay: "0702 899 707",
    phoneHref: "tel:+84702899707",
    hours: "09:00 – 22:00 mỗi ngày",
    address: "29D Cộng Hòa 3, Phường Phú Thọ Hòa,\nThành phố Hồ Chí Minh",
    addressShort: "29D Cộng Hòa 3, P. Phú Thọ Hòa, TP. Hồ Chí Minh",
    instagram: "https://www.instagram.com/melalogyvietnam/",
    facebook: "https://www.facebook.com/melalogyvietnam/",
    tiktok: "https://www.tiktok.com/@melalogy.vietnam",
    zalo: "https://zalo.me/0702899707",
  },
});

export const globalBank = defineSection({
  key: "global.bank",
  module: "global",
  title: "Tài khoản nhận chuyển khoản",
  description: "Hiển thị ở bước thanh toán và trang đặt hàng thành công.",
  previewPath: "/checkout",
  fields: [
    text("bankName", "Ngân hàng", { required: true, width: "half" }),
    text("accountNumber", "Số tài khoản", { required: true, width: "half" }),
    text("accountName", "Chủ tài khoản", { required: true, width: "half" }),
    text("branch", "Chi nhánh", { width: "half" }),
    area("note", "Ghi chú chuyển khoản", { rows: 3 }),
  ],
  defaults: {
    bankName: "Vietcombank",
    accountName: "CONG TY TNHH MELALOGY",
    accountNumber: "04600508888",
    branch: "Chi nhánh TP.HCM",
    note: "Vui lòng chuyển khoản đúng số tiền và ghi mã đơn hàng vào nội dung chuyển khoản để được xử lý nhanh nhất.",
  },
});

export const globalNewsletter = defineSection({
  key: "global.newsletter",
  module: "global",
  title: "Khối đăng ký bản tin & cam kết",
  description: "Hiển thị cuối trang Blog/Tạp chí: form đăng ký email và 4 cam kết dịch vụ.",
  previewPath: "/blog",
  fields: [
    text("eyebrow", "Dòng nhỏ phía trên", { width: "half" }),
    text("title", "Tiêu đề", { width: "half" }),
    text("titleAccent", "Tiêu đề nhấn"),
    area("description", "Mô tả", { rows: 2 }),
    text("placeholder", "Gợi ý ô email", { width: "half" }),
    text("buttonLabel", "Chữ trên nút", { width: "half" }),
    text("consent", "Dòng cam kết dưới form"),
    text("successMessage", "Thông báo khi đăng ký thành công"),
    list(
      "benefits",
      "Cam kết dịch vụ (4 ô)",
      "cam kết",
      [text("title", "Tiêu đề", { required: true, width: "half" }), text("detail", "Chi tiết", { width: "half" })],
      { titleField: "title", max: 4 },
    ),
  ],
  defaults: {
    eyebrow: "Melalogy Notes",
    title: "Một lá thư đẹp,",
    titleAccent: "vừa đủ mỗi tháng.",
    description: "Công thức mới, cách đọc tín hiệu làn da và ưu đãi dành riêng cho cộng đồng Melalogy.",
    placeholder: "Email của bạn",
    buttonLabel: "Đăng ký",
    consent: "Không làm phiền. Bạn có thể huỷ đăng ký bất cứ lúc nào.",
    successMessage: "Đăng ký bản tin thành công!",
    benefits: [
      { title: "Giao hàng toàn quốc", detail: "Miễn phí cho đơn từ 500.000₫" },
      { title: "Đổi trả rõ ràng", detail: "Hỗ trợ trong vòng 30 ngày" },
      { title: "Tư vấn chăm sóc da", detail: "09:00–22:00 mỗi ngày" },
      { title: "Thanh toán bảo mật", detail: "Thông tin giao dịch được bảo vệ" },
    ],
  },
});
