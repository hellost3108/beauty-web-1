"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Minus, Plus, Heart, ChevronDown, Star, ChevronRight, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BeautyDiaries from '@/components/BeautyDiaries';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { StorefrontProduct } from '@/types/cms';

const ProductDetail = ({
    product: productDetails,
    relatedProducts = [],
}: {
    product: StorefrontProduct | null;
    relatedProducts?: StorefrontProduct[];
}) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
    const [quickViewQuantity, setQuickViewQuantity] = useState(1);
    const [isNavigating, setIsNavigating] = useState(false);
    const { addToCart, addToWishlist, isInWishlist } = useShop();

    const [activeImage, setActiveImage] = useState<string | undefined>(productDetails?.images?.[0]);

    useEffect(() => {
        if (!productDetails) {
            router.push('/collection');
        }
        window.scrollTo(0, 0);
        setActiveImage(productDetails?.images?.[0]);
    }, [productDetails, router]);

    if (!productDetails) return null;

    const handleAddToCart = (qty: number = 1) => {
        for (let i = 0; i < qty; i++) {
            addToCart(productDetails);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart(quantity);
        router.push('/cart');
    };

    const handleAddToWishlist = () => {
        addToWishlist(productDetails);
    };

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Navbar />

            {/* Breadcrumb */}
            <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24 pt-28">
                <nav className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
                    <Link
                        href="/"
                        className="hover:text-[#f01a33] transition-colors animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
                    >
                        Trang Chủ
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400 animate-in fade-in slide-in-from-left-4 duration-700 delay-150 fill-mode-both" />
                    <Link
                        href="/collection"
                        className="hover:text-[#f01a33] transition-colors animate-in fade-in slide-in-from-left-4 duration-700 delay-300 fill-mode-both"
                    >
                        Bộ Sưu Tập
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400 animate-in fade-in slide-in-from-left-4 duration-700 delay-500 fill-mode-both" />
                    <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none animate-in fade-in slide-in-from-left-4 duration-700 delay-700 fill-mode-both">
                        {productDetails.name}
                    </span>
                </nav>
            </div>

            {/* Product Hero Section */}
            <section className="py-12 md:py-20">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left: Image */}
                        <div className="space-y-6">
                            <div className="relative aspect-square bg-[#f9f8f7] rounded-[20px] overflow-hidden">
                                <div className="absolute top-6 left-6 z-10 bg-[#f01a33]/10 text-[#f01a33] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider border border-[#f01a33]/20">
                                    Bán Chạy Nhất
                                </div>
                                <img
                                    src={activeImage || productDetails.image}
                                    alt={productDetails.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {productDetails.images && productDetails.images.length > 1 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {productDetails.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`aspect-square bg-[#f9f8f7] rounded-[12px] overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[#f01a33]' : 'border-transparent hover:border-gray-200'}`}
                                        >
                                            <img src={img} alt={`${productDetails.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Details */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-2">
                                    {productDetails.name}
                                </h1>
                                <p className="font-body text-[#666666] text-lg">{productDetails.subtitle}</p>

                                {/* Rating Badge */}
                                <div className="flex items-center gap-1 mt-3">
                                    <div className="flex items-center gap-1 px-2 py-0.5 border border-[#f01a33]/50 rounded-full text-[#f01a33] text-xs font-bold">
                                        <span>4.2</span>
                                        <div className="flex gap-[1px]">
                                            {[1, 2, 3, 4].map((star) => (
                                                <Star key={star} className="w-3 h-3 fill-transparent stroke-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end gap-3">
                                <span className="font-display text-3xl font-bold text-[#f01a33]">{productDetails.price}đ</span>
                            </div>

                            <p className="font-body text-[#666666] leading-relaxed">
                                {productDetails.description}
                            </p>

                            {/* Quantity & Actions */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center border border-gray-200 rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <Button
                                    onClick={() => handleAddToCart(quantity)}
                                    className="bg-white text-[#f01a33] border border-[#f01a33] px-8 py-6 rounded-md hover:bg-[#fff5f5] text-base font-medium min-w-[140px]"
                                >
                                    Thêm Vào Giỏ
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleBuyNow}
                                    className="bg-[#f01a33] text-white px-12 py-6 rounded-md shadow-lg shadow-[#f01a33]/20 text-base font-medium flex-1 md:flex-none relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Mua Ngay</span>
                                    <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                </Button>
                                <button
                                    onClick={handleAddToWishlist}
                                    className={`flex items-center gap-2 px-6 py-3 border rounded-md transition-colors ${isInWishlist(productDetails.id) ? 'border-[#f01a33] text-[#f01a33] bg-[#fff5f5]' : 'border-gray-200 hover:border-[#f01a33] hover:text-[#f01a33]'}`}
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(productDetails.id) ? 'fill-[#f01a33]' : ''}`} />
                                    <span className="text-sm font-medium">{isInWishlist(productDetails.id) ? 'Đã Yêu Thích' : 'Thêm Vào Yêu Thích'}</span>
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-4 gap-4 py-6 border-t border-gray-100">
                                {[
                                    { icon: "/assets/icon1.png", label: "Thành Phần Tự Nhiên" },
                                    { icon: "/assets/icon2.png", label: "Có Thể Tái Chế" },
                                    { icon: "/assets/icon3.png", label: "Không Thử Nghiệm Trên Động Vật" },
                                    { icon: "/assets/icon4.png", label: "Đã Kiểm Nghiệm Da Liễu" },
                                ].map((item, i) => (
                                    <div key={i} className="text-center space-y-2">
                                        <div className="w-12 h-12 mx-auto flex items-center justify-center">
                                            <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                                        </div>
                                        <p className="text-[10px] font-medium text-gray-600 uppercase tracking-tight">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accordion Info */}
            <section className="py-12 bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="description" className="border-b border-gray-200">
                            <AccordionTrigger className="font-display text-xl py-4 hover:text-[#f01a33] hover:no-underline">Mô Tả Sản Phẩm</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                                {productDetails.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="ingredients" className="border-b border-gray-200">
                            <AccordionTrigger className="font-display text-xl py-4 hover:text-[#f01a33] hover:no-underline">Thành Phần Chính</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                                {productDetails.ingredients}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="usage" className="border-b border-gray-200">
                            <AccordionTrigger className="font-display text-xl py-4 hover:text-[#f01a33] hover:no-underline">Cách Sử Dụng</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                                {productDetails.usage}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="shipping" className="border-b border-gray-200">
                            <AccordionTrigger className="font-display text-xl py-4 hover:text-[#f01a33] hover:no-underline">Vận Chuyển & Đổi Trả</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                                Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm chưa sử dụng và còn nguyên bao bì.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* Reviews Section */}
            <BeautyDiaries />

            {/* Related Products */}
            <section className="py-20 bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-[36px] text-[#1a1a1a]">
                            Khám Phá <span className="text-[#f01a33]">Các Sản Phẩm Khác</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                            >
                                <div
                                    className="relative w-full aspect-[4/5] overflow-hidden bg-[#f9f8f7]"
                                    onClick={() => setQuickViewProduct(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-auto">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToWishlist(product);
                                                }}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isInWishlist(product.id) ? 'bg-[#f01a33] text-white' : 'bg-white hover:bg-[#f01a33] hover:text-white'}`}
                                            >
                                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Share functionality
                                                }}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f01a33] hover:text-white transition-all duration-300 shadow-md"
                                            >
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                                className="relative w-full bg-[#f01a33] text-white py-3 rounded-[12px] font-display font-semibold text-sm overflow-hidden group/btn shadow-lg hover:shadow-xl transition-shadow duration-500"
                                            >
                                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm Vào Giỏ</span>
                                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col items-center text-center p-6 pt-4 space-y-2"
                                    onClick={() => setQuickViewProduct(product)}
                                >
                                    <span className="font-display text-xl font-bold text-[#1a1a1a]">{product.price}đ</span>
                                    <p className="font-display text-lg italic text-[#1a1a1a] opacity-90 group-hover:text-[#f01a33] transition-colors">
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">

                    </div>
                </div>
            </section>

            <Footer />

            {/* Quick View Modal */}
            <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto bg-[#fdfcfc] border-none rounded-[30px] gap-0">
                    <DialogTitle className="sr-only">Xem Nhanh</DialogTitle>
                    <DialogDescription className="sr-only">Chi tiết xem nhanh</DialogDescription>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2">
                        {/* Left: Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a]">
                                    {quickViewProduct?.name}
                                </h2>
                                <div className="flex items-center gap-1 border border-[#f01a33] rounded-full px-2 py-0.5">
                                    <span className="text-xs font-bold text-[#f01a33]">4.2</span>
                                    <Star className="w-3 h-3 text-[#f01a33] fill-[#f01a33]" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-[#f01a33] font-display text-2xl font-bold">{quickViewProduct?.price}đ</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                                {quickViewProduct?.description}
                            </p>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                    <button
                                        onClick={() => setQuickViewQuantity(Math.max(1, quickViewQuantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{quickViewQuantity}</span>
                                    <button
                                        onClick={() => setQuickViewQuantity(quickViewQuantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mb-6">
                                <Button
                                    onClick={() => {
                                        if (quickViewProduct) {
                                            for (let i = 0; i < quickViewQuantity; i++) {
                                                addToCart(quickViewProduct);
                                            }
                                        }
                                        setQuickViewProduct(null);
                                        setQuickViewQuantity(1);
                                    }}
                                    className="flex-1 bg-[#f01a33] hover:bg-[#d6182d] text-white rounded-[10px] py-6 shadow-lg shadow-[#f01a33]/20 text-base font-normal relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Mua Ngay</span>
                                    <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (quickViewProduct) {
                                            for (let i = 0; i < quickViewQuantity; i++) {
                                                addToCart(quickViewProduct);
                                            }
                                        }
                                        setQuickViewProduct(null);
                                        setQuickViewQuantity(1);
                                    }}
                                    className="flex-1 bg-white hover:bg-[#fff5f5] text-[#f01a33] border border-[#f01a33] rounded-[10px] py-6 text-base font-normal"
                                >
                                    Thêm Vào Giỏ
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (quickViewProduct) {
                                            addToWishlist(quickViewProduct);
                                        }
                                    }}
                                    variant="outline"
                                    className={cn(
                                        "w-12 h-12 rounded-[10px] border border-gray-200 flex items-center justify-center p-0 hover:bg-gray-50",
                                        quickViewProduct && isInWishlist(quickViewProduct.id) && "bg-[#f01a33]/5 border-[#f01a33]/20 text-[#f01a33]"
                                    )}
                                >
                                    <Heart className={cn("w-5 h-5", quickViewProduct && isInWishlist(quickViewProduct.id) && "fill-current")} />
                                </Button>
                            </div>

                            <button
                                onClick={() => {
                                    const productId = quickViewProduct?.id;
                                    setIsNavigating(true);
                                    setQuickViewProduct(null);
                                    setTimeout(() => {
                                        router.push(`/product/${productId}`);
                                    }, 50);
                                }}
                                className="inline-flex items-center gap-2 text-[#f01a33] text-sm sm:text-base border border-[#f01a33]/30 px-6 py-2 rounded-full w-fit hover:bg-[#f01a33]/5 transition-colors cursor-pointer"
                            >
                                <span>Xem Chi Tiết Đầy Đủ</span>
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>

                        {/* Right: Image */}
                        <div className="relative bg-[#ebe7e5] h-[400px] md:h-auto">
                            <img
                                src={quickViewProduct?.image}
                                alt={quickViewProduct?.name}
                                className="w-full h-full object-cover p-8 md:p-12"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Loading Overlay */}
            {isNavigating && (
                <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
                    <div className="text-[#f01a33] text-lg font-medium">Đang tải...</div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
