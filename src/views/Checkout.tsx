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
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'netbanking'>('card');
    const [isLoading, setIsLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardName: ''
    });

    const isFormValid = formData.cardNumber.trim().length > 0 && 
                       formData.expiry.trim().length > 0 && 
                       formData.cvc.trim().length > 0 && 
                       formData.cardName.trim().length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleApplyDiscount = () => {
        if (discountCode.toUpperCase() === 'SAVE10') {
            const discount = subtotal * 0.10;
            setDiscountAmount(discount);
            toast.success("Discount code applied successfully!");
        } else {
            setDiscountAmount(0);
            toast.error("Invalid discount code");
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

    // Calculate subtotal
    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseFloat(String(item.price).replace(/,/g, ''));
        return acc + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);

    const shipping = 0; // Free shipping as per design
    const tax = 8.56; // Mock tax to match image

    const total = subtotal + shipping + tax - discountAmount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            toast.success("Order placed successfully!");
            router.push('/');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#1a1a1a]">
            <Navbar />

            <div className="pt-28 pb-10 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                    <Link href="/cart" className="hover:text-[#f01a33]">Cart</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="hover:text-[#f01a33] cursor-pointer">Shipping</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#f01a33] font-bold">Payment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT COLUMN: Payment Details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1a1a1a]">Payment Details</h1>
                            <p className="text-gray-500 mt-2">Complete your purchase securely.</p>
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
                                            ? "border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33] font-medium ring-1 ring-[#f01a33]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    {paymentMethod === 'card' && (
                                        <div className="absolute top-2 right-2 text-[#f01a33]">
                                            <CheckCircle2 className="w-4 h-4 fill-current" />
                                        </div>
                                    )}
                                    <CreditCard className="w-6 h-6" />
                                    <span className="text-sm">Card</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 border rounded-xl transition-all",
                                        paymentMethod === 'paypal'
                                            ? "border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33] font-medium ring-1 ring-[#f01a33]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    <Wallet className="w-6 h-6" />
                                    <span className="text-sm">PayPal</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('netbanking')}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 border rounded-xl transition-all",
                                        paymentMethod === 'netbanking'
                                            ? "border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33] font-medium ring-1 ring-[#f01a33]"
                                            : "border-gray-200 hover:border-red-200 text-gray-600"
                                    )}
                                >
                                    <Building2 className="w-6 h-6" />
                                    <span className="text-sm">Net Banking</span>
                                </button>
                            </div>

                            {/* Card Details Form */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-sm font-semibold text-gray-700">Card Number</Label>
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
                                        <Label htmlFor="expiry" className="text-sm font-semibold text-gray-700">Expiry Date</Label>
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
                                    <Label htmlFor="cardName" className="text-sm font-semibold text-gray-700">Cardholder Name</Label>
                                    <Input
                                        id="cardName"
                                        placeholder="Full name as on card"
                                        className="bg-gray-50 border-gray-200 h-12"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="billing" defaultChecked className="data-[state=checked]:bg-[#f01a33] border-gray-300" />
                                    <label
                                        htmlFor="billing"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                                    >
                                        Billing address same as shipping
                                    </label>
                                </div>
                            </div>
                        </form>

                        {/* Security Badges */}
                        <div className="flex items-center gap-6 pt-6 mt-6 border-t border-dashed border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs grayscale opacity-70">
                                <ShieldCheck className="w-5 h-5" /> Norton Secured
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs grayscale opacity-70">
                                <Lock className="w-4 h-4" /> SSL Encrypted
                            </div>
                        </div>


                    </div>


                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-bold mb-6 text-[#1a1a1a]">Order Summary</h2>

                            <div className="space-y-6 mb-8">
                                {cartItems.length > 0 ? cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-16 h-16 bg-[#f0f0f0] rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Qty {item.quantity}</p>
                                        </div>
                                        <div className="font-medium text-sm text-gray-900">
                                            Rs. {(parseFloat(String(item.price).replace(/,/g, '')) * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-4 text-gray-500">Your cart is empty</div>
                                )}
                            </div>

                            {/* Discount Code */}
                            <div className="mb-8">
                                <div
                                    onClick={() => setDiscountCode('SAVE10')}
                                    className="bg-[#f01a33]/5 border border-[#f01a33]/20 rounded-lg p-3 mb-3 flex items-center gap-2 cursor-pointer hover:bg-[#f01a33]/10 transition-colors"
                                >
                                    <span className="text-xs font-medium text-[#f01a33]">Use code <strong className="font-bold">SAVE10</strong> for 10% off! (Click to use)</span>
                                </div>
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Gift card or discount code"
                                        className="bg-gray-50 border-gray-200 focus-visible:ring-[#f01a33]"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                    />
                                    <Button
                                        variant="outline"
                                        className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                                        onClick={handleApplyDiscount}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Estimated Tax</span>
                                    <span className="font-medium text-gray-900">Rs. {tax.toLocaleString()}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (10%)</span>
                                        <span className="font-medium">-Rs. {discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <div className="flex flex-col items-end">
                                    {discountAmount > 0 && (
                                        <span className="text-sm text-gray-400 line-through text-right w-full">Rs. {(total + discountAmount).toLocaleString()}</span>
                                    )}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-[#f01a33]">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading || cart.length === 0 || !isFormValid}
                                className="w-full bg-[#f01a33] hover:bg-[#d41830] text-white py-6 rounded-lg font-bold shadow-lg shadow-red-900/10 flex items-center justify-center gap-2"
                            >
                                <Lock className="w-4 h-4" />
                                {isLoading ? 'Processing...' : `Pay Rs. ${total.toLocaleString()}`}
                            </Button>

                            <p className="text-[10px] text-gray-400 text-center mt-4 leading-tight">
                                By placing this order, you agree to the <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
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
