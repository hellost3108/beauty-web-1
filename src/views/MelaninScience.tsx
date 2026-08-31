import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';

import BrandNav from '@/components/melalogy/BrandNav';
import BrandFooter from '@/components/melalogy/BrandFooter';
import BrandFoundation from '@/components/melalogy/BrandFoundation';
import MissionVision from '@/components/melalogy/MissionVision';
import TargetedDelivery from '@/components/melalogy/TargetedDelivery';

const MelaninScience = () => (
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
            <span>Melalogy Lab / 2026</span>
            <span>01 — 07</span>
          </div>
          <div className="mlg-science-hero__copy">
            <p className="mlg-eyebrow mlg-eyebrow--rule">The science of melanin</p>
            <h1 className="mlg-display mlg-display--xl" id="mlg-science-hero-title">
              Khoa học bắt đầu từ việc
              <em>hiểu sắc tố.</em>
            </h1>
            <p className="mlg-copy">
              Từ câu hỏi về melanin đến những giải pháp có cơ chế rõ ràng: đây là nền tảng khoa
              học, sứ mệnh và tầm nhìn định hình Melalogy.
            </p>
            <div className="mlg-science-hero__actions">
              <a href="#science-foundation" className="mlg-cta">
                Bắt đầu khám phá
                <ArrowDown aria-hidden="true" />
              </a>
              <Link href="/shop" className="mlg-cta mlg-cta--ghost">
                Xem công thức
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mlg-science-hero__footer" aria-hidden="true">
            <span>Melanin</span>
            <span>Dermalogy</span>
            <span>Mechanism-led skincare</span>
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
          <p className="mlg-eyebrow mlg-eyebrow--center">From mechanism to formula</p>
          <h2 className="mlg-display mlg-display--sm">
            Khoa học chỉ có ý nghĩa
            <em>khi trở thành trải nghiệm thật trên làn da.</em>
          </h2>
          <Link href="/shop#shop-products" className="mlg-cta">
            Khám phá Energy Shot
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>

    <BrandFooter />
  </div>
);

export default MelaninScience;
