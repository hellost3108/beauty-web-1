import React, { useEffect, useState } from 'react';

interface SplashLoaderProps {
  onComplete: () => void;
}

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
    const exitTimer = window.setTimeout(() => setIsLeaving(true), 650);
    const completeTimer = window.setTimeout(onComplete, 1050);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#f7f5f1] transition-[opacity,transform] duration-500 ease-out ${
        isLeaving ? '-translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="status"
      aria-label="Đang mở Melalogy"
    >
      <div className="flex w-[min(72vw,280px)] flex-col items-center">
        <img
          src="/assets/logo-full.png"
          alt="Melalogy"
          className="h-auto w-full object-contain"
        />
        <div className="mt-6 h-px w-full overflow-hidden bg-black/10">
          <span className="block h-full w-full origin-left animate-[loader-line_700ms_cubic-bezier(.2,.8,.2,1)_both] bg-[#f01a33]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loader-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;
