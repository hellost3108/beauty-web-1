"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Product image gallery in the style of Shopee / marketplace listings: one
 * large image and a single row of thumbnails (5 visible) that scrolls
 * sideways with arrow buttons, however many images the product has.
 */
export default function ProductGallery({ images, alt, badge }: { images: string[]; alt: string; badge?: ReactNode }) {
  const list = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ left: false, right: false });
  const stripRef = useRef<HTMLDivElement>(null);

  const index = Math.min(active, Math.max(list.length - 1, 0));

  const updateEdges = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setEdges({
      left: strip.scrollLeft > 4,
      right: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    const strip = stripRef.current;
    if (!strip) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(strip);
    return () => observer.disconnect();
  }, [list.length, updateEdges]);

  // Keep the active thumbnail visible when changing image with the big arrows.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft;
    const right = left + thumb.offsetWidth;
    if (left < strip.scrollLeft) strip.scrollTo({ left, behavior: "smooth" });
    else if (right > strip.scrollLeft + strip.clientWidth) strip.scrollTo({ left: right - strip.clientWidth, behavior: "smooth" });
  }, [index]);

  const scrollStrip = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: "smooth" });
  };

  const go = (direction: 1 | -1) => setActive((current) => (current + direction + list.length) % list.length);

  if (!list.length) return null;

  return (
    <div className="space-y-3">
      <div className="group relative aspect-square overflow-hidden rounded-[20px] bg-[#f9f8f7]">
        {badge}
        <img src={list[index]} alt={alt} className="h-full w-full object-cover" />
        {list.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#111] shadow-md opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#111] shadow-md opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
              {index + 1}/{list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="relative">
          <div
            ref={stripRef}
            onScroll={updateEdges}
            className="flex snap-x gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {list.map((image, imageIndex) => (
              <button
                key={`${image}-${imageIndex}`}
                type="button"
                onClick={() => setActive(imageIndex)}
                onMouseEnter={() => setActive(imageIndex)}
                aria-label={`Xem ảnh ${imageIndex + 1}`}
                aria-current={imageIndex === index}
                className={`relative aspect-square w-[calc((100%-2.5rem)/5)] shrink-0 snap-start overflow-hidden rounded-lg border-2 bg-[#f9f8f7] transition ${
                  imageIndex === index ? "border-[#b31324]" : "border-transparent hover:border-[#b31324]/40"
                }`}
              >
                <img src={image} alt={`${alt} ${imageIndex + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          {edges.left && (
            <button
              type="button"
              aria-label="Cuộn ảnh sang trái"
              onClick={() => scrollStrip(-1)}
              className="absolute left-0 top-1/2 grid h-10 w-7 -translate-y-1/2 place-items-center rounded-r-md bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {edges.right && (
            <button
              type="button"
              aria-label="Cuộn ảnh sang phải"
              onClick={() => scrollStrip(1)}
              className="absolute right-0 top-1/2 grid h-10 w-7 -translate-y-1/2 place-items-center rounded-l-md bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
