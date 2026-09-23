'use client';

import { Layers, ScanEye, Target } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';

/*
 * Brand guideline 01 (Foundation) + 02 (The Science of Melanin), rendered as
 * the deck lays it out: the equation, then the belief, then the three
 * mechanism cards, then the mission statement.
 */
const beliefIcons = [ScanEye, Layers, Target];

const BrandFoundation = () => {
  const c = useSection('science.foundation');

  return (
  <>
    {/* MELALOGY = MELANIN + DERMALOGY */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-equation-title">
      <div className="mlg-shell mlg-equation mlg-rise">
        <div className="mlg-venn" aria-hidden="true">
          <div className="mlg-venn__circle">
            <strong>{c.venn1Title}</strong>
            <span>{c.venn1Copy}</span>
          </div>
          <div className="mlg-venn__circle">
            <strong>{c.venn2Title}</strong>
            <span>{c.venn2Copy}</span>
          </div>
        </div>

        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">{c.equationEyebrow}</p>
          <h2 className="mlg-display" id="mlg-equation-title">
            {c.equationTitle} {c.equationAccent && <em>{c.equationAccent}</em>}
          </h2>
          <p className="mlg-copy">{c.equationBody}</p>
        </div>
      </div>
    </section>

    {/* Câu hỏi mở đầu */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-story-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">{c.storyEyebrow}</p>
          <h2 className="mlg-display" id="mlg-story-title">
            {c.storyTitle}{" "}
            {c.storyAccent && <em>{c.storyAccent}</em>}
          </h2>
        </div>

        <div>
          <p className="mlg-copy" style={{ marginTop: 0 }}>
            {c.storyBody}
          </p>
          <div className="mlg-statline">
            <strong>{c.storyStat}</strong>
            <span>{c.storyStatNote}</span>
          </div>
        </div>
      </div>
    </section>

    {/* Niềm tin + 3 cơ chế — nền off-white, đúng tỷ lệ 60–70% canvas sáng */}
    <section className="mlg-section mlg-light" aria-labelledby="mlg-belief-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--center">{c.beliefEyebrow}</p>
        <h2 className="mlg-display mlg-display--sm" id="mlg-belief-title" style={{ textAlign: 'center' }}>
          {c.beliefTitle}{" "}
          {c.beliefTitleAccent && <em>{c.beliefTitleAccent}</em>}
        </h2>

        <div className="mlg-card-row">
          {c.beliefs.map(({ title, copy }, index) => {
            const Icon = beliefIcons[index % beliefIcons.length];
            return (
              <article className="mlg-card" key={index}>
                <span className="mlg-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  </>
  );
};

export default BrandFoundation;
