"use client";

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    ArrowRight,
    ChevronRight,
    Heart,
    Lock,
    Minus,
    PackageCheck,
    Plus,
    RotateCcw,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    Trash2,
    Truck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop, Product } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/productsData';

export const dynamic = 'force-dynamic';

interface GroupedProduct extends Product {
    quantity: number;
}

const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

const Cart2026 = () => {
    const { cart, removeFromCart, addToCart, removeOneFromCart, addToWishlist, isInWishlist } = useShop();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item, quantity: 0 };
        acc[item.id].quantity += 1;
        return acc;
    }, {} as Record<number, GroupedProduct>);

    const cartItems = Object.values(groupedItems);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.rawPrice ?? 0) * item.quantity, 0);
    const cartIds = new Set(cartItems.map(item => item.id));
    const recommendedProducts = allProducts.filter(product => !cartIds.has(product.id)).slice(0, 3);

    return (
        <div className="commerce-page-2026">
            <Navbar />

            <main className="commerce-shell-2026">
                <header className="commerce-hero-2026 reveal-2026">
                    <div>
                        <p className="commerce-eyebrow-2026"><ShoppingBag /> Melalogy checkout / 01</p>
                        <h1>Giỏ hàng <em>của bạn.</em></h1>
                        <p className="commerce-hero-copy-2026">
                            Kiểm tra lựa chọn, điều chỉnh số lượng và hoàn tất đơn hàng trong một luồng mua sắm rõ ràng.
                        </p>
                    </div>
                    <ol className="commerce-steps-2026" aria-label="Tiến trình thanh toán">
                        <li className="is-active"><span>01</span><strong>Giỏ hàng</strong></li>
                        <li><span>02</span><strong>Giao nhận</strong></li>
                        <li><span>03</span><strong>Thanh toán</strong></li>
                    </ol>
                </header>

                {cart.length === 0 ? (
                    <section className="commerce-empty-2026 reveal-2026">
                        <div className="commerce-empty-icon-2026"><ShoppingBag /></div>
                        <p className="commerce-eyebrow-2026">Giỏ hàng đang trống</p>
                        <h2>Bắt đầu từ điều làn da bạn đang cần.</h2>
                        <p>Khám phá bốn công thức Energy Shot được thiết kế cho từng trạng thái da.</p>
                        <Link href="/shop#shop-products" className="commerce-primary-action-2026">
                            Khám phá bộ sưu tập <ArrowRight />
                        </Link>
                    </section>
                ) : (
                    <>
                        <div className="commerce-layout-2026">
                            <section className="commerce-cart-panel-2026" aria-labelledby="cart-items-heading">
                                <div className="commerce-section-heading-2026">
                                    <div>
                                        <p className="commerce-kicker-2026">Lựa chọn của bạn</p>
                                        <h2 id="cart-items-heading">{cartItems.length} công thức / {cart.length} sản phẩm</h2>
                                    </div>
                                    <Link href="/shop#shop-products">Tiếp tục mua sắm <ArrowRight /></Link>
                                </div>

                                <div className="commerce-cart-list-2026">
                                    {cartItems.map((item, index) => (
                                        <article key={item.id} className="commerce-cart-item-2026 reveal-2026" style={{ '--commerce-index': index } as React.CSSProperties}>
                                            <button
                                                type="button"
                                                className="commerce-product-media-2026"
                                                onClick={() => setSelectedProduct(item)}
                                                aria-label={`Xem nhanh ${item.name}`}
                                            >
                                                <img src={item.image} alt={item.name} />
                                                <span>Xem nhanh</span>
                                            </button>

                                            <div className="commerce-product-info-2026">
                                                <div className="commerce-product-topline-2026">
                                                    <p>Energy Shot <span>•</span> Còn hàng</p>
                                                    <strong>{formatVnd((item.rawPrice ?? 0) * item.quantity)}</strong>
                                                </div>
                                                <button type="button" className="commerce-product-title-2026" onClick={() => setSelectedProduct(item)}>
                                                    {item.name}
                                                </button>
                                                <p className="commerce-product-subtitle-2026">{item.subtitle ?? '35g / 1.23oz'} · {formatVnd(item.rawPrice ?? 0)} / sản phẩm</p>

                                                <div className="commerce-product-actions-2026">
                                                    <div className="commerce-quantity-2026" aria-label={`Số lượng ${item.name}`}>
                                                        <button type="button" onClick={() => removeOneFromCart(item.id)} aria-label="Giảm số lượng"><Minus /></button>
                                                        <span aria-live="polite">{item.quantity}</span>
                                                        <button type="button" onClick={() => addToCart(item)} aria-label="Tăng số lượng"><Plus /></button>
                                                    </div>
                                                    <button type="button" className="commerce-remove-2026" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 /> Xoá
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <aside className="commerce-summary-2026 reveal-2026" aria-labelledby="cart-summary-heading">
                                <div className="commerce-summary-label-2026"><Sparkles /> Đơn hàng Melalogy</div>
                                <h2 id="cart-summary-heading">Tóm tắt đơn hàng</h2>
                                <div className="commerce-summary-lines-2026">
                                    <div><span>Tạm tính</span><strong>{formatVnd(subtotal)}</strong></div>
                                    <div><span>Vận chuyển</span><strong className="is-positive">Miễn phí</strong></div>
                                </div>
                                <div className="commerce-summary-total-2026">
                                    <span>Tổng cộng <small>Đã gồm VAT</small></span>
                                    <strong>{formatVnd(subtotal)}</strong>
                                </div>
                                <Link href="/shipping" className="commerce-primary-action-2026">
                                    Tiếp tục giao nhận <ArrowRight />
                                </Link>
                                <p className="commerce-summary-note-2026"><Lock /> Thông tin của bạn được mã hoá trong suốt quá trình thanh toán.</p>
                                <div className="commerce-trust-grid-2026">
                                    <div><ShieldCheck /><span>Chính hãng</span></div>
                                    <div><Truck /><span>Giao nhanh</span></div>
                                    <div><RotateCcw /><span>Hỗ trợ đổi</span></div>
                                </div>
                            </aside>
                        </div>

                        {recommendedProducts.length > 0 && (
                            <section className="commerce-recommendations-2026 reveal-2026" aria-labelledby="recommended-heading">
                                <div className="commerce-section-heading-2026">
                                    <div>
                                        <p className="commerce-kicker-2026">Hoàn thiện chu trình</p>
                                        <h2 id="recommended-heading">Bạn có thể cần thêm</h2>
                                    </div>
                                </div>
                                <div className="commerce-recommendation-grid-2026">
                                    {recommendedProducts.map((product) => (
                                        <article key={product.id} className="commerce-recommendation-card-2026">
                                            <button type="button" className="commerce-recommendation-media-2026" onClick={() => setSelectedProduct(product)}>
                                                <img src={product.image} alt={product.name} />
                                            </button>
                                            <div>
                                                <p>Energy Shot</p>
                                                <h3>{product.name}</h3>
                                                <strong>{product.price}đ</strong>
                                            </div>
                                            <button
                                                type="button"
                                                className="commerce-add-2026"
                                                onClick={() => {
                                                    addToCart(product);
                                                    toast.success(`Đã thêm ${product.name} vào giỏ`);
                                                }}
                                                aria-label={`Thêm ${product.name} vào giỏ`}
                                            ><Plus /></button>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            <Footer />

            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="commerce-dialog-2026 max-w-[900px] max-h-[90vh] p-0 overflow-y-auto border-none gap-0">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedProduct?.name}</DialogTitle>
                        <DialogDescription>Xem nhanh {selectedProduct?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="commerce-dialog-grid-2026">
                        <div className="commerce-dialog-copy-2026">
                            <p className="commerce-kicker-2026">Energy Shot · Bán chạy</p>
                            <div className="commerce-dialog-title-row-2026">
                                <h2>{selectedProduct?.name}</h2>
                                <span>4.8 <Star /></span>
                            </div>
                            <strong className="commerce-dialog-price-2026">{selectedProduct?.price}đ</strong>
                            <p>{selectedProduct?.description ?? `Mặt nạ hydrogel Energy Shot ${selectedProduct?.name} từ Melalogy.`}</p>
                            <div className="commerce-quantity-2026">
                                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Giảm số lượng"><Minus /></button>
                                <span>{quantity}</span>
                                <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Tăng số lượng"><Plus /></button>
                            </div>
                            <div className="commerce-dialog-actions-2026">
                                <Button onClick={() => {
                                    if (selectedProduct) for (let i = 0; i < quantity; i += 1) addToCart(selectedProduct);
                                    setSelectedProduct(null);
                                    setQuantity(1);
                                }}>Thêm vào giỏ <ArrowRight /></Button>
                                <Button
                                    variant="outline"
                                    onClick={() => selectedProduct && addToWishlist(selectedProduct)}
                                    className={cn(selectedProduct && isInWishlist(selectedProduct.id) && 'is-selected')}
                                    aria-label="Thêm vào yêu thích"
                                ><Heart className={cn(selectedProduct && isInWishlist(selectedProduct.id) && 'fill-current')} /></Button>
                            </div>
                            <Link href={`/product/${selectedProduct?.id}`}>Xem đầy đủ thông tin <ChevronRight /></Link>
                        </div>
                        <div className="commerce-dialog-media-2026">
                            <span><PackageCheck /> Melalogy original</span>
                            <img src={selectedProduct?.image} alt={selectedProduct?.name} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Cart2026;
