import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import HeroBanners from '@/components/melalogy/HeroBanners';
import BrandFilm from '@/components/melalogy/BrandFilm';
import SciencePortal from '@/components/melalogy/SciencePortal';
import EnergyShotLineup from '@/components/melalogy/EnergyShotLineup';
import MelaninJournal from '@/components/melalogy/MelaninJournal';
import RealSkin from '@/components/melalogy/RealSkin';
import LetsTalkMelanin from '@/components/melalogy/LetsTalkMelanin';

const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <BrandNav overlay />
    <main>
      <h1 className="sr-only">Melalogy — khoa học sắc tố và chăm sóc làn da</h1>
      <HeroBanners />
      <BrandFilm />
      <SciencePortal />
      <EnergyShotLineup />
      <MelaninJournal />
      <RealSkin />
      <LetsTalkMelanin />
    </main>
    <BrandFooter compact />
  </div>
);

export default Index;
