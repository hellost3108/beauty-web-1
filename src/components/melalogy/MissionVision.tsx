'use client';

import { Atom, ShieldCheck, Waves } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';

const pillarIcons = [Atom, ShieldCheck, Waves];

const MissionVision = () => {
  const c = useSection('science.mission');

  return (
  <>
    {/* Mission */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-mission-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">{c.missionEyebrow}</p>
          <h2 className="mlg-display" id="mlg-mission-title">
            {c.missionTitle}
            {c.missionAccent && <em>{c.missionAccent}</em>}
          </h2>
        </div>
        <p className="mlg-copy" style={{ marginTop: 0 }}>
          {c.missionBody}
        </p>
      </div>
    </section>

    {/* Vision timeline */}
    <section className="mlg-section mlg-light" aria-labelledby="mlg-vision-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--rule">{c.visionEyebrow}</p>
        <h2 className="mlg-display mlg-display--sm" id="mlg-vision-title">
          {c.visionTitle}
          {c.visionAccent && <em>{c.visionAccent}</em>}
        </h2>

        <ol className="mlg-timeline">
          {c.milestones.map((milestone, index) => (
            <li key={`${milestone.year}-${index}`} data-current={milestone.current ? 'true' : undefined}>
              <strong>{milestone.year}</strong>
              <b>{milestone.title}</b>
              <span>{milestone.copy}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Ba trụ cột khoa học */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-science-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--center">{c.pillarsEyebrow}</p>
        <h2
          className="mlg-display mlg-display--sm"
          id="mlg-science-title"
          style={{ textAlign: 'center' }}
        >
          {c.pillarsTitle}
          {c.pillarsAccent && <em>{c.pillarsAccent}</em>}
        </h2>

        <div className="mlg-card-row">
          {c.pillars.map(({ title, copy }, index) => {
            const Icon = pillarIcons[index % pillarIcons.length];
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

export default MissionVision;
