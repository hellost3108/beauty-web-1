import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import HeroBanners from '@/components/melalogy/HeroBanners';
import BrandFilm from '@/components/melalogy/BrandFilm';
import SciencePortal from '@/components/melalogy/SciencePortal';
import EnergyShotLineup from '@/components/melalogy/EnergyShotLineup';
import MelaninJournal from '@/components/melalogy/MelaninJournal';
import RealSkin from '@/components/melalogy/RealSkin';
import LetsTalkMelanin from '@/components/melalogy/LetsTalkMelanin';
import type { MelalogyBlogPost } from '@/data/melalogyBlogPosts';
import type { HeroSlide, HomepageSection, StorefrontProduct } from '@/types/cms';

const Index = ({
  heroSlides,
  whyMelalogy,
  products,
  posts,
}: {
  heroSlides: HeroSlide[];
  whyMelalogy: HomepageSection;
  products: StorefrontProduct[];
  posts: MelalogyBlogPost[];
}) => (
  <div className="min-h-screen overflow-x-hidden">
    <BrandNav overlay />
    <main>
      <h1 className="sr-only">Melalogy — khoa học sắc tố và chăm sóc làn da</h1>
      <HeroBanners slides={heroSlides} />
      <BrandFilm />
      <SciencePortal content={whyMelalogy} />
      <EnergyShotLineup products={products} />
      <MelaninJournal posts={posts} />
      <RealSkin />
      <LetsTalkMelanin />
    </main>
    <BrandFooter compact />
  </div>
);

export default Index;
