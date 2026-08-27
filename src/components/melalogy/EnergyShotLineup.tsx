'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Headphones, Plus, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { allProducts } from '@/data/productsData';
import { useShop } from '@/context/ShopContext';

/*
 * Section 3 of the website-edit deck: "Thông tin mua hàng".
 * Guideline 09 (Product system): cherry/black/white stay the framework, the
 * SKU colour only differentiates the four formulas — it never becomes the
 * brand colour, so it is confined to the tag dot, glow and hover border.
 */
const skuColour: Record<string, { colour: string; actives: string }> = {
  'Cấp Ẩm': { colour: 'var(--mlg-sku-hydrating)', actives: 'Hyaluronic Acid · Ceramide NP' },
  'Phục Hồi': { colour: 'var(--mlg-sku-recovery)', actives: 'Madecassic Acid · Centella Asiatica' },
  'Làm Sáng': { colour: 'var(--mlg-sku-brightening)', actives: 'Niacinamide · Rice Bran Extract' },
  'Rạng Rỡ': { colour: 'var(--mlg-sku-radiance)', actives: 'Sodium DNA · Acetyl Hexapeptide-8' },
};

const assurances = [
  { icon: Truck, title: 'Giao hàng toàn quốc', copy: 'Miễn phí cho đơn từ 500.000₫' },
  { icon: RotateCcw, title: 'Đổi trả rõ ràng', copy: 'Hỗ trợ trong vòng 30 ngày' },
  { icon: Headphones, title: 'Tư vấn theo cơ chế', copy: 'Chọn công thức đúng trạng thái da' },
  { icon: ShieldCheck, title: 'Thanh toán bảo mật', copy: 'Thông tin giao dịch được bảo vệ' },
];

const EnergyShotLineup = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();

  return (
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-lineup-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--center">From science to formula</p>
        <h2
          className="mlg-display mlg-display--sm"
          id="mlg-lineup-title"
          style={{ textAlign: 'center' }}
        >
          Energy Shot Hydrogel
          <em>Bốn công thức, bốn trạng thái da.</em>
        </h2>
        <p className="mlg-copy mlg-copy--center">
          Khoa học chỉ có ý nghĩa khi được chuyển hóa thành một trải nghiệm thực tế trên làn da.
        </p>

        <div className="mlg-lineup">
          {allProducts.map((product) => {
            const sku = skuColour[product.category];
            const wished = isInWishlist(product.id);

            return (
              <article
                className="mlg-product"
                key={product.id}
                style={{ '--sku': sku?.colour } as React.CSSProperties}
              >
                <div className="mlg-product__media">
                  <Link href={`/product/${product.id}`} aria-label={product.name}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </Link>
                  <span className="mlg-product__tag">{product.category}</span>
                  <button
                    type="button"
                    className="mlg-product__wish"
                    data-active={wished}
                    onClick={() =>
                      wished ? removeFromWishlist(product.id) : addToWishlist(product)
                    }
                    aria-pressed={wished}
                    aria-label={
                      wished
                        ? `Bỏ ${product.name} khỏi danh sách yêu thích`
                        : `Thêm ${product.name} vào danh sách yêu thích`
                    }
                  >
                    <Heart aria-hidden="true" />
                  </button>
                </div>

                <div className="mlg-product__body">
                  <h3 className="mlg-product__name">
                    <Link
                      href={`/product/${product.id}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {product.subtitle}
                    </Link>
                  </h3>
                  <p className="mlg-product__actives">{sku?.actives ?? product.ingredients}</p>

                  <div className="mlg-product__foot">
                    <span className="mlg-product__price">
                      {product.price}
                      <small>₫</small>
                    </span>
                    <button
                      type="button"
                      className="mlg-product__add"
                      onClick={() => addToCart(product)}
                      aria-label={`Thêm ${product.name} vào giỏ hàng`}
                    >
                      <Plus aria-hidden="true" />
                      Thêm
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mlg-assurance">
          {assurances.map(({ icon: Icon, title, copy }) => (
            <div key={title}>
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Link href="/shop" className="mlg-cta">
            Khám phá Energy Shot
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnergyShotLineup;
