import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#f01a33] to-[#e91e63] text-white pt-32 pb-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Điều Khoản Dịch Vụ
                        </h1>
                        <p className="text-white/90 font-body text-lg">
                            Cập nhật lần cuối: 29 Tháng 12, 2025
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                1. Đồng Ý Với Điều Khoản
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Khi truy cập và sử dụng website cùng các dịch vụ của Bulsan Beauty, bạn chấp nhận và đồng ý tuân
                                theo các điều khoản và quy định của thoả thuận này. Nếu bạn không đồng ý tuân thủ những điều trên,
                                vui lòng không sử dụng dịch vụ này.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                2. Giấy Phép Sử Dụng
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Bạn được cấp quyền truy cập tạm thời vào các tài liệu (thông tin hoặc phần mềm) trên website của
                                Bulsan Beauty chỉ nhằm mục đích xem cá nhân, không mang tính thương mại. Đây là việc cấp giấy phép,
                                không phải chuyển nhượng quyền sở hữu, và theo giấy phép này bạn không được:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Chỉnh sửa hoặc sao chép tài liệu</li>
                                <li>Sử dụng tài liệu cho bất kỳ mục đích thương mại hoặc trưng bày công khai nào</li>
                                <li>Cố gắng dịch ngược hoặc phân tích mã nguồn bất kỳ phần mềm nào trên website của Bulsan Beauty</li>
                                <li>Xoá bỏ bất kỳ thông báo bản quyền hoặc quyền sở hữu nào khỏi tài liệu</li>
                                <li>Chuyển giao tài liệu cho người khác hoặc "sao lưu" (mirror) tài liệu trên bất kỳ máy chủ nào khác</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                3. Thông Tin Sản Phẩm Và Giá Cả
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chúng tôi luôn nỗ lực cung cấp mô tả sản phẩm và giá cả chính xác. Tuy nhiên, chúng tôi không đảm
                                bảo rằng mô tả sản phẩm, giá cả hoặc nội dung khác luôn chính xác, đầy đủ, đáng tin cậy, cập nhật
                                hoặc không có sai sót. Chúng tôi có quyền chỉnh sửa bất kỳ lỗi, sai sót nào và thay đổi hoặc cập
                                nhật thông tin bất cứ lúc nào mà không cần báo trước.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                4. Đặt Hàng Và Thanh Toán
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Khi đặt hàng, bạn cam kết rằng:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Bạn có đủ năng lực pháp lý để tham gia các giao dịch ràng buộc</li>
                                <li>Bạn từ 18 tuổi trở lên</li>
                                <li>Mọi thông tin bạn cung cấp là chính xác và đầy đủ</li>
                                <li>Bạn có quyền sử dụng phương thức thanh toán đã cung cấp</li>
                            </ul>
                            <p className="text-gray-700 font-body leading-relaxed mt-3">
                                Chúng tôi có quyền từ chối hoặc huỷ bất kỳ đơn hàng nào vì bất kỳ lý do gì, bao gồm giới hạn số
                                lượng có thể mua, sai sót trong thông tin sản phẩm hoặc giá cả, hoặc các vấn đề được phát hiện
                                bởi hệ thống phát hiện gian lận của chúng tôi.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                5. Vận Chuyển Và Giao Hàng
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chúng tôi sẽ nỗ lực hết sức để giao hàng trong thời gian dự kiến. Tuy nhiên, đôi khi có thể xảy ra
                                chậm trễ. Chúng tôi không chịu trách nhiệm đối với các sự chậm trễ trong quá trình vận chuyển.
                                Quyền sở hữu và rủi ro mất mát được chuyển giao cho bạn ngay khi chúng tôi bàn giao hàng cho đơn
                                vị vận chuyển.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                6. Đổi Trả Và Hoàn Tiền
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm đã mua. Nếu bạn chưa hài lòng với đơn hàng
                                của mình, bạn có thể trả lại sản phẩm chưa mở trong vòng 30 ngày kể từ ngày giao hàng để được
                                hoàn tiền toàn bộ. Các sản phẩm làm đẹp đã mở không thể được trả lại do quy định về sức khoẻ và an
                                toàn. Vui lòng tham khảo Chính Sách Đổi Trả của chúng tôi để biết chi tiết đầy đủ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                7. Tài Khoản Người Dùng
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Bạn có
                                trách nhiệm bảo mật mật khẩu của mình và chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản
                                của bạn. Bạn đồng ý thông báo ngay cho chúng tôi nếu phát hiện bất kỳ hành vi sử dụng trái phép
                                tài khoản của mình.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                8. Sở Hữu Trí Tuệ
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Dịch vụ cùng nội dung, tính năng và chức năng gốc của nó là và sẽ luôn thuộc quyền sở hữu độc
                                quyền của Bulsan Beauty và các bên cấp phép liên quan. Dịch vụ được bảo vệ bởi luật bản quyền,
                                nhãn hiệu và các luật khác. Nhãn hiệu của chúng tôi không được sử dụng liên quan đến bất kỳ sản
                                phẩm hoặc dịch vụ nào nếu không có sự đồng ý bằng văn bản từ chúng tôi.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                9. Giới Hạn Trách Nhiệm
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Trong mọi trường hợp, Bulsan Beauty cũng như ban giám đốc, nhân viên, đối tác, đại lý, nhà cung
                                cấp hoặc các bên liên kết sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên,
                                đặc biệt, hệ quả hoặc mang tính trừng phạt nào, bao gồm nhưng không giới hạn ở mất lợi nhuận, dữ
                                liệu, quyền sử dụng, uy tín hoặc các tổn thất vô hình khác, phát sinh từ việc bạn truy cập, sử
                                dụng hoặc không thể truy cập, sử dụng dịch vụ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                10. Luật Áp Dụng
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Các Điều Khoản này sẽ được điều chỉnh và giải thích theo pháp luật của khu vực pháp lý nơi Bulsan
                                Beauty hoạt động, không phụ thuộc vào các quy định về xung đột pháp luật. Việc chúng tôi không
                                thực thi bất kỳ quyền hoặc điều khoản nào trong Điều Khoản này sẽ không được xem là từ bỏ các
                                quyền đó.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                11. Thay Đổi Điều Khoản
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chúng tôi có quyền chỉnh sửa hoặc thay thế các Điều Khoản này bất cứ lúc nào. Nếu có thay đổi quan
                                trọng, chúng tôi sẽ thông báo trước ít nhất 30 ngày trước khi các điều khoản mới có hiệu lực. Việc
                                xác định thế nào là thay đổi quan trọng sẽ do chúng tôi toàn quyền quyết định.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                12. Thông Tin Liên Hệ
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản này, vui lòng liên hệ với chúng tôi:
                            </p>
                            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                <p className="text-gray-700 font-body">
                                    <strong>Email:</strong> metquatroiquaday@bulsangroup.com<br />
                                    <strong>Điện thoại:</strong> + 1234000<br />
                                    <strong>Địa chỉ:</strong> 347 Nguyễn Trọng Tuyển, Phường Tân Sơn Hoà, Quận Tân Bình
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;
