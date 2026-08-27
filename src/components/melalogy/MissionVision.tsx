import { Atom, ShieldCheck, Waves } from 'lucide-react';

const milestones = [
  { year: '2026', title: 'Launch', copy: 'Khởi đầu hành trình khoa học sắc tố.', current: true },
  { year: '2027', title: 'Top of mind', copy: 'Thương hiệu chuyên biệt về sắc tố tại Việt Nam.' },
  { year: '2028', title: 'International', copy: 'Mở rộng ra thị trường quốc tế.' },
  { year: '2030', title: 'Global brand', copy: 'Global pigmentation science skincare brand.' },
];

const pillars = [
  {
    icon: Atom,
    title: 'Melanin science',
    copy: 'Hiểu và tác động vào quá trình hình thành melanin một cách khoa học và chọn lọc.',
  },
  {
    icon: ShieldCheck,
    title: 'Antioxidant defense',
    copy: 'Bảo vệ da trước oxy hóa — yếu tố kích hoạt và làm trầm trọng rối loạn sắc tố.',
  },
  {
    icon: Waves,
    title: 'Barrier stability',
    copy: 'Củng cố và duy trì hàng rào khỏe mạnh để giữ nền da ổn định và bền vững.',
  },
];

const MissionVision = () => (
  <>
    {/* Mission */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-mission-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">Mission</p>
          <h2 className="mlg-display" id="mlg-mission-title">
            Phát triển các giải pháp sắc tố
            <em>dựa trên cơ chế khoa học.</em>
          </h2>
        </div>
        <p className="mlg-copy" style={{ marginTop: 0 }}>
          Kết hợp tác động melanin có kiểm soát, bảo vệ da trước oxy hóa và củng cố hàng rào da để
          dẫn hướng đến kết quả sáng khỏe có khả năng duy trì.
        </p>
      </div>
    </section>

    {/* Vision timeline */}
    <section className="mlg-section mlg-light" aria-labelledby="mlg-vision-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--rule">Vision</p>
        <h2 className="mlg-display mlg-display--sm" id="mlg-vision-title">
          Từ khoa học sắc tố Việt Nam
          <em>đến thương hiệu chuyên biệt toàn cầu.</em>
        </h2>

        <ol className="mlg-timeline">
          {milestones.map((milestone) => (
            <li key={milestone.year} data-current={milestone.current ? 'true' : undefined}>
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
        <p className="mlg-eyebrow mlg-eyebrow--center">Melalogy science</p>
        <h2
          className="mlg-display mlg-display--sm"
          id="mlg-science-title"
          style={{ textAlign: 'center' }}
        >
          Ba trụ cột
          <em>của một nền da ổn định.</em>
        </h2>

        <div className="mlg-card-row">
          {pillars.map(({ icon: Icon, title, copy }) => (
            <article className="mlg-card" key={title}>
              <span className="mlg-card__icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default MissionVision;
