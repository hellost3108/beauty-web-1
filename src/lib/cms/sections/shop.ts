import { area, defineSection, image, list, num, text } from "../define";

export const shopSeo = defineSection({
  key: "shop.seo",
  module: "shop",
  title: "SEO trang Shop",
  previewPath: "/shop",
  fields: [text("title", "Tiêu đề trang"), area("description", "Mô tả Google", { rows: 3 })],
  defaults: {
    title: "Cửa hàng Energy Shot",
    description:
      "Khám phá các công thức mặt nạ hydrogel Melalogy Energy Shot theo tín hiệu và nhu cầu hiện tại của làn da.",
  },
});

export const shopHero = defineSection({
  key: "shop.hero",
  module: "shop",
  title: "1 · Đầu trang Shop",
  description: "Ảnh 4 công thức bên phải tự lấy từ 4 sản phẩm đầu tiên.",
  previewPath: "/shop",
  fields: [
    text("storeLabel", "Nhãn góc trái", { width: "half" }),
    text("countLabel", "Nhãn đếm sản phẩm", { width: "half", help: "{count} sẽ được thay bằng số sản phẩm." }),
    text("eyebrow", "Dòng nhỏ phía trên"),
    text("title", "Tiêu đề", { width: "half" }),
    text("titleAccent", "Tiêu đề nhấn (đỏ)", { width: "half" }),
    area("description", "Mô tả", { rows: 3 }),
    text("ctaLabel", "Chữ trên nút"),
    list(
      "stats",
      "Chỉ số dưới tiêu đề",
      "chỉ số",
      [
        text("value", "Giá trị", { width: "half", help: "{count} = số sản phẩm" }),
        text("label", "Nhãn", { width: "half" }),
      ],
      { titleField: "label", max: 3 },
    ),
    text("mediaTopLeft", "Khung ảnh — nhãn trái", { width: "half" }),
    text("mediaTopRight", "Khung ảnh — nhãn phải", { width: "half" }),
    text("mediaBottom", "Khung ảnh — nhãn dưới"),
  ],
  defaults: {
    storeLabel: "Melalogy / Store",
    countLabel: "Energy Shot · {count}",
    eyebrow: "Chọn theo tín hiệu làn da",
    title: "Chọn đúng cơ chế.",
    titleAccent: "Chạm đúng nhu cầu da.",
    description:
      "Không chạy theo “trắng nhanh”. Mỗi Energy Shot bắt đầu từ một tín hiệu da, một cơ chế khoa học và một công thức hydrogel được kiểm soát.",
    ctaLabel: "Tìm Energy Shot của bạn",
    stats: [
      { value: "{count}", label: "Công thức" },
      { value: "2 giờ", label: "Giải phóng" },
      { value: "Kiểm soát", label: "Hệ dẫn truyền" },
    ],
    mediaTopLeft: "Melalogy Science / Controlled Delivery",
    mediaTopRight: "Active Reservoir · Controlled Release",
    mediaBottom: "The science of melanin",
  },
});

export const shopCatalog = defineSection({
  key: "shop.catalog",
  module: "shop",
  title: "2 · Ba trụ cột & danh sách sản phẩm",
  previewPath: "/shop#shop-products",
  fields: [
    list(
      "pillars",
      "Dải ba trụ cột",
      "trụ cột",
      [text("title", "Tiêu đề", { required: true, width: "half" }), text("description", "Mô tả", { width: "half" })],
      { titleField: "title", max: 3 },
    ),
    text("eyebrow", "Dòng nhỏ phía trên"),
    text("title", "Tiêu đề"),
    area("description", "Mô tả", { rows: 2 }),
    text("allLabel", "Tên bộ lọc tất cả", { width: "half" }),
    text("addToCartLabel", "Chữ nút thêm vào giỏ", { width: "half" }),
    text("detailLabel", "Chữ liên kết xem chi tiết", { width: "half" }),
    text("buyNowLabel", "Chữ nút mua ngay (xem nhanh)", { width: "half" }),
  ],
  defaults: {
    pillars: [
      { title: "Melanin Science", description: "Hiểu cơ chế sắc tố" },
      { title: "Antioxidant Defense", description: "Bảo vệ trước oxy hoá" },
      { title: "Barrier Stability", description: "Ổn định hàng rào da" },
    ],
    eyebrow: "Energy Shot Hydrogel / Catalog",
    title: "Mỗi làn da gửi một tín hiệu khác nhau.",
    description: "Bắt đầu từ trạng thái da hiện tại. Chọn công thức theo cơ chế, không theo lời hứa phóng đại.",
    allLabel: "Tất Cả",
    addToCartLabel: "Thêm vào giỏ",
    detailLabel: "Xem cơ chế",
    buyNowLabel: "Mua ngay",
  },
});

export const shopProductPage = defineSection({
  key: "shop.product",
  module: "shop",
  title: "3 · Trang chi tiết sản phẩm (chung)",
  description: "Nội dung dùng chung cho mọi trang /product/…. Tên, giá, mô tả riêng sửa trong mục Sản phẩm.",
  previewPath: "/product/1",
  fields: [
    text("badge", "Nhãn trên ảnh", { width: "half" }),
    num("rating", "Điểm đánh giá hiển thị", { min: 0, max: 5, step: 0.1, width: "half" }),
    text("addToCartLabel", "Nút thêm vào giỏ", { width: "half" }),
    text("buyNowLabel", "Nút mua ngay", { width: "half" }),
    text("wishlistLabel", "Nút yêu thích", { width: "half" }),
    text("wishlistActiveLabel", "Nút đã yêu thích", { width: "half" }),
    list(
      "trustBadges",
      "Biểu tượng cam kết",
      "biểu tượng",
      [image("icon", "Biểu tượng", { folder: "icons", width: "half" }), text("label", "Nhãn", { required: true, width: "half" })],
      { titleField: "label", max: 6 },
    ),
    text("descriptionTitle", "Tiêu đề mục mô tả", { width: "half" }),
    text("ingredientsTitle", "Tiêu đề mục thành phần", { width: "half" }),
    text("usageTitle", "Tiêu đề mục cách dùng", { width: "half" }),
    text("shippingTitle", "Tiêu đề mục vận chuyển", { width: "half" }),
    area("shippingText", "Nội dung vận chuyển & đổi trả", { rows: 3 }),
    text("relatedTitle", "Sản phẩm khác — tiêu đề", { width: "half" }),
    text("relatedAccent", "Sản phẩm khác — tiêu đề nhấn", { width: "half" }),
  ],
  defaults: {
    badge: "Bán Chạy Nhất",
    rating: 4.2,
    addToCartLabel: "Thêm Vào Giỏ",
    buyNowLabel: "Mua Ngay",
    wishlistLabel: "Thêm Vào Yêu Thích",
    wishlistActiveLabel: "Đã Yêu Thích",
    trustBadges: [
      { icon: "/assets/icon1.png", label: "Thành Phần Tự Nhiên" },
      { icon: "/assets/icon2.png", label: "Có Thể Tái Chế" },
      { icon: "/assets/icon3.png", label: "Không Thử Nghiệm Trên Động Vật" },
      { icon: "/assets/icon4.png", label: "Đã Kiểm Nghiệm Da Liễu" },
    ],
    descriptionTitle: "Mô Tả Sản Phẩm",
    ingredientsTitle: "Thành Phần Chính",
    usageTitle: "Cách Sử Dụng",
    shippingTitle: "Vận Chuyển & Đổi Trả",
    shippingText:
      "Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm chưa sử dụng và còn nguyên bao bì.",
    relatedTitle: "Khám Phá",
    relatedAccent: "Các Sản Phẩm Khác",
  },
});

export const shopReviews = defineSection({
  key: "shop.reviews",
  module: "shop",
  title: "4 · Đánh giá khách hàng (Shop & trang sản phẩm)",
  previewPath: "/shop",
  fields: [
    text("title", "Tiêu đề", { width: "half" }),
    text("titleAccent", "Tiêu đề nhấn", { width: "half" }),
    list(
      "reviews",
      "Đánh giá",
      "đánh giá",
      [
        text("author", "Tên khách hàng", { required: true, width: "half" }),
        text("role", "Nơi ở / mô tả", { width: "half" }),
        area("text", "Nội dung", { required: true, rows: 3 }),
        text("initials", "Chữ viết tắt (avatar)", { width: "half" }),
        text("tone", "Màu nền avatar", { width: "half", placeholder: "#f7d9d9" }),
      ],
      { titleField: "author", max: 9 },
    ),
  ],
  defaults: {
    title: "Đánh giá",
    titleAccent: "khách hàng",
    reviews: [
      {
        author: "Gia Hân",
        role: "Khách hàng tại TP. Hồ Chí Minh",
        text: "Mặt nạ mát, ôm da tốt và không bị trượt. Mình thích cảm giác mềm ẩm sau khi tháo mặt nạ.",
        initials: "GH",
        tone: "#f7d9d9",
      },
      {
        author: "Thanh Trúc",
        role: "Khách hàng tại Cần Thơ",
        text: "Mỗi màu ứng với một nhu cầu nên rất dễ chọn. Chu trình chăm da của mình gọn hơn mà vẫn có khoảng thư giãn riêng.",
        initials: "TT",
        tone: "#e8e1f3",
      },
      {
        author: "Khánh Linh",
        role: "Khách hàng tại Hà Nội",
        text: "Thiết kế đẹp nhưng không cầu kỳ, hướng dẫn cũng rõ ràng. Loại cấp ẩm hợp với mình trong những ngày ngồi điều hòa nhiều.",
        initials: "KL",
        tone: "#dfeee8",
      },
    ],
  },
});
