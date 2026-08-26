"use client";

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import InformationLayout from '@/components/InformationLayout';

const Contact = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toast.success('Gửi tin nhắn thành công!');
        router.push('/');
    };

    return (
        <InformationLayout
            currentPath="/contact"
            eyebrow="Hỗ trợ khách hàng"
            title="Liên hệ với Melalogy"
            intro="Một câu hỏi đúng giúp chúng tôi hiểu làn da và nhu cầu của bạn tốt hơn. Đội ngũ Melalogy luôn sẵn sàng lắng nghe."
            meta="Phản hồi trong 1–2 ngày làm việc"
        >
            <section>
                <h2>Kết nối theo cách thuận tiện nhất</h2>
                <p>
                    Bạn cần tư vấn sản phẩm, hỗ trợ đơn hàng hay muốn chia sẻ trải nghiệm? Hãy gửi thông tin cho chúng tôi qua biểu mẫu hoặc liên hệ trực tiếp.
                </p>
                <div data-info-contact-grid>
                    <div><h3>Địa chỉ</h3><p>29D Cộng Hòa 3, Phường Phú Thọ Hòa, Thành phố Hồ Chí Minh</p></div>
                    <div><h3>Điện thoại</h3><p><a href="tel:+84702899707">0702 899 707</a></p></div>
                    <div><h3>Email</h3><p><a href="mailto:melalogyvietnam@gmail.com">melalogyvietnam@gmail.com</a></p></div>
                    <div><h3>Giờ làm việc</h3><p>09:00–22:00 mỗi ngày</p></div>
                </div>
            </section>

            <section>
                <h2>Gửi lời nhắn</h2>
                <form data-info-form onSubmit={handleSubmit}>
                    <div data-info-form-row>
                        <label>Họ và tên<input required type="text" placeholder="Tên của bạn" autoComplete="name" /></label>
                        <label>Email<input required type="email" placeholder="email@domain.com" autoComplete="email" /></label>
                    </div>
                    <label>Nội dung<textarea required rows={5} placeholder="Bạn cần Melalogy hỗ trợ điều gì?" /></label>
                    <button type="submit">Gửi tin nhắn <ArrowRight size={18} aria-hidden="true" /></button>
                </form>
            </section>
        </InformationLayout>
    );
};

export default Contact;
