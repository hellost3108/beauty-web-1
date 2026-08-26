"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ScanLine,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { allProducts } from "@/data/productsData";
import { useShop } from "@/context/ShopContext";
import styles from "./collection-2026.module.css";
import type { StorefrontProduct } from "@/types/cms";

const signals = [
  { index: "01", label: "Thiếu nước", category: "Cấp Ẩm", color: "#52c8f4", tint: "#e6f8ff" },
  { index: "02", label: "Mỏng manh", category: "Phục Hồi", color: "#91c936", tint: "#f0f9de" },
  { index: "03", label: "Xỉn màu", category: "Làm Sáng", color: "#f0c51f", tint: "#fff9d8" },
  { index: "04", label: "Thiếu sức sống", category: "Rạng Rỡ", color: "#9274c8", tint: "#f2ecfb" },
];

type Product = StorefrontProduct;
type ToneStyle = CSSProperties & { "--signal": string; "--signal-tint": string };

export default function Collection2026({ initialProducts = allProducts }: { initialProducts?: StorefrontProduct[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [sortBy, setSortBy] = useState("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const categories = useMemo(
    () => ["Tất Cả", ...Array.from(new Set(initialProducts.map((product) => product.category)))],
    [initialProducts],
  );

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categories.includes(category)) setActiveCategory(category);
  }, [categories, searchParams]);

  const products = useMemo(() => {
    const result = initialProducts.filter((product) => activeCategory === "Tất Cả" || product.category === activeCategory);
    if (sortBy === "price-low-high") return [...result].sort((a, b) => a.rawPrice - b.rawPrice);
    if (sortBy === "price-high-low") return [...result].sort((a, b) => b.rawPrice - a.rawPrice);
    return result;
  }, [activeCategory, initialProducts, sortBy]);

  const addQuantityToCart = (product: Product) => {
    for (let index = 0; index < quantity; index += 1) addToCart(product);
    setQuickView(null);
    setQuantity(1);
  };

  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.hero} aria-labelledby="collection-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-reveal="up"><ScanLine aria-hidden="true" /> Melalogy skin signal index / 2026</p>
            <h1 id="collection-title" className={styles.heroTitle} data-reveal="up" data-reveal-delay="80">
              Một bộ sưu tập.<br /><span>Bốn tín hiệu da.</span>
            </h1>
            <p className={styles.heroText} data-reveal="up" data-reveal-delay="150">
              Không bắt bạn đoán. Mỗi Energy Shot được mã hoá bằng một màu, một nhu cầu và một công thức tập trung để bạn chọn đúng điều da đang cần.
            </p>
            <a href="#signal-grid" className={styles.heroLink} data-reveal="up" data-reveal-delay="220">
              Đọc tín hiệu của da <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className={styles.signalBoard} data-reveal="scale" aria-label="Bốn tín hiệu làn da">
            <div className={styles.boardHead}><span>Signal</span><span>Response</span></div>
            {signals.map((signal) => (
              <button key={signal.index} type="button" className={styles.signalRow} onClick={() => setActiveCategory(signal.category)}>
                <span className={styles.signalIndex}>{signal.index}</span>
                <span className={styles.signalDot} style={{ backgroundColor: signal.color }} />
                <span>{signal.label}</span>
                <strong>{signal.category}</strong>
                <ArrowUpRight aria-hidden="true" />
              </button>
            ))}
            <div className={styles.boardFoot}><Sparkles aria-hidden="true" /> 4 công thức hydrogel · 1 hệ lựa chọn rõ ràng</div>
          </div>
        </div>
      </section>

      <section className={styles.catalogue} id="signal-grid" aria-labelledby="catalogue-title">
        <div className={styles.catalogueHead}>
          <div>
            <p className={styles.kicker}>The signal edit</p>
            <h2 id="catalogue-title">Chọn theo trạng thái da hôm nay.</h2>
          </div>
          <p>Da thay đổi. Lựa chọn của bạn cũng có thể thay đổi — không cần cố định một công thức cho mọi ngày.</p>
        </div>

        <div className={styles.filterDock} aria-label="Bộ lọc sản phẩm">
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? styles.categoryActive : ""}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <label className={styles.sortControl}>
            <span className="sr-only">Sắp xếp sản phẩm</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Nổi bật</option>
              <option value="price-low-high">Giá tăng dần</option>
              <option value="price-high-low">Giá giảm dần</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </label>
        </div>

        <div className={styles.productGrid} data-motion-stagger>
          {products.map((product, index) => {
            const signal = signals.find((item) => item.category === product.category) ?? signals[0];
            const tone = { "--signal": signal.color, "--signal-tint": signal.tint } as ToneStyle;
            return (
              <article key={product.id} className={styles.productCard} style={tone} data-reveal="scale">
                <div className={styles.productMedia}>
                  <div className={styles.productMetaTop}>
                    <span>{signal.index} / 04</span>
                    <span><i style={{ backgroundColor: signal.color }} /> {product.category}</span>
                  </div>
                  <img src={product.image} alt={product.name} width="900" height="900" loading={index < 2 ? "eager" : "lazy"} />
                  <button
                    type="button"
                    className={`${styles.wishlist} ${isInWishlist(product.id) ? styles.wishlistActive : ""}`}
                    onClick={() => addToWishlist(product)}
                    aria-label={`Thêm ${product.name} vào yêu thích`}
                  >
                    <Heart aria-hidden="true" />
                  </button>
                </div>

                <div className={styles.productCopy}>
                  <p className={styles.productSignal}>Khi da cần · {signal.label}</p>
                  <h3>{product.name}</h3>
                  <p className={styles.ingredients}>{product.ingredients}</p>
                  <div className={styles.productBottom}>
                    <strong>{product.price}đ</strong>
                    <div className={styles.productActions}>
                      <button type="button" onClick={() => setQuickView(product)}>Xem nhanh</button>
                      <button type="button" className={styles.cartButton} onClick={() => addToCart(product)} aria-label={`Thêm ${product.name} vào giỏ`}>
                        <ShoppingBag aria-hidden="true" /> <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {products.length === 0 && <p className={styles.empty}>Chưa có công thức phù hợp với bộ lọc này.</p>}
      </section>

      <section className={styles.method} aria-label="Phương pháp lựa chọn Melalogy">
        <div className={styles.methodIntro} data-reveal="left">
          <p>Melalogy selection method</p>
          <h2>Ít bước hơn.<br />Đúng tín hiệu hơn.</h2>
        </div>
        <ol>
          <li data-reveal="up"><span>01</span><div><h3>Quan sát</h3><p>Đọc trạng thái làn da ở thời điểm hiện tại.</p></div></li>
          <li data-reveal="up" data-reveal-delay="80"><span>02</span><div><h3>Đối chiếu</h3><p>Chọn màu và công thức tương ứng với tín hiệu.</p></div></li>
          <li data-reveal="up" data-reveal-delay="160"><span>03</span><div><h3>Chăm vừa đủ</h3><p>Dành một khoảng nghỉ tập trung, không kéo dài chu trình.</p></div></li>
        </ol>
      </section>

      <Dialog open={Boolean(quickView)} onOpenChange={(open) => { if (!open) { setQuickView(null); setQuantity(1); } }}>
        <DialogContent className={styles.quickView}>
          <DialogTitle className="sr-only">Xem nhanh {quickView?.name}</DialogTitle>
          <DialogDescription className="sr-only">Thông tin và thao tác mua nhanh sản phẩm</DialogDescription>
          {quickView && (
            <div className={styles.quickGrid}>
              <div className={styles.quickImage}><img src={quickView.image} alt={quickView.name} /></div>
              <div className={styles.quickCopy}>
                <p className={styles.kicker}>Energy Shot / {quickView.category}</p>
                <h2>{quickView.name}</h2>
                <p>{quickView.description}</p>
                <div className={styles.quickIngredients}><Check aria-hidden="true" /> {quickView.ingredients}</div>
                <div className={styles.quickPrice}>{quickView.price}đ</div>
                <div className={styles.quickBuy}>
                  <div className={styles.quantity}>
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Giảm số lượng"><Minus /></button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Tăng số lượng"><Plus /></button>
                  </div>
                  <button type="button" className={styles.quickCart} onClick={() => addQuantityToCart(quickView)}>Thêm vào giỏ</button>
                </div>
                <button type="button" className={styles.detailLink} onClick={() => router.push(`/product/${quickView.id}`)}>Xem đầy đủ <ArrowUpRight /></button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
