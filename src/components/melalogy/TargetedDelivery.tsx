/*
 * Guideline 17 (Background & material): deep-cherry treatment hero used
 * deliberately, once, where the red product IS the subject — followed by an
 * off-white band so the page returns to its clean canvas.
 */
const TargetedDelivery = () => (
  <>
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-delivery-title">
      <div className="mlg-shell mlg-split mlg-rise">
        <div>
          <p className="mlg-eyebrow mlg-eyebrow--rule">Targeted delivery</p>
          <h2 className="mlg-display" id="mlg-delivery-title">
            Đúng hoạt chất chưa đủ.
            <em>Hoạt chất cần được đưa đến đúng vùng cần tác động.</em>
          </h2>
          <div className="mlg-statline">
            <strong>X50® Pure White</strong>
            <span>Targeted delivery technology</span>
          </div>
        </div>

        <figure className="mlg-delivery" style={{ margin: 0 }}>
          <img
            src="/assets/brand-banner-x50.png"
            alt="Melalogy X50 Pure White — Barrier Fortify Cream và Pigment Correct Serum"
            loading="lazy"
          />
        </figure>
      </div>
    </section>

    {/* Controlled · Stable · Sustainable */}
    <section className="mlg-light" style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
      <div className="mlg-shell mlg-rise" style={{ textAlign: 'center' }}>
        <h2 className="mlg-display mlg-display--sm">
          Không chỉ sáng hơn.
          <em>Ổn định hơn để duy trì vẻ sáng đó.</em>
        </h2>
        <ul className="mlg-triplet">
          <li>Controlled</li>
          <li>Stable</li>
          <li>Sustainable</li>
        </ul>
      </div>
    </section>
  </>
);

export default TargetedDelivery;
