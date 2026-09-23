'use client';

import { useSection } from '@/components/cms/SectionsProvider';
import { splitList } from '@/lib/cms/registry';

/*
 * Guideline 17 (Background & material): deep-cherry treatment hero used
 * deliberately, once, where the red product IS the subject — followed by an
 * off-white band so the page returns to its clean canvas.
 */
const TargetedDelivery = () => {
  const c = useSection('science.delivery');

  return (
  <>
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-delivery-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">{c.eyebrow}</p>
          <h2 className="mlg-display" id="mlg-delivery-title">
            {c.title}
            {c.titleAccent && <em>{c.titleAccent}</em>}
          </h2>
          <div className="mlg-statline">
            <strong>{c.stat}</strong>
            <span>{c.statNote}</span>
          </div>
        </div>

        <figure className="mlg-delivery" style={{ margin: 0 }}>
          {c.image && <img src={c.image} alt={c.imageAlt} loading="lazy" />}
        </figure>
      </div>
    </section>

    {/* Controlled · Stable · Sustainable */}
    <section className="mlg-light" style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
      <div className="mlg-shell mlg-rise" style={{ textAlign: 'center' }}>
        <h2 className="mlg-display mlg-display--sm">
          {c.bandTitle}
          {c.bandAccent && <em>{c.bandAccent}</em>}
        </h2>
        <ul className="mlg-triplet">
          {splitList(c.bandWords).map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </section>
  </>
  );
};

export default TargetedDelivery;
