export type AboutListItem = {
  title: string;
  body: string;
};

export type AboutPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlightedText: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    imageCaption: string;
  };
  premise: {
    eyebrow: string;
    title: string;
    highlightedText: string;
    signalTitle: string;
    signalBody: string;
    answerTitle: string;
    answerBody: string;
  };
  thinking: {
    eyebrow: string;
    title: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    principles: AboutListItem[];
  };
  collection: {
    eyebrow: string;
    title: string;
    body: string;
  };
  values: {
    eyebrow: string;
    title: string;
    items: AboutListItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    buttonLabel: string;
    buttonUrl: string;
  };
};

export const defaultAboutContent: AboutPageContent = {
  hero: {
    eyebrow: "Câu chuyện thương hiệu",
    title: "Chăm da bắt đầu từ việc",
    highlightedText: "lắng nghe.",
    body: "Melalogy đặt việc đọc tín hiệu làn da trước việc thêm một sản phẩm mới. Energy Shot được tạo nên như những công thức hydrogel tập trung, trực quan và vừa đủ cho nhịp sống hiện đại.",
    imageUrl: "/assets/about-hero-vietnamese-portrait-2026.jpg",
    imageAlt: "Chân dung người phụ nữ Việt với làn da tự nhiên trong sắc đỏ Melalogy",
    imageCaption: "Đẹp hơn khi hiểu làn da hơn.",
  },
  premise: {
    eyebrow: "01 / Niềm tin",
    title: "Không thêm nhiều bước.",
    highlightedText: "Chọn đúng điều da cần.",
    signalTitle: "Tín hiệu",
    signalBody: "Da có thể thay đổi theo thời tiết, nhịp sinh hoạt và từng thời điểm. Vì vậy, lựa chọn chăm sóc cũng cần linh hoạt và dễ hiểu.",
    answerTitle: "Đáp án vừa đủ",
    answerBody: "Mỗi công thức được định vị bằng một màu sắc và một nhu cầu chính, giúp bạn tìm đúng Energy Shot mà không phải đoán.",
  },
  thinking: {
    eyebrow: "02 / Cách chúng tôi nghĩ",
    title: "Khoa học cần dễ hiểu để trở thành một phần đời sống.",
    body: "Melalogy chuyển ngôn ngữ chăm da phức tạp thành những lựa chọn trực quan. Không phô trương, không khiến bạn phải ghi nhớ quá nhiều — chỉ giữ lại điều cần thiết.",
    imageUrl: "/assets/about-hydrogel-ritual-2026.jpg",
    imageAlt: "Người phụ nữ Việt nhẹ nhàng áp mặt nạ hydrogel lên làn da",
    principles: [
      {
        title: "Đọc đúng tín hiệu",
        body: "Bắt đầu từ điều làn da đang cần thay vì kéo dài chu trình bằng nhiều bước.",
      },
      {
        title: "Công thức có chủ đích",
        body: "Mỗi Energy Shot tập trung vào một nhu cầu rõ ràng, với thông tin dễ hiểu.",
      },
      {
        title: "Trải nghiệm tinh gọn",
        body: "Kết cấu hydrogel ôm sát để khoảng thời gian chăm da trở nên nhẹ nhàng hơn.",
      },
    ],
  },
  collection: {
    eyebrow: "03 / Bản đồ nhu cầu",
    title: "Bốn tín hiệu. Bốn lựa chọn rõ ràng.",
    body: "Màu sắc không chỉ để trang trí. Đó là cách Melalogy giúp bạn nhận diện nhanh điều làn da đang tìm kiếm.",
  },
  values: {
    eyebrow: "04 / Giá trị theo đuổi",
    title: "Rõ ràng trong từng lựa chọn.",
    items: [
      {
        title: "Minh bạch trước tiên",
        body: "Nhu cầu, thành phần nổi bật và cách dùng cần được trình bày rõ ràng để bạn dễ lựa chọn.",
      },
      {
        title: "Tôn trọng làn da",
        body: "Chăm da là một nhịp sống cá nhân. Chúng tôi ưu tiên cảm giác dễ chịu và cách dùng vừa đủ.",
      },
      {
        title: "Thiết kế có mục đích",
        body: "Từ màu sắc đến trải nghiệm, mọi chi tiết đều giúp bạn nhận ra đúng công thức mình cần.",
      },
    ],
  },
  cta: {
    eyebrow: "Your skin. Your signal.",
    title: "Làn da không cần nhiều hơn. Làn da cần đúng hơn.",
    buttonLabel: "Tìm Energy Shot của bạn",
    buttonUrl: "/shop",
  },
};
