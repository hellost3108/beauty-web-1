'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './SciencePortal.module.css';
import { useSection } from '@/components/cms/SectionsProvider';

/*
 * Homepage section 3 in the edit deck. The long-form science story now lives
 * on /melanin-science; this restrained portal keeps the homepage conversion
 * path short while still giving the brand premise a clear place to enter.
 */
const SciencePortal = () => {
  const content = useSection('home.science');

  return (
  <section className="mlg-science-portal mlg-light" aria-labelledby="mlg-science-portal-title">
    <div className="mlg-science-portal__grid mlg-rise">
      <div className={`mlg-science-portal__copy ${styles.copy}`}>
        <p className="mlg-eyebrow mlg-eyebrow--rule">{content.eyebrow}</p>
        <h2
          className={`mlg-display mlg-display--sm ${styles.title}`}
          id="mlg-science-portal-title"
        >
          <span className={styles.titleLead}>{content.title}</span>
          {content.titleAccent && <em>{content.titleAccent}</em>}
        </h2>
        <p className={`mlg-copy ${styles.description}`}>
          {content.description}
        </p>
        <Link href={content.ctaHref || '/melanin-science'} className={`mlg-cta ${styles.cta}`}>
          {content.ctaLabel}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="mlg-science-portal__media">
        {content.image && <img src={content.image} alt={content.imageAlt} loading="lazy" />}
        {content.caption && <span>{content.caption}</span>}
      </div>
    </div>
  </section>
  );
};

export default SciencePortal;
