'use client';

import { Star } from 'lucide-react';
import { useSection } from '@/components/cms/SectionsProvider';
import { splitList } from '@/lib/cms/registry';
import styles from './RealSkin.module.css';

/*
 * Section 5 of the website-edit deck: "Cảm nhận từ khách hàng".
 * Copy and the aggregate score follow the brand-approved website-edit deck.
 * The compact cards intentionally mix portraits and text-only stories so the
 * section reads like an editorial review wall rather than a repeated carousel.
 */
const skuColours: Record<string, string> = {
  'Cấp Ẩm': 'var(--mlg-sku-hydrating)',
  'Phục Hồi': 'var(--mlg-sku-recovery)',
  'Làm Sáng': 'var(--mlg-sku-brightening)',
  'Rạng Rỡ': 'var(--mlg-sku-radiance)',
};

type Review = {
  name: string;
  role: string;
  quote: string;
  stars: number;
  sku: string;
  skuColour: string;
  image: string | null;
  tags: string[];
};

const ReviewStars = ({ value, className = '' }: { value: number; className?: string }) => (
  <span className={`${styles.reviewStars} ${className}`.trim()} aria-hidden="true">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} data-filled={index < value} strokeWidth={1.7} />
    ))}
  </span>
);

const ReviewCard = ({
  review,
  ordinal,
  position,
  setSize,
  total,
  className = '',
}: {
  review: Review;
  ordinal: number;
  position: number;
  setSize: number;
  total: number;
  className?: string;
}) => (
  <article
    className={`mlg-review ${styles.card} ${className}`.trim()}
    style={{ '--sku': review.skuColour } as React.CSSProperties}
    aria-label={`Đánh giá ${ordinal} trên ${total}, ${review.stars} trên 5 sao của ${review.name}`}
    aria-posinset={position}
    aria-setsize={setSize}
  >
    <span className="mlg-review__number" aria-hidden="true">
      {String(ordinal).padStart(2, '0')}
    </span>
    {review.image && (
      <img src={review.image} alt={`Khách hàng ${review.name}`} loading="lazy" />
    )}
    <div className="mlg-review__body">
      <span className="mlg-review__quote" aria-hidden="true">“</span>
      <p>{review.quote}</p>
      <div>
        <ReviewStars value={review.stars} />
        <strong>{review.name}</strong>
        <em>{review.role}</em>
        <span className="mlg-review__sku">{review.sku} Energy Shot</span>
      </div>
    </div>
  </article>
);

const RealSkin = () => {
  const content = useSection('home.reviews');
  const reviews: Review[] = content.reviews.map((review) => ({
    name: review.name,
    role: review.role,
    quote: review.quote,
    stars: Math.min(5, Math.max(1, Math.round(review.stars || 5))),
    sku: review.sku,
    skuColour: skuColours[review.sku] ?? 'var(--mlg-cherry)',
    image: review.image || null,
    tags: splitList(review.tags),
  }));
  if (reviews.length === 0) return null;
  const [lead, ...rest] = reviews;
  const reviewSummary = { average: Number(content.average) || 0, verifiedCount: content.verifiedCount };

  return (
  <section className="mlg-section mlg-light mlg-testimonials" aria-labelledby="mlg-reviews-title">
    <div className="mlg-shell mlg-rise">
      <header className="mlg-review-heading">
        <span className="mlg-review-heading__index" aria-hidden="true">{content.indexLabel}</span>
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--center">{content.eyebrow}</p>
          <h2
            className={`mlg-display mlg-display--sm ${styles.title}`}
            id="mlg-reviews-title"
          >
            <span className={styles.titleLead}>{content.title}</span>
            {content.titleAccent && <em>{content.titleAccent}</em>}
          </h2>
          <p className={`mlg-copy mlg-copy--center ${styles.description}`}>
            {content.description}
          </p>
        </div>
        <span className="mlg-review-heading__note">{content.note}</span>
      </header>

      <article
        className={`mlg-review-lead ${styles.lead}`}
        aria-label={`Đánh giá nổi bật ${lead.stars} trên 5 sao của ${lead.name}`}
      >
        <div className={`mlg-review-lead__media ${styles.leadMedia}`}>
          {lead.image && (
            <img
              src={lead.image}
              alt={`Khách hàng ${lead.name} đang dùng Melalogy Energy Shot`}
              loading="lazy"
            />
          )}
        </div>

        <div className={`mlg-review-lead__quote ${styles.leadQuote}`}>
          <span className="mlg-review-lead__label">{content.leadLabel}</span>
          <span className="mlg-quotemark" aria-hidden="true">
            “
          </span>
          <blockquote>{lead.quote}</blockquote>
          <ReviewStars value={lead.stars} className={styles.leadStars} />
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

        <div className={`mlg-score ${styles.score}`}>
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
      </article>

      <div
        className={`mlg-review-row ${styles.desktopRail}`}
        role="region"
        aria-label={`${rest.length} đánh giá khác, cuộn ngang để xem từng đánh giá`}
        tabIndex={0}
      >
        {rest.map((review, index) => (
          <ReviewCard
            key={`${review.name}-${index}`}
            review={review}
            ordinal={index + 2}
            position={index + 1}
            setSize={rest.length}
            total={reviews.length}
          />
        ))}
      </div>

      <div className={styles.mobileProof}>
        <div
          className={styles.mobileScore}
          aria-label={`${reviewSummary.average.toFixed(1)} trên 5 sao, dựa trên ${reviewSummary.verifiedCount} đánh giá đã xác minh`}
        >
          <strong>
            {reviewSummary.average.toFixed(1)}
            <small> / 5</small>
          </strong>
          <div className="mlg-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} />
            ))}
          </div>
          <span>Dựa trên {reviewSummary.verifiedCount} đánh giá đã xác minh.</span>
        </div>

        <div
          className={styles.mobileRail}
          role="region"
          aria-label={`${reviews.length} đánh giá khách hàng, vuốt ngang để xem`}
          tabIndex={0}
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              review={review}
              ordinal={index + 1}
              position={index + 1}
              setSize={reviews.length}
              total={reviews.length}
              className={styles.mobileCard}
            />
          ))}
        </div>
      </div>

      <p className="mlg-review-disclaimer">
        {content.disclaimer}
      </p>
    </div>
  </section>
  );
};

export default RealSkin;
