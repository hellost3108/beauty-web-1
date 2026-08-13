import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LipstickFeature = () => {
    return (
        <section className="py-24 bg-white overflow-x-hidden max-w-full w-full">
            <div className="w-full px-6 sm:px-10 lg:pl-40 lg:pr-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
                    {/* Text Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
                        <h2 className="font-display text-4xl md:text-5xl text-[#f01a33] leading-none tracking-tight mb-4">
                            Lipstick
                        </h2>
                        <p className="font-body text-base md:text-lg text-[#888888] max-w-sm leading-relaxed mb-8 mx-auto lg:mx-0">
                            Long-lasting, non-drying lipstick is popular.
                        </p>
                        <Button asChild className="relative bg-[#f01a33] text-white w-fit px-14 py-4 text-sm font-bold rounded-[16px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 mx-auto lg:mx-0">
                            <Link href="/shop" className="relative z-10">
                                <div className="absolute inset-0 bg-white h-0 group-hover:h-full transition-all duration-700 ease-liquid mt-auto" style={{ transformOrigin: 'bottom' }} />
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Shop Now</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Images Section */}
                    <div className="flex-[1.8] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* The Leaf Shaped Image - Matches screenshot exactly */}
                        <div className="relative w-full md:w-[45%] aspect-[0.85/1] rounded-tr-[140px] rounded-bl-[140px] rounded-tl-lg rounded-br-lg overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]">
                            <img
                                src="/assets/placeholder-600x600.png"
                                alt="Glossy lips"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* The Rounded Square Image */}
                        <div className="relative w-full md:w-[55%] aspect-[1/1] rounded-[40px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
                            <img
                                src="/assets/placeholder-600x600.png"
                                alt="Product feature"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LipstickFeature;
