import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DiscoverNext = () => {
    return (
        <section className="py-24 bg-white">
            <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
                {/* Section Title */}
                <div data-reveal="up" className="text-center mb-16 space-y-4">
                    <h2 className="font-display text-3xl md:text-4xl leading-none tracking-tight">
                        <span className="text-[#1a1a1a]">Khám Phá </span>
                        <span className="text-[#f01a33]">Thêm</span>
                    </h2>
                    <p className="font-body text-[#666666] max-w-2xl mx-auto text-base md:text-[1.1rem] leading-relaxed">
                        Tìm hiểu trọn bộ sưu tập Energy Shot và những chia sẻ chăm sóc da từ Melalogy
                    </p>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    {/* Full Collection */}
                    <div data-reveal="left" className="flex flex-col items-center group">
                        <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden shadow-lg mb-8">
                            <img
                                data-parallax="0.035"
                                src="/assets/mask-hydrating-blue.png"
                                alt="Bộ sưu tập Energy Shot"
                                className="w-full h-[108%] -translate-y-[4%] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="font-display text-2xl md:text-[1.75rem] text-[#1a1a1a] mb-6">
                            Toàn Bộ Sưu Tập
                        </h3>
                        <Button asChild className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group/btn shadow-xl hover:shadow-2xl transition-shadow duration-500">
                            <Link href="/collection">
                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Mua Ngay</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Link>
                        </Button>
                    </div>

                    {/* From Our Blogs */}
                    <div data-reveal="right" data-reveal-delay="130" className="flex flex-col items-center group">
                        <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden shadow-lg mb-8">
                            <img
                                data-parallax="0.035"
                                src="/assets/skincare-face-lifestyle.jpg"
                                alt="Blog chăm sóc da Melalogy"
                                className="w-full h-[108%] -translate-y-[4%] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="font-display text-2xl md:text-[1.75rem] text-[#1a1a1a] mb-6">
                            Từ Blog Của Chúng Tôi
                        </h3>
                        <Button asChild className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group/btn shadow-xl hover:shadow-2xl transition-shadow duration-500">
                            <Link href="/blog">
                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Đọc Thêm</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscoverNext;
