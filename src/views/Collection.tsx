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

const categories = ['Skincare', 'Haircare', 'Body', 'Wellness & Tool', 'Gift Sets'];

// Sample products data with enriched attributes
const allProducts = [
    { id: 1, image: "/assets/placeholder-400x500.png", name: 'Glow Skin Serum', price: '1,199', oldPrice: '1,299', category: 'Skincare', skinType: 'All', rawPrice: 1199 },
    { id: 2, image: "/assets/placeholder-400x500.png", name: 'Radiance Oil', price: '1,199', oldPrice: '1,299', category: 'Skincare', skinType: 'Dry', rawPrice: 1199 },
    { id: 3, image: "/assets/placeholder-400x500.png", name: 'Silk Hair Mask', price: '1,199', oldPrice: '1,299', category: 'Haircare', skinType: 'Normal', rawPrice: 1199 },
    { id: 4, image: "/assets/placeholder-400x500.png", name: 'Volume Boost', price: '1,199', oldPrice: '1,299', category: 'Haircare', skinType: 'All', rawPrice: 1199 },
    { id: 5, image: "/assets/placeholder-400x500.png", name: 'Body Polish', price: '1,499', oldPrice: '1,699', category: 'Body', skinType: 'Sensitive', rawPrice: 1499 },
    { id: 6, image: "/assets/placeholder-400x500.png", name: 'Shea Butter', price: '999', oldPrice: '1,299', category: 'Body', skinType: 'Dry', rawPrice: 999 },
    { id: 7, image: "/assets/placeholder-400x500.png", name: 'Herbal Tea', price: '599', oldPrice: '799', category: 'Wellness & Tool', skinType: 'All', rawPrice: 599 },
    { id: 8, image: "/assets/placeholder-400x500.png", name: 'Luxury Gift Set', price: '2,999', oldPrice: '3,499', category: 'Gift Sets', skinType: 'All', rawPrice: 2999 },
    { id: 9, image: "/assets/placeholder-400x500.png", name: 'Night Cream', price: '1,899', oldPrice: '2,099', category: 'Skincare', skinType: 'Dry', rawPrice: 1899 },
    { id: 10, image: "/assets/placeholder-400x500.png", name: 'Shampoo', price: '899', oldPrice: '1,099', category: 'Haircare', skinType: 'Oily', rawPrice: 899 },
    // New Products
    { id: 11, image: "/assets/placeholder-400x500.png", name: 'Hydrating Mist', price: '899', oldPrice: '1,099', category: 'Skincare', skinType: 'Normal', rawPrice: 899 },
    { id: 12, image: "/assets/placeholder-400x500.png", name: 'Anti-Aging Cream', price: '2,499', oldPrice: '2,999', category: 'Skincare', skinType: 'Mature', rawPrice: 2499 },
    { id: 13, image: "/assets/placeholder-400x500.png", name: 'Curl Defining Cream', price: '1,299', oldPrice: '1,499', category: 'Haircare', skinType: 'All', rawPrice: 1299 },
    { id: 14, image: "/assets/placeholder-400x500.png", name: 'Scalp Scrub', price: '1,599', oldPrice: '1,899', category: 'Haircare', skinType: 'Oily', rawPrice: 1599 },
    { id: 15, image: "/assets/placeholder-400x500.png", name: 'Lavender Body Wash', price: '799', oldPrice: '999', category: 'Body', skinType: 'All', rawPrice: 799 },
    { id: 16, image: "/assets/placeholder-400x500.png", name: 'Hand Cream Trio', price: '1,199', oldPrice: '1,499', category: 'Body', skinType: 'Dry', rawPrice: 1199 },
    { id: 17, image: "/assets/placeholder-400x500.png", name: 'Superfood Powder', price: '1,999', oldPrice: '2,499', category: 'Wellness & Tool', skinType: 'All', rawPrice: 1999 },
    { id: 18, image: "/assets/placeholder-400x500.png", name: 'Calming Candles', price: '1,299', oldPrice: '1,599', category: 'Wellness & Tool', skinType: 'All', rawPrice: 1299 },
    { id: 19, image: "/assets/placeholder-400x500.png", name: 'Mini Essentials Kit', price: '2,499', oldPrice: '2,999', category: 'Gift Sets', skinType: 'All', rawPrice: 2499 },
    { id: 20, image: "/assets/placeholder-400x500.png", name: 'Ultimate Spa Bundle', price: '4,999', oldPrice: '5,999', category: 'Gift Sets', skinType: 'All', rawPrice: 4999 },
];

const Collection = () => {
    const [activeCategory, setActiveCategory] = useState('Skincare');
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
                    Our <span className="text-[#f01a33]">Collection</span>
                </h1>
                <p className="font-body text-[#666666] text-sm md:text-base max-w-2xl mx-auto px-6 leading-relaxed">
                    Discover our carefully curated collections, each inspired by the changing seasons and the timeless beauty of nature.
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
                                    <span className="text-base text-[#666666]">Filter</span>
                                    <SlidersHorizontal className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 font-body">
                                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={resetFilters}>
                                    Reset All Filters
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Sort By */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg hover:border-[#9ca3af] transition-colors duration-300 font-body whitespace-nowrap shrink-0">
                                    <span className="text-base text-[#666666]">
                                        {sortBy === 'featured' ? 'Sort By: Featured' :
                                            sortBy === 'price-low-high' ? 'Sort By: Price Low to High' :
                                                'Sort By: Price High to Low'}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[#666666]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-low-high">Price: Low to High</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="price-high-low">Price: High to Low</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Skin Type */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${skinTypeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {skinTypeFilter === 'All' ? 'Skin Type' : skinTypeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${skinTypeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={skinTypeFilter} onValueChange={setSkinTypeFilter}>
                                    <DropdownMenuRadioItem value="All">All Types</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Dry">Dry Skin</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Oily">Oily Skin</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Combination">Combination</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Sensitive">Sensitive</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Normal">Normal</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Price Range */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className={`flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg transition-colors duration-300 font-body whitespace-nowrap shrink-0 ${priceRangeFilter !== 'All' ? 'border-[#f01a33] bg-[#f01a33]/5 text-[#f01a33]' : 'border-[#d1d5db] hover:border-[#9ca3af]'}`}>
                                    <span className="text-base text-inherit">
                                        {priceRangeFilter === 'All' ? 'Price Range' : priceRangeFilter}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 ${priceRangeFilter !== 'All' ? 'text-[#f01a33]' : 'text-[#666666]'}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="font-body">
                                <DropdownMenuRadioGroup value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                                    <DropdownMenuRadioItem value="All">All Prices</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Under 1000">Under Rs. 1000</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="1000-2000">Rs. 1000 - 2000</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Above 2000">Above Rs. 2000</DropdownMenuRadioItem>
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
                                            Sale
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
                                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Add to Cart</span>
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
                                            <span className="font-display text-xl font-bold text-[#1a1a1a]">Rs. {product.price}</span>
                                            <span className="font-display text-xs text-[#999999] line-through">Rs. {product.oldPrice}</span>
                                        </div>
                                        <p className="font-display text-lg italic text-[#1a1a1a] opacity-90">
                                            {product.name}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500 font-display text-xl">
                                No products found in this category.
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
                                <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Load More</span>
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
                    <DialogTitle className="sr-only">Quick View</DialogTitle>
                    <DialogDescription className="sr-only">Quick view details</DialogDescription>
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
                                <span className="text-[#f01a33] font-display text-2xl font-bold">Rs. {quickViewProduct?.price}</span>
                                <span className="text-gray-400 text-sm line-through">Rs. {quickViewProduct?.oldPrice}</span>
                            </div>

                            <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                                A potent blend of Ayurvedic herbs and modern science designed to illuminate dull skin. Infused with saffron and hyaluronic acid, this lightweight serum deeply penetrates to hydrate, brighten, and restore your natural radiance overnight.
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
                                    <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Buy Now</span>
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
                                    Add to Cart
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
                                <span>View full detail</span>
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>

                        {/* Right: Image */}
                        <div className="relative bg-[#ebe7e5] h-[400px] md:h-auto">
                            <div className="absolute top-6 left-6 z-10">
                                <span className="border border-[#f01a33] text-[#f01a33] px-4 pt-1 pb-2 rounded-lg text-sm font-display inline-flex items-center justify-center leading-none">
                                    Best Seller
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
