"use client";
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop, Product } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, ShieldCheck, ChevronRight, CheckCircle2, Building2, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const Checkout = () => {
    const { cart, clearCart } = useShop();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'cod'>('card');
    const [isLoading, setIsLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardName: ''
    });

    const isFormValid = paymentMethod !== 'card' || (
        formData.cardNumber.trim().length > 0 &&
        formData.expiry.trim().length > 0 &&
        formData.cvc.trim().length > 0 &&
        formData.cardName.trim().length > 0
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleApplyDiscount = () => {
        if (discountCode.toUpperCase() === 'SAVE10') {
            const discount = subtotal * 0.10;
            setDiscountAmount(discount);
            toast.success("Áp dụng mã giảm giá thành công!");
        } else {
            setDiscountAmount(0);
            toast.error("Mã giảm giá không hợp lệ");
        }
    };

    // Group items to handle quantities
    interface GroupedProduct extends Product {
        quantity: number;
    }

    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity += 1;
        return acc;
    }, {} as Record<number, GroupedProduct>);

    const cartItems = Object.values(groupedItems);

    // Calculate subtotal (uses rawPrice — a numeric VND amount, not the "79.000" display string)
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (item.rawPrice ?? 0) * item.quantity;
    }, 0);

    const shipping = 0; // Free shipping

    const total = subtotal + shipping - discountAmount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            toast.success("Đặt hàng thành công!");
            router.push('/');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#111111]">
            <Navbar />

            <div className="pt-28 pb-10 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                    <Link href="/cart" className="hover:text-[#b31324]">Giỏ Hàng</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="hover:text-[#b31324] cursor-pointer">Vận Chuyển</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#b31324] font-bold">Thanh Toán</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT COLUMN: Payment Details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[#111111]">Chi Tiết Thanh Toán</h1>
                            <p className="text-gray-500 mt-2">Hoàn tất đơn hàng của bạn một cách an toàn.</p>
                        </div>

                        <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">

                            {/* Payment Methods */}
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={cn(
                                        "relative flex flex-col items-center justify-center gap-3 p-4 border rounded-xl transition-all",
                                        paymentMethod === 'card'
                                            ? "border-[#b31324] bg-[#b31324]/5 text-[#b31324] font-medium ring-1 ring-[#b31324]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    {paymentMethod === 'card' && (
                                        <div className="absolute top-2 right-2 text-[#b31324]">
                                            <CheckCircle2 className="w-4 h-4 fill-current" />
                                        </div>
                                    )}
                                    <CreditCard className="w-6 h-6" />
                                    <span className="text-sm">Thẻ</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('bank_transfer')}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 border rounded-xl transition-all",
                                        paymentMethod === 'bank_transfer'
                                            ? "border-[#b31324] bg-[#b31324]/5 text-[#b31324] font-medium ring-1 ring-[#b31324]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    <Building2 className="w-6 h-6" />
                                    <span className="text-sm">Chuyển Khoản</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 border rounded-xl transition-all",
                                        paymentMethod === 'cod'
                                            ? "border-[#b31324] bg-[#b31324]/5 text-[#b31324] font-medium ring-1 ring-[#b31324]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    <Wallet className="w-6 h-6" />
                                    <span className="text-sm">COD</span>
                                </button>
                            </div>

                            {/* Card Details Form */}
                            {paymentMethod === 'card' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-sm font-semibold text-gray-700">Số Thẻ</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="cardNumber"
                                            placeholder="0000 0000 0000 0000"
                                            className="pl-10 bg-gray-50 border-gray-200 h-12"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry" className="text-sm font-semibold text-gray-700">Ngày Hết Hạn</Label>
                                        <Input
                                            id="expiry"
                                            placeholder="MM / YY"
                                            className="bg-gray-50 border-gray-200 h-12"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label htmlFor="cvc" className="text-sm font-semibold text-gray-700">CVC / CVV</Label>
                                            <span className="text-xs text-gray-400 cursor-pointer">?</span>
                                        </div>
                                        <Input
                                            id="cvc"
                                            placeholder="123"
                                            className="bg-gray-50 border-gray-200 h-12"
                                            value={formData.cvc}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cardName" className="text-sm font-semibold text-gray-700">Tên Chủ Thẻ</Label>
                                    <Input
                                        id="cardName"
                                        placeholder="Họ tên như trên thẻ"
                                        className="bg-gray-50 border-gray-200 h-12"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="billing" defaultChecked className="data-[state=checked]:bg-[#b31324] border-gray-300" />
                                    <label
                                        htmlFor="billing"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                                    >
                                        Địa chỉ thanh toán giống địa chỉ giao hàng
                                    </label>
                                </div>
                            </div>
                            )}

                            {paymentMethod === 'bank_transfer' && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-600 leading-relaxed">
                                    Thông tin tài khoản để chuyển khoản sẽ được gửi đến email của bạn ngay sau khi đặt hàng. Đơn hàng sẽ được xử lý khi chúng tôi xác nhận đã nhận thanh toán.
                                </div>
                            )}

                            {paymentMethod === 'cod' && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-600 leading-relaxed">
                                    Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng khi nhận được đơn hàng.
                                </div>
                            )}
                        </form>

                        {/* Security Badges */}
                        <div className="flex items-center gap-6 pt-6 mt-6 border-t border-dashed border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs grayscale opacity-70">
                                <ShieldCheck className="w-5 h-5" /> Bảo Mật Norton
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs grayscale opacity-70">
                                <Lock className="w-4 h-4" /> Mã Hoá SSL
                            </div>
                        </div>


                    </div>


                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-bold mb-6 text-[#111111]">Tóm Tắt Đơn Hàng</h2>

                            <div className="space-y-6 mb-8">
                                {cartItems.length > 0 ? cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-16 h-16 bg-[#f0f0f0] rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">SL: {item.quantity}</p>
                                        </div>
                                        <div className="font-medium text-sm text-gray-900">
                                            {((item.rawPrice ?? 0) * item.quantity).toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-4 text-gray-500">Giỏ hàng của bạn đang trống</div>
                                )}
                            </div>

                            {/* Discount Code */}
                            <div className="mb-8">
                                <div
                                    onClick={() => setDiscountCode('SAVE10')}
                                    className="bg-[#b31324]/5 border border-[#b31324]/20 rounded-lg p-3 mb-3 flex items-center gap-2 cursor-pointer hover:bg-[#b31324]/10 transition-colors"
                                >
                                    <span className="text-xs font-medium text-[#b31324]">Dùng mã <strong className="font-bold">SAVE10</strong> để giảm 10%! (Bấm để dùng)</span>
                                </div>
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Mã giảm giá hoặc thẻ quà tặng"
                                        className="bg-gray-50 border-gray-200 focus-visible:ring-[#b31324]"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                    />
                                    <Button
                                        variant="outline"
                                        className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                                        onClick={handleApplyDiscount}
                                    >
                                        Áp Dụng
                                    </Button>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tạm tính</span>
                                    <span className="font-medium text-gray-900">{subtotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Phí vận chuyển</span>
                                    <span className="font-medium text-green-600">Miễn phí</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Giảm giá (10%)</span>
                                        <span className="font-medium">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-gray-900">Tổng Cộng</span>
                                <div className="flex flex-col items-end">
                                    {discountAmount > 0 && (
                                        <span className="text-sm text-gray-400 line-through text-right w-full">{(total + discountAmount).toLocaleString('vi-VN')}đ</span>
                                    )}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-[#b31324]">{total.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading || cart.length === 0 || !isFormValid}
                                className="w-full bg-[#b31324] hover:bg-[#d41830] text-white py-6 rounded-lg font-bold shadow-lg shadow-red-900/10 flex items-center justify-center gap-2"
                            >
                                <Lock className="w-4 h-4" />
                                {isLoading ? 'Đang xử lý...' : `Thanh Toán ${total.toLocaleString('vi-VN')}đ`}
                            </Button>

                            <p className="text-[10px] text-gray-400 text-center mt-4 leading-tight">
                                Khi đặt hàng, bạn đồng ý với <Link href="/terms" className="underline">Điều Khoản Dịch Vụ</Link> và <Link href="/privacy" className="underline">Chính Sách Bảo Mật</Link> của chúng tôi.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
