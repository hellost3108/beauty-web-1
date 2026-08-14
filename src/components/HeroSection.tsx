"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    headline: { part1: "Khoa Học Của ", part2: "Melanin" },
    subheadline: "Melalogy mang đến vẻ đẹp bắt nguồn từ khoa học — cấp ẩm sâu và phục hồi làn da mỗi ngày.",
    image: "/assets/skincare-mask-application.jpg",
  },
  {
    id: 2,
    headline: { part1: "Cấp Ẩm ", part2: "Chuyên Sâu" },
    subheadline: "Hydrating Energy Shot với Hyaluronic Acid và Ceramide NP, phục hồi hàng rào bảo vệ da.",
    image: "/assets/mask-hydrating-blue.png",
  },
  {
    id: 3,
    headline: { part1: "Phục Hồi & ", part2: "Làm Dịu Da" },
    subheadline: "Recovery Energy Shot với Madecassic Acid và chiết xuất rau má, dịu làn da nhạy cảm.",
    image: "/assets/mask-recovery-green-hero.png",
  },
  {
    id: 4,
    headline: { part1: "Làm Sáng & ", part2: "Đều Màu Da" },
    subheadline: "Brightening Energy Shot với Niacinamide và cám gạo, mang lại vẻ rạng rỡ tự nhiên.",
    image: "/assets/mask-brightening-yellow.png",
  },
  {
    id: 5,
    headline: { part1: "Săn Chắc & ", part2: "Trẻ Hoá Da" },
    subheadline: "Radiance Energy Shot với Sodium DNA và Acetyl Hexapeptide-8, cải thiện độ đàn hồi.",
    image: "/assets/mask-radiance-purple.png",
  },
  {
    id: 6,
    headline: { part1: "4 Công Thức, ", part2: "1 Mục Tiêu Rạng Rỡ" },
    subheadline: "Cấp ẩm, phục hồi, làm sáng, tái tạo — chọn mặt nạ phù hợp nhất với làn da của bạn.",
    image: "/assets/skincare-face-lifestyle.jpg",
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(currentSlide);

      const next = (currentSlide + 1) % slides.length;

      // Alternate direction every transition
      const dir: 'up' | 'down' = currentSlide % 2 === 0 ? 'down' : 'up';

      setDirection(dir);
      setCurrentSlide(next);
      setIsAnimating(true);

      // Reset animating state after transition matches CSS duration (1.2s)
      setTimeout(() => setIsAnimating(false), 1200);

    }, 4000); // Slower carousel: 4s per slide (1.2s animation + 2.8s view)

    return () => clearInterval(timer);
  }, [currentSlide]);

  const getTextAnimationClass = (index: number) => {
    if (index === currentSlide && isAnimating) return `animate-text-enter-${direction}`;
    if (index === prevSlide && isAnimating) return `animate-text-exit-${direction}`;
    if (index === currentSlide && !isAnimating) return 'translate-y-0 opacity-100 z-10';
    return 'opacity-0 z-0 pointer-events-none absolute inset-0';
  };

  const getImageAnimationClass = (index: number) => {
    if (index === currentSlide && isAnimating) return `animate-image-enter-${direction}`;
    if (index === prevSlide && isAnimating) return `animate-image-exit-${direction}`;
    if (index === currentSlide && !isAnimating) return 'translate-y-0 opacity-100 z-10';
    return 'opacity-0 z-0 pointer-events-none absolute inset-0';
  };

  return (
    <section className="relative w-full overflow-hidden">
      <style>{`
        /* Text animations - slower */
        .animate-text-enter-up { 
          animation: slideInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-text-exit-up { 
          animation: slideOutUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-text-enter-down { 
          animation: slideInDown 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-text-exit-down { 
          animation: slideOutDown 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }

        /* Image animations - slower */
        .animate-image-enter-up { 
          animation: slideInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-image-exit-up { 
          animation: slideOutUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-image-enter-down { 
          animation: slideInDown 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
        .animate-image-exit-down { 
          animation: slideOutDown 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }

        @keyframes slideInUp {
          from { transform: translate3d(0, 150%, 0); opacity: 0; }
          to { transform: translate3d(0, 0, 0); opacity: 1; }
        }
        @keyframes slideOutUp {
          from { transform: translate3d(0, 0, 0); opacity: 1; }
          to { transform: translate3d(0, -150%, 0); opacity: 0; }
        }
        @keyframes slideInDown {
          from { transform: translate3d(0, -150%, 0); opacity: 0; }
          to { transform: translate3d(0, 0, 0); opacity: 1; }
        }
        @keyframes slideOutDown {
          from { transform: translate3d(0, 0, 0); opacity: 1; }
          to { transform: translate3d(0, 150%, 0); opacity: 0; }
        }

        /* Mobile landscape adjustments */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-text-section {
            height: 100vh !important;
          }
          .hero-image-section {
            display: none !important;
          }
        }
      `}</style>

      {/* Text Section - Animates separately */}
      <div className="hero-text-section relative w-full h-[30vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white py-8">
        {/* Background (Static) */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#fff5f6_0%,_#ffffff_70%)]" />

        {/* Text Content - Animated */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={`text-${slide.id}`}
              className={`${index === currentSlide && !isAnimating ? 'relative' : 'absolute top-0 left-0 right-0'} w-full h-full flex items-center justify-center ${getTextAnimationClass(index)}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="relative z-10 w-full max-w-none px-4 flex flex-col items-center">
                <h1 className="font-display text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.1] mb-2 tracking-tight font-normal px-4">
                  <span className="text-[#1a1a1a]">{slide.headline.part1}</span>
                  <span className="text-[#f01a33]">{slide.headline.part2}</span>
                </h1>
                <p className="font-sans text-xs md:text-sm lg:text-base text-[#666666] mt-2 w-full max-w-none md:whitespace-nowrap leading-relaxed opacity-90 px-4">
                  {slide.subheadline}
                </p>

                <div className="mt-4 z-20">
                  <Button asChild className="relative bg-[#f01a33] text-white px-8 py-3 md:px-10 md:py-4 text-sm md:text-base font-medium rounded-[12px] h-auto font-display tracking-tight overflow-hidden group shadow-[0_12px_40px_-10px_rgba(240,26,51,0.35)] hover:shadow-xl transition-shadow duration-500">
                    <Link href="/collection">
                      <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Khám Phá Ngay</span>
                      <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section - Animates separately, responsive height */}
      <div className="hero-image-section relative w-full h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden bg-[#f7f3f2]">
        {slides.map((slide, index) => (
          <div
            key={`image-${slide.id}`}
            className={`${index === currentSlide && !isAnimating ? 'relative' : 'absolute top-0 left-0 right-0'} w-full h-full ${getImageAnimationClass(index)}`}
          >
            <img
              src={slide.image}
              alt={slide.headline.part2}
              className="w-full h-full object-cover object-[center_20%] md:object-center block"
            />
          </div>
        ))}
      </div>
    </section>                                                                                                                                                                                                          
  );
};

export default HeroSection;
