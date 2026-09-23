'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';

import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import BrandFoundation from '@/components/melalogy/BrandFoundation';
import MissionVision from '@/components/melalogy/MissionVision';
import TargetedDelivery from '@/components/melalogy/TargetedDelivery';
import { useSection } from '@/components/cms/SectionsProvider';
import { splitList } from '@/lib/cms/registry';

const HeroLink = ({ href, className, children }: { href: string; className: string; children: React.ReactNode }) =>
  href.startsWith('#') ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );

const MelaninScience = () => {
  const hero = useSection('science.hero');
  const delivery = useSection('science.delivery');

  return (
  <div className="mlg-science-page min-h-screen overflow-x-hidden">
    <BrandNav overlay />

    <main>
      <section className="mlg-science-hero mlg-dark" aria-labelledby="mlg-science-hero-title">
        <div className="mlg-science-hero__noise" aria-hidden="true" />
        <div className="mlg-science-hero__orbit" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
          <i />
        </div>

        <div className="mlg-shell mlg-science-hero__content">
          <div className="mlg-science-hero__index" aria-hidden="true">
            <span>{hero.indexLeft}</span>
            <span>{hero.indexRight}</span>
          </div>
          <div className="mlg-science-hero__copy">
            <p className="mlg-eyebrow mlg-eyebrow--rule">{hero.eyebrow}</p>
            <h1 className="mlg-display mlg-display--xl" id="mlg-science-hero-title">
              {hero.title}{" "}
              {hero.titleAccent && <em>{hero.titleAccent}</em>}
            </h1>
            <p className="mlg-copy">{hero.description}</p>
            <div className="mlg-science-hero__actions">
              {hero.primaryLabel && (
                <HeroLink href={hero.primaryHref || '#science-foundation'} className="mlg-cta">
                  {hero.primaryLabel}
                  <ArrowDown aria-hidden="true" />
                </HeroLink>
              )}
              {hero.secondaryLabel && (
                <HeroLink href={hero.secondaryHref || '/shop'} className="mlg-cta mlg-cta--ghost">
                  {hero.secondaryLabel}
                  <ArrowRight aria-hidden="true" />
                </HeroLink>
              )}
            </div>
          </div>
          <div className="mlg-science-hero__footer" aria-hidden="true">
            {splitList(hero.footerWords).map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </div>
      </section>

      <div id="science-foundation">
        <BrandFoundation />
      </div>
      <MissionVision />
      <TargetedDelivery />

      <section className="mlg-science-end mlg-light">
        <div className="mlg-shell mlg-science-end__inner mlg-rise">
          <p className="mlg-eyebrow mlg-eyebrow--center">{delivery.endEyebrow}</p>
          <h2 className="mlg-display mlg-display--sm">
            {delivery.endTitle}{" "}
            {delivery.endAccent && <em>{delivery.endAccent}</em>}
          </h2>
          {delivery.endCtaLabel && (
            <Link href={delivery.endCtaHref || '/shop#shop-products'} className="mlg-cta">
              {delivery.endCtaLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>
    </main>

    <BrandFooter />
  </div>
  );
};

export default MelaninScience;
