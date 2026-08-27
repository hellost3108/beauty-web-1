import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import HeroBanners from '@/components/melalogy/HeroBanners';
import BrandFilm from '@/components/melalogy/BrandFilm';
import BrandFoundation from '@/components/melalogy/BrandFoundation';
import MissionVision from '@/components/melalogy/MissionVision';
import TargetedDelivery from '@/components/melalogy/TargetedDelivery';
import EnergyShotLineup from '@/components/melalogy/EnergyShotLineup';
import MelaninJournal from '@/components/melalogy/MelaninJournal';
import RealSkin from '@/components/melalogy/RealSkin';
import LetsTalkMelanin from '@/components/melalogy/LetsTalkMelanin';

/*
 * Melalogy homepage 2026 — section order taken from the website-edit deck:
 *   1  banner chạy            → HeroBanners
 *   2  TVC brand              → BrandFilm
 *   3  banner (brand story)   → BrandFoundation · MissionVision · TargetedDelivery
 *   3b thông tin mua hàng     → EnergyShotLineup
 *   4  blog                   → MelaninJournal
 *   5  cảm nhận khách hàng    → RealSkin
 *   6  liên hệ                → LetsTalkMelanin
 */
const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <BrandNav overlay />

    {/* The hero runs full-bleed under the floating bar, as in the mockup. */}
    <main>
      <HeroBanners />
      <BrandFilm />
      <BrandFoundation />
      <MissionVision />
      <TargetedDelivery />
      <EnergyShotLineup />
      <MelaninJournal />
      <RealSkin />
      <LetsTalkMelanin />

      {/* Closing statement — guideline sign-off line */}
      <section className="mlg-dark">
        <div className="mlg-shell mlg-closing mlg-rise">
          <img className="mlg-closing__mark" src="/assets/logo.png" alt="Melalogy" />
          <h2 className="mlg-display mlg-display--sm">
            The science of melanin.
            <em>Beauty must have a reason.</em>
          </h2>
          <Link href="/shop" className="mlg-cta mlg-cta--ghost">
            Khám phá Energy Shot
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>

    <BrandFooter />
  </div>
);

export default Index;
