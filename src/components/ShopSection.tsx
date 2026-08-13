"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Star, Minus, Plus, Heart, SlidersHorizontal, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

import BeautyDiaries from './BeautyDiaries';

const categoryOptions = [
    { value: 'Best Seller', label: 'Bán chạy' },
    { value: 'Make-up', label: 'Trang điểm' },
    { value: 'Skincare', label: 'Chăm sóc da' },
    { value: 'Fashion & food', label: 'Thời trang & đồ ăn' },
    { value: 'Lips Duo', label: 'Son môi' },
];

const highlightProducts = [
    { id: 1, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'All', rawPrice: 4500000 },
    { id: 2, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'Dry', rawPrice: 4500000 },
    { id: 3, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'Normal', rawPrice: 4500000 },
    { id: 4, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'All', rawPrice: 4500000 },
];

const allProducts = [
    // Skincare
    { id: 1, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'All', rawPrice: 4500000 },
    { id: 5, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'Sensitive', rawPrice: 4500000 },
    { id: 9, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'Dry', rawPrice: 4500000 },
    { id: 10, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Skincare', skinType: 'All', rawPrice: 4500000 },

    // Make-up
    { id: 2, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Make-up', skinType: 'All', rawPrice: 4500000 },
    { id: 6, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Make-up', skinType: 'Oily', rawPrice: 4500000 },
    { id: 11, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Make-up', skinType: 'All', rawPrice: 4500000 },
    { id: 12, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Make-up', skinType: 'All', rawPrice: 4500000 },
    { id: 13, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Make-up', skinType: 'All', rawPrice: 4500000 },

    // Fashion & food
    { id: 3, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Fashion & food', skinType: 'All', rawPrice: 4500000 },
    { id: 7, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Fashion & food', skinType: 'All', rawPrice: 4500000 },
    { id: 14, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Fashion & food', skinType: 'All', rawPrice: 4500000 },
    { id: 15, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Fashion & food', skinType: 'All', rawPrice: 4500000 },
    { id: 16, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Fashion & food', skinType: 'All', rawPrice: 4500000 },

    // Lips Duo
    { id: 4, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'All', rawPrice: 4500000 },
    { id: 8, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'Dry', rawPrice: 4500000 },
    { id: 17, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'All', rawPrice: 4500000 },
    { id: 18, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'All', rawPrice: 4500000 },
    { id: 19, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'All', rawPrice: 4500000 },
    { id: 20, image: "/assets/sanpham400x500.png", name: 'Kem dưỡng', price: '4.500.000', oldPrice: '4.800.000', category: 'Lips Duo', skinType: 'All', rawPrice: 4500000 },
];

const ShopSection = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Best Seller');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, addToWishlist, isInWishlist } = useShop();

    // Filters States
    const [sortBy, setSortBy] = useState('featured');
    const [skinTypeFilter, setSkinTypeFilter] = useState('All');
    const [priceRangeFilter, setPriceRangeFilter] = useState('All');

    const resetFilters = () => {
        setSortBy('featured');
        setSkinTypeFilter('All');
        setPriceRangeFilter('All');
    };

    const filteredProducts = useMemo(() => {
        return allProducts
            .filter(product => {
                // Category Filter
                if (activeCategory !== 'Best Seller' && product.category !== activeCategory) return false;

                // Skin Type Filter
                if (skinTypeFilter !== 'All' && product.skinType !== 'All' && product.skinType !== skinTypeFilter) return false;

                // Price Range Filter
                if (priceRangeFilter !== 'All') {
                    if (priceRangeFilter === 'Under 1000' && product.rawPrice >= 1000) return false;
                    if (priceRangeFilter === '1000-2000' && (product.rawPrice < 1000 || product.rawPrice > 2000)) return false;
                    if (priceRangeFilter === 'Above 2000' && product.rawPrice <= 2000) return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low-high') return a.rawPrice - b.rawPrice;
                if (sortBy === 'price-high-low') return b.rawPrice - a.rawPrice;
                return 0; // 'featured' or default
            });
    }, [activeCategory, skinTypeFilter, priceRangeFilter, sortBy]);

    return (
        <div className="w-full bg-white">
            {/* Hero Section with Purple Gradient - Matching Screenshot EXACTLY */}
            <section className="relative w-full">
                {/* Full width hero image */}
                <div className="w-full h-[25vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] @[@media(max-height:500px)]:!h-screen relative overflow-hidden">
                    <img
                        src="/assets/shop-hero.png"
                        alt="Blushora Shop Highlights"
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Heading Overlay */}
                </div>

                {/* Highlights Title - Positioned below image like design */}
                <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 text-center py-12">
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
                        <span className="text-[#f01a33]">SẢN PHẨM</span> BÁN CHẠY
                    </h2>
                </div>
            </section>

            {/* Highlights Product Grid - Shifted slightly up to bridge gap */}
            <section className="bg-white relative z-20 pb-12">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlightProducts.map((product) => (
                            <div key={product.id} className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                                <div
                                    className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7] cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="absolute top-4 left-4 z-20 bg-[#f01a33] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Giảm giá
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Share functionality disabled
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
                                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm vào giỏ</span>
                                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center p-6 pt-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-display text-xl font-bold text-[#1a1a1a]">{product.price}</span>
                                        <span className="font-display text-xs text-[#999999] line-through">{product.oldPrice}</span>
                                    </div>
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

                    {/* View All Button */}
                    <div className="flex justify-center mt-12">
                        <Link href="/collection">
                            <Button className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">xem tiếp</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mascara Section */}
            <section className="py-16 bg-[#fcfcfc]">
                <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <h2 className="font-display text-3xl md:text-4xl leading-tight">
                                <span className="text-[#f01a33]">Kem dưỡng</span>
                            </h2>
                            <p className="font-body text-[#666666] text-base md:text-lg leading-relaxed max-w-md">
                                Nuôi dưỡng làn da mỗi ngày
                            </p>
                            <div className="mt-4">
                                <Button asChild className="relative bg-[#f01a33] text-white px-14 py-4 text-sm font-bold rounded-[16px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500">
                                    <Link href="/collection" className="relative z-10">
                                        <div className="absolute inset-0 bg-white h-0 group-hover:h-full transition-all duration-700 ease-liquid mt-auto" style={{ transformOrigin: 'bottom' }} />
                                        <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Mua ngay</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="grid grid-cols-2 gap-4 h-[300px] md:h-[500px] lg:h-[500px]">
                            <div className="h-full rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-lg">
                                <img src="/assets/sanpham400x500.png" alt="Eye makeup" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-full rounded-[20px] overflow-hidden shadow-lg bg-gradient-to-b from-[#8eb8e5] to-[#2d5f9e] flex items-center justify-center p-0">
                                <img src="/assets/sanpham400x500.png" alt="Kem dưỡng product" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="border-y border-[#e5e5e5] bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-6 md:gap-12 py-6 px-4 md:px-0 scrollbar-hide">
                        {categoryOptions.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setActiveCategory(category.value)}
                                className={`font-display text-base md:text-lg transition-colors duration-300 whitespace-nowrap ${activeCategory === category.value
                                    ? 'text-[#f01a33] border-b-2 border-[#f01a33] pb-2'
                                    : 'text-[#1a1a1a] hover:text-[#f01a33] pb-2'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters Bar */}
            <section className="bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24 py-4">
                    <div className="flex flex-nowrap overflow-x-auto items-center justify-start md:justify-end gap-4 pb-2 md:pb-0 scrollbar-hide">
                        {/* Filter Toggle / Reset */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg hover:border-[#9ca3af] transition-colors duration-300 font-body whitespace-nowrap shrink-0">
                                    <span className="text-base text-[#666666]">Lọc</span>
                                    <SlidersHorizontal className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 font-body">
                                <DropdownMenuLabel>Tùy chọn lọc</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={resetFilters}>
                                    Xóa tất cả bộ lọc
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Sort By */}
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

                        {/* Skin Type */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${skinTypeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {skinTypeFilter === 'All' ? 'Loại da' : skinTypeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${skinTypeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                                    <DropdownMenuRadioItem value="All">Tất cả</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Dry">Da khô</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Oily">Da dầu</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Combination">Da hỗn hợp</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Sensitive">Da nhạy cảm</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Normal">Da thường</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Price Range */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${priceRangeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {priceRangeFilter === 'All' ? 'Khoảng giá' : priceRangeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${priceRangeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                                    <DropdownMenuRadioItem value="All">Tất cả</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Under 1000">Dưới 1.000</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="1000-2000">1.000 - 2.000</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Above 2000">Trên 2.000</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-white">
                <div className="w-full mx-auto px-6 md:px-10 lg:px-16 xl:px-24">
                    <div
                        key={`${sortBy}-${skinTypeFilter}-${priceRangeFilter}`}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in-up opacity-0"
                                style={{
                                    animationDelay: `${index * 30}ms`,
                                    animationFillMode: 'forwards',
                                    willChange: 'opacity, transform'
                                }}
                            >
                                <div
                                    className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7] cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="absolute top-4 left-4 z-20 bg-[#f01a33] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Giảm giá
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Share functionality disabled
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
                                                <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm vào giỏ</span>
                                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center p-6 pt-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-display text-xl font-bold text-[#1a1a1a]">{product.price}</span>
                                        <span className="font-display text-xs text-[#999999] line-through">{product.oldPrice}</span>
                                    </div>
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

                    {/* Load More Button */}
                    <div className="flex justify-center mt-12">
                        <Link href="/collection">
                            <Button className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Xem thêm</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Beauty Diaries Section */}
            < BeautyDiaries />

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
                                    <span className="text-xs font-bold text-[#f01a33]">4.2</span>
                                    <Star className="w-3 h-3 text-[#f01a33] fill-[#f01a33]" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-[#f01a33] font-display text-2xl font-bold">{selectedProduct?.price}</span>
                                <span className="text-gray-400 text-sm line-through">{selectedProduct?.oldPrice}</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                                Hỗn hợp thảo dược và công nghệ hiện đại giúp nuôi dưỡng làn da sạm màu, mang lại vẻ sáng khỏe, mềm mịn và rạng rỡ ngay từ lần sử dụng đầu tiên.
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
                                        toast.success("Added to cart");
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
                            <div className="absolute top-6 left-6 z-10">
                                <span className="border border-[#f01a33] text-[#f01a33] px-4 pt-1 pb-2 rounded-lg text-sm font-display inline-flex items-center justify-center leading-none">
                                    Bán chạy
                                </span>
                            </div>
                            <img
                                src={selectedProduct?.image}
                                alt={selectedProduct?.name}
                                className="w-full h-full object-cover p-8 md:p-12 mix-blend-multiply"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default ShopSection;
