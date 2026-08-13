import { useState } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryIcons from '@/components/CategoryIcons';
import ProductGrid from '@/components/ProductGrid';
import EditorialSection from '@/components/EditorialSection';
import ToolsSection from '@/components/ToolsSection';
import BestSellers from '@/components/BestSellers';
import TrustSection from '@/components/TrustSection';
import PromoCTA from '@/components/PromoCTA';
import BeautyDeal from '@/components/BeautyDeal';
import LipstickFeature from '@/components/LipstickFeature';
import BeautyTransformation from '@/components/BeautyTransformation';
import GlowSection from '@/components/GlowSection';
import TestimonialsSection from '@/components/TestimonialsSection';

import DiscoverNext from '@/components/DiscoverNext';
import FanClubSection from '@/components/FanClubSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      <div className={`min-h-screen overflow-x-hidden transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="pt-[72px]">
          <HeroSection />
          <BeautyDeal />
          <CategoryIcons />
          <LipstickFeature />
          <BeautyTransformation />
          <GlowSection />
          <TestimonialsSection />
          <DiscoverNext />

          <FanClubSection />
        </main>
        <Footer />
      </div>
    </>
  );
};


export default Index;

