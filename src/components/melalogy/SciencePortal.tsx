import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './SciencePortal.module.css';
import type { HomepageSection } from '@/types/cms';

/*
 * Homepage section 3 in the edit deck. The long-form science story now lives
 * on /melanin-science; this restrained portal keeps the homepage conversion
 * path short while still giving the brand premise a clear place to enter.
 */
const SciencePortal = ({ content }: { content: HomepageSection }) => (
  <section className="mlg-science-portal mlg-light" aria-labelledby="mlg-science-portal-title">
    <div className="mlg-science-portal__grid mlg-rise">
      <div className={`mlg-science-portal__copy ${styles.copy}`}>
        <p className="mlg-eyebrow mlg-eyebrow--rule">{content.eyebrow}</p>
        <h2
          className={`mlg-display mlg-display--sm ${styles.title}`}
          id="mlg-science-portal-title"
        >
          <span className={styles.titleLead}>{content.title}</span>
          <em>{content.highlightedText}</em>
        </h2>
        <p className={`mlg-copy ${styles.description}`}>
          {content.body || content.subtitle}
        </p>
        <Link href={content.ctaUrl || '/melanin-science'} className={`mlg-cta ${styles.cta}`}>
          {content.ctaLabel || 'Khám phá Melanin Science'}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="mlg-science-portal__media">
        <img
          src={content.imageUrl || '/assets/brand-banner-x50.png'}
          alt={content.subtitle || 'Melalogy X50 Pure White — công nghệ dẫn truyền đúng đích'}
          loading="lazy"
        />
        <span>Mechanism → Target → Benefit</span>
      </div>
    </div>
  </section>
);

export default SciencePortal;
