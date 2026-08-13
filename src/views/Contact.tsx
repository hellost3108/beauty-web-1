"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Gửi tin nhắn thành công!");
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <h1 className="font-display text-4xl mb-8 text-[#1a1a1a] text-center">Liên Hệ</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="font-display text-2xl text-[#1a1a1a]">Kết Nối Với Chúng Tôi</h2>
                        <p className="font-body text-[#666666] leading-relaxed">
                            Bạn có thắc mắc về sản phẩm hoặc đơn hàng? Chúng tôi luôn sẵn sàng hỗ trợ!
                            Điền vào form bên dưới hoặc liên hệ trực tiếp qua thông tin dưới đây.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Địa Chỉ</h3>
                                <p className="text-[#666666]">347 Nguyễn Trọng Tuyển, Phường Tân Sơn Hoà, Quận Tân Bình</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Email</h3>
                                <p className="text-[#666666]">metquatroiquaday@bulsangroup.com</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Điện Thoại</h3>
                                <p className="text-[#666666]">+ 1234000</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1a1a1a]">Giờ Làm Việc</h3>
                                <p className="text-[#666666]">08:30 - 18:30</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f9f8f7] p-8 rounded-[20px]">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Họ Tên</label>
                                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="Tên của bạn" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email</label>
                                <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="Email của bạn" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Nội Dung</label>
                                <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f01a33]" placeholder="Bạn cần chúng tôi hỗ trợ gì?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#f01a33] text-white py-3 rounded-lg font-semibold hover:bg-[#d63a63] transition-colors">
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
