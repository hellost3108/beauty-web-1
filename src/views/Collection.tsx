"use client";
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import { useShop } from '@/context/ShopContext';
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
import { ChevronDown, SlidersHorizontal, Minus, Plus, Heart, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const categories = ['Chăm Sóc Da', 'Chăm Sóc Tóc', 'Cơ Thể', 'Sức Khỏe & Dụng Cụ', 'Bộ Quà Tặng'];

// Sample products data with enriched attributes
const allProducts = [
    { id: 1, image: "/assets/placeholder-400x500.png", name: 'Serum Dưỡng Sáng Da', price: '360.000', oldPrice: '390.000', category: 'Chăm Sóc Da', skinType: 'All', rawPrice: 360000 },
    { id: 2, image: "/assets/placeholder-400x500.png", name: 'Dầu Dưỡng Rạng Rỡ', price: '360.000', oldPrice: '390.000', category: 'Chăm Sóc Da', skinType: 'Da Khô', rawPrice: 360000 },
    { id: 3, image: "/assets/placeholder-400x500.png", name: 'Mặt Nạ Ủ Tóc Mượt', price: '360.000', oldPrice: '390.000', category: 'Chăm Sóc Tóc', skinType: 'Da Thường', rawPrice: 360000 },
    { id: 4, image: "/assets/placeholder-400x500.png", name: 'Xịt Phồng Tóc', price: '360.000', oldPrice: '390.000', category: 'Chăm Sóc Tóc', skinType: 'All', rawPrice: 360000 },
    { id: 5, image: "/assets/placeholder-400x500.png", name: 'Tẩy Da Chết Toàn Thân', price: '450.000', oldPrice: '510.000', category: 'Cơ Thể', skinType: 'Da Nhạy Cảm', rawPrice: 450000 },
    { id: 6, image: "/assets/placeholder-400x500.png", name: 'Bơ Shea Dưỡng Da', price: '300.000', oldPrice: '390.000', category: 'Cơ Thể', skinType: 'Da Khô', rawPrice: 300000 },
    { id: 7, image: "/assets/placeholder-400x500.png", name: 'Trà Thảo Mộc', price: '180.000', oldPrice: '240.000', category: 'Sức Khỏe & Dụng Cụ', skinType: 'All', rawPrice: 180000 },
    { id: 8, image: "/assets/placeholder-400x500.png", name: 'Bộ Quà Tặng Cao Cấp', price: '900.000', oldPrice: '1.050.000', category: 'Bộ Quà Tặng', skinType: 'All', rawPrice: 900000 },
    { id: 9, image: "/assets/placeholder-400x500.png", name: 'Kem Dưỡng Đêm', price: '570.000', oldPrice: '630.000', category: 'Chăm Sóc Da', skinType: 'Da Khô', rawPrice: 570000 },
    { id: 10, image: "/assets/placeholder-400x500.png", name: 'Dầu Gội', price: '270.000', oldPrice: '330.000', category: 'Chăm Sóc Tóc', skinType: 'Da Dầu', rawPrice: 270000 },
    // New Products
    { id: 11, image: "/assets/placeholder-400x500.png", name: 'Xịt Khoáng Cấp Ẩm', price: '270.000', oldPrice: '330.000', category: 'Chăm Sóc Da', skinType: 'Da Thường', rawPrice: 270000 },
    { id: 12, image: "/assets/placeholder-400x500.png", name: 'Kem Chống Lão Hoá', price: '750.000', oldPrice: '900.000', category: 'Chăm Sóc Da', skinType: 'Da Lão Hoá', rawPrice: 750000 },
    { id: 13, image: "/assets/placeholder-400x500.png", name: 'Kem Định Hình Tóc Xoăn', price: '390.000', oldPrice: '450.000', category: 'Chăm Sóc Tóc', skinType: 'All', rawPrice: 390000 },
    { id: 14, image: "/assets/placeholder-400x500.png", name: 'Tẩy Tế Bào Chết Da Đầu', price: '480.000', oldPrice: '570.000', category: 'Chăm Sóc Tóc', skinType: 'Da Dầu', rawPrice: 480000 },
    { id: 15, image: "/assets/placeholder-400x500.png", name: 'Sữa Tắm Hoa Oải Hương', price: '240.000', oldPrice: '300.000', category: 'Cơ Thể', skinType: 'All', rawPrice: 240000 },
    { id: 16, image: "/assets/placeholder-400x500.png", name: 'Bộ 3 Kem Dưỡng Tay', price: '360.000', oldPrice: '450.000', category: 'Cơ Thể', skinType: 'Da Khô', rawPrice: 360000 },
    { id: 17, image: "/assets/placeholder-400x500.png", name: 'Bột Superfood', price: '600.000', oldPrice: '750.000', category: 'Sức Khỏe & Dụng Cụ', skinType: 'All', rawPrice: 600000 },
    { id: 18, image: "/assets/placeholder-400x500.png", name: 'Nến Thơm Thư Giãn', price: '390.000', oldPrice: '480.000', category: 'Sức Khỏe & Dụng Cụ', skinType: 'All', rawPrice: 390000 },
    { id: 19, image: "/assets/placeholder-400x500.png", name: 'Bộ Kit Mini Thiết Yếu', price: '750.000', oldPrice: '900.000', category: 'Bộ Quà Tặng', skinType: 'All', rawPrice: 750000 },
    { id: 20, image: "/assets/placeholder-400x500.png", name: 'Combo Spa Trọn Gói', price: '1.500.000', oldPrice: '1.800.000', category: 'Bộ Quà Tặng', skinType: 'All', rawPrice: 1500000 },
];

const Collection = () => {
    const [activeCategory, setActiveCategory] = useState('Chăm Sóc Da');
    const [visibleProducts, setVisibleProducts] = useState(8);
    const { addToCart, addToWishlist, isInWishlist } = useShop();
    const router = useRouter();

    // Filters States
    const [sortBy, setSortBy] = useState('featured');
    const [skinTypeFilter, setSkinTypeFilter] = useState('All');
    const [priceRangeFilter, setPriceRangeFilter] = useState('All');
    const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
    const [quickViewQuantity, setQuickViewQuantity] = useState(1);

    const filteredProducts = useMemo(() => {
        return allProducts
            .filter(product => {
                // Category Filter
                if (activeCategory !== 'All' && product.category !== activeCategory) return false;

                // Skin Type Filter
                if (skinTypeFilter !== 'All' && product.skinType !== 'All' && product.skinType !== skinTypeFilter) return false;

                // Price Range Filter
                if (priceRangeFilter !== 'All') {
                    if (priceRangeFilter === 'Dưới 500k' && product.rawPrice >= 500000) return false;
                    if (priceRangeFilter === '500k-1tr' && (product.rawPrice < 500000 || product.rawPrice > 1000000)) return false;
                    if (priceRangeFilter === 'Trên 1tr' && product.rawPrice <= 1000000) return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low-high') return a.rawPrice - b.rawPrice;
                if (sortBy === 'price-high-low') return b.rawPrice - a.rawPrice;
                return 0; // 'featured' or default
            });
    }, [activeCategory, skinTypeFilter, priceRangeFilter, sortBy]);

    const handleLoadMore = () => {
        setVisibleProducts(prev => prev + 8);
    };

    const resetFilters = () => {
        setSortBy('featured');
        setSkinTypeFilter('All');
        setPriceRangeFilter('All');
    };

    const handleShare = (product: any) => {
        // Share functionality disabled
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Page Header */}
            <div className="pt-32 pb-8 text-center bg-white">
                <h1 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-4">
                    Bộ Sưu Tập <span className="text-[#f01a33]">Của Chúng Tôi</span>
                </h1>
                <p className="font-body text-[#666666] text-sm md:text-base max-w-2xl mx-auto px-6 leading-relaxed">
                    Khám phá những bộ sưu tập được tuyển chọn kỹ lưỡng, mỗi bộ sưu tập lấy cảm hứng từ sự chuyển mình của các mùa và vẻ đẹp vượt thời gian của thiên nhiên.
                </p>
            </div>

            {/* Category Tabs */}
            <section className="border-b border-[#e5e5e5]">
                <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
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

            {/* Filters Bar */}
            <section className="bg-white">
                <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32 py-4">
                    <div className="flex flex-nowrap overflow-x-auto items-center justify-start md:justify-end gap-4 pb-2 md:pb-0 scrollbar-hide">
                        {/* Filter Toggle / Reset */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg hover:border-[#9ca3af] transition-colors duration-300 font-body whitespace-nowrap shrink-0">
                                    <span className="text-base text-[#666666]">Bộ Lọc</span>
                                    <SlidersHorizontal className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 font-body">
                                <DropdownMenuLabel>Tuỳ Chọn Lọc</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={resetFilters}>
                                    Đặt Lại Bộ Lọc
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Sort By */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg hover:border-[#9ca3af] transition-colors duration-300 font-body whitespace-nowrap shrink-0">
                                    <span className="text-base text-[#666666]">
                                        {sortBy === 'featured' ? 'Sắp Xếp: Nổi Bật' :
                                            sortBy === 'price-low-high' ? 'Sắp Xếp: Giá Tăng Dần' :
                                                'Sắp Xếp: Giá Giảm Dần'}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                    <DropdownMenuRadioItem value="featured">Nổi Bật</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-low-high">Giá: Tăng Dần</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-high-low">Giá: Giảm Dần</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Skin Type */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${skinTypeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {skinTypeFilter === 'All' ? 'Loại Da' : skinTypeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${skinTypeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                                    <DropdownMenuRadioItem value="All">Tất Cả Loại Da</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Da Khô">Da Khô</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Da Dầu">Da Dầu</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Da Hỗn Hợp">Da Hỗn Hợp</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Da Nhạy Cảm">Da Nhạy Cảm</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Da Thường">Da Thường</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Price Range */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${priceRangeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {priceRangeFilter === 'All' ? 'Khoảng Giá' : priceRangeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${priceRangeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                                    <DropdownMenuRadioItem value="All">Tất Cả Mức Giá</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Dưới 500k">Dưới 500.000₫</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="500k-1tr">500.000₫ - 1.000.000₫</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Trên 1tr">Trên 1.000.000₫</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-white">
                <div className="w-full px-6 md:px-10 lg:px-24 xl:px-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.slice(0, visibleProducts).map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => setQuickViewProduct(product)}
                                    className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                                >
                                    {/* Image Section */}
                                    <div className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7]">
                                        {/* Sale Badge */}
                                        <div className="absolute top-4 left-4 z-20 bg-[#f01a33] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Giảm Giá
                                        </div>

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />

                                        {/* Hover Overlay with Icons and Button */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">

                                            {/* Action Icons - Top Right - Slide in from right */}
                                            <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-out">
                                                {/* Heart/Wishlist Icon */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        addToWishlist(product);
                                                    }}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isInWishlist(product.id) ? 'bg-[#f01a33] text-white' : 'bg-white hover:bg-[#f01a33] hover:text-white'}`}
                                                >
                                                    <svg className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>

                                                {/* Share Icon */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleShare(product);
                                                    }}
                                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f01a33] hover:text-white transition-all duration-300 shadow-md"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Add to Cart Button - White fills from bottom-right upward */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }}
                                                    className="relative w-full bg-[#f01a33] text-white py-3 rounded-[12px] font-display font-semibold text-sm overflow-hidden group/btn shadow-lg hover:shadow-xl transition-shadow duration-500"
                                                >
                                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm Vào Giỏ</span>
                                                    {/* White fill animation from bottom-right rising upward */}
                                                    <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid"
                                                        style={{ transformOrigin: 'bottom right' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="flex flex-col items-center text-center p-6 pt-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-display text-xl font-bold text-[#1a1a1a]">{product.price}₫</span>
                                            <span className="font-display text-xs text-[#999999] line-through">{product.oldPrice}₫</span>
                                        </div>
                                        <p className="font-display text-lg italic text-[#1a1a1a] opacity-90">
                                            {product.name}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500 font-display text-xl">
                                Không tìm thấy sản phẩm nào trong danh mục này.
                            </div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {visibleProducts < filteredProducts.length && (
                        <div className="flex justify-center mt-12">
                            <Button
                                onClick={handleLoadMore}
                                className="relative bg-[#f01a33] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500"
                            >
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Xem Thêm</span>
                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection />


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
                                <span className="text-[#f01a33] font-display text-2xl font-bold">{quickViewProduct?.price}₫</span>
                                <span className="text-gray-400 text-sm line-through">{quickViewProduct?.oldPrice}₫</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                                Sự kết hợp mạnh mẽ giữa thảo dược Ayurvedic và khoa học hiện đại, được thiết kế để làm sáng làn da xỉn màu. Với chiết xuất nghệ tây và hyaluronic acid, loại serum mỏng nhẹ này thẩm thấu sâu để cấp ẩm, làm sáng da và phục hồi vẻ rạng rỡ tự nhiên qua từng đêm.
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
                                    className="flex-1 bg-[#f01a33] text-white rounded-[10px] py-6 shadow-lg shadow-[#f01a33]/20 text-base font-normal relative overflow-hidden group/btn"
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
                                    router.push(`/product/${productId}`);
                                    setQuickViewProduct(null);
                                }}
                                className="inline-flex items-center gap-2 text-[#f01a33] text-sm sm:text-base border border-[#f01a33]/30 px-6 py-2 rounded-full w-fit hover:bg-[#f01a33]/5 transition-colors cursor-pointer"
                            >
                                <span>Xem Chi Tiết Đầy Đủ</span>
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>

                        {/* Right: Image */}
                        <div className="relative bg-[#ebe7e5] h-[400px] md:h-auto">
                            <div className="absolute top-6 left-6 z-10">
                                <span className="border border-[#f01a33] text-[#f01a33] px-4 pt-1 pb-2 rounded-lg text-sm font-display inline-flex items-center justify-center leading-none">
                                    Bán Chạy Nhất
                                </span>
                            </div>
                            <img
                                src={quickViewProduct?.image}
                                alt={quickViewProduct?.name}
                                className="w-full h-full object-cover p-8 md:p-12 mix-blend-multiply"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Collection;
