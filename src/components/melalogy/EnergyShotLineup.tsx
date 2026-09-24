'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Plus } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useProducts } from '@/components/cms/ProductsProvider';
import { useSection } from '@/components/cms/SectionsProvider';
import { splitLines } from '@/lib/cms/registry';
import styles from './EnergyShotLineup.module.css';
import { productPath } from "@/lib/cms/types";

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

const EnergyShotLineup = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const allProducts = useProducts();
  const content = useSection('home.lineup');

  return (
    <section className="mlg-section mlg-dark" aria-labelledby="mlg-lineup-title">
      <div className="mlg-shell mlg-rise">
        <p className="mlg-eyebrow mlg-eyebrow--center">{content.eyebrow}</p>
        <h2
          className={`mlg-display mlg-display--sm ${styles.title}`}
          id="mlg-lineup-title"
          style={{ textAlign: 'center' }}
        >
          <span className={styles.titleLead}>
            {splitLines(content.title).map((line, index) => (
              <span key={index}>
                {index > 0 && ' '}
                {line}
              </span>
            ))}
          </span>
          {content.titleAccent && (
            <em className={styles.titleAccent}>
              {splitLines(content.titleAccent).map((line, index) => (
                <span key={index}>
                  {index > 0 && ' '}
                  {line}
                </span>
              ))}
            </em>
          )}
        </h2>
        <p className={`mlg-copy mlg-copy--center ${styles.description}`}>
          {content.description}
        </p>

        <div
          className={`mlg-lineup ${styles.rail}`}
          role="region"
          aria-label={`${allProducts.length} công thức Energy Shot, cuộn ngang để xem từng sản phẩm`}
          tabIndex={0}
        >
          {allProducts.map((product, index) => {
            const sku = skuColour[product.category];
            const colour = sku?.colour ?? product.accentColor;
            const actives = product.actives || sku?.actives || product.ingredients;
            const wished = isInWishlist(product.id);
            const titleId = `mlg-product-title-${product.id}`;

            return (
              <article
                className={`mlg-product ${styles.card}`}
                key={product.id}
                style={{ '--sku': colour } as React.CSSProperties}
                aria-labelledby={titleId}
                aria-posinset={index + 1}
                aria-setsize={allProducts.length}
              >
                <div className="mlg-product__media">
                  <Link href={productPath(product)} aria-label={product.name}>
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
                  <h3 className="mlg-product__name" id={titleId}>
                    <Link
                      href={productPath(product)}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {product.subtitle}
                    </Link>
                  </h3>
                  <p className="mlg-product__actives">{actives}</p>

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
                      {content.addLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Link href={content.ctaHref || '/shop'} className="mlg-cta">
            {content.ctaLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnergyShotLineup;
