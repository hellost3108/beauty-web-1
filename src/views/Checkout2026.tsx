"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Banknote,
    Check,
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
import {
    clearDeliveryDetails,
    readDeliveryDetails,
    type DeliveryDetails,
} from '@/lib/checkoutDelivery';
import { createClient } from '@/lib/supabase/client';
import { createOrder } from '@/app/_actions/customer';
import { bankTransferInfo } from '@/data/bankInfo';

export const dynamic = 'force-dynamic';

type PaymentMethod = 'bank_transfer' | 'cod';

interface GroupedProduct extends Product {
    quantity: number;
}

const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

const Checkout2026 = () => {
    const { cart, clearCart } = useShop();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);

    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item, quantity: 0 };
        acc[item.id].quantity += 1;
        return acc;
    }, {} as Record<number, GroupedProduct>);

    const cartItems = Object.values(groupedItems);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.rawPrice ?? 0) * item.quantity, 0);
    const total = subtotal;

    useEffect(() => {
        const checkAuthAndDelivery = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('Vui lòng đăng nhập để tiếp tục thanh toán.');
                router.replace('/login?next=/checkout');
                return;
            }

            const storedDetails = readDeliveryDetails();
            if (!storedDetails) {
                toast.error('Vui lòng nhập thông tin giao nhận trước khi thanh toán.');
                router.replace('/shipping');
                return;
            }
            setDeliveryDetails(storedDetails);
            setIsCheckingAuth(false);
        };
        checkAuthAndDelivery();
    }, [router]);

    const handleSubmit = async (event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const storedDetails = readDeliveryDetails();
        if (!storedDetails) {
            toast.error('Vui lòng hoàn tất thông tin giao nhận.');
            router.push('/shipping');
            return;
        }
        if (cart.length === 0) return;

        setIsLoading(true);
        try {
            const result = await createOrder({
                fullName: storedDetails.fullName,
                phone: storedDetails.phone,
                address: storedDetails.address,
                ward: storedDetails.ward,
                district: storedDetails.district,
                city: storedDetails.city,
                note: storedDetails.note,
                paymentMethod,
                saveAddress: false,
                items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
            });

            if (!result.ok) {
                toast.error(result.error);
                return;
            }

            clearCart();
            clearDeliveryDetails();
            toast.success('Đặt hàng thành công!');
            router.push(`/checkout/success?code=${result.data.orderCode}&method=${paymentMethod}`);
        } catch {
            toast.error('Không thể hoàn tất đơn hàng. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const paymentOptions: Array<{ id: PaymentMethod; title: string; note: string; icon: typeof Wallet }> = [
        { id: 'cod', title: 'Thanh toán COD', note: 'Khi nhận hàng', icon: Wallet },
        { id: 'bank_transfer', title: 'Chuyển khoản', note: 'Xác nhận thủ công', icon: Banknote },
    ];

    if (isCheckingAuth) {
        return (
            <div className="commerce-page-2026">
                <Navbar />
                <main className="commerce-shell-2026">
                    <p className="py-24 text-center text-black/50">Đang kiểm tra thông tin...</p>
                </main>
                <Footer />
            </div>
        );
    }

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
                                {paymentMethod === 'bank_transfer' && (
                                    <div className="commerce-payment-message-2026">
                                        <Banknote />
                                        <div>
                                            <strong>Chuyển khoản ngân hàng</strong>
                                            <p>
                                                {bankTransferInfo.bankName} · {bankTransferInfo.accountName} · STK {bankTransferInfo.accountNumber}.
                                                {' '}Chi tiết đầy đủ và mã đơn hàng để ghi nội dung chuyển khoản sẽ hiện ra ngay sau khi bạn đặt hàng.
                                            </p>
                                        </div>
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

                        <div className="commerce-summary-lines-2026">
                            <div><span>Tạm tính</span><strong>{formatVnd(subtotal)}</strong></div>
                            <div><span>Vận chuyển</span><strong className="is-positive">Miễn phí</strong></div>
                        </div>

                        <div className="commerce-summary-total-2026">
                            <span>Tổng thanh toán <small>Đã gồm VAT</small></span>
                            <strong>{formatVnd(total)}</strong>
                        </div>

                        <button
                            type="button"
                            className="commerce-primary-action-2026"
                            onClick={handleSubmit}
                            disabled={isLoading || cart.length === 0}
                        >
                            {isLoading ? 'Đang xử lý...' : `Đặt hàng · ${formatVnd(total)}`} <ArrowRight />
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
