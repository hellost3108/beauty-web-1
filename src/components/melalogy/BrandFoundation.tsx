import { Layers, ScanEye, Target } from 'lucide-react';

/*
 * Brand guideline 01 (Foundation) + 02 (The Science of Melanin), rendered as
 * the deck lays it out: the equation, then the belief, then the three
 * mechanism cards, then the mission statement.
 */
const beliefs = [
  {
    icon: ScanEye,
    title: 'Hiểu sắc tố',
    copy: 'Hiểu cơ chế hình thành melanin trước khi thiết kế công thức, thay vì chạy theo hiệu ứng tức thời.',
  },
  {
    icon: Layers,
    title: 'Ổn định nền da',
    copy: 'Củng cố hàng rào bảo vệ và chống oxy hóa để làn da giữ được kết quả một cách bền vững.',
  },
  {
    icon: Target,
    title: 'Can thiệp có kiểm soát',
    copy: 'Tác động đúng mục tiêu, đúng liều lượng — không lạm dụng hoạt chất để đổi lấy tốc độ.',
  },
];

const BrandFoundation = () => (
  <>
    {/* MELALOGY = MELANIN + DERMALOGY */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-equation-title">
      <div className="mlg-shell mlg-equation mlg-rise">
        <div className="mlg-venn" aria-hidden="true">
          <div className="mlg-venn__circle">
            <strong>Melanin</strong>
            <span>Sắc tố tự nhiên của làn da</span>
          </div>
          <div className="mlg-venn__circle">
            <strong>Dermalogy</strong>
            <span>Khoa học về làn da</span>
          </div>
        </div>

        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">Melalogy là gì?</p>
          <h2 className="mlg-display" id="mlg-equation-title">
            Melalogy =<em>Melanin + Dermalogy</em>
          </h2>
          <p className="mlg-copy">
            Melalogy là thương hiệu skincare khoa học chuyên biệt về sắc tố, được xây dựng từ sự thấu
            hiểu melanin và khoa học về làn da. Chúng tôi không tin vào phép màu — chúng tôi tin vào
            cơ chế.
          </p>
        </div>
      </div>
    </section>

    {/* Câu hỏi mở đầu */}
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-story-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">Câu chuyện hình thành</p>
          <h2 className="mlg-display" id="mlg-story-title">
            Melalogy không bắt đầu từ một sản phẩm.
            <em>Nó bắt đầu từ một câu hỏi.</em>
          </h2>
        </div>

        <div>
          <p className="mlg-copy" style={{ marginTop: 0 }}>
            Vì sao làn da trở nên xỉn màu, không đều màu và dễ tái sạm? Bắt đầu từ hơn 5 năm nghiên
            cứu về melanin và hành trình hình thành sắc tố trong làn da.
          </p>
          <div className="mlg-statline">
            <strong>Muốn thay đổi sắc tố, trước hết phải hiểu cơ chế của nó.</strong>
            <span>Mechanism → Benefit</span>
          </div>
        </div>
      </div>
    </section>

    {/* Niềm tin + 3 cơ chế — nền off-white, đúng tỷ lệ 60–70% canvas sáng */}
    <section className="mlg-section mlg-light" aria-labelledby="mlg-belief-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--center">Tone of voice</p>
        <h2 className="mlg-display mlg-display--sm" id="mlg-belief-title" style={{ textAlign: 'center' }}>
          Chúng tôi không tin vào “trắng nhanh”.
          <em>Chúng tôi tin vào cơ chế.</em>
        </h2>

        <div className="mlg-card-row">
          {beliefs.map(({ icon: Icon, title, copy }) => (
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

export default BrandFoundation;
