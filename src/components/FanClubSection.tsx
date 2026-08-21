"use client";

import { useState } from 'react';
import { Truck, Phone, Headphones, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FanClubSection = () => {
    const [email, setEmail] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Vui lòng nhập địa chỉ email");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Vui lòng nhập địa chỉ email hợp lệ");
            return;
        }

        // Simulate API call
        toast.success("Đăng ký bản tin thành công!");
        setEmail('');
    };

    return (
        <section className="relative w-full bg-white pt-12 pb-12 lg:pb-24">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#fff5f6_0%,_#ffffff_70%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                {/* Title */}
                <h2 data-reveal="up" className="font-display text-xl md:text-3xl lg:text-4xl tracking-tight mb-2">
                    <span className="text-[#1a1a1a]">ĐĂNG KÝ </span>
                    <span className="text-[#f01a33]">CÂU LẠC BỘ LÀM ĐẸP NGAY</span>
                </h2>

                {/* Subtitle */}
                <p data-reveal="up" data-reveal-delay="90" className="font-body text-[#666666] text-base md:text-lg mb-4 max-w-2xl mx-auto">
                    Đăng ký nhận bản tin để cập nhật tin tức mới, bộ sưu tập và ưu đãi đặc biệt
                </p>

                {/* Subscription Form */}
                <form data-reveal="scale" data-reveal-delay="170" onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 max-w-xl mx-auto w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Địa chỉ email của bạn"
                        className="flex-1 w-full md:w-auto px-6 py-4 bg-white border border-[#e5e5e5] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#f01a33] text-[#1a1a1a] font-body"
                        suppressHydrationWarning
                    />
                    <Button type="submit" className="w-full md:w-auto relative bg-[#f01a33] text-white px-12 py-4 h-auto rounded-[10px] text-lg font-medium overflow-hidden group shadow-lg shadow-red-500/20 hover:shadow-xl transition-shadow duration-500">
                        <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Đăng Ký</span>
                        <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                    </Button>
                </form>
            </div>

            {/* Features Bar - Overlapping Footer */}
            <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-30 w-full lg:translate-y-1/2 mt-12 lg:mt-0">
                <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
                    <div data-reveal="scale" data-reveal-delay="220" className="bg-[#fcfcfc] rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 py-8 px-6 md:px-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#f01a33] flex items-center justify-center shrink-0 shadow-md shadow-red-200">
                                    <Truck className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-base text-[#1a1a1a] font-semibold tracking-tight">Miễn Phí Vận Chuyển</span>
                                    <span className="font-body text-[10px] text-[#888888]">Giao Hàng Toàn Quốc</span>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#f01a33] flex items-center justify-center shrink-0 shadow-md shadow-red-200">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-base text-[#1a1a1a] font-semibold tracking-tight">Đường Dây Nóng</span>
                                    <span className="font-body text-[10px] text-[#888888]">+ 1234000</span>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#f01a33] flex items-center justify-center shrink-0 shadow-md shadow-red-200">
                                    <Headphones className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-base text-[#1a1a1a] font-semibold tracking-tight">24/7</span>
                                    <span className="font-body text-[10px] text-[#888888]">Hỗ Trợ Khách Hàng</span>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#f01a33] flex items-center justify-center shrink-0 shadow-md shadow-red-200">
                                    <RefreshCcw className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display text-base text-[#1a1a1a] font-semibold tracking-tight">Đổi Trả</span>
                                    <span className="font-body text-[10px] text-[#888888]">Đổi Hàng Nhanh Chóng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FanClubSection;
