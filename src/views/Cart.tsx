"use client";
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop, Product } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, Lock, ShieldCheck, Truck, ArrowRight, Star, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface GroupedProduct extends Product {
    quantity: number;
}

const Cart = () => {
    const { cart, removeFromCart, addToCart, removeOneFromCart, addToWishlist, isInWishlist } = useShop();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

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
    const groupedItems = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 0 };
        }
        acc[item.id].quantity += 1;
        return acc;
    }, {} as Record<number, GroupedProduct>);

    const cartItems = Object.values(groupedItems);

    // Calculated subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
        return acc + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0);

    const shipping = 0; // Calculated at checkout
    const tax = 0;
    const total = subtotal + shipping + tax - discountAmount;

    // Mock recommended products for "You might also like"
    const recommendedProducts = [
        {
            id: 101,
            name: "Hydra Mist",
            price: "899",
            image: "/assets/placeholder-400x500.png"
        },
        {
            id: 102,
            name: "Blush Palette",
            price: "1,299",
            image: "/assets/placeholder-400x500.png"
        },
        {
            id: 103,
            name: "Kohl Liner",
            price: "450",
            image: "/assets/placeholder-400x500.png"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#1a1a1a]">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto">
                {/* Header */}
                <h1 className="font-display text-3xl md:text-4xl leading-tight mb-12 flex items-baseline gap-3">
                    Your Bag <span className="text-[#999999] text-xl font-body">({cart.length} Items)</span>
                </h1>

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Truck className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-500 text-lg font-body">Your bag is currently empty.</p>
                        <Link href="/shop">
                            <Button className="bg-[#f01a33] hover:bg-[#d6182d] text-white px-10 py-6 rounded-xl text-lg transition-transform hover:scale-105">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left Column: Cart Items & Recommendations */}
                        <div className="xl:col-span-8 space-y-16">
                            {/* Items List */}
                            <div className="space-y-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="group relative">
                                        <div className="flex flex-col sm:flex-row gap-8 p-8 border border-gray-100 rounded-[24px] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] transition-all duration-300">
                                            {/* Image */}
                                            <div 
                                                className="w-full sm:w-40 h-40 bg-[#f9f8f7] rounded-2xl overflow-hidden shrink-0 cursor-pointer"
                                                onClick={() => setSelectedProduct(item)}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start w-full mb-2">
                                                    <div>
                                                        <h3 
                                                            className="text-2xl font-display text-[#1a1a1a] cursor-pointer hover:text-[#f01a33] transition-colors"
                                                            onClick={() => setSelectedProduct(item)}
                                                        >
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-[#999999] text-sm mt-1 font-body">30ml | Hydrating Formula</p>
                                                    </div>
                                                    <div className="text-xl font-display font-bold text-[#f01a33] text-right">
                                                        Rs. {(parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>

                                                <div className="mt-auto flex justify-between items-center pt-6">
                                                    {/* Quantity Control */}
                                                    <div className="flex items-center bg-[#fcfcfc] border border-gray-100 rounded-xl overflow-hidden">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeOneFromCart(item.id);
                                                            }}
                                                            className="p-3 hover:bg-white text-gray-500 transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-display text-lg">{item.quantity}</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToCart(item);
                                                            }}
                                                            className="p-3 hover:bg-white text-gray-500 transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeFromCart(item.id);
                                                        }}
                                                        className="flex items-center text-[#999999] hover:text-[#f01a33] text-sm transition-all gap-2 px-4 py-2 hover:bg-red-50 rounded-lg group/remove"
                                                    >
                                                        <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform" />
                                                        <span className="font-semibold uppercase tracking-wider text-[11px]">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* You might also like */}
                            <div className="pt-8">
                                <h3 className="font-display text-2xl text-[#1a1a1a] mb-8">Refill Your Routine</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    {recommendedProducts.map((product) => (
                                        <div key={product.id} className="group flex flex-col gap-4">
                                            <div 
                                                className="aspect-[4/5] bg-[#fdfaf5] rounded-[24px] overflow-hidden relative cursor-pointer"
                                                onClick={() => setSelectedProduct(product)}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                        toast.success(`${product.name} added to bag`);
                                                    }}
                                                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#f01a33] hover:text-white transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                                                >
                                                    <Plus className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center px-2">
                                                <div>
                                                    <h4 className="font-display text-lg text-[#1a1a1a]">{product.name}</h4>
                                                    <p className="text-[#f01a33] font-bold">Rs. {product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="xl:col-span-4">
                            <div className="bg-white p-6 md:p-10 rounded-[30px] border border-[#f5f5f5] shadow-[0_20px_50px_rgba(0,0,0,0.03)] lg:sticky lg:top-32 h-fit">
                                <h3 className="font-display text-2xl text-[#1a1a1a] mb-8">Order Summary</h3>

                                <div className="space-y-5 mb-8">
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-[#666666] font-body">Subtotal</span>
                                        <span className="font-display font-bold text-[#1a1a1a]">Rs. {subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-[#666666] font-body">Shipping estimate</span>
                                        <span className="text-[10px] font-bold text-[#10b981] bg-[#ecfdf5] px-3 py-1 rounded-md">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-[#666666] font-body">Tax estimate</span>
                                        <span className="font-display font-bold text-[#1a1a1a]">Rs. 0</span>
                                    </div>
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between items-center text-[15px] text-[#22c55e]">
                                            <span className="font-body">Discount (10%)</span>
                                            <span className="font-display font-bold">-Rs. {discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-[#f5f5f5] pt-8 mb-8">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-display text-xl text-[#1a1a1a] font-bold">Order Total</h4>
                                        <div className="text-right">
                                            {discountAmount > 0 && (
                                                <span className="text-sm text-[#999999] line-through block mb-1">Rs. {(total + discountAmount).toLocaleString()}</span>
                                            )}
                                            <span className="font-display text-3xl font-bold text-[#1a1a1a]">Rs. {total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/checkout" className="block mb-10">
                                    <Button className="w-full bg-[#f01a33] hover:bg-[#d6182d] text-white py-8 rounded-[12px] text-sm font-bold tracking-wide uppercase transition-all shadow-lg shadow-[#f01a33]/20 flex items-center justify-center gap-3">
                                        PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>

                                {/* Trust Icons */}
                                <div className="grid grid-cols-3 gap-2 px-2">
                                    <div className="flex flex-col items-center gap-2">
                                        <Lock className="w-5 h-5 text-[#999999]" />
                                        <span className="text-[9px] font-medium text-[#999999] uppercase tracking-wider text-center">Secure</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-[#999999]" />
                                        <span className="text-[9px] font-medium text-[#999999] uppercase tracking-wider text-center">Authentic</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Truck className="w-5 h-5 text-[#999999]" />
                                        <span className="text-[9px] font-medium text-[#999999] uppercase tracking-wider text-center">Fast</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />

            {/* Quick View Modal */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="max-w-[900px] max-h-[90vh] p-0 overflow-y-auto bg-white border-none rounded-[30px] gap-0 shadow-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedProduct?.name}</DialogTitle>
                        <DialogDescription>Quick view for {selectedProduct?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-[1.1fr_1fr] h-auto md:min-h-[500px]">
                        {/* Left: Content */}
                        <div className="p-10 md:p-12 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="font-display text-4xl md:text-5xl text-[#1a1a1a] tracking-tight leading-none">
                                    {selectedProduct?.name}
                                </h1>
                                <div className="flex items-center gap-1 border border-[#f01a33] rounded-full px-3 py-1 mt-2">
                                    <span className="text-xs font-bold text-[#f01a33]">4.2</span>
                                    <Star className="w-3 h-3 text-[#f01a33] fill-[#f01a33]" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-[#f01a33] font-display text-3xl font-bold">Rs. {selectedProduct?.price}</span>
                                <span className="text-gray-300 text-lg line-through font-light">Rs. {selectedProduct?.oldPrice}</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8 max-w-[400px]">
                                Experience the pinnacle of luxury skincare with our meticulously crafted {selectedProduct?.name}. Formulated with rare botanicals and clinically proven actives, it delivers visible transformation and a sensory journey like no other.
                            </p>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-gray-200 rounded-xl bg-white h-12">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 h-full hover:bg-gray-50 text-gray-400 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-lg font-medium text-[#1a1a1a]">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 h-full hover:bg-gray-50 text-gray-400 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mb-8">
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            for (let i = 0; i < quantity; i++) {
                                                addToCart(selectedProduct);
                                            }
                                        }
                                        setSelectedProduct(null);
                                        setQuantity(1);
                                        toast.success("Added to bag");
                                    }}
                                    className="flex-1 bg-[#f01a33] hover:bg-[#d6182d] text-white rounded-[12px] h-14 text-base font-semibold shadow-lg shadow-[#f01a33]/20"
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            for (let i = 0; i < quantity; i++) {
                                                addToCart(selectedProduct);
                                            }
                                        }
                                        setSelectedProduct(null);
                                        setQuantity(1);
                                    }}
                                    className="flex-1 bg-white hover:bg-[#fff5f5] text-[#f01a33] border border-[#f01a33] rounded-[12px] h-14 text-base font-semibold"
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            addToWishlist(selectedProduct);
                                        }
                                    }}
                                    variant="outline"
                                    className={cn(
                                        "w-14 h-14 rounded-[12px] border border-gray-200 flex items-center justify-center p-0 hover:bg-gray-50",
                                        selectedProduct && isInWishlist(selectedProduct.id) && "bg-[#f01a33]/5 border-[#f01a33]/20 text-[#f01a33]"
                                    )}
                                >
                                    <Heart className={cn("w-6 h-6", selectedProduct && isInWishlist(selectedProduct.id) && "fill-current")} />
                                </Button>
                            </div>

                            <Link href={`/product/${selectedProduct?.id}`} className="group inline-flex items-center gap-2 text-[#f01a33] text-sm font-medium border border-[#f01a33]/30 px-6 py-2.5 rounded-full w-fit hover:bg-[#f01a33]/5 transition-all">
                                <span>View full detail</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right: Image */}
                        <div className="relative bg-[#f8f5f2] h-[400px] md:h-auto flex items-center justify-center p-12">
                            <div className="absolute top-8 left-8 z-10">
                                <span className="border border-[#f01a33] text-[#f01a33] px-5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider font-semibold">
                                    BEST SELLER
                                </span>
                            </div>
                            <img
                                src={selectedProduct?.image}
                                alt={selectedProduct?.name}
                                className="w-full h-auto max-h-[350px] object-contain mix-blend-multiply"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Cart;
