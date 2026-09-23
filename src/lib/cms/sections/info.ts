import { area, defineSection, list, rich, text } from "../define";

/* Header shared by every information page (InformationLayout). */
const infoHeader = [
  text("eyebrow", "Dòng nhỏ phía trên", { width: "half" }),
  text("meta", "Nhãn phụ (ví dụ ngày cập nhật)", { width: "half" }),
  text("title", "Tiêu đề trang", { required: true }),
  area("intro", "Giới thiệu", { rows: 3 }),
];

const policySections = list(
  "sections",
  "Các mục nội dung",
  "mục",
  [text("heading", "Tiêu đề mục", { required: true }), rich("body", "Nội dung")],
  { titleField: "heading", min: 1, max: 40 },
);

export const infoContact = defineSection({
  key: "info.contact",
  module: "info",
  title: "Trang Liên hệ (/contact)",
  description: "Địa chỉ, điện thoại, email, giờ làm việc lấy từ Header/Footer → Thông tin liên hệ.",
  previewPath: "/contact",
  fields: [
    ...infoHeader,
    text("heading", "Tiêu đề khối liên hệ"),
    area("body", "Mô tả khối liên hệ", { rows: 3 }),
    text("formHeading", "Tiêu đề form"),
    text("nameLabel", "Nhãn ô họ tên", { width: "half" }),
    text("emailLabel", "Nhãn ô email", { width: "half" }),
    text("messageLabel", "Nhãn ô nội dung", { width: "half" }),
    text("messagePlaceholder", "Gợi ý ô nội dung", { width: "half" }),
    text("submitLabel", "Chữ trên nút gửi", { width: "half" }),
    text("successMessage", "Thông báo gửi thành công", { width: "half" }),
  ],
  defaults: {
    eyebrow: "Hỗ trợ khách hàng",
    title: "Liên hệ với Melalogy",
    intro:
      "Một câu hỏi đúng giúp chúng tôi hiểu làn da và nhu cầu của bạn tốt hơn. Đội ngũ Melalogy luôn sẵn sàng lắng nghe.",
    meta: "Phản hồi trong 1–2 ngày làm việc",
    heading: "Kết nối theo cách thuận tiện nhất",
    body:
      "Bạn cần tư vấn sản phẩm, hỗ trợ đơn hàng hay muốn chia sẻ trải nghiệm? Hãy gửi thông tin cho chúng tôi qua biểu mẫu hoặc liên hệ trực tiếp.",
    formHeading: "Gửi lời nhắn",
    nameLabel: "Họ và tên",
    emailLabel: "Email",
    messageLabel: "Nội dung",
    messagePlaceholder: "Bạn cần Melalogy hỗ trợ điều gì?",
    submitLabel: "Gửi tin nhắn",
    successMessage: "Gửi tin nhắn thành công!",
  },
});

export const infoFaq = defineSection({
  key: "info.faq",
  module: "info",
  title: "Câu hỏi thường gặp (/faq)",
  previewPath: "/faq",
  fields: [
    ...infoHeader,
    text("listHeading", "Tiêu đề danh sách câu hỏi"),
    list(
      "questions",
      "Câu hỏi",
      "câu hỏi",
      [text("question", "Câu hỏi", { required: true }), area("answer", "Trả lời", { required: true, rows: 3 })],
      { titleField: "question", min: 1, max: 40 },
    ),
    text("closingHeading", "Khối cuối — tiêu đề"),
    rich("closingBody", "Khối cuối — nội dung"),
  ],
  defaults: {
    eyebrow: "Điều bạn muốn biết",
    title: "Câu hỏi thường gặp",
    intro: "Những câu trả lời ngắn gọn về sản phẩm, đơn hàng và cách Melalogy đồng hành cùng làn da của bạn.",
    meta: "Hỏi nhanh, hiểu rõ",
    listHeading: "Thông tin bạn có thể cần",
    questions: [
      { question: "Sản phẩm Melalogy có thuần chay và không thử nghiệm trên động vật không?", answer: "Có. Toàn bộ sản phẩm Melalogy đều thuần chay và không thử nghiệm trên động vật. Chúng tôi tin vào vẻ đẹp không gây tổn hại." },
      { question: "Làm sao để theo dõi đơn hàng của tôi?", answer: "Sau khi đơn hàng được bàn giao cho đơn vị vận chuyển, bạn sẽ nhận được email xác nhận kèm mã vận đơn để theo dõi hành trình đơn hàng." },
      { question: "Chính sách đổi trả như thế nào?", answer: "Melalogy hỗ trợ đổi trả trong vòng 30 ngày đối với sản phẩm chưa sử dụng, còn nguyên trạng và nguyên bao bì." },
      { question: "Melalogy có giao hàng quốc tế không?", answer: "Hiện tại chúng tôi giao hàng trên toàn quốc Việt Nam và đang chuẩn bị các điều kiện để mở rộng giao hàng quốc tế." },
      { question: "Sản phẩm có phù hợp với da nhạy cảm không?", answer: "Sản phẩm được nghiên cứu theo hướng dịu nhẹ và phù hợp với nhiều loại da. Với làn da nhạy cảm, bạn nên thử trên vùng da nhỏ trước khi sử dụng toàn mặt." },
      { question: "Tôi nên chọn Energy Shot nào?", answer: "Hãy bắt đầu từ tín hiệu hiện tại của làn da: Hydrating cho da khô căng, Recovery cho da cần phục hồi, Brightening cho bề mặt xỉn màu và Radiance để duy trì vẻ rạng rỡ." },
    ],
    closingHeading: "Chưa tìm thấy câu trả lời?",
    closingBody:
      "<p>Hãy gửi câu hỏi đến <strong>melalogyvietnam@gmail.com</strong>. Đội ngũ Melalogy sẽ phản hồi trong 1–2 ngày làm việc.</p>",
  },
});

export const infoShipping = defineSection({
  key: "info.shipping",
  module: "info",
  title: "Vận chuyển & đổi trả (/shipping-returns)",
  description: "Mỗi mục gồm tiêu đề và nội dung định dạng (in đậm, danh sách, liên kết).",
  previewPath: "/shipping-returns",
  fields: [...infoHeader, policySections],
  defaults: {
    eyebrow: "Mua sắm an tâm",
    title: "Vận chuyển & đổi trả",
    intro: "Mọi mốc thời gian, chi phí và điều kiện đổi trả được trình bày rõ ràng để bạn chủ động trong từng đơn hàng.",
    meta: "Áp dụng trên toàn quốc",
    sections: [
      {
        "heading": "Chính sách vận chuyển",
        "body": "<p><strong>Thời gian xử lý:</strong> Tất cả đơn hàng được xử lý trong vòng 1–2 ngày làm việc. Đơn hàng không được giao hoặc vận chuyển vào cuối tuần hoặc ngày lễ.</p><p><strong>Phí vận chuyển:</strong> Chúng tôi áp dụng phí vận chuyển đồng giá 30.000₫ cho đơn hàng dưới 500.000₫. Đơn hàng từ 500.000₫ trở lên được miễn phí vận chuyển tiêu chuẩn.</p><p><strong>Thời gian giao hàng dự kiến:</strong> Vận chuyển tiêu chuẩn thường mất 3–5 ngày làm việc tuỳ khu vực. Bạn có thể chọn hình thức giao hàng nhanh ngay tại bước thanh toán.</p><div data-info-callout><p>Thời gian giao hàng có thể thay đổi trong dịp lễ, chương trình lớn hoặc do điều kiện vận chuyển tại địa phương.</p></div>"
      },
      {
        "heading": "Đổi trả & hoàn tiền",
        "body": "<p>Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm đã mua. Nếu đơn hàng chưa đáp ứng kỳ vọng, đội ngũ Melalogy luôn sẵn sàng hỗ trợ.</p><p><strong>Điều kiện đổi trả:</strong> Bạn có 30 ngày kể từ ngày nhận hàng. Sản phẩm phải chưa qua sử dụng, còn nguyên trạng và còn bao bì gốc.</p><p><strong>Quy trình hoàn tiền:</strong> Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ thông báo kết quả. Yêu cầu hợp lệ được hoàn về phương thức thanh toán ban đầu.</p><p><strong>Phí trả hàng:</strong> Khách hàng chịu phí vận chuyển khi gửi trả sản phẩm. Phí vận chuyển ban đầu không được hoàn lại.</p>"
      },
      {
        "heading": "Cần hỗ trợ một đơn hàng?",
        "body": "<p>Vui lòng gửi email kèm mã đơn hàng, hình ảnh sản phẩm và mô tả tình trạng đến <strong>melalogyvietnam@gmail.com</strong>. Chúng tôi sẽ phản hồi trong 1–2 ngày làm việc.</p>"
      }
    ],
  },
});

export const infoPrivacy = defineSection({
  key: "info.privacy",
  module: "info",
  title: "Chính sách bảo mật (/privacy)",
  description: "Mỗi mục gồm tiêu đề và nội dung định dạng.",
  previewPath: "/privacy",
  fields: [...infoHeader, policySections],
  defaults: {
    eyebrow: "Quyền riêng tư",
    title: "Chính sách bảo mật",
    intro: "Cách Melalogy thu thập, sử dụng và bảo vệ dữ liệu cá nhân được trình bày minh bạch tại đây.",
    meta: "Cập nhật: 13 tháng 8, 2026",
    sections: [
      {
        "heading": "1. Giới thiệu",
        "body": "<p>Chào mừng bạn đến với Melalogy. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân của bạn. Chính sách bảo mật này sẽ giải thích cách chúng tôi quản lý dữ liệu cá nhân của bạn khi bạn truy cập website, cũng như thông tin về quyền riêng tư và cách pháp luật bảo vệ bạn.</p>"
      },
      {
        "heading": "2. Thông tin chúng tôi thu thập",
        "body": "<p>Chúng tôi có thể thu thập, sử dụng, lưu trữ và chuyển giao nhiều loại dữ liệu cá nhân khác nhau về bạn:</p><ul><li><strong>Dữ liệu định danh:</strong> Họ, tên, tên người dùng hoặc thông tin nhận dạng tương tự</li><li><strong>Dữ liệu liên hệ:</strong> Địa chỉ email, số điện thoại, địa chỉ thanh toán và giao hàng</li><li><strong>Dữ liệu tài chính:</strong> Thông tin thẻ thanh toán</li><li><strong>Dữ liệu giao dịch:</strong> Chi tiết về thanh toán và sản phẩm bạn đã mua từ chúng tôi</li><li><strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, múi giờ và vị trí</li><li><strong>Dữ liệu sử dụng:</strong> Thông tin về cách bạn sử dụng website và sản phẩm của chúng tôi</li><li><strong>Dữ liệu tiếp thị:</strong> Lựa chọn của bạn về việc nhận thông tin tiếp thị từ chúng tôi</li></ul>"
      },
      {
        "heading": "3. Cách chúng tôi sử dụng thông tin của bạn",
        "body": "<p>Chúng tôi chỉ sử dụng dữ liệu cá nhân của bạn khi pháp luật cho phép. Phổ biến nhất, chúng tôi sử dụng dữ liệu cá nhân của bạn trong các trường hợp sau:</p><ul><li>Để xử lý và giao đơn hàng của bạn</li><li>Để quản lý tài khoản và hỗ trợ khách hàng</li><li>Để gửi thông tin tiếp thị đến bạn (khi có sự đồng ý của bạn)</li><li>Để cải thiện website, sản phẩm và dịch vụ của chúng tôi</li><li>Để phòng chống gian lận và đảm bảo an toàn</li><li>Để tuân thủ các nghĩa vụ pháp lý</li></ul>"
      },
      {
        "heading": "4. Bảo mật dữ liệu",
        "body": "<p>Chúng tôi đã áp dụng các biện pháp bảo mật phù hợp để ngăn chặn việc dữ liệu cá nhân của bạn bị mất mát, sử dụng hoặc truy cập trái phép ngoài ý muốn. Chúng tôi giới hạn quyền truy cập vào dữ liệu cá nhân của bạn chỉ cho những nhân viên, đại lý, nhà thầu và bên thứ ba khác có nhu cầu công việc thực sự cần biết. Họ chỉ được xử lý dữ liệu cá nhân của bạn theo chỉ đạo của chúng tôi và phải tuân thủ nghĩa vụ bảo mật.</p>"
      },
      {
        "heading": "5. Cookie",
        "body": "<p>Website của chúng tôi sử dụng cookie để phân biệt bạn với những người dùng khác. Điều này giúp chúng tôi mang đến trải nghiệm tốt khi bạn duyệt web và cũng giúp chúng tôi cải thiện trang web. Bạn có thể cài đặt trình duyệt để từ chối tất cả hoặc một số cookie, hoặc để được cảnh báo khi các trang web đặt hoặc truy cập cookie.</p>"
      },
      {
        "heading": "6. Quyền của bạn",
        "body": "<p>Trong một số trường hợp nhất định, bạn có các quyền theo luật bảo vệ dữ liệu liên quan đến dữ liệu cá nhân của mình:</p><ul><li>Yêu cầu truy cập dữ liệu cá nhân của bạn</li><li>Yêu cầu chỉnh sửa dữ liệu cá nhân của bạn</li><li>Yêu cầu xoá dữ liệu cá nhân của bạn</li><li>Phản đối việc xử lý dữ liệu cá nhân của bạn</li><li>Yêu cầu hạn chế xử lý dữ liệu cá nhân của bạn</li><li>Yêu cầu chuyển giao dữ liệu cá nhân của bạn</li><li>Quyền rút lại sự đồng ý</li></ul>"
      },
      {
        "heading": "7. Liên kết bên thứ ba",
        "body": "<p>Website của chúng tôi có thể chứa các liên kết đến website, plugin và ứng dụng của bên thứ ba. Việc nhấp vào các liên kết đó hoặc kích hoạt các kết nối đó có thể cho phép bên thứ ba thu thập hoặc chia sẻ dữ liệu về bạn. Chúng tôi không kiểm soát các website bên thứ ba này và không chịu trách nhiệm về chính sách bảo mật của họ.</p>"
      },
      {
        "heading": "8. Liên hệ với chúng tôi",
        "body": "<p>Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc cách chúng tôi xử lý dữ liệu, vui lòng liên hệ với chúng tôi qua:</p><div data-info-callout><p><strong>Email:</strong> melalogyvietnam@gmail.com<br /><strong>Điện thoại:</strong> 0702 899 707<br /><strong>Địa chỉ:</strong> 29D Cộng Hòa 3, Phường Phú Thọ Hòa, Thành phố Hồ Chí Minh</p></div>"
      }
    ],
  },
});

export const infoTerms = defineSection({
  key: "info.terms",
  module: "info",
  title: "Điều khoản dịch vụ (/terms)",
  description: "Mỗi mục gồm tiêu đề và nội dung định dạng.",
  previewPath: "/terms",
  fields: [...infoHeader, policySections],
  defaults: {
    eyebrow: "Nguyên tắc sử dụng",
    title: "Điều khoản dịch vụ",
    intro: "Các nguyên tắc áp dụng khi bạn truy cập website, đặt hàng và sử dụng dịch vụ của Melalogy.",
    meta: "Cập nhật: 13 tháng 8, 2026",
    sections: [
      {
        "heading": "1. Đồng ý với điều khoản",
        "body": "<p>Khi truy cập và sử dụng website cùng các dịch vụ của Melalogy, bạn chấp nhận và đồng ý tuân theo các điều khoản và quy định của thoả thuận này. Nếu bạn không đồng ý tuân thủ những điều trên, vui lòng không sử dụng dịch vụ này.</p>"
      },
      {
        "heading": "2. Giấy phép sử dụng",
        "body": "<p>Bạn được cấp quyền truy cập tạm thời vào các tài liệu (thông tin hoặc phần mềm) trên website của Melalogy chỉ nhằm mục đích xem cá nhân, không mang tính thương mại. Đây là việc cấp giấy phép, không phải chuyển nhượng quyền sở hữu, và theo giấy phép này bạn không được:</p><ul><li>Chỉnh sửa hoặc sao chép tài liệu</li><li>Sử dụng tài liệu cho bất kỳ mục đích thương mại hoặc trưng bày công khai nào</li><li>Cố gắng dịch ngược hoặc phân tích mã nguồn bất kỳ phần mềm nào trên website của Melalogy</li><li>Xoá bỏ bất kỳ thông báo bản quyền hoặc quyền sở hữu nào khỏi tài liệu</li><li>Chuyển giao tài liệu cho người khác hoặc “sao lưu” (mirror) tài liệu trên bất kỳ máy chủ nào khác</li></ul>"
      },
      {
        "heading": "3. Thông tin sản phẩm và giá cả",
        "body": "<p>Chúng tôi luôn nỗ lực cung cấp mô tả sản phẩm và giá cả chính xác. Tuy nhiên, chúng tôi không đảm bảo rằng mô tả sản phẩm, giá cả hoặc nội dung khác luôn chính xác, đầy đủ, đáng tin cậy, cập nhật hoặc không có sai sót. Chúng tôi có quyền chỉnh sửa bất kỳ lỗi, sai sót nào và thay đổi hoặc cập nhật thông tin bất cứ lúc nào mà không cần báo trước.</p>"
      },
      {
        "heading": "4. Đặt hàng và thanh toán",
        "body": "<p>Khi đặt hàng, bạn cam kết rằng:</p><ul><li>Bạn có đủ năng lực pháp lý để tham gia các giao dịch ràng buộc</li><li>Bạn từ 18 tuổi trở lên</li><li>Mọi thông tin bạn cung cấp là chính xác và đầy đủ</li><li>Bạn có quyền sử dụng phương thức thanh toán đã cung cấp</li></ul><p>Chúng tôi có quyền từ chối hoặc huỷ bất kỳ đơn hàng nào vì bất kỳ lý do gì, bao gồm giới hạn số lượng có thể mua, sai sót trong thông tin sản phẩm hoặc giá cả, hoặc các vấn đề được phát hiện bởi hệ thống phát hiện gian lận của chúng tôi.</p>"
      },
      {
        "heading": "5. Vận chuyển và giao hàng",
        "body": "<p>Chúng tôi sẽ nỗ lực hết sức để giao hàng trong thời gian dự kiến. Tuy nhiên, đôi khi có thể xảy ra chậm trễ. Chúng tôi không chịu trách nhiệm đối với các sự chậm trễ trong quá trình vận chuyển. Quyền sở hữu và rủi ro mất mát được chuyển giao cho bạn ngay khi chúng tôi bàn giao hàng cho đơn vị vận chuyển.</p>"
      },
      {
        "heading": "6. Đổi trả và hoàn tiền",
        "body": "<p>Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm đã mua. Nếu bạn chưa hài lòng với đơn hàng của mình, bạn có thể trả lại sản phẩm chưa mở trong vòng 30 ngày kể từ ngày giao hàng để được hoàn tiền toàn bộ. Các sản phẩm làm đẹp đã mở không thể được trả lại do quy định về sức khoẻ và an toàn. Vui lòng tham khảo Chính Sách Đổi Trả của chúng tôi để biết chi tiết đầy đủ.</p>"
      },
      {
        "heading": "7. Tài khoản người dùng",
        "body": "<p>Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Bạn có trách nhiệm bảo mật mật khẩu của mình và chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của bạn. Bạn đồng ý thông báo ngay cho chúng tôi nếu phát hiện bất kỳ hành vi sử dụng trái phép tài khoản của mình.</p>"
      },
      {
        "heading": "8. Sở hữu trí tuệ",
        "body": "<p>Dịch vụ cùng nội dung, tính năng và chức năng gốc của nó là và sẽ luôn thuộc quyền sở hữu độc quyền của Melalogy và các bên cấp phép liên quan. Dịch vụ được bảo vệ bởi luật bản quyền, nhãn hiệu và các luật khác. Nhãn hiệu của chúng tôi không được sử dụng liên quan đến bất kỳ sản phẩm hoặc dịch vụ nào nếu không có sự đồng ý bằng văn bản từ chúng tôi.</p>"
      },
      {
        "heading": "9. Giới hạn trách nhiệm",
        "body": "<p>Trong mọi trường hợp, Melalogy cũng như ban giám đốc, nhân viên, đối tác, đại lý, nhà cung cấp hoặc các bên liên kết sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hệ quả hoặc mang tính trừng phạt nào, bao gồm nhưng không giới hạn ở mất lợi nhuận, dữ liệu, quyền sử dụng, uy tín hoặc các tổn thất vô hình khác, phát sinh từ việc bạn truy cập, sử dụng hoặc không thể truy cập, sử dụng dịch vụ.</p>"
      },
      {
        "heading": "10. Luật áp dụng",
        "body": "<p>Các Điều Khoản này sẽ được điều chỉnh và giải thích theo pháp luật của khu vực pháp lý nơi Melalogy hoạt động, không phụ thuộc vào các quy định về xung đột pháp luật. Việc chúng tôi không thực thi bất kỳ quyền hoặc điều khoản nào trong Điều Khoản này sẽ không được xem là từ bỏ các quyền đó.</p>"
      },
      {
        "heading": "11. Thay đổi điều khoản",
        "body": "<p>Chúng tôi có quyền chỉnh sửa hoặc thay thế các Điều Khoản này bất cứ lúc nào. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo trước ít nhất 30 ngày trước khi các điều khoản mới có hiệu lực. Việc xác định thế nào là thay đổi quan trọng sẽ do chúng tôi toàn quyền quyết định.</p>"
      },
      {
        "heading": "12. Thông tin liên hệ",
        "body": "<p>Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản này, vui lòng liên hệ với chúng tôi:</p><div data-info-callout><p><strong>Email:</strong> melalogyvietnam@gmail.com<br /><strong>Điện thoại:</strong> 0702 899 707<br /><strong>Địa chỉ:</strong> 29D Cộng Hòa 3, Phường Phú Thọ Hòa, Thành phố Hồ Chí Minh</p></div>"
      }
    ],
  },
});
