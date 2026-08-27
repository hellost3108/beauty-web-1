import { Star } from 'lucide-react';

/*
 * Section 5 of the website-edit deck: "Cảm nhận từ khách hàng".
 * Copy carried over verbatim from the testimonials already published on the
 * site — no review text, name or rating is invented here. The headline score
 * is derived from these entries rather than hard-coded, so it can never drift
 * from the reviews actually shown.
 */
const reviews = [
  {
    name: 'Minh Anh',
    role: 'Khách hàng tại TP. Hồ Chí Minh',
    quote:
      'Miếng mặt nạ ôm sát và không bị trượt khi đắp. Sau khi dùng, da mình có cảm giác dịu, mềm và đủ ẩm hơn.',
    stars: 5,
    sku: 'Cấp Ẩm',
    skuColour: 'var(--mlg-sku-hydrating)',
    image: '/assets/skincare-mask-application.jpg',
    tags: ['Ôm sát da', 'Dịu nhẹ', 'Đủ ẩm'],
  },
  {
    name: 'Ngọc Hà',
    role: 'Khách hàng tại Hà Nội',
    quote:
      'Mình thích cách Melalogy chia công thức theo từng nhu cầu. Bao bì dễ nhận biết, cách dùng gọn và hợp với những hôm bận rộn.',
    stars: 5,
    sku: 'Làm Sáng',
    skuColour: 'var(--mlg-sku-brightening)',
    image: '/assets/about-hydrogel-ritual-2026.jpg',
    tags: [],
  },
  {
    name: 'Thùy Dương',
    role: 'Khách hàng tại Đà Nẵng',
    quote:
      'Chất hydrogel mát và dễ chịu. Mình có thể chọn đúng loại da đang cần mà không phải thêm quá nhiều bước vào chu trình.',
    stars: 5,
    sku: 'Rạng Rỡ',
    skuColour: 'var(--mlg-sku-radiance)',
    image: '/assets/skincare-face-lifestyle.jpg',
    tags: [],
  },
  {
    name: 'Gia Hân',
    role: 'Khách hàng tại TP. Hồ Chí Minh',
    quote:
      'Mặt nạ mát, ôm da tốt và không bị trượt. Mình thích cảm giác mềm ẩm sau khi tháo mặt nạ.',
    stars: 5,
    sku: 'Phục Hồi',
    skuColour: 'var(--mlg-sku-recovery)',
    image: null,
    tags: [],
  },
];

const [lead, ...rest] = reviews;
const average = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

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
            {average.toFixed(1)}
            <small> / 5</small>
          </strong>
          <div className="mlg-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} />
            ))}
          </div>
          <span>
            Trung bình từ {reviews.length} trải nghiệm
            <br />
            đang hiển thị trên trang.
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
