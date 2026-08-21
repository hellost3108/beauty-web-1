import React, { useEffect, useState } from 'react';

interface SplashLoaderProps {
  onComplete: () => void;
}

const formulas = [
  { index: '01', label: 'Cấp ẩm', color: '#4ca9cf' },
  { index: '02', label: 'Phục hồi', color: '#7cae42' },
  { index: '03', label: 'Làm sáng', color: '#e4bd31' },
  { index: '04', label: 'Rạng rỡ', color: '#9a79bb' },
];

const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (reduceMotion) {
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const exitTimer = window.setTimeout(() => setIsLeaving(true), 1100);
    const completeTimer = window.setTimeout(onComplete, 1800);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden ${isLeaving ? 'pointer-events-none' : ''}`}
      role="status"
      aria-label="Đang mở Melalogy Skin Lab"
    >
      <div
        className={`loader-curtain absolute inset-y-0 left-0 w-1/2 origin-left bg-[#f3f0eb] transition-transform duration-700 ${
          isLeaving ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="loader-grid absolute inset-0 opacity-50" />
        <div className="gel-field gel-field-blue absolute -left-[18vw] top-[14vh] h-[58vw] max-h-[720px] w-[58vw] max-w-[720px]" />
      </div>

      <div
        className={`loader-curtain absolute inset-y-0 right-0 w-1/2 origin-right bg-[#f3f0eb] transition-transform duration-700 ${
          isLeaving ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="loader-grid absolute inset-0 -translate-x-full opacity-50" />
        <div className="gel-field gel-field-violet absolute -right-[17vw] bottom-[10vh] h-[54vw] max-h-[680px] w-[54vw] max-w-[680px]" />
      </div>

      <div className={`absolute inset-0 transition-[opacity,transform] duration-300 ${isLeaving ? 'scale-[0.985] opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="absolute left-5 top-5 flex items-center gap-3 font-body text-[9px] font-semibold uppercase tracking-[0.24em] text-black/45 md:left-10 md:top-9 md:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f01a33]" />
          Melalogy Skin Lab
        </div>
        <span className="absolute right-5 top-5 font-body text-[9px] font-semibold uppercase tracking-[0.24em] text-black/35 md:right-10 md:top-9 md:text-[10px]">
          Signal → Formula
        </span>

        <div className="absolute left-1/2 top-1/2 w-[min(84vw,600px)] -translate-x-1/2 -translate-y-1/2">
          <div className="loader-logo-reveal overflow-hidden px-8">
            <img
              src="/assets/logo-full.png"
              alt="Melalogy"
              className="mx-auto h-auto w-[min(68vw,390px)] object-contain"
            />
          </div>

          <p className="loader-story mt-7 text-center font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45 md:text-xs md:tracking-[0.28em]">
            Lắng nghe tín hiệu · Chọn đúng công thức
          </p>

          <div className="mt-9 grid grid-cols-4 gap-2 md:mt-11 md:gap-3">
            {formulas.map((formula, index) => (
              <div key={formula.index} className="min-w-0">
                <div className="h-[2px] overflow-hidden bg-black/10">
                  <span
                    className="loader-segment block h-full w-full origin-left"
                    style={{ backgroundColor: formula.color, animationDelay: `${160 + index * 120}ms` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 font-body text-[8px] font-semibold uppercase tracking-[0.08em] text-black/42 sm:text-[9px] md:text-[10px] md:tracking-[0.13em]">
                  <span style={{ color: formula.color }}>{formula.index}</span>
                  <span className="truncate">{formula.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[8px] font-medium uppercase tracking-[0.22em] text-black/30 md:bottom-9 md:text-[9px]">
          Hydrogel Energy Shot · 2026
        </span>
      </div>

      <style jsx>{`
        .loader-curtain {
          transition-timing-function: cubic-bezier(.76, 0, .24, 1);
        }

        .loader-grid {
          background-image:
            linear-gradient(rgb(20 18 16 / 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgb(20 18 16 / 0.045) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at center, black, transparent 76%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 76%);
        }

        .gel-field {
          border-radius: 44% 56% 62% 38% / 48% 40% 60% 52%;
          filter: blur(12px);
          opacity: 0.32;
          animation: gel-drift 3.6s ease-in-out infinite alternate;
        }

        .gel-field-blue {
          background:
            radial-gradient(circle at 64% 32%, rgb(255 255 255 / 0.94) 0 8%, transparent 9%),
            radial-gradient(circle at 44% 46%, #9edcf2, #d9f2fa 52%, transparent 72%);
        }

        .gel-field-violet {
          background:
            radial-gradient(circle at 32% 62%, rgb(255 255 255 / 0.88) 0 7%, transparent 8%),
            radial-gradient(circle at 58% 52%, #c7b2dd, #eee5f5 54%, transparent 74%);
          animation-delay: -1.1s;
        }

        .loader-logo-reveal img {
          animation: logo-reveal 720ms cubic-bezier(.2,.8,.2,1) both;
        }

        .loader-story {
          animation: story-reveal 620ms 180ms cubic-bezier(.2,.8,.2,1) both;
        }

        .loader-segment {
          animation: segment-fill 680ms cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes logo-reveal {
          from { opacity: 0; transform: translateY(105%); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes story-reveal {
          from { opacity: 0; letter-spacing: 0.38em; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes segment-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes gel-drift {
          from { transform: translate3d(-2%, -1%, 0) rotate(-2deg) scale(0.96); }
          to { transform: translate3d(3%, 2%, 0) rotate(3deg) scale(1.04); }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;
