'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Section 1 of the website-edit deck: "banner chạy".
 * The four key visuals are finished master artwork — they carry their own
 * headline, logo and cherry accent — so the carousel deliberately adds no
 * overlay text of its own (guideline 11: one hero, one message).
 */
const banners = [
  {
    src: '/assets/brand-banner-melanin.png',
    alt: 'MELALOGY — The Science of Melanin. Khoa học bắt đầu từ việc hiểu sắc tố.',
    label: 'The science of melanin',
    focus: '60% center',
  },
  {
    src: '/assets/brand-banner-skincare.png',
    alt: 'Melalogy — thương hiệu khoa học chuyên biệt về sắc tố',
    label: 'Pigmentation science',
    focus: 'center',
  },
  {
    src: '/assets/brand-banner-x50.png',
    alt: 'Melalogy X50 Pure White — công nghệ dẫn truyền đúng đích',
    label: 'X50® Pure White',
    focus: 'center',
  },
  {
    src: '/assets/brand-banner-energy-shot.png',
    alt: 'Melalogy Energy Shot Hydrogel Mask — bộ sưu tập bốn công thức',
    label: 'Energy Shot Hydrogel',
    focus: 'center',
  },
];

const SLIDE_MS = 6500;

const HeroBanners = () => {
  const [active, setActive] = useState(0);
  // The slide leaving the stage stays painted underneath the incoming one, so
  // the crossfade never dips to the background colour.
  const [previous, setPrevious] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    const next = ((index % banners.length) + banners.length) % banners.length;
    setActive((current) => {
      if (current === next) return current;
      setPrevious(current);
      return next;
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    timer.current = setTimeout(() => goTo(active + 1), SLIDE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, goTo]);

  return (
    <section className="mlg-hero" aria-label="Banner thương hiệu Melalogy" aria-roledescription="carousel">
      <div className="mlg-hero__viewport">
        {banners.map((banner, index) => (
          <div
            key={banner.src}
            className="mlg-hero__slide"
            data-state={
              index === active ? 'current' : index === previous ? 'previous' : 'idle'
            }
            aria-hidden={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${banners.length} — ${banner.label}`}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              style={{ '--slide-focus': banner.focus } as React.CSSProperties}
              /* The first banner is the LCP element; the rest can wait. */
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}

        <div className="mlg-hero__scrim" />

        <div className="mlg-hero__rail">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              className="mlg-hero__dot"
              data-active={index === active}
              data-seen={index < active}
              onClick={() => goTo(index)}
              aria-label={`Xem banner ${banner.label}`}
            >
              <span
                className="mlg-hero__track"
                style={{ '--slide-duration': `${SLIDE_MS}ms` } as React.CSSProperties}
              />
              <span className="mlg-hero__label">{banner.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanners;
