'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';

const FOCUS_PATTERN = (() => {
  const position = '(?:left|center|right|top|bottom|(?:100|[0-9]{1,2})(?:\\.[0-9]+)?%)';
  return new RegExp(`^${position}(?:\\s+${position})?$`);
})();

const cleanFocus = (value: string) => {
  const focus = value.trim().toLowerCase();
  return FOCUS_PATTERN.test(focus) ? focus : 'center';
};

const HeroBanners = () => {
  const { banners: storedBanners } = useSection('home.hero');
  // Order in the Admin list = order on the website; disabled slides are skipped.
  const banners = useMemo(
    () =>
      storedBanners
        .filter((banner) => banner.enabled && banner.image)
        .map((banner, index) => ({
          id: `${index}-${banner.image}`,
          src: banner.image,
          mobileSrc: banner.mobileImage || undefined,
          alt: banner.alt || banner.label,
          label: banner.label || `Banner ${index + 1}`,
          focus: cleanFocus(banner.focus),
          durationMs: Math.round(Math.min(30, Math.max(3, banner.durationSeconds || 6.5)) * 1000),
          href: banner.href || undefined,
        })),
    [storedBanners],
  );
  const [active, setActive] = useState(0);
  // The slide leaving the stage stays painted underneath the incoming one, so
  // the crossfade never dips to the background colour.
  const [previous, setPrevious] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (banners.length === 0) return;
      const next = ((index % banners.length) + banners.length) % banners.length;
      setActive((current) => {
        if (current === next) return current;
        setPrevious(current);
        return next;
      });
    },
    [banners.length],
  );

  useEffect(() => {
    setActive((current) => (banners.length ? Math.min(current, banners.length - 1) : 0));
    setPrevious(null);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    timer.current = setTimeout(() => goTo(active + 1), banners[active]?.durationMs ?? 6500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, banners, goTo]);

  if (banners.length === 0) return null;

  return (
    <section className="mlg-hero" aria-label="Banner thương hiệu Melalogy" aria-roledescription="carousel">
      <div className="mlg-hero__viewport">
        {banners.map((banner, index) => {
          const artwork = (
            <picture style={{ display: 'block', width: '100%', height: '100%' }}>
              {banner.mobileSrc && (
                <source media="(max-width: 47.99rem)" srcSet={banner.mobileSrc} />
              )}
              <img
                src={banner.src}
                alt={banner.alt}
                style={{ '--slide-focus': banner.focus } as React.CSSProperties}
                /* The first banner is the LCP element; the rest can wait. */
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </picture>
          );

          return (
            <div
              key={banner.id}
              className="mlg-hero__slide"
              data-state={
                index === active ? 'current' : index === previous ? 'previous' : 'idle'
              }
              aria-hidden={index !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${banners.length} — ${banner.label}`}
            >
              {banner.href ? (
                <a
                  href={banner.href}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  {artwork}
                </a>
              ) : (
                artwork
              )}
            </div>
          );
        })}

        <div className="mlg-hero__scrim" />

        {banners.length > 1 && (
          <div className="mlg-hero__arrows" aria-label="Điều khiển chuyển banner">
            <button
              type="button"
              className="mlg-hero__arrow mlg-hero__arrow--previous"
              onClick={() => goTo(active - 1)}
              aria-label={`Banner trước: ${
                banners[(active - 1 + banners.length) % banners.length].label
              }`}
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.7} />
            </button>

            <button
              type="button"
              className="mlg-hero__arrow mlg-hero__arrow--next"
              onClick={() => goTo(active + 1)}
              aria-label={`Banner tiếp theo: ${banners[(active + 1) % banners.length].label}`}
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.7} />
            </button>
          </div>
        )}

        {banners.length > 1 && (
          <div className="mlg-hero__rail">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                className="mlg-hero__dot"
                data-active={index === active}
                data-seen={index < active}
                onClick={() => goTo(index)}
                aria-label={`Xem banner ${banner.label}`}
              >
                <span
                  className="mlg-hero__track"
                  style={
                    { '--slide-duration': `${banner.durationMs}ms` } as React.CSSProperties
                  }
                />
                <span className="mlg-hero__label">{banner.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroBanners;
