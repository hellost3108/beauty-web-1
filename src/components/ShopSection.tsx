"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useShop } from '@/context/ShopContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/productsData';

import BeautyDiaries from './BeautyDiaries';

const categories = ['Tất Cả', 'Cấp Ẩm', 'Phục Hồi', 'Làm Sáng', 'Rạng Rỡ'];

const ShopSection = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Tất Cả');
    const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, addToWishlist, isInWishlist } = useShop();

    const [sortBy, setSortBy] = useState('featured');

    const filteredProducts = useMemo(() => {
        return allProducts
            .filter(product => activeCategory === 'Tất Cả' || product.category === activeCategory)
            .sort((a, b) => {
                if (sortBy === 'price-low-high') return a.rawPrice - b.rawPrice;
                if (sortBy === 'price-high-low') return b.rawPrice - a.rawPrice;
                return 0;
            });
    }, [activeCategory, sortBy]);

    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="relative w-full">
                <div className="w-full h-[25vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
                    <img
                        src="/assets/skincare-mask-application.jpg"
                        alt="Cửa hàng Melalogy"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 text-center py-12">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
                        <span className="text-[#f01a33]">CỬA HÀNG</span> MELALOGY
                    </h2>
                    <p className="font-body text-[#666666] text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
                        4 công thức mặt nạ hydrogel Energy Shot — chọn phiên bản phù hợp với làn da của bạn.
                    </p>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="border-y border-[#e5e5e5] bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-6 md:gap-12 py-6 px-4 md:px-0 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`font-display text-base md:text-lg transition-colors duration-300 whitespace-nowrap ${activeCategory === category
                                    ? 'text-[#f01a33] border-b-2 border-[#f01a33] pb-2'
                                    : 'text-[#1a1a1a] hover:text-[#f01a33] pb-2'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sort Bar */}
            <section className="bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24 py-4">
                    <div className="flex justify-end">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg hover:border-[#9ca3af] transition-colors duration-300 font-body whitespace-nowrap shrink-0">
                                    <span className="text-base text-[#666666]">
                                        {sortBy === 'featured' ? 'Sắp xếp: Nổi bật' :
                                            sortBy === 'price-low-high' ? 'Sắp xếp: Giá thấp đến cao' :
                                                'Sắp xếp: Giá cao đến thấp'}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                    <DropdownMenuRadioItem value="featured">Nổi bật</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-low-high">Giá: thấp đến cao</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-high-low">Giá: cao đến thấp</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                            >
                                <div
                                    className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7] cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="absolute top-4 left-4 z-20 bg-[#f01a33] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.category}
                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

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
                                                onClick={(e) => e.stopPropagation()}
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
                                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm vào giỏ</span>
                                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center p-6 pt-4 space-y-2">
                                    <span className="font-display text-xl font-bold text-[#1a1a1a]">{product.price}đ</span>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="font-display text-lg italic text-[#1a1a1a] opacity-90 hover:text-[#f01a33] transition-colors"
                                    >
                                        {product.name}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link href="/collection">
                            <Button className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Xem toàn bộ sưu tập</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Beauty Diaries Section */}
            <BeautyDiaries />

            {/* Quick View Modal */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto bg-[#fdfcfc] border-none rounded-[30px] gap-0">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedProduct?.name}</DialogTitle>
                        <DialogDescription>Xem nhanh cho {selectedProduct?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2">
                        {/* Left: Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-display text-3xl md:text-4xl text-[#1a1a1a]">
                                    {selectedProduct?.name}
                                </h2>
                                <div className="flex items-center gap-1 border border-[#f01a33] rounded-full px-2 py-0.5">
                                    <span className="text-xs font-bold text-[#f01a33]">4.8</span>
                                    <Star className="w-3 h-3 text-[#f01a33] fill-[#f01a33]" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-[#f01a33] font-display text-2xl font-bold">{selectedProduct?.price}đ</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                                {selectedProduct?.description}
                            </p>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
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
                                        if (selectedProduct) {
                                            for (let i = 0; i < quantity; i++) {
                                                addToCart(selectedProduct);
                                            }
                                        }
                                        setSelectedProduct(null);
                                        setQuantity(1);
                                        router.push('/cart');
                                    }}
                                    className="flex-1 bg-[#f01a33] text-white rounded-[10px] py-6 shadow-lg shadow-[#f01a33]/20 text-base font-normal relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Mua ngay</span>
                                    <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
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
                                    className="flex-1 bg-white hover:bg-[#fff5f5] text-[#f01a33] border border-[#f01a33] rounded-[10px] py-6 text-base font-normal"
                                >
                                    Thêm vào giỏ
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            addToWishlist(selectedProduct);
                                        }
                                    }}
                                    variant="outline"
                                    className={cn(
                                        "w-12 h-12 rounded-[10px] border border-gray-200 flex items-center justify-center p-0 hover:bg-gray-50",
                                        selectedProduct && isInWishlist(selectedProduct.id) && "bg-[#f01a33]/5 border-[#f01a33]/20 text-[#f01a33]"
                                    )}
                                >
                                    <Heart className={cn("w-5 h-5", selectedProduct && isInWishlist(selectedProduct.id) && "fill-current")} />
                                </Button>
                            </div>

                            <button
                                onClick={() => {
                                    if (selectedProduct?.id) {
                                        const productId = selectedProduct.id;
                                        setSelectedProduct(null);
                                        setTimeout(() => {
                                            window.scrollTo({ top: 0, behavior: 'instant' });
                                            router.push(`/product/${productId}`);
                                        }, 0);
                                    }
                                }}
                                className="inline-flex items-center gap-2 text-[#f01a33] text-sm sm:text-base border border-[#f01a33]/30 px-6 py-2 rounded-full w-fit hover:bg-[#f01a33]/5 transition-colors cursor-pointer"
                            >
                                <span>Xem chi tiết</span>
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>

                        {/* Right: Image */}
                        <div className="relative bg-[#ebe7e5] h-[400px] md:h-auto">
                            <img
                                src={selectedProduct?.image}
                                alt={selectedProduct?.name}
                                className="w-full h-full object-cover p-8 md:p-12 mix-blend-multiply"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShopSection;
