import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import HeroBanners from '@/components/melalogy/HeroBanners';
import BrandFilm from '@/components/melalogy/BrandFilm';
import SciencePortal from '@/components/melalogy/SciencePortal';
import EnergyShotLineup from '@/components/melalogy/EnergyShotLineup';
import MelaninJournal from '@/components/melalogy/MelaninJournal';
import RealSkin from '@/components/melalogy/RealSkin';
import LetsTalkMelanin from '@/components/melalogy/LetsTalkMelanin';

/*
 * Melalogy homepage 2026 — section order taken from the website-edit deck:
 *   1  banner chạy            → HeroBanners
 *   2  TVC brand              → BrandFilm
 *   3  banner chuyển tiếp     → SciencePortal
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
      <SciencePortal />
      <EnergyShotLineup />
      <MelaninJournal />
      <RealSkin />
      <LetsTalkMelanin />
    </main>

    <BrandFooter />
  </div>
);

export default Index;
