"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Building2,
    Check,
    CreditCard,
    Gift,
    Lock,
    MapPin,
    PackageCheck,
    ShieldCheck,
    Sparkles,
    Wallet,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop, Product } from '@/context/ShopContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    clearDeliveryDetails,
    readDeliveryDetails,
    type DeliveryDetails,
} from '@/lib/checkoutDelivery';

export const dynamic = 'force-dynamic';

type PaymentMethod = 'card' | 'bank_transfer' | 'cod';

interface GroupedProduct extends Product {
    quantity: number;
}

const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

const Checkout2026 = () => {
    const { cart, clearCart } = useShop();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isLoading, setIsLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardName: '',
    });

    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item, quantity: 0 };
        acc[item.id].quantity += 1;
        return acc;
    }, {} as Record<number, GroupedProduct>);

    const cartItems = Object.values(groupedItems);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.rawPrice ?? 0) * item.quantity, 0);
    const total = subtotal - discountAmount;
    const isFormValid = paymentMethod !== 'card' || (
        formData.cardNumber.trim().length > 0 &&
        formData.expiry.trim().length > 0 &&
        formData.cvc.trim().length > 0 &&
        formData.cardName.trim().length > 0
    );

    useEffect(() => {
        const storedDetails = readDeliveryDetails();
        if (!storedDetails) {
            toast.error('Vui lòng nhập thông tin giao nhận trước khi thanh toán.');
            router.replace('/shipping');
            return;
        }
        setDeliveryDetails(storedDetails);
    }, [router]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(previous => ({ ...previous, [id]: value }));
    };

    const handleApplyDiscount = () => {
        if (discountCode.trim().toUpperCase() === 'SAVE10') {
            setDiscountAmount(subtotal * 0.1);
            toast.success('Đã áp dụng SAVE10 — bạn được giảm 10%.');
            return;
        }
        setDiscountAmount(0);
        toast.error('Mã giảm giá không hợp lệ.');
    };

    const handleSubmit = (event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const storedDetails = readDeliveryDetails();
        if (!storedDetails) {
            toast.error('Vui lòng hoàn tất thông tin giao nhận.');
            router.push('/shipping');
            return;
        }
        if (!isFormValid || cart.length === 0) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            clearDeliveryDetails();
            toast.success('Đặt hàng thành công!');
            router.push('/');
        }, 2000);
    };

    const paymentOptions: Array<{ id: PaymentMethod; title: string; note: string; icon: typeof CreditCard }> = [
        { id: 'card', title: 'Thẻ ngân hàng', note: 'Visa · Mastercard', icon: CreditCard },
        { id: 'bank_transfer', title: 'Chuyển khoản', note: 'Xác nhận thủ công', icon: Building2 },
        { id: 'cod', title: 'Thanh toán COD', note: 'Khi nhận hàng', icon: Wallet },
    ];

    return (
        <div className="commerce-page-2026">
            <Navbar />

            <main className="commerce-shell-2026">
                <header className="commerce-hero-2026 commerce-checkout-hero-2026 reveal-2026">
                    <div>
                        <Link href="/shipping" className="commerce-back-link-2026"><ArrowLeft /> Trở lại giao nhận</Link>
                        <p className="commerce-eyebrow-2026"><Lock /> Secure checkout / 03</p>
                        <h1>Thanh toán <em>an tâm.</em></h1>
                        <p className="commerce-hero-copy-2026">Chọn phương thức phù hợp và kiểm tra lần cuối trước khi hoàn tất đơn hàng.</p>
                    </div>
                    <ol className="commerce-steps-2026" aria-label="Tiến trình thanh toán">
                        <li className="is-complete"><span><Check /></span><strong>Giỏ hàng</strong></li>
                        <li className="is-complete"><span><Check /></span><strong>Giao nhận</strong></li>
                        <li className="is-active"><span>03</span><strong>Thanh toán</strong></li>
                    </ol>
                </header>

                <div className="commerce-checkout-layout-2026">
                    <section className="commerce-payment-panel-2026 reveal-2026" aria-labelledby="payment-heading">
                        <div className={`commerce-delivery-review-2026${deliveryDetails ? '' : ' is-missing'}`}>
                            <span><MapPin /></span>
                            <div>
                                <small>Giao đến</small>
                                <strong>{deliveryDetails?.fullName ?? 'Đang tải thông tin giao nhận...'}</strong>
                                {deliveryDetails && (
                                    <>
                                        <p>{deliveryDetails.address}, {deliveryDetails.ward}, {deliveryDetails.district}, {deliveryDetails.city}</p>
                                        <p>{deliveryDetails.phone} · {deliveryDetails.email}</p>
                                    </>
                                )}
                            </div>
                            <Link href="/shipping">Chỉnh sửa</Link>
                        </div>
                        <div className="commerce-section-heading-2026">
                            <div>
                                <p className="commerce-kicker-2026">Phương thức thanh toán</p>
                                <h2 id="payment-heading">Bạn muốn thanh toán thế nào?</h2>
                            </div>
                            <span className="commerce-secure-chip-2026"><ShieldCheck /> Kết nối bảo mật</span>
                        </div>

                        <form id="payment-form" onSubmit={handleSubmit}>
                            <div className="commerce-payment-options-2026" role="radiogroup" aria-label="Phương thức thanh toán">
                                {paymentOptions.map(option => {
                                    const Icon = option.icon;
                                    const selected = paymentMethod === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            role="radio"
                                            aria-checked={selected}
                                            className={selected ? 'is-selected' : ''}
                                            onClick={() => setPaymentMethod(option.id)}
                                        >
                                            <span className="commerce-payment-icon-2026"><Icon /></span>
                                            <span><strong>{option.title}</strong><small>{option.note}</small></span>
                                            <i>{selected && <Check />}</i>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="commerce-payment-details-2026" key={paymentMethod}>
                                {paymentMethod === 'card' && (
                                    <div className="commerce-card-form-2026">
                                        <div className="commerce-field-2026 commerce-field-wide-2026">
                                            <Label htmlFor="cardNumber">Số thẻ</Label>
                                            <div><CreditCard /><Input id="cardNumber" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} required /><Lock /></div>
                                        </div>
                                        <div className="commerce-field-2026">
                                            <Label htmlFor="expiry">Ngày hết hạn</Label>
                                            <Input id="expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} required />
                                        </div>
                                        <div className="commerce-field-2026">
                                            <Label htmlFor="cvc">CVC / CVV <span title="Mã bảo mật ở mặt sau thẻ">?</span></Label>
                                            <Input id="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={formData.cvc} onChange={handleInputChange} required />
                                        </div>
                                        <div className="commerce-field-2026 commerce-field-wide-2026">
                                            <Label htmlFor="cardName">Tên chủ thẻ</Label>
                                            <Input id="cardName" autoComplete="cc-name" placeholder="Họ tên như trên thẻ" value={formData.cardName} onChange={handleInputChange} required />
                                        </div>
                                        <label className="commerce-billing-check-2026">
                                            <Checkbox id="billing" defaultChecked />
                                            <span><strong>Dùng địa chỉ giao hàng làm địa chỉ thanh toán</strong><small>Bạn có thể thay đổi thông tin sau nếu cần.</small></span>
                                        </label>
                                    </div>
                                )}

                                {paymentMethod === 'bank_transfer' && (
                                    <div className="commerce-payment-message-2026">
                                        <Building2 />
                                        <div><strong>Chuyển khoản ngân hàng</strong><p>Thông tin tài khoản và nội dung chuyển khoản sẽ được gửi qua email ngay sau khi đặt hàng.</p></div>
                                    </div>
                                )}

                                {paymentMethod === 'cod' && (
                                    <div className="commerce-payment-message-2026">
                                        <Wallet />
                                        <div><strong>Thanh toán khi nhận hàng</strong><p>Chuẩn bị đúng số tiền và thanh toán trực tiếp cho đơn vị vận chuyển khi nhận sản phẩm.</p></div>
                                    </div>
                                )}
                            </div>

                            <div className="commerce-security-row-2026">
                                <span><ShieldCheck /> Bảo mật giao dịch</span>
                                <span><Lock /> Mã hoá SSL</span>
                                <span><BadgeCheck /> Melalogy chính hãng</span>
                            </div>
                        </form>
                    </section>

                    <aside className="commerce-summary-2026 commerce-checkout-summary-2026 reveal-2026" aria-labelledby="checkout-summary-heading">
                        <div className="commerce-summary-label-2026"><PackageCheck /> Kiểm tra lần cuối</div>
                        <h2 id="checkout-summary-heading">Đơn hàng của bạn</h2>

                        <div className="commerce-checkout-items-2026">
                            {cartItems.length > 0 ? cartItems.map(item => (
                                <article key={item.id}>
                                    <div><img src={item.image} alt={item.name} /><span>{item.quantity}</span></div>
                                    <section><p>Energy Shot</p><h3>{item.name}</h3><small>{item.subtitle ?? '35g / 1.23oz'}</small></section>
                                    <strong>{formatVnd((item.rawPrice ?? 0) * item.quantity)}</strong>
                                </article>
                            )) : (
                                <div className="commerce-summary-empty-2026">Giỏ hàng của bạn đang trống.</div>
                            )}
                        </div>

                        <div className="commerce-promo-2026">
                            <button type="button" onClick={() => setDiscountCode('SAVE10')}><Gift /> Ưu đãi 10% với mã <strong>SAVE10</strong></button>
                            <div>
                                <Input aria-label="Mã giảm giá" placeholder="Nhập mã ưu đãi" value={discountCode} onChange={event => setDiscountCode(event.target.value)} />
                                <button type="button" onClick={handleApplyDiscount}>Áp dụng</button>
                            </div>
                        </div>

                        <div className="commerce-summary-lines-2026">
                            <div><span>Tạm tính</span><strong>{formatVnd(subtotal)}</strong></div>
                            <div><span>Vận chuyển</span><strong className="is-positive">Miễn phí</strong></div>
                            {discountAmount > 0 && <div><span>Ưu đãi SAVE10</span><strong className="is-positive">−{formatVnd(discountAmount)}</strong></div>}
                        </div>

                        <div className="commerce-summary-total-2026">
                            <span>Tổng thanh toán <small>Đã gồm VAT</small></span>
                            <strong>{formatVnd(total)}</strong>
                        </div>

                        <button
                            type="button"
                            className="commerce-primary-action-2026"
                            onClick={handleSubmit}
                            disabled={isLoading || cart.length === 0 || !isFormValid}
                        >
                            {isLoading ? 'Đang xử lý...' : `Thanh toán ${formatVnd(total)}`} <ArrowRight />
                        </button>
                        <p className="commerce-summary-note-2026">
                            Bằng việc đặt hàng, bạn đồng ý với <Link href="/terms">Điều khoản dịch vụ</Link> và <Link href="/privacy">Chính sách bảo mật</Link>.
                        </p>
                        <div className="commerce-order-assurance-2026"><Sparkles /><span><strong>Chăm sóc sau mua</strong>Đội ngũ Melalogy luôn sẵn sàng hỗ trợ.</span></div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout2026;
