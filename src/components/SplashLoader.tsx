import React, { useEffect, useState } from 'react';

interface SplashLoaderProps {
  onComplete: () => void;
}

/*
 * Guideline 17: black is the ground for "special KV, film, dramatic science,
 * launch teaser". The splash is that teaser — white master logo on black, one
 * cherry rule, four SKU segments filling as the curtain lifts. Nothing pastel,
 * nothing cute.
 */
const formulas = [
  { index: '01', label: 'Cấp ẩm', color: 'var(--mlg-sku-hydrating)' },
  { index: '02', label: 'Phục hồi', color: 'var(--mlg-sku-recovery)' },
  { index: '03', label: 'Làm sáng', color: 'var(--mlg-sku-brightening)' },
  { index: '04', label: 'Rạng rỡ', color: 'var(--mlg-sku-radiance)' },
];

const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storageKey = 'melalogy:splash-seen';
    const hasSeenSplash = window.sessionStorage.getItem(storageKey) === '1';
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (reduceMotion || hasSeenSplash) {
      onComplete();
      return;
    }

    window.sessionStorage.setItem(storageKey, '1');

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const exitTimer = window.setTimeout(() => setIsLeaving(true), 420);
    const completeTimer = window.setTimeout(onComplete, 850);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onComplete]);

  return (
    <div
      className={`mlg-splash ${isLeaving ? 'is-leaving' : ''}`}
      role="status"
      aria-label="Đang mở Melalogy"
    >
      <div className="mlg-splash__curtain mlg-splash__curtain--left">
        <span className="mlg-splash__molecule" />
      </div>
      <div className="mlg-splash__curtain mlg-splash__curtain--right">
        <span className="mlg-splash__molecule mlg-splash__molecule--alt" />
      </div>

      <div className="mlg-splash__content">
        <span className="mlg-splash__corner mlg-splash__corner--left">
          <i />
          Melalogy
        </span>
        <span className="mlg-splash__corner mlg-splash__corner--right">
          The science of melanin
        </span>

        <div className="mlg-splash__stage">
          <div className="mlg-splash__logo">
            <img src="/assets/logo-full.png" alt="Melalogy" />
          </div>

          <p className="mlg-splash__tagline">Mechanism-led science · Contemporary K-Beauty</p>

          <div className="mlg-splash__segments">
            {formulas.map((formula, index) => (
              <div key={formula.index}>
                <span className="mlg-splash__track">
                  <i
                    style={{
                      backgroundColor: formula.color,
                      animationDelay: `${160 + index * 120}ms`,
                    }}
                  />
                </span>
                <span className="mlg-splash__label">
                  <b style={{ color: formula.color }}>{formula.index}</b>
                  {formula.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <span className="mlg-splash__foot">Energy Shot Hydrogel · 2026</span>
      </div>
    </div>
  );
};

export default SplashLoader;
