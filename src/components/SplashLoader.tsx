import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplashLoaderProps {
    onComplete: () => void;
}

const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
    const [stage, setStage] = useState<'initial' | 'text' | 'circle' | 'line' | 'pull' | 'finish'>('initial');

    useEffect(() => {
        // Hide Navbar logo initially
        const navbarLogo = document.getElementById('navbar-logo-container');
        if (navbarLogo) navbarLogo.style.opacity = '0';

        // Stage 1: Logo appears
        const timer1 = setTimeout(() => setStage('text'), 200);

        // Stage 2: Circle appears (from top)
        const timer2 = setTimeout(() => setStage('circle'), 700);

        // Stage 3: Line grows down
        const timer3 = setTimeout(() => setStage('line'), 1200);

        // Stage 4: Pull up (Loader slides up, logo moves to header)
        const timer4 = setTimeout(() => setStage('pull'), 1800);

        // Stage 5: Circle gone, valid header position
        const timer5 = setTimeout(() => {
            setStage('finish');
            // Show Navbar logo when loader settles
            if (navbarLogo) {
                navbarLogo.style.transition = 'opacity 0.2s ease-in-out';
                navbarLogo.style.opacity = '1';
            }
        }, 2800);

        // Complete
        const timer6 = setTimeout(onComplete, 3100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            // Ensure logo is visible on cleanup
            if (navbarLogo) navbarLogo.style.opacity = '1';
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] h-full w-full overflow-hidden">
            {/* White Background Layer - Slides Up */}
            <div
                className={cn(
                    "absolute inset-0 bg-white transition-transform ease-in-out z-0",
                    (stage === 'pull' || stage === 'finish') ? "-translate-y-full" : "translate-y-0"
                )}
                style={{ transitionDuration: '900ms' }}
            />

            {/* Content Layer - Stays Fixed (but moves internally) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">

                <div
                    className={cn(
                        "relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 transition-all ease-in-out",
                        (stage === 'pull' || stage === 'finish')
                            ? "translate-y-[calc(32px-50vh)] scale-100 md:translate-y-[calc(36px-50vh)]"
                            : "translate-y-0 scale-100"
                    )}
                    style={{ transitionDuration: '900ms' }}
                >
                    {/* Circle Border - Drops in then Fades out slowly during pull */}
                    <div
                        className={cn(
                            "absolute inset-0 border-[3px] border-[#A65D2E] rounded-full transition-all duration-700 ease-out",
                            stage === 'initial' || stage === 'text' ? "-translate-y-full opacity-0" :
                                (stage === 'pull' || stage === 'finish') ? "translate-y-0 opacity-0" : "translate-y-0 opacity-100"
                        )}
                    />

                    {/* Melalogy Logo - Stays visible until replaced by Navbar logo */}
                    <img
                        src="/assets/logo-full.png"
                        alt="Melalogy"
                        className={cn(
                            "w-40 md:w-52 object-contain transition-opacity duration-300 ease-in-out",
                            stage === 'initial' ? "opacity-0" : "opacity-100"
                        )}
                    />

                    {/* Vertical Line - Attached to bottom of circle */}
                    <div
                        className={cn(
                            "absolute top-full left-1/2 -translate-x-1/2 w-[3px] bg-[#A65D2E] origin-top transition-all ease-in-out",
                            stage === 'line' ? "h-[50vh]" :
                                stage === 'pull' ? "h-[50vh] opacity-0" : "h-0 opacity-0"
                        )}
                        style={{ transitionDuration: stage === 'pull' ? '600ms' : '900ms' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SplashLoader;
