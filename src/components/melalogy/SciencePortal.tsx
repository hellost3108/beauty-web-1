import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/*
 * Homepage section 3 in the edit deck. The long-form science story now lives
 * on /melanin-science; this restrained portal keeps the homepage conversion
 * path short while still giving the brand premise a clear place to enter.
 */
const SciencePortal = () => (
  <section className="mlg-science-portal mlg-light" aria-labelledby="mlg-science-portal-title">
    <div className="mlg-science-portal__grid mlg-rise">
      <div className="mlg-science-portal__copy">
        <p className="mlg-eyebrow mlg-eyebrow--rule">Melanin Science</p>
        <h2 className="mlg-display mlg-display--sm" id="mlg-science-portal-title">
          Không bắt đầu từ lời hứa trắng nhanh.
          <em>Bắt đầu từ cơ chế sắc tố.</em>
        </h2>
        <p className="mlg-copy">
          Khám phá nền tảng Melanin + Dermalogy, ba trụ cột khoa học và công nghệ dẫn truyền
          đúng đích phía sau Melalogy.
        </p>
        <Link href="/melanin-science" className="mlg-cta">
          Khám phá Melanin Science
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="mlg-science-portal__media">
        <img
          src="/assets/brand-banner-x50.png"
          alt="Melalogy X50 Pure White — công nghệ dẫn truyền đúng đích"
          loading="lazy"
        />
        <span>Mechanism → Target → Benefit</span>
      </div>
    </div>
  </section>
);

export default SciencePortal;
