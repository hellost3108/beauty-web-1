import { useState, useEffect } from 'react';

type AnimationState =
  | 'desktop-22'
  | 'desktop-23'
  | 'desktop-24'
  | 'desktop-25'
  | 'desktop-26'
  | 'desktop-27'
  | 'desktop-28';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [state, setState] = useState<AnimationState>('desktop-22');

  useEffect(() => {
    const timings: Record<AnimationState, number> = {
      'desktop-22': 1200,
      'desktop-23': 600,
      'desktop-24': 800,
      'desktop-25': 800,
      'desktop-26': 800,
      'desktop-27': 600,
      'desktop-28': 1200,
    };

    const stateSequence: AnimationState[] = [
      'desktop-22',
      'desktop-23',
      'desktop-24',
      'desktop-25',
      'desktop-26',
      'desktop-27',
      'desktop-28',
    ];

    const currentIndex = stateSequence.indexOf(state);

    if (currentIndex < stateSequence.length - 1) {
      const timer = setTimeout(() => {
        setState(stateSequence[currentIndex + 1]);
      }, timings[state]);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, timings[state]);
      return () => clearTimeout(timer);
    }
  }, [state, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-card overflow-hidden">
      {/* State: desktop-22 - Brand name only */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${state === 'desktop-22' ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <h1 className="font-brand text-4xl md:text-5xl text-foreground tracking-wide">
          Blushora
        </h1>
      </div>

      {/* State: desktop-23 - Red accent shape */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out ${state === 'desktop-23' ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>

      {/* State: desktop-24 - Circular outline */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out ${state === 'desktop-24' || state === 'desktop-25' || state === 'desktop-26'
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
          }`}
      >
        <div className="w-48 h-48 rounded-full border-[3px] border-primary flex items-center justify-center">
          {/* State: desktop-25 - Brand name inside circle */}
          <span
            className={`font-brand text-2xl text-foreground transition-opacity duration-600 ease-out ${state === 'desktop-25' || state === 'desktop-26' ? 'opacity-100' : 'opacity-0'
              }`}
          >
            Blushora
          </span>
        </div>
      </div>

      {/* State: desktop-26 - White overlay slides up + vertical line */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out ${state === 'desktop-26' || state === 'desktop-27' || state === 'desktop-28'
            ? 'opacity-100'
            : 'opacity-0'
          }`}
      >
        {/* Sliding white overlay */}
        <div
          className={`absolute inset-0 bg-card transition-transform duration-700 ease-out ${state === 'desktop-26' || state === 'desktop-27' || state === 'desktop-28'
              ? 'translate-y-0'
              : 'translate-y-full'
            }`}
        />

        {/* Vertical divider line */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-px bg-primary transition-all duration-600 ease-out ${state === 'desktop-26' || state === 'desktop-27' || state === 'desktop-28'
              ? 'h-20 opacity-100'
              : 'h-0 opacity-0'
            }`}
        />
      </div>

      {/* State: desktop-27 & 28 - Final reveal elements */}
      <div
        className={`absolute inset-0 flex flex-col transition-opacity duration-700 ease-out ${state === 'desktop-27' || state === 'desktop-28' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Navigation bar */}
        <nav
          className={`flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-700 ease-out ${state === 'desktop-28'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
            }`}
          style={{ transitionDelay: state === 'desktop-28' ? '0ms' : '0ms' }}
        >
          <span className="font-brand text-xl text-foreground">Blushora</span>
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors cursor-pointer">Shop</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Collections</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">About</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Contact</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Search</span>
            <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Bag (0)</span>
          </div>
        </nav>

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h2
            className={`font-display text-hero md:text-hero-lg max-w-3xl transition-all duration-700 ease-out ${state === 'desktop-28'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
              }`}
            style={{ transitionDelay: state === 'desktop-28' ? '100ms' : '0ms' }}
          >
            <span className="text-foreground">Your Signature </span>
            <span className="text-primary">Glow Starts Here</span>
          </h2>

          <p
            className={`font-body text-muted-foreground text-lg max-w-xl mt-6 transition-all duration-700 ease-out ${state === 'desktop-28'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
              }`}
            style={{ transitionDelay: state === 'desktop-28' ? '200ms' : '0ms' }}
          >
            Discover luxury beauty essentials crafted for radiance.
            Clean ingredients, timeless elegance.
          </p>

          <button
            className={`mt-8 px-10 py-4 bg-primary text-primary-foreground font-button font-medium rounded-xl shadow-elevated hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ${state === 'desktop-28'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
              }`}
            style={{ transitionDelay: state === 'desktop-28' ? '300ms' : '0ms' }}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
