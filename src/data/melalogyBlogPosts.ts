export type MelalogyBlogPost = {
  id: number;
  slug?: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  author: string;
  date: string;
  publishedAt: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  content: string;
};

export const blogPosts: MelalogyBlogPost[] = [
  {
    id: 1,
    title: "Melalogy Energy Shot: Chọn Đúng Màu Cho Đúng Nhu Cầu Làn Da",
    seoTitle: "4 Loại Mặt Nạ Hydrogel Melalogy Energy Shot",
    metaDescription: "Khám phá 4 màu Melalogy Energy Shot và cách chọn công thức cấp ẩm, phục hồi, làm sáng hoặc rạng rỡ theo trạng thái làn da.",
    keywords: ["Melalogy", "Melalogy Energy Shot", "mặt nạ hydrogel", "mặt nạ Melalogy", "chăm sóc da"],
    excerpt: "Xanh dương, xanh lá, vàng hay tím? Đây là cách đọc hệ màu Energy Shot để chọn mặt nạ Melalogy phù hợp với trạng thái làn da hôm nay.",
    author: "Đội ngũ Melalogy",
    date: "21 Tháng 8, 2026",
    publishedAt: "2026-08-21T08:00:00+07:00",
    category: "Thương Hiệu",
    image: "/assets/shop-hero.png",
    imageAlt: "Bốn màu mặt nạ hydrogel Melalogy Energy Shot dành cho các nhu cầu làn da",
    readingTime: "7 phút đọc",
    content: `
      <p>Melalogy phát triển bộ sưu tập Energy Shot từ một câu hỏi đơn giản: làm thế nào để người dùng nhận ra nhu cầu của làn da và chọn sản phẩm nhanh hơn? Thay vì đặt trước bạn một danh sách thành phần dài, hệ màu giúp biến lựa chọn chăm sóc da thành trải nghiệm trực quan, dễ nhớ.</p>
      <h3>Xanh dương: khi làn da cần được cấp ẩm</h3>
      <p>Hydrating Energy Shot phù hợp với những ngày da có cảm giác khô căng, thiếu độ mềm hoặc phải ở lâu trong phòng điều hòa. Công thức hướng đến việc bổ sung độ ẩm và hỗ trợ bề mặt da trông căng mượt hơn.</p>
      <h3>Xanh lá: khi hàng rào bảo vệ cần được nâng niu</h3>
      <p>Recovery Energy Shot là lựa chọn dành cho giai đoạn da mệt mỏi hoặc dễ khó chịu sau một chu trình có nhiều hoạt chất. Bí quyết là giữ các bước còn lại thật tối giản và ưu tiên cảm giác dễ chịu.</p>
      <h3>Vàng và tím: làm sáng hay duy trì vẻ rạng rỡ?</h3>
      <p>Brightening Energy Shot tập trung vào vẻ tươi sáng và đều màu; Radiance Energy Shot hướng đến bề mặt da có sức sống, mềm mượt. Hai nhu cầu gần nhau nhưng khác mục tiêu, vì vậy hãy quan sát làn da dưới ánh sáng tự nhiên trước khi chọn.</p>
      <h3>Cách dùng Energy Shot trong chu trình</h3>
      <p>Sử dụng trên da đã được làm sạch và làm theo thời gian hướng dẫn trên bao bì. Sau khi tháo mặt nạ, vỗ nhẹ phần tinh chất còn lại rồi khóa ẩm nếu cần. Bạn không cần dùng cả bốn loại cùng lúc; hãy chọn một công thức đúng với trạng thái da hiện tại.</p>
    `,
  },
  {
    id: 2,
    title: "Quy Trình Chăm Da 5 Bước Cho Khí Hậu Nóng Ẩm Việt Nam",
    seoTitle: "Quy Trình Chăm Da 5 Bước Cho Người Việt | Melalogy",
    metaDescription: "Quy trình chăm da 5 bước cho khí hậu nóng ẩm Việt Nam, giúp làm sạch, cấp ẩm và bảo vệ da mà không gây cảm giác nặng mặt.",
    keywords: ["quy trình chăm da", "skincare cho người Việt", "chăm da nóng ẩm", "bí kíp làm đẹp", "Melalogy"],
    excerpt: "Một chu trình hiệu quả không cần quá nhiều lớp. Năm bước dưới đây giúp da sạch, đủ ẩm và thoải mái hơn trong thời tiết nóng ẩm.",
    author: "Minh Anh",
    date: "18 Tháng 8, 2026",
    publishedAt: "2026-08-18T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/melalogy-blog-routine-2026.png",
    imageAlt: "Quy trình chăm sóc da tối giản với các sản phẩm dưỡng da trên nền kem",
    readingTime: "8 phút đọc",
    content: `
      <p>Thời tiết nóng ẩm khiến nhiều người ngại dưỡng da vì sợ bí, bóng hoặc nặng mặt. Tuy nhiên, bỏ hoàn toàn bước dưỡng ẩm có thể khiến da thiếu nước và tiết dầu nhiều hơn. Giải pháp là giảm số lớp, ưu tiên kết cấu dễ chịu và dùng đúng lượng.</p>
      <h3>Bước 1: làm sạch vừa đủ</h3>
      <p>Buổi sáng, một sản phẩm làm sạch dịu nhẹ thường đã đủ. Buổi tối, hãy tẩy trang kỹ nếu có dùng kem chống nắng hoặc trang điểm, sau đó rửa lại bằng sản phẩm không khiến da khô căng.</p>
      <h3>Bước 2: bổ sung độ ẩm mỏng nhẹ</h3>
      <p>Thoa toner hoặc essence trên nền da còn hơi ẩm. Nếu da khô do điều hòa, bạn có thể thêm Hydrating Energy Shot vào một đến hai buổi trong tuần như bước chăm sóc tăng cường.</p>
      <h3>Bước 3 và 4: serum đúng nhu cầu, kem dưỡng vừa đủ</h3>
      <p>Chỉ nên tập trung vào một nhu cầu chính trong cùng chu trình. Sau serum, dùng lượng kem dưỡng vừa đủ để tạo cảm giác mềm nhưng không dính. Vùng má khô có thể dùng nhiều hơn vùng chữ T.</p>
      <h3>Bước 5: chống nắng mỗi sáng</h3>
      <p>Thoa kem chống nắng phổ rộng và bôi lại khi hoạt động ngoài trời lâu. Đây là bước quan trọng để bảo vệ kết quả của toàn bộ chu trình chăm sóc da.</p>
      <p>Bí quyết của Melalogy là quan sát da mỗi ngày và linh hoạt điều chỉnh kết cấu, thay vì thay toàn bộ sản phẩm chỉ vì thời tiết thay đổi.</p>
    `,
  },
  {
    id: 3,
    title: "Da Khô Hay Da Thiếu Nước? Cách Nhận Biết Và Cấp Ẩm Đúng",
    seoTitle: "Da Khô Và Da Thiếu Nước Khác Gì Nhau? | Melalogy",
    metaDescription: "Phân biệt da khô và da thiếu nước, đồng thời xây dựng chu trình cấp ẩm phù hợp với Hyaluronic Acid và Ceramide NP.",
    keywords: ["da khô", "da thiếu nước", "cấp ẩm da", "Hyaluronic Acid", "Ceramide NP", "Melalogy"],
    excerpt: "Da bóng dầu vẫn có thể thiếu nước. Hiểu đúng hai trạng thái này giúp bạn chọn bước cấp ẩm phù hợp và tránh dưỡng quá nặng.",
    author: "Hà My",
    date: "15 Tháng 8, 2026",
    publishedAt: "2026-08-15T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/mask-hydrating-blue.png",
    imageAlt: "Mặt nạ hydrogel Melalogy màu xanh dương dành cho nhu cầu cấp ẩm",
    readingTime: "7 phút đọc",
    content: `
      <p>Da khô là một loại da có xu hướng thiếu dầu tự nhiên; da thiếu nước là trạng thái tạm thời có thể xuất hiện ở bất kỳ loại da nào. Vì vậy, người có da dầu vẫn có thể cảm thấy căng sau khi rửa mặt hoặc lớp nền nhanh xuống tông vì bề mặt thiếu ẩm.</p>
      <h3>Dấu hiệu thường gặp của da khô</h3>
      <p>Da khô thường có bề mặt hơi ráp, ít bóng dầu và dễ bong ở nhiều vùng. Cảm giác này có thể lặp lại quanh năm, đặc biệt rõ khi thời tiết hanh khô.</p>
      <h3>Dấu hiệu thường gặp của da thiếu nước</h3>
      <p>Da thiếu nước có thể vừa bóng vừa căng, bề mặt trông kém đầy đặn và lớp trang điểm dễ mốc. Thói quen làm sạch mạnh, điều hòa và uống thiếu nước đều có thể góp phần làm tình trạng rõ hơn.</p>
      <h3>Cấp nước rồi mới khóa ẩm</h3>
      <p>Hãy thoa sản phẩm chứa chất hút ẩm như Hyaluronic Acid trên nền da hơi ẩm, sau đó dùng kem dưỡng phù hợp để hạn chế nước bay hơi. Hydrating Energy Shot của Melalogy kết hợp Hyaluronic Acid và Ceramide NP, phù hợp cho những buổi da cần một bước cấp ẩm tập trung.</p>
      <h3>Đừng quên điều chỉnh cách làm sạch</h3>
      <p>Nếu da luôn căng ngay sau khi rửa mặt, hãy xem lại nhiệt độ nước, thời gian làm sạch và sản phẩm đang dùng. Một chu trình cấp ẩm tốt sẽ khó phát huy khi hàng rào bảo vệ liên tục bị làm sạch quá mức.</p>
    `,
  },
  {
    id: 4,
    title: "Phục Hồi Hàng Rào Bảo Vệ Da: Khi Nào Nên Tối Giản Chu Trình?",
    seoTitle: "Phục Hồi Hàng Rào Bảo Vệ Da Đúng Cách | Melalogy",
    metaDescription: "Nhận biết hàng rào da suy yếu và áp dụng chu trình tối giản với làm sạch dịu nhẹ, dưỡng ẩm cùng Recovery Energy Shot.",
    keywords: ["phục hồi da", "hàng rào bảo vệ da", "Centella Asiatica", "Recovery Energy Shot", "Melalogy"],
    excerpt: "Châm chích với sản phẩm quen thuộc, khô căng và dễ đỏ là lúc bạn nên giảm hoạt chất, trở về những bước chăm sóc cơ bản.",
    author: "Thu Hà",
    date: "12 Tháng 8, 2026",
    publishedAt: "2026-08-12T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/mask-recovery-green-hero.png",
    imageAlt: "Mặt nạ hydrogel Recovery Energy Shot màu xanh lá của Melalogy",
    readingTime: "8 phút đọc",
    content: `
      <p>Hàng rào bảo vệ da hoạt động như lớp phòng thủ giúp hạn chế mất nước và giảm tác động từ môi trường. Khi chu trình có quá nhiều bước tẩy tế bào chết hoặc hoạt chất mạnh, da có thể trở nên nhạy cảm hơn bình thường.</p>
      <h3>Những tín hiệu không nên bỏ qua</h3>
      <p>Da châm chích với sản phẩm từng dùng ổn, đỏ kéo dài, khô căng hoặc nổi các nốt nhỏ li ti có thể là tín hiệu cần giảm tải chu trình. Nếu khó chịu nghiêm trọng hoặc kéo dài, bạn nên gặp chuyên gia da liễu.</p>
      <h3>Chu trình phục hồi tối giản</h3>
      <p>Giữ lại ba nhóm cơ bản: làm sạch dịu nhẹ, dưỡng ẩm và chống nắng. Tạm dừng việc thử sản phẩm mới, hạn chế tẩy tế bào chết và không cố xử lý nhiều vấn đề trong cùng một lúc.</p>
      <h3>Vai trò của Centella Asiatica</h3>
      <p>Rau má thường được lựa chọn trong các công thức hướng đến cảm giác làm dịu. Recovery Energy Shot của Melalogy kết hợp Centella Asiatica với nền hydrogel để tạo một bước chăm sóc nhẹ nhàng trong giai đoạn da cần được nâng niu.</p>
      <h3>Quay lại hoạt chất như thế nào?</h3>
      <p>Khi da đã ổn định, hãy đưa từng hoạt chất trở lại theo tần suất thấp và quan sát trong vài ngày. Phục hồi không phải cuộc đua; sự kiên nhẫn thường quan trọng hơn số lượng sản phẩm.</p>
    `,
  },
  {
    id: 5,
    title: "Niacinamide Là Gì? Bí Kíp Làm Sáng Da Mà Không Quá Tải",
    seoTitle: "Niacinamide: Cách Dùng Hỗ Trợ Làm Sáng Da | Melalogy",
    metaDescription: "Tìm hiểu Niacinamide, cách kết hợp trong chu trình làm sáng và những lưu ý khi dùng Brightening Energy Shot của Melalogy.",
    keywords: ["Niacinamide", "làm sáng da", "da xỉn màu", "Brightening Energy Shot", "Melalogy"],
    excerpt: "Niacinamide được yêu thích vì dễ tiếp cận, nhưng dùng nhiều không đồng nghĩa với hiệu quả nhanh hơn. Đây là cách xây chu trình vừa đủ.",
    author: "Ngọc Trần",
    date: "09 Tháng 8, 2026",
    publishedAt: "2026-08-09T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/mask-brightening-yellow.png",
    imageAlt: "Mặt nạ hydrogel Brightening Energy Shot màu vàng của Melalogy",
    readingTime: "7 phút đọc",
    content: `
      <p>Niacinamide là một dạng vitamin B3 thường xuất hiện trong sản phẩm chăm sóc da nhờ tính linh hoạt. Thành phần này được dùng trong các công thức hướng đến hỗ trợ bề mặt da trông đều màu, khỏe và ít xỉn hơn.</p>
      <h3>Vì sao Niacinamide phổ biến?</h3>
      <p>Niacinamide có thể xuất hiện trong serum, kem dưỡng hoặc mặt nạ. Điều quan trọng không chỉ là nồng độ mà còn là toàn bộ công thức, tần suất sử dụng và khả năng dung nạp của từng làn da.</p>
      <h3>Đừng xếp chồng quá nhiều sản phẩm</h3>
      <p>Nếu toner, serum và kem dưỡng đều chứa Niacinamide, tổng chu trình có thể trở nên dư thừa. Hãy chọn một sản phẩm chính rồi giữ các bước còn lại đơn giản để dễ quan sát phản ứng của da.</p>
      <h3>Kết hợp cùng Brightening Energy Shot</h3>
      <p>Brightening Energy Shot của Melalogy sử dụng Niacinamide trong trải nghiệm hydrogel màu vàng. Bạn có thể dùng vào buổi tối sau làm sạch, sau đó khóa ẩm; ban ngày vẫn cần chống nắng đầy đủ.</p>
      <h3>Kỳ vọng thực tế</h3>
      <p>Làn da tươi sáng hơn là kết quả của chu trình ổn định gồm chống nắng, dưỡng ẩm và chăm sóc đều đặn. Không sản phẩm đơn lẻ nào thay thế được toàn bộ ba yếu tố này.</p>
    `,
  },
  {
    id: 6,
    title: "Peptide Trong Chăm Sóc Da: Bước Nhỏ Cho Vẻ Ngoài Rạng Rỡ",
    seoTitle: "Peptide Trong Chăm Sóc Da Có Tác Dụng Gì? | Melalogy",
    metaDescription: "Hiểu peptide trong mỹ phẩm, cách xây chu trình dưỡng da rạng rỡ và vai trò của Radiance Energy Shot với Acetyl Hexapeptide-8.",
    keywords: ["peptide", "Acetyl Hexapeptide-8", "Radiance Energy Shot", "da rạng rỡ", "Melalogy"],
    excerpt: "Peptide thường được nhắc đến trong chu trình chăm da hiện đại. Hiểu đúng giúp bạn dùng thành phần này đều đặn thay vì kỳ vọng tức thì.",
    author: "Hà My",
    date: "06 Tháng 8, 2026",
    publishedAt: "2026-08-06T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/mask-radiance-purple.png",
    imageAlt: "Mặt nạ hydrogel Radiance Energy Shot màu tím của Melalogy",
    readingTime: "6 phút đọc",
    content: `
      <p>Peptide là các chuỗi amino acid ngắn được sử dụng trong nhiều công thức dưỡng da. Chúng thường xuất hiện trong sản phẩm hướng đến bề mặt da mềm, mịn và có vẻ ngoài khỏe khoắn hơn.</p>
      <h3>Peptide phù hợp với ai?</h3>
      <p>Người muốn xây một chu trình dưỡng da lâu dài, không quá nặng hoạt chất tẩy hoặc thay mới bề mặt, có thể cân nhắc peptide. Tuy nhiên, hiệu quả phụ thuộc vào công thức tổng thể và sự đều đặn.</p>
      <h3>Radiance Energy Shot có gì?</h3>
      <p>Phiên bản màu tím của Melalogy kết hợp Sodium DNA và Acetyl Hexapeptide-8 trong nền hydrogel. Sản phẩm được định hướng như bước chăm sóc bổ sung cho những ngày làn da trông mệt mỏi và kém sức sống.</p>
      <h3>Cách đưa peptide vào chu trình</h3>
      <p>Giữ bước làm sạch dịu nhẹ, dùng serum hoặc mặt nạ chứa peptide, sau đó dưỡng ẩm. Ban ngày, chống nắng vẫn là nền tảng để duy trì vẻ ngoài rạng rỡ.</p>
      <h3>Đều đặn quan trọng hơn cầu kỳ</h3>
      <p>Thay vì đổi sản phẩm liên tục, hãy cho chu trình đủ thời gian và ghi lại cảm nhận của da. Bí kíp làm đẹp bền vững luôn bắt đầu từ khả năng duy trì.</p>
    `,
  },
  {
    id: 7,
    title: "Cách Đắp Mặt Nạ Hydrogel Đúng Để Da Thoải Mái Hơn",
    seoTitle: "Cách Đắp Mặt Nạ Hydrogel Tại Nhà | Melalogy",
    metaDescription: "Hướng dẫn đắp mặt nạ hydrogel Melalogy đúng thứ tự, chuẩn bị da, xử lý tinh chất sau khi tháo và tránh các lỗi thường gặp.",
    keywords: ["cách đắp mặt nạ hydrogel", "mặt nạ Melalogy", "Energy Shot", "đắp mặt nạ đúng cách"],
    excerpt: "Chuẩn bị da kỹ, chọn đúng công thức và không để mặt nạ quá lâu là ba nguyên tắc giúp trải nghiệm hydrogel dễ chịu hơn.",
    author: "Minh Anh",
    date: "03 Tháng 8, 2026",
    publishedAt: "2026-08-03T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/skincare-mask-application.jpg",
    imageAlt: "Người dùng áp mặt nạ hydrogel lên da trong chu trình chăm sóc tại nhà",
    readingTime: "6 phút đọc",
    content: `
      <p>Mặt nạ hydrogel có bề mặt mát, mềm và ôm theo đường nét khuôn mặt. Để trải nghiệm phát huy tốt, bạn cần chú ý cả bước chuẩn bị, thời gian sử dụng và cách chăm sóc sau khi tháo mặt nạ.</p>
      <h3>Làm sạch trước khi đắp</h3>
      <p>Tẩy trang và rửa mặt để loại bỏ kem chống nắng, bụi bẩn. Có thể dùng một lớp toner mỏng, nhưng tránh xếp quá nhiều serum trước mặt nạ vì dễ tạo cảm giác nặng.</p>
      <h3>Chọn công thức theo trạng thái da</h3>
      <p>Da thiếu ẩm chọn Hydrating, da cần nâng niu chọn Recovery, da xỉn màu chọn Brightening và khi muốn duy trì vẻ rạng rỡ có thể chọn Radiance. Không cần chọn theo màu yêu thích; hãy chọn theo nhu cầu.</p>
      <h3>Tuân theo hướng dẫn trên bao bì</h3>
      <p>Không nên ngủ qua đêm với mặt nạ nếu sản phẩm không được thiết kế cho mục đích đó. Tháo mặt nạ theo thời gian hướng dẫn, sau đó vỗ nhẹ tinh chất còn lại thay vì rửa đi ngay.</p>
      <h3>Ba lỗi thường gặp</h3>
      <p>Đắp trên da chưa sạch, dùng cùng lúc với quá nhiều hoạt chất mạnh và để mặt nạ đến khi khô hoàn toàn đều có thể làm giảm cảm giác dễ chịu. Một buổi đắp mặt nạ tốt nên đơn giản và thư giãn.</p>
    `,
  },
  {
    id: 8,
    title: "Lịch Chăm Da 7 Ngày: Luân Phiên Cấp Ẩm, Phục Hồi Và Làm Sáng",
    seoTitle: "Lịch Chăm Da 7 Ngày Với Melalogy Energy Shot",
    metaDescription: "Gợi ý lịch chăm da 7 ngày linh hoạt, kết hợp cấp ẩm, phục hồi và làm sáng cùng Energy Shot mà không dùng quá nhiều hoạt chất.",
    keywords: ["lịch chăm da 7 ngày", "skin cycling", "Melalogy Energy Shot", "bí kíp chăm da"],
    excerpt: "Một lịch chăm da tốt cần có ngày hoạt chất và ngày nghỉ. Mẫu 7 ngày này giúp bạn bắt đầu theo cách dễ theo dõi hơn.",
    author: "Thu Hà",
    date: "31 Tháng 7, 2026",
    publishedAt: "2026-07-31T08:00:00+07:00",
    category: "Chăm Sóc Da",
    image: "/assets/melalogy-blog-hero-2026.png",
    imageAlt: "Phụ nữ Việt thư giãn trong lịch chăm sóc da hằng tuần",
    readingTime: "8 phút đọc",
    content: `
      <p>Lịch chăm da không cần giống nhau ở mọi người. Mẫu dưới đây là điểm khởi đầu để bạn phân bổ ngày hoạt chất và ngày phục hồi, từ đó tránh việc dùng quá nhiều sản phẩm trong cùng một buổi.</p>
      <h3>Ngày 1 và 2: làm sạch, cấp ẩm</h3>
      <p>Bắt đầu bằng chu trình cơ bản. Nếu da khô căng, thêm Hydrating Energy Shot vào một buổi tối và giữ các bước còn lại nhẹ nhàng.</p>
      <h3>Ngày 3: hoạt chất chính</h3>
      <p>Dùng một sản phẩm tập trung cho nhu cầu ưu tiên, chẳng hạn Niacinamide khi muốn hỗ trợ vẻ ngoài đều màu. Không cần kết hợp thêm nhiều hoạt chất mới trong cùng ngày.</p>
      <h3>Ngày 4 và 5: phục hồi</h3>
      <p>Giảm chu trình về làm sạch, dưỡng ẩm. Recovery Energy Shot có thể được dùng như một bước chăm sóc tăng cường nếu da cần cảm giác dịu và dễ chịu hơn.</p>
      <h3>Ngày 6 và 7: đánh giá rồi điều chỉnh</h3>
      <p>Quan sát độ ẩm, cảm giác căng và khả năng dung nạp. Chọn Brightening hoặc Radiance nếu da ổn định; nếu da nhạy cảm, tiếp tục chu trình phục hồi thay vì cố bám lịch.</p>
      <p>Melalogy khuyến khích bạn coi lịch này là bản hướng dẫn linh hoạt. Làn da luôn có quyền thay đổi kế hoạch.</p>
    `,
  },
  {
    id: 9,
    title: "Trang Điểm Mỏng Nhẹ Khi Da Đủ Ẩm: 6 Bí Kíp Cho Lớp Nền Tự Nhiên",
    seoTitle: "6 Bí Kíp Trang Điểm Mỏng Nhẹ Tự Nhiên | Melalogy",
    metaDescription: "Sáu bí kíp chuẩn bị da, chọn nền và dặm trang điểm giúp lớp nền mỏng nhẹ, tự nhiên hơn trong khí hậu nóng ẩm Việt Nam.",
    keywords: ["trang điểm mỏng nhẹ", "lớp nền tự nhiên", "chuẩn bị da trước trang điểm", "bí kíp làm đẹp", "Melalogy"],
    excerpt: "Lớp nền đẹp bắt đầu trước bước trang điểm. Cấp ẩm vừa đủ và chờ sản phẩm ổn định giúp nền mỏng, đều và bền hơn.",
    author: "Ngọc Trần",
    date: "28 Tháng 7, 2026",
    publishedAt: "2026-07-28T08:00:00+07:00",
    category: "Trang Điểm",
    image: "/assets/melalogy-blog-makeup-2026.png",
    imageAlt: "Phụ nữ Việt trang điểm mỏng nhẹ với làn da tự nhiên",
    readingTime: "7 phút đọc",
    content: `
      <p>Một lớp nền tự nhiên không đến từ việc dùng thật ít sản phẩm mà từ cách chuẩn bị bề mặt da. Khi da đủ ẩm nhưng không quá trơn, kem nền dễ tán mỏng và ít đọng vào vùng khô.</p>
      <h3>Chuẩn bị da theo vùng</h3>
      <p>Dùng kem dưỡng mỏng ở vùng chữ T và thêm một lớp nhỏ ở vùng má khô. Nếu có sự kiện, bạn có thể dùng Hydrating Energy Shot từ tối hôm trước thay vì đắp sát giờ trang điểm.</p>
      <h3>Chờ dưỡng da ổn định</h3>
      <p>Sau kem chống nắng, hãy chờ bề mặt ổn định trước khi đánh nền. Việc chồng sản phẩm quá nhanh dễ tạo hiện tượng vón hoặc trượt nền.</p>
      <h3>Tán lớp mỏng từ trung tâm gương mặt</h3>
      <p>Đặt lượng nền nhỏ ở vùng cần che phủ nhiều rồi tán dần ra ngoài. Chỉ thêm lớp thứ hai tại vùng cần thiết thay vì phủ dày toàn mặt.</p>
      <h3>Dặm, không miết</h3>
      <p>Dùng mút ẩm hoặc cọ phù hợp và thao tác dặm nhẹ. Cuối cùng, phủ phấn có chọn lọc tại vùng dễ đổ dầu để vẫn giữ được độ tự nhiên của làn da.</p>
      <p>Bí kíp Melalogy: một lớp nền đẹp nên để người đối diện nhìn thấy làn da của bạn, không chỉ nhìn thấy sản phẩm trang điểm.</p>
    `,
  },
];
