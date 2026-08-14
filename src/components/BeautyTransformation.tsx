import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BeautyTransformation = () => {
    return (
        <section className="relative w-full max-w-full min-h-screen overflow-x-hidden flex flex-col xl:flex-row">
            {/* Left Image Section */}
            <div className="h-[50vh] xl:h-full xl:flex-1 relative">
                <img
                    src="/assets/skincare-mask-application.jpg"
                    alt="Ứng dụng mặt nạ hydrogel Melalogy"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Image Section */}
            <div className="h-[50vh] xl:h-full xl:flex-1 relative">
                <img
                    src="/assets/mask-radiance-purple.png"
                    alt="Mặt nạ hydrogel Energy Shot Melalogy"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Center Floating Card - Shifted slightly down */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-[650px]">
                <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-center space-y-6">
                    <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a] leading-tight">
                        Khoa Học Của Melanin
                    </h2>
                    <p className="font-body text-[#666666] text-sm md:text-base max-w-md mx-auto">
                        Nơi khoa học da liễu gặp gỡ vẻ đẹp tự nhiên của làn da bạn
                    </p>
                    <div className="pt-2">
                        <Button asChild className="relative bg-[#f01a33] text-white px-20 py-3 text-sm font-medium rounded-[16px] h-auto font-display tracking-tight overflow-hidden group shadow-[0_12px_40px_-10px_rgba(240,26,51,0.35)] hover:shadow-xl transition-shadow duration-500">
                            <Link href="/about">
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Câu Chuyện Thương Hiệu</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeautyTransformation;
