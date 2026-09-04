'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Lock,
    MapPin,
    PackageCheck,
    ShieldCheck,
    Sparkles,
    Truck,
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useShop, type Product } from '@/context/ShopContext';
import {
    emptyDeliveryDetails,
    readDeliveryDetails,
    saveDeliveryDetails,
    type DeliveryDetails,
} from '@/lib/checkoutDelivery';

interface CartGroup extends Product {
    quantity: number;
}

type DeliveryErrors = Partial<Record<keyof DeliveryDetails, string>>;

export default function Shipping2026() {
    const router = useRouter();
    const { cart } = useShop();
    const [formData, setFormData] = useState<DeliveryDetails>(emptyDeliveryDetails);
    const [errors, setErrors] = useState<DeliveryErrors>({});

    useEffect(() => {
        const stored = readDeliveryDetails();
        if (stored) setFormData(stored);
    }, []);

    const groupedCart = useMemo<CartGroup[]>(() => {
        const quantities = cart.reduce<Record<number, CartGroup>>((result, item) => {
            if (!result[item.id]) result[item.id] = { ...item, quantity: 0 };
            result[item.id].quantity += 1;
            return result;
        }, {});
        return Object.values(quantities);
    }, [cart]);

    const subtotal = groupedCart.reduce(
        (total, item) => total + (item.rawPrice ?? 0) * item.quantity,
        0,
    );
    const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
    };

    const validate = () => {
        const nextErrors: DeliveryErrors = {};
        const requiredFields: Array<keyof DeliveryDetails> = [
            'fullName',
            'phone',
            'email',
            'address',
            'ward',
            'district',
            'city',
        ];

        requiredFields.forEach((field) => {
            if (!formData[field].trim()) nextErrors[field] = 'Vui lòng điền thông tin này.';
        });

        const normalizedPhone = formData.phone.replace(/[\s.-]/g, '');
        if (formData.phone && !/^(?:\+84|0)\d{9}$/.test(normalizedPhone)) {
            nextErrors.phone = 'Số điện thoại chưa đúng định dạng.';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nextErrors.email = 'Email chưa đúng định dạng.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (cart.length === 0) {
            toast.error('Giỏ hàng của bạn đang trống.');
            router.push('/shop');
            return;
        }

        if (!validate()) {
            toast.error('Vui lòng kiểm tra lại thông tin giao nhận.');
            return;
        }

        saveDeliveryDetails(formData);
        router.push('/checkout');
    };

    return (
        <div className="commerce-page-2026">
            <Navbar />

            <main className="commerce-shell-2026">
                <header className="commerce-hero-2026 reveal-2026">
                    <div>
                        <Link href="/cart" className="commerce-back-link-2026">
                            <ArrowLeft /> Trở lại giỏ hàng
                        </Link>
                        <p className="commerce-eyebrow-2026"><Sparkles /> Delivery details / 02</p>
                        <h1>Giao nhận <em>rõ ràng.</em></h1>
                        <p className="commerce-hero-copy-2026">
                            Cho Melalogy biết nơi bạn muốn nhận hàng. Thông tin chỉ được dùng để xử lý và giao đơn hàng này.
                        </p>
                    </div>

                    <ol className="commerce-steps-2026" aria-label="Tiến trình đặt hàng">
                        <li className="is-complete"><span><Check /></span><strong>Giỏ hàng</strong></li>
                        <li className="is-active"><span>02</span><strong>Giao nhận</strong></li>
                        <li><span>03</span><strong>Thanh toán</strong></li>
                    </ol>
                </header>

                <section className="commerce-checkout-layout-2026 commerce-shipping-layout-2026">
                    <form
                        id="shipping-form"
                        className="commerce-payment-panel-2026 commerce-shipping-panel-2026"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="commerce-section-heading-2026">
                            <div>
                                <p className="commerce-eyebrow-2026">Thông tin người nhận</p>
                                <h2>Đơn hàng sẽ được giao đến đâu?</h2>
                            </div>
                            <div className="commerce-secure-chip-2026"><Lock /> Bảo mật thông tin</div>
                        </div>

                        <div className="commerce-delivery-method-2026">
                            <span><Truck /></span>
                            <div>
                                <strong>Giao hàng tiêu chuẩn</strong>
                                <p>Nhân viên giao hàng sẽ liên hệ trước khi giao.</p>
                            </div>
                            <small>Miễn phí</small>
                        </div>

                        <div className="commerce-shipping-form-2026">
                            <DeliveryField
                                id="fullName"
                                label="Họ và tên"
                                value={formData.fullName}
                                placeholder="Nguyễn Minh Anh"
                                autoComplete="name"
                                error={errors.fullName}
                                onChange={handleChange}
                                wide
                            />
                            <DeliveryField
                                id="phone"
                                label="Số điện thoại"
                                value={formData.phone}
                                placeholder="0702 899 707"
                                autoComplete="tel"
                                inputMode="tel"
                                error={errors.phone}
                                onChange={handleChange}
                            />
                            <DeliveryField
                                id="email"
                                label="Email nhận xác nhận"
                                value={formData.email}
                                placeholder="ban@email.com"
                                autoComplete="email"
                                type="email"
                                error={errors.email}
                                onChange={handleChange}
                            />
                            <DeliveryField
                                id="address"
                                label="Số nhà, tên đường"
                                value={formData.address}
                                placeholder="29D Cộng Hòa 3"
                                autoComplete="street-address"
                                error={errors.address}
                                onChange={handleChange}
                                wide
                            />
                            <DeliveryField
                                id="ward"
                                label="Phường / Xã"
                                value={formData.ward}
                                placeholder="Phường Phú Thọ Hòa"
                                autoComplete="address-level3"
                                error={errors.ward}
                                onChange={handleChange}
                            />
                            <DeliveryField
                                id="district"
                                label="Quận / Huyện"
                                value={formData.district}
                                placeholder="Quận Tân Phú"
                                autoComplete="address-level2"
                                error={errors.district}
                                onChange={handleChange}
                            />
                            <DeliveryField
                                id="city"
                                label="Tỉnh / Thành phố"
                                value={formData.city}
                                placeholder="Thành phố Hồ Chí Minh"
                                autoComplete="address-level1"
                                error={errors.city}
                                onChange={handleChange}
                                wide
                            />
                            <div className="commerce-field-2026 commerce-field-wide-2026">
                                <Label htmlFor="note">Ghi chú giao hàng <small>(không bắt buộc)</small></Label>
                                <textarea
                                    id="note"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: gọi cho tôi trước khi giao..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    </form>

                    <aside className="commerce-summary-2026 commerce-checkout-summary-2026">
                        <div className="commerce-summary-kicker-2026"><PackageCheck /> Đơn hàng Melalogy</div>
                        <h2>Tóm tắt đơn hàng</h2>

                        <div className="commerce-checkout-items-2026">
                            {groupedCart.length > 0 ? groupedCart.map((item) => (
                                <article key={item.id}>
                                    <div><img src={item.image} alt={item.name} /><span>{item.quantity}</span></div>
                                    <section><p>Energy Shot</p><h3>{item.name}</h3><small>{item.subtitle ?? '35g / 1.23oz'}</small></section>
                                    <strong>{formatVnd((item.rawPrice ?? 0) * item.quantity)}</strong>
                                </article>
                            )) : <div className="commerce-summary-empty-2026">Giỏ hàng của bạn đang trống.</div>}
                        </div>

                        <div className="commerce-summary-lines-2026">
                            <div><span>Tạm tính</span><strong>{formatVnd(subtotal)}</strong></div>
                            <div><span>Vận chuyển</span><strong className="commerce-free-2026">Miễn phí</strong></div>
                        </div>

                        <div className="commerce-summary-total-2026">
                            <span>Tổng cộng <small>Đã gồm VAT</small></span>
                            <strong>{formatVnd(subtotal)}</strong>
                        </div>

                        <button type="submit" form="shipping-form" className="commerce-primary-action-2026">
                            Tiếp tục thanh toán <ArrowRight />
                        </button>

                        <p className="commerce-summary-note-2026">
                            <Lock /> Thông tin giao nhận được lưu trên thiết bị để bạn có thể kiểm tra lại ở bước kế tiếp.
                        </p>

                        <div className="commerce-trust-grid-2026">
                            <div><ShieldCheck /><span>Chính hãng</span></div>
                            <div><Truck /><span>Giao nhanh</span></div>
                            <div><MapPin /><span>Đúng địa chỉ</span></div>
                        </div>
                    </aside>
                </section>
            </main>

            <Footer />
        </div>
    );
}

interface DeliveryFieldProps {
    id: keyof DeliveryDetails;
    label: string;
    value: string;
    placeholder: string;
    autoComplete?: string;
    inputMode?: 'tel';
    type?: 'email';
    error?: string;
    wide?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function DeliveryField({
    id,
    label,
    value,
    placeholder,
    autoComplete,
    inputMode,
    type,
    error,
    wide,
    onChange,
}: DeliveryFieldProps) {
    return (
        <div className={`commerce-field-2026${wide ? ' commerce-field-wide-2026' : ''}`}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                type={type}
                aria-invalid={Boolean(error)}
            />
            {error && <small className="commerce-field-error-2026">{error}</small>}
        </div>
    );
}
