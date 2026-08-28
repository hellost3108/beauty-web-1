import { Star } from 'lucide-react';

/*
 * Section 5 of the website-edit deck: "Cảm nhận từ khách hàng".
 * Copy and the aggregate score follow the brand-approved website-edit deck.
 * The compact cards intentionally mix portraits and text-only stories so the
 * section reads like an editorial review wall rather than a repeated carousel.
 */
const reviews = [
  {
    name: 'Thu Hà',
    role: 'Khách hàng tại TP. Hồ Chí Minh',
    quote:
      'Chưa bao giờ mình dùng một em mặt nạ mà phải lên đánh giá như này. Chất thạch ôm sát da, không hề rơi rớt; đắp xong da căng bóng, ẩm mịn và rất mượt.',
    stars: 5,
    sku: 'Cấp Ẩm',
    skuColour: 'var(--mlg-sku-hydrating)',
    image: '/assets/skincare-mask-application.jpg',
    tags: ['Ôm sát da', 'Dịu nhẹ', 'Đủ ẩm'],
  },
  {
    name: 'Khánh Linh',
    role: 'Khách hàng tại Hà Nội',
    quote:
      'Đắp vào là thấy mát rượi, hạ nhiệt da rất nhanh. Miếng thạch dày dặn nhưng bám chặt, đi lại vẫn không lo rơi trượt.',
    stars: 5,
    sku: 'Phục Hồi',
    skuColour: 'var(--mlg-sku-recovery)',
    image: '/assets/about-hydrogel-ritual-2026.jpg',
    tags: [],
  },
  {
    name: 'Diệu My',
    role: 'Khách hàng tại Đà Nẵng',
    quote:
      'Đắp ngủ qua đêm 3–4 tiếng, sáng ra miếng thạch mỏng trong lại và da nhìn căng bóng, đàn hồi hơn hẳn.',
    stars: 5,
    sku: 'Rạng Rỡ',
    skuColour: 'var(--mlg-sku-radiance)',
    image: '/assets/skincare-face-lifestyle.jpg',
    tags: [],
  },
  {
    name: 'Ngọc Anh',
    role: 'Khách hàng tại TP. Hồ Chí Minh',
    quote:
      'Trước giờ mình dùng nhiều mask Hàn, nhưng em này thật sự làm mình bất ngờ. Sáng dậy da căng mọng và mượt hơn rất nhiều.',
    stars: 5,
    sku: 'Làm Sáng',
    skuColour: 'var(--mlg-sku-brightening)',
    image: '/assets/about-hero-vietnamese-portrait-2026.jpg',
    tags: [],
  },
  {
    name: 'Hương Giang',
    role: 'Khách hàng tại TP. Hồ Chí Minh',
    quote:
      'Giá bằng nửa mask ngoại mà trải nghiệm lại rất thuyết phục. Cảm giác đắp rất đã, da mềm mượt và nhìn có sức sống hơn.',
    stars: 4,
    sku: 'Cấp Ẩm',
    skuColour: 'var(--mlg-sku-hydrating)',
    image: null,
    tags: [],
  },
];

const [lead, ...rest] = reviews;
const reviewSummary = { average: 4.8, verifiedCount: 'hơn 1.200' };

const RealSkin = () => (
  <section className="mlg-section mlg-light mlg-testimonials" aria-labelledby="mlg-reviews-title">
    <div className="mlg-shell mlg-rise">
      <header className="mlg-review-heading">
        <span className="mlg-review-heading__index" aria-hidden="true">05 / REAL SKIN</span>
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--center">Đánh giá của khách hàng</p>
          <h2 className="mlg-display mlg-display--sm" id="mlg-reviews-title">
            Real skin.
            <em>Real experience.</em>
          </h2>
          <p className="mlg-copy mlg-copy--center">
            Trải nghiệm thật từ những làn da đã sử dụng Melalogy Energy Shot Hydrogel.
          </p>
        </div>
        <span className="mlg-review-heading__note">Melalogy / Vietnam / 2026</span>
      </header>

      <div className="mlg-review-lead">
        <div className="mlg-review-lead__media">
          <img src={lead.image} alt={`Khách hàng ${lead.name} đang dùng Melalogy Energy Shot`} loading="lazy" />
        </div>

        <div className="mlg-review-lead__quote">
          <span className="mlg-review-lead__label">Hydrating Energy Shot</span>
          <span className="mlg-quotemark" aria-hidden="true">
            “
          </span>
          <blockquote>{lead.quote}</blockquote>
          <div className="mlg-review-author">
            <strong>{lead.name}</strong>
            <span>{lead.role}</span>
          </div>
          {lead.tags.length > 0 && (
            <ul className="mlg-pills">
              {lead.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mlg-score">
          <strong>
            {reviewSummary.average.toFixed(1)}
            <small> / 5</small>
          </strong>
          <div className="mlg-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} />
            ))}
          </div>
          <span>
            Dựa trên {reviewSummary.verifiedCount} đánh giá
            <br />
            đã xác minh.
          </span>
        </div>
      </div>

      <div className="mlg-review-row" aria-label="Các đánh giá khác">
        {rest.map((review, index) => (
          <article
            className="mlg-review"
            key={review.name}
            style={{ '--sku': review.skuColour } as React.CSSProperties}
          >
            <span className="mlg-review__number" aria-hidden="true">
              {String(index + 2).padStart(2, '0')}
            </span>
            {review.image && (
              <img src={review.image} alt={`Khách hàng ${review.name}`} loading="lazy" />
            )}
            <div className="mlg-review__body">
              <span className="mlg-review__quote" aria-hidden="true">“</span>
              <p>{review.quote}</p>
              <div>
                <strong>{review.name}</strong>
                <em>{review.role}</em>
                <span className="mlg-review__sku">{review.sku} Energy Shot</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mlg-review-disclaimer">
        Cảm nhận có thể khác nhau tùy tình trạng da và cách sử dụng của mỗi người.
      </p>
    </div>
  </section>
);

export default RealSkin;
