import { area, bool, defineSection, heading, image, linkPair, list, text } from "../define";

const cardFields = [text("title", "Tiêu đề", { required: true }), area("copy", "Nội dung", { rows: 2 })];

export const scienceSeo = defineSection({
  key: "science.seo",
  module: "science",
  title: "SEO trang Melanin Science",
  previewPath: "/melanin-science",
  fields: [text("title", "Tiêu đề trang (tab trình duyệt / Google)"), area("description", "Mô tả Google", { rows: 3 })],
  defaults: {
    title: "Melanin Science",
    description:
      "Melanin + Dermalogy: nền tảng khoa học, sứ mệnh, tầm nhìn và công nghệ dẫn truyền đúng đích phía sau Melalogy.",
  },
});

export const scienceHero = defineSection({
  key: "science.hero",
  module: "science",
  title: "1 · Đầu trang",
  previewPath: "/melanin-science",
  fields: [
    text("indexLeft", "Nhãn góc trái", { width: "half" }),
    text("indexRight", "Nhãn góc phải", { width: "half" }),
    text("eyebrow", "Dòng nhỏ phía trên"),
    text("title", "Tiêu đề"),
    text("titleAccent", "Tiêu đề nhấn"),
    area("description", "Mô tả", { rows: 3 }),
    ...linkPair("primary", "Nút chính"),
    ...linkPair("secondary", "Nút phụ"),
    text("footerWords", "Các từ khoá cuối khối (phân cách bằng dấu phẩy)"),
  ],
  defaults: {
    indexLeft: "Melalogy Lab / 2026",
    indexRight: "01 — 07",
    eyebrow: "The science of melanin",
    title: "Khoa học bắt đầu từ việc",
    titleAccent: "hiểu sắc tố.",
    description:
      "Từ câu hỏi về melanin đến những giải pháp có cơ chế rõ ràng: đây là nền tảng khoa học, sứ mệnh và tầm nhìn định hình Melalogy.",
    primaryLabel: "Bắt đầu khám phá",
    primaryHref: "#science-foundation",
    secondaryLabel: "Xem công thức",
    secondaryHref: "/shop",
    footerWords: "Melanin, Dermalogy, Mechanism-led skincare",
  },
});

export const scienceFoundation = defineSection({
  key: "science.foundation",
  module: "science",
  title: "2 · Melalogy là gì · Câu chuyện · Niềm tin",
  previewPath: "/melanin-science",
  fields: [
    text("equationEyebrow", "Melalogy là gì — eyebrow", { width: "half" }),
    text("equationTitle", "Melalogy là gì — tiêu đề", { width: "half" }),
    text("equationAccent", "Melalogy là gì — tiêu đề nhấn"),
    area("equationBody", "Melalogy là gì — nội dung", { rows: 4 }),
    text("venn1Title", "Vòng tròn 1 — tên", { width: "half" }),
    text("venn1Copy", "Vòng tròn 1 — mô tả", { width: "half" }),
    text("venn2Title", "Vòng tròn 2 — tên", { width: "half" }),
    text("venn2Copy", "Vòng tròn 2 — mô tả", { width: "half" }),
    text("storyEyebrow", "Câu chuyện — eyebrow"),
    text("storyTitle", "Câu chuyện — tiêu đề"),
    text("storyAccent", "Câu chuyện — tiêu đề nhấn"),
    area("storyBody", "Câu chuyện — nội dung", { rows: 3 }),
    text("storyStat", "Câu chuyện — câu nhấn mạnh"),
    text("storyStatNote", "Câu chuyện — chú thích"),
    ...heading().map((field) => ({ ...field, name: `belief${field.name[0].toUpperCase()}${field.name.slice(1)}`, label: `Niềm tin — ${field.label}` })),
    list("beliefs", "Niềm tin — 3 thẻ cơ chế", "thẻ", cardFields, { titleField: "title", max: 3 }),
  ],
  defaults: {
    equationEyebrow: "Melalogy là gì?",
    equationTitle: "Melalogy =",
    equationAccent: "Melanin + Dermalogy",
    equationBody:
      "Melalogy là thương hiệu skincare khoa học chuyên biệt về sắc tố, được xây dựng từ sự thấu hiểu melanin và khoa học về làn da. Chúng tôi không tin vào phép màu — chúng tôi tin vào cơ chế.",
    venn1Title: "Melanin",
    venn1Copy: "Sắc tố tự nhiên của làn da",
    venn2Title: "Dermalogy",
    venn2Copy: "Khoa học về làn da",
    storyEyebrow: "Câu chuyện hình thành",
    storyTitle: "Melalogy không bắt đầu từ một sản phẩm.",
    storyAccent: "Nó bắt đầu từ một câu hỏi.",
    storyBody:
      "Vì sao làn da trở nên xỉn màu, không đều màu và dễ tái sạm? Bắt đầu từ hơn 5 năm nghiên cứu về melanin và hành trình hình thành sắc tố trong làn da.",
    storyStat: "Muốn thay đổi sắc tố, trước hết phải hiểu cơ chế của nó.",
    storyStatNote: "Mechanism → Benefit",
    beliefEyebrow: "Tone of voice",
    beliefTitle: "Chúng tôi không tin vào “trắng nhanh”.",
    beliefTitleAccent: "Chúng tôi tin vào cơ chế.",
    beliefs: [
      {
        title: "Hiểu sắc tố",
        copy: "Hiểu cơ chế hình thành melanin trước khi thiết kế công thức, thay vì chạy theo hiệu ứng tức thời.",
      },
      {
        title: "Ổn định nền da",
        copy: "Củng cố hàng rào bảo vệ và chống oxy hóa để làn da giữ được kết quả một cách bền vững.",
      },
      {
        title: "Can thiệp có kiểm soát",
        copy: "Tác động đúng mục tiêu, đúng liều lượng — không lạm dụng hoạt chất để đổi lấy tốc độ.",
      },
    ],
  },
});

export const scienceMission = defineSection({
  key: "science.mission",
  module: "science",
  title: "3 · Sứ mệnh · Tầm nhìn · Ba trụ cột",
  previewPath: "/melanin-science",
  fields: [
    text("missionEyebrow", "Sứ mệnh — eyebrow"),
    text("missionTitle", "Sứ mệnh — tiêu đề"),
    text("missionAccent", "Sứ mệnh — tiêu đề nhấn"),
    area("missionBody", "Sứ mệnh — nội dung", { rows: 3 }),
    text("visionEyebrow", "Tầm nhìn — eyebrow"),
    text("visionTitle", "Tầm nhìn — tiêu đề"),
    text("visionAccent", "Tầm nhìn — tiêu đề nhấn"),
    list(
      "milestones",
      "Tầm nhìn — các mốc",
      "mốc",
      [
        text("year", "Năm", { required: true, width: "half" }),
        text("title", "Tên mốc", { width: "half" }),
        text("copy", "Mô tả"),
        bool("current", "Đánh dấu là mốc hiện tại"),
      ],
      { titleField: "year", max: 8 },
    ),
    text("pillarsEyebrow", "Ba trụ cột — eyebrow"),
    text("pillarsTitle", "Ba trụ cột — tiêu đề"),
    text("pillarsAccent", "Ba trụ cột — tiêu đề nhấn"),
    list("pillars", "Ba trụ cột — thẻ", "trụ cột", cardFields, { titleField: "title", max: 3 }),
  ],
  defaults: {
    missionEyebrow: "Mission",
    missionTitle: "Phát triển các giải pháp sắc tố",
    missionAccent: "dựa trên cơ chế khoa học.",
    missionBody:
      "Kết hợp tác động melanin có kiểm soát, bảo vệ da trước oxy hóa và củng cố hàng rào da để dẫn hướng đến kết quả sáng khỏe có khả năng duy trì.",
    visionEyebrow: "Vision",
    visionTitle: "Từ khoa học sắc tố Việt Nam",
    visionAccent: "đến thương hiệu chuyên biệt toàn cầu.",
    milestones: [
      { year: "2026", title: "Launch", copy: "Khởi đầu hành trình khoa học sắc tố.", current: true },
      { year: "2027", title: "Top of mind", copy: "Thương hiệu chuyên biệt về sắc tố tại Việt Nam.", current: false },
      { year: "2028", title: "International", copy: "Mở rộng ra thị trường quốc tế.", current: false },
      { year: "2030", title: "Global brand", copy: "Global pigmentation science skincare brand.", current: false },
    ],
    pillarsEyebrow: "Melalogy science",
    pillarsTitle: "Ba trụ cột",
    pillarsAccent: "của một nền da ổn định.",
    pillars: [
      {
        title: "Melanin science",
        copy: "Hiểu và tác động vào quá trình hình thành melanin một cách khoa học và chọn lọc.",
      },
      {
        title: "Antioxidant defense",
        copy: "Bảo vệ da trước oxy hóa — yếu tố kích hoạt và làm trầm trọng rối loạn sắc tố.",
      },
      {
        title: "Barrier stability",
        copy: "Củng cố và duy trì hàng rào khỏe mạnh để giữ nền da ổn định và bền vững.",
      },
    ],
  },
});

export const scienceDelivery = defineSection({
  key: "science.delivery",
  module: "science",
  title: "4 · Targeted delivery · Kết trang",
  previewPath: "/melanin-science",
  fields: [
    ...heading(),
    text("stat", "Câu nhấn mạnh", { width: "half" }),
    text("statNote", "Chú thích", { width: "half" }),
    image("image", "Ảnh", { folder: "science", width: "half" }),
    text("imageAlt", "Mô tả ảnh", { width: "half" }),
    text("bandTitle", "Dải sáng — tiêu đề"),
    text("bandAccent", "Dải sáng — tiêu đề nhấn"),
    text("bandWords", "Dải sáng — các từ khoá (phân cách bằng dấu phẩy)"),
    text("endEyebrow", "Kết trang — eyebrow"),
    text("endTitle", "Kết trang — tiêu đề"),
    text("endAccent", "Kết trang — tiêu đề nhấn"),
    ...linkPair("endCta", "Kết trang — nút"),
  ],
  defaults: {
    eyebrow: "Targeted delivery",
    title: "Đúng hoạt chất chưa đủ.",
    titleAccent: "Hoạt chất cần được đưa đến đúng vùng cần tác động.",
    stat: "X50® Pure White",
    statNote: "Targeted delivery technology",
    image: "/assets/brand-banner-x50.png",
    imageAlt: "Melalogy X50 Pure White — Barrier Fortify Cream và Pigment Correct Serum",
    bandTitle: "Không chỉ sáng hơn.",
    bandAccent: "Ổn định hơn để duy trì vẻ sáng đó.",
    bandWords: "Controlled, Stable, Sustainable",
    endEyebrow: "From mechanism to formula",
    endTitle: "Khoa học chỉ có ý nghĩa",
    endAccent: "khi trở thành trải nghiệm thật trên làn da.",
    endCtaLabel: "Khám phá Energy Shot",
    endCtaHref: "/shop#shop-products",
  },
});
