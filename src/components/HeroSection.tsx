"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Sparkles } from "lucide-react";
import { defaultHeroSlides } from "@/data/homepageData";
import type { HeroSlide } from "@/types/cms";

const HeroSection = ({ slides = defaultHeroSlides }: { slides?: HeroSlide[] }) => {
  const safeSlides = slides.length ? slides : defaultHeroSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = safeSlides[currentSlide] ?? safeSlides[0];

  useEffect(() => {
    setCurrentSlide(0);
  }, [safeSlides.length]);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentSlide((current) => (current + 1) % safeSlides.length), 5500);
    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  return (
    <section className="home-hero-2026 relative px-3 pb-3 pt-3 md:px-5 md:pb-5">
      <div className="relative mx-auto grid min-h-[calc(100svh-96px)] max-w-[1600px] overflow-hidden rounded-[28px] bg-[#171414] text-white lg:grid-cols-[0.88fr_1.12fr] lg:rounded-[38px]">
        <div className="relative z-20 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-14 xl:px-20">
          <div className="flex items-center justify-between border-b border-white/15 pb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
            <span className="flex items-center gap-2"><FlaskConical className="h-4 w-4 text-[#ff4755]" />Melalogy Lab / 2026</span>
            <span>0{currentSlide + 1} — 0{safeSlides.length}</span>
          </div>

          <div key={slide.id} className="hero-copy-enter py-14 lg:py-10">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff5a66]"><Sparkles className="h-4 w-4" />{slide.kicker}</p>
            <h1 className="max-w-[720px] font-display text-[clamp(3rem,5.15vw,6.15rem)] tracking-[-0.025em]">
              <span>{slide.headline.part1} </span><span className="block italic text-[#ff4755]">{slide.headline.part2}</span>
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 md:text-base md:leading-8">{slide.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {slide.primaryLabel && slide.primaryUrl && (
                <Link href={slide.primaryUrl} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f52334] px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#171414]">
                  {slide.primaryLabel} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              )}
              {slide.secondaryLabel && slide.secondaryUrl && (
                <Link href={slide.secondaryUrl} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white/10">{slide.secondaryLabel}</Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
            <div><strong className="block font-display text-lg sm:text-2xl">Cấp ẩm</strong><span className="text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Hyaluronic Acid</span></div>
            <div><strong className="block font-display text-lg sm:text-2xl">Phục hồi</strong><span className="text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Madecassic Acid</span></div>
            <div><strong className="block font-display text-lg sm:text-2xl">Làm sáng</strong><span className="text-[9px] uppercase tracking-widest text-white/45 sm:text-[10px]">Niacinamide</span></div>
          </div>
        </div>

        <div className="relative min-h-[52svh] overflow-hidden bg-[#eee7e2] lg:min-h-full">
          {safeSlides.map((item, index) => (
            <div key={item.id} className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] ${index === currentSlide ? "scale-100 opacity-100" : "pointer-events-none scale-[1.04] opacity-0"}`}>
              <picture className="block h-full w-full">
                {item.mobileImage && <source media="(max-width: 767px)" srcSet={item.mobileImage} />}
                <img src={item.image} alt={`${item.headline.part1} ${item.headline.part2}`} width={1920} height={1080} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" className="h-full w-full object-cover object-center" />
              </picture>
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
          <div className="absolute right-5 top-5 rounded-full border border-white/40 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">Hydrogel Energy Shot</div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 rounded-full border border-white/30 bg-black/25 p-2 backdrop-blur-xl md:left-auto md:w-fit">
            {safeSlides.map((item, index) => (
              <button key={item.id} type="button" aria-label={`Hiển thị slide ${index + 1}`} aria-current={index === currentSlide} onClick={() => setCurrentSlide(index)} className={`h-9 rounded-full transition-all duration-500 ${index === currentSlide ? "w-20 bg-white" : "w-9 bg-white/25 hover:bg-white/50"}`}>
                <span className={`text-[10px] font-bold ${index === currentSlide ? "text-black" : "text-white"}`}>0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
