import InformationLayout from '@/components/InformationLayout';

const ShippingReturns = () => (
    <InformationLayout
        currentPath="/shipping-returns"
        eyebrow="Mua sắm an tâm"
        title="Vận chuyển & đổi trả"
        intro="Mọi mốc thời gian, chi phí và điều kiện đổi trả được trình bày rõ ràng để bạn chủ động trong từng đơn hàng."
        meta="Áp dụng trên toàn quốc"
    >
        <section>
            <h2>Chính sách vận chuyển</h2>
            <p><strong>Thời gian xử lý:</strong> Tất cả đơn hàng được xử lý trong vòng 1–2 ngày làm việc. Đơn hàng không được giao hoặc vận chuyển vào cuối tuần hoặc ngày lễ.</p>
            <p><strong>Phí vận chuyển:</strong> Chúng tôi áp dụng phí vận chuyển đồng giá 30.000₫ cho đơn hàng dưới 500.000₫. Đơn hàng từ 500.000₫ trở lên được miễn phí vận chuyển tiêu chuẩn.</p>
            <p><strong>Thời gian giao hàng dự kiến:</strong> Vận chuyển tiêu chuẩn thường mất 3–5 ngày làm việc tuỳ khu vực. Bạn có thể chọn hình thức giao hàng nhanh ngay tại bước thanh toán.</p>
            <div data-info-callout><p>Thời gian giao hàng có thể thay đổi trong dịp lễ, chương trình lớn hoặc do điều kiện vận chuyển tại địa phương.</p></div>
        </section>

        <section>
            <h2>Đổi trả & hoàn tiền</h2>
            <p>Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm đã mua. Nếu đơn hàng chưa đáp ứng kỳ vọng, đội ngũ Melalogy luôn sẵn sàng hỗ trợ.</p>
            <p><strong>Điều kiện đổi trả:</strong> Bạn có 30 ngày kể từ ngày nhận hàng. Sản phẩm phải chưa qua sử dụng, còn nguyên trạng và còn bao bì gốc.</p>
            <p><strong>Quy trình hoàn tiền:</strong> Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ thông báo kết quả. Yêu cầu hợp lệ được hoàn về phương thức thanh toán ban đầu.</p>
            <p><strong>Phí trả hàng:</strong> Khách hàng chịu phí vận chuyển khi gửi trả sản phẩm. Phí vận chuyển ban đầu không được hoàn lại.</p>
        </section>

        <section>
            <h2>Cần hỗ trợ một đơn hàng?</h2>
            <p>Vui lòng gửi email kèm mã đơn hàng, hình ảnh sản phẩm và mô tả tình trạng đến <strong>metquatroiquaday@melalogy.com</strong>. Chúng tôi sẽ phản hồi trong 1–2 ngày làm việc.</p>
        </section>
    </InformationLayout>
);

export default ShippingReturns;
