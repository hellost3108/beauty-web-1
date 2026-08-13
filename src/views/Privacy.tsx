import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#f01a33] to-[#e91e63] text-white pt-32 pb-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Chính Sách Bảo Mật
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
                                1. Giới Thiệu
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chào mừng bạn đến với Bulsan Beauty. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ
                                dữ liệu cá nhân của bạn. Chính sách bảo mật này sẽ giải thích cách chúng tôi quản lý dữ liệu cá nhân
                                của bạn khi bạn truy cập website, cũng như thông tin về quyền riêng tư và cách pháp luật bảo vệ bạn.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                2. Thông Tin Chúng Tôi Thu Thập
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Chúng tôi có thể thu thập, sử dụng, lưu trữ và chuyển giao nhiều loại dữ liệu cá nhân khác nhau về bạn:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li><strong>Dữ Liệu Định Danh:</strong> Họ, tên, tên người dùng hoặc thông tin nhận dạng tương tự</li>
                                <li><strong>Dữ Liệu Liên Hệ:</strong> Địa chỉ email, số điện thoại, địa chỉ thanh toán và giao hàng</li>
                                <li><strong>Dữ Liệu Tài Chính:</strong> Thông tin thẻ thanh toán</li>
                                <li><strong>Dữ Liệu Giao Dịch:</strong> Chi tiết về thanh toán và sản phẩm bạn đã mua từ chúng tôi</li>
                                <li><strong>Dữ Liệu Kỹ Thuật:</strong> Địa chỉ IP, loại trình duyệt, múi giờ và vị trí</li>
                                <li><strong>Dữ Liệu Sử Dụng:</strong> Thông tin về cách bạn sử dụng website và sản phẩm của chúng tôi</li>
                                <li><strong>Dữ Liệu Tiếp Thị:</strong> Lựa chọn của bạn về việc nhận thông tin tiếp thị từ chúng tôi</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                3. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Chúng tôi chỉ sử dụng dữ liệu cá nhân của bạn khi pháp luật cho phép. Phổ biến nhất, chúng tôi sử
                                dụng dữ liệu cá nhân của bạn trong các trường hợp sau:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Để xử lý và giao đơn hàng của bạn</li>
                                <li>Để quản lý tài khoản và hỗ trợ khách hàng</li>
                                <li>Để gửi thông tin tiếp thị đến bạn (khi có sự đồng ý của bạn)</li>
                                <li>Để cải thiện website, sản phẩm và dịch vụ của chúng tôi</li>
                                <li>Để phòng chống gian lận và đảm bảo an toàn</li>
                                <li>Để tuân thủ các nghĩa vụ pháp lý</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                4. Bảo Mật Dữ Liệu
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Chúng tôi đã áp dụng các biện pháp bảo mật phù hợp để ngăn chặn việc dữ liệu cá nhân của bạn bị mất
                                mát, sử dụng hoặc truy cập trái phép ngoài ý muốn. Chúng tôi giới hạn quyền truy cập vào dữ liệu cá
                                nhân của bạn chỉ cho những nhân viên, đại lý, nhà thầu và bên thứ ba khác có nhu cầu công việc thực
                                sự cần biết. Họ chỉ được xử lý dữ liệu cá nhân của bạn theo chỉ đạo của chúng tôi và phải tuân thủ
                                nghĩa vụ bảo mật.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                5. Cookie
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Website của chúng tôi sử dụng cookie để phân biệt bạn với những người dùng khác. Điều này giúp
                                chúng tôi mang đến trải nghiệm tốt khi bạn duyệt web và cũng giúp chúng tôi cải thiện trang web.
                                Bạn có thể cài đặt trình duyệt để từ chối tất cả hoặc một số cookie, hoặc để được cảnh báo khi các
                                trang web đặt hoặc truy cập cookie.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                6. Quyền Của Bạn
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed mb-3">
                                Trong một số trường hợp nhất định, bạn có các quyền theo luật bảo vệ dữ liệu liên quan đến dữ liệu
                                cá nhân của mình:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-body ml-4">
                                <li>Yêu cầu truy cập dữ liệu cá nhân của bạn</li>
                                <li>Yêu cầu chỉnh sửa dữ liệu cá nhân của bạn</li>
                                <li>Yêu cầu xoá dữ liệu cá nhân của bạn</li>
                                <li>Phản đối việc xử lý dữ liệu cá nhân của bạn</li>
                                <li>Yêu cầu hạn chế xử lý dữ liệu cá nhân của bạn</li>
                                <li>Yêu cầu chuyển giao dữ liệu cá nhân của bạn</li>
                                <li>Quyền rút lại sự đồng ý</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                7. Liên Kết Bên Thứ Ba
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Website của chúng tôi có thể chứa các liên kết đến website, plugin và ứng dụng của bên thứ ba.
                                Việc nhấp vào các liên kết đó hoặc kích hoạt các kết nối đó có thể cho phép bên thứ ba thu thập
                                hoặc chia sẻ dữ liệu về bạn. Chúng tôi không kiểm soát các website bên thứ ba này và không chịu
                                trách nhiệm về chính sách bảo mật của họ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                8. Liên Hệ Với Chúng Tôi
                            </h2>
                            <p className="text-gray-700 font-body leading-relaxed">
                                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc cách chúng tôi xử lý dữ liệu, vui lòng
                                liên hệ với chúng tôi qua:
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

export default Privacy;
