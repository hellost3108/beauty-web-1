import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ShippingReturns = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl mb-12 text-[#1a1a1a] text-center">Vận Chuyển & Đổi Trả</h1>

                <div className="space-y-12">
                    {/* Shipping Section */}
                    <section className="space-y-4">
                        <h2 className="font-display text-2xl text-[#1a1a1a] border-b border-gray-200 pb-2">Chính Sách Vận Chuyển</h2>
                        <div className="space-y-4 text-[#666666] font-body">
                            <p>
                                <strong>Thời Gian Xử Lý:</strong> Tất cả đơn hàng được xử lý trong vòng 1-2 ngày làm việc. Đơn hàng không được giao hoặc vận chuyển vào cuối tuần hoặc ngày lễ.
                            </p>
                            <p>
                                <strong>Phí Vận Chuyển:</strong> Chúng tôi áp dụng phí vận chuyển đồng giá Rs. 100 cho đơn hàng dưới Rs. 999. Đơn hàng từ Rs. 999 trở lên được miễn phí vận chuyển tiêu chuẩn.
                            </p>
                            <p>
                                <strong>Thời Gian Giao Hàng Dự Kiến:</strong> Vận chuyển tiêu chuẩn thường mất 3-5 ngày làm việc tuỳ khu vực. Bạn có thể chọn hình thức giao hàng nhanh ngay tại bước thanh toán.
                            </p>
                        </div>
                    </section>

                    {/* Returns Section */}
                    <section className="space-y-4">
                        <h2 className="font-display text-2xl text-[#1a1a1a] border-b border-gray-200 pb-2">Chính Sách Đổi Trả & Hoàn Tiền</h2>
                        <div className="space-y-4 text-[#666666] font-body">
                            <p>
                                Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm đã mua. Nếu bạn chưa hài lòng với đơn hàng của mình, chúng tôi luôn sẵn sàng hỗ trợ.
                            </p>
                            <p>
                                <strong>Đổi Trả:</strong> Bạn có 30 ngày để trả lại sản phẩm kể từ ngày nhận hàng. Để đủ điều kiện đổi trả, sản phẩm phải chưa qua sử dụng, còn nguyên trạng như khi nhận và còn nguyên bao bì gốc.
                            </p>
                            <p>
                                <strong>Hoàn Tiền:</strong> Sau khi nhận được sản phẩm trả lại, chúng tôi sẽ kiểm tra và thông báo cho bạn. Chúng tôi sẽ báo ngay tình trạng hoàn tiền sau khi kiểm tra xong sản phẩm. Nếu yêu cầu đổi trả được chấp thuận, chúng tôi sẽ tiến hành hoàn tiền vào thẻ tín dụng (hoặc phương thức thanh toán ban đầu) của bạn.
                            </p>
                            <p>
                                <strong>Phí Vận Chuyển Trả Hàng:</strong> Bạn sẽ chịu trách nhiệm thanh toán phí vận chuyển khi trả lại sản phẩm. Phí vận chuyển sẽ không được hoàn lại.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ShippingReturns;
