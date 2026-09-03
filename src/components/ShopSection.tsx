"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownRight, ChevronDown, Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
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

const heroCardOffsets = [
    'lg:translate-y-7 lg:-rotate-[1.2deg]',
    'lg:-translate-y-4 lg:rotate-[0.8deg]',
    'lg:translate-y-3 lg:-rotate-[0.6deg]',
    'lg:-translate-y-6 lg:rotate-[1deg]',
    'lg:translate-y-1 lg:-rotate-[0.4deg]',
];

const categoryAccents: Record<string, string> = {
    'Cấp Ẩm': '#3b96bd',
    'Phục Hồi': '#648c38',
    'Làm Sáng': '#b08a0b',
    'Rạng Rỡ': '#8262a0',
};

const ShopSection = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Tất Cả');
    const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, addToWishlist, isInWishlist } = useShop();

    const [sortBy, setSortBy] = useState('featured');
    const productCountLabel = String(allProducts.length).padStart(2, '0');

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
        <div className="w-full bg-[#f4f2ee]">
            {/* Hero */}
            <section className="relative w-full px-3 pb-3 pt-3 md:px-5 md:pb-5">
                <div className="mx-auto grid max-w-[1600px] overflow-hidden rounded-[28px] bg-[#191816] text-white lg:min-h-[620px] lg:grid-cols-[0.72fr_1.28fr] lg:rounded-[38px]">
                    <div className="flex flex-col justify-between px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-20">
                        <div className="flex items-center justify-between border-b border-white/15 pb-5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#b31324]" />
                                Melalogy Store
                            </span>
                            <span>Energy Shot / 01—{productCountLabel}</span>
                        </div>

                        <div className="shop-copy py-12 lg:py-8">
                            <p className="mb-5 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5a6d]">
                                Chọn theo tín hiệu làn da
                            </p>
                            <h1 className="max-w-[34rem] font-display text-[clamp(2.85rem,4.35vw,5rem)] tracking-[-0.025em]">
                                Đúng Energy Shot. <span className="shop-accent text-[#ff5a6d]">Đúng điều da cần.</span>
                            </h1>
                            <p className="mt-7 max-w-lg font-body text-sm leading-7 text-white/60 md:text-base">
                                Khám phá {allProducts.length} lựa chọn chăm sóc được sắp xếp theo đúng tín hiệu và nhu cầu hiện tại của làn da.
                            </p>

                            <a
                                href="#shop-products"
                                className="shop-cta group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#b31324] px-6 py-3.5 font-body text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#d9152b]"
                            >
                                Chọn công thức của bạn
                                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5 font-body">
                            <div>
                                <strong className="block text-lg font-semibold">{productCountLabel} sản phẩm</strong>
                                <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">Theo nhu cầu da</span>
                            </div>
                            <div>
                                <strong className="block text-lg font-semibold">Hydrogel</strong>
                                <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">Ôm sát bề mặt da</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden bg-[#eeebe6] p-4 sm:p-6 md:p-8 lg:p-9">
                        <div className="shop-stage-aurora absolute -inset-[12%]" />
                        <div className="shop-lab-grid absolute inset-0 opacity-30" />
                        <div className="shop-scan-line absolute inset-y-0 z-[1] w-32" />

                        <div className="shop-product-stage relative z-[2] grid h-full grid-cols-2 content-center gap-3 sm:gap-4">
                            {allProducts.map((product, index) => {
                                const cardStyle = heroCardOffsets[index % heroCardOffsets.length];
                                const accent = categoryAccents[product.category] ?? '#b31324';

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        className={`shop-product-card group flex min-w-0 flex-col rounded-[20px] border border-white/75 bg-white/75 p-2 shadow-[0_28px_70px_-45px_rgba(20,18,16,0.8)] backdrop-blur-md transition-[transform,box-shadow] duration-500 hover:!translate-y-0 hover:!rotate-0 hover:shadow-[0_35px_75px_-38px_rgba(20,18,16,0.55)] ${cardStyle}`}
                                    >
                                        <div className="aspect-[0.88] overflow-hidden rounded-[14px] bg-white/70">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-black/58">
                                            <span className="truncate">{product.category}</span>
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section id="shop-products" className="scroll-mt-28 border-y border-[#e5e5e5] bg-white">
                <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14">
                    <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-6 md:gap-12 py-6 px-4 md:px-0 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`font-display text-base md:text-lg transition-colors duration-300 whitespace-nowrap ${activeCategory === category
                                    ? 'text-[#b31324] border-b-2 border-[#b31324] pb-2'
                                    : 'text-[#111111] hover:text-[#b31324] pb-2'
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
                <div className="mx-auto w-full max-w-[1600px] px-6 py-4 md:px-10 lg:px-14">
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
            <section className="bg-white py-14 md:py-16">
                <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-14">
                    <div className="shop-catalog-grid grid gap-5 md:gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                data-reveal="scale"
                                data-reveal-delay={String((index % 4) * 95)}
                                className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
                            >
                                <div
                                    className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7] cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="absolute top-4 left-4 z-20 bg-[#b31324] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.category}
                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${product.images?.[1] && product.images[1] !== product.image ? 'group-hover:opacity-0' : ''}`}
                                    />
                                    {product.images?.[1] && product.images[1] !== product.image && (
                                        <img
                                            src={product.images[1]}
                                            alt={`Hộp ${product.name}`}
                                            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[1.04] group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out"
                                            loading="lazy"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-auto">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToWishlist(product);
                                                }}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isInWishlist(product.id) ? 'bg-[#b31324] text-white' : 'bg-white hover:bg-[#b31324] hover:text-white'}`}
                                            >
                                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                            </button>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#b31324] hover:text-white transition-all duration-300 shadow-md"
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
                                                className="relative w-full bg-[#b31324] text-white py-3 rounded-[12px] font-display font-semibold text-sm overflow-hidden group/btn shadow-lg hover:shadow-xl transition-shadow duration-500"
                                            >
                                                <span className="relative z-10 group-hover/btn:text-[#b31324] transition-colors duration-700">Thêm vào giỏ</span>
                                                <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid" style={{ transformOrigin: 'bottom right' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center p-6 pt-4 space-y-2">
                                    <span className="font-display text-xl font-bold text-[#111111]">{product.price}đ</span>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="font-display text-lg italic text-[#111111] opacity-90 hover:text-[#b31324] transition-colors"
                                    >
                                        {product.name}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div data-reveal="fade" data-reveal-delay="170" className="flex justify-center mt-12">
                        <Link href="/shop#shop-products">
                            <Button className="relative bg-[#b31324] text-white px-16 py-3 text-base font-medium rounded-[12px] h-auto overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <span className="relative z-10 group-hover:text-[#b31324] transition-colors duration-700">Xem toàn bộ sưu tập</span>
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
                                <h2 className="font-display text-3xl md:text-4xl text-[#111111]">
                                    {selectedProduct?.name}
                                </h2>
                                <div className="flex items-center gap-1 border border-[#b31324] rounded-full px-2 py-0.5">
                                    <span className="text-xs font-bold text-[#b31324]">4.8</span>
                                    <Star className="w-3 h-3 text-[#b31324] fill-[#b31324]" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-[#b31324] font-display text-2xl font-bold">{selectedProduct?.price}đ</span>
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
                                    className="flex-1 bg-[#b31324] text-white rounded-[10px] py-6 shadow-lg shadow-[#b31324]/20 text-base font-normal relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10 group-hover/btn:text-[#b31324] transition-colors duration-700">Mua ngay</span>
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
                                    className="flex-1 bg-white hover:bg-[#fff5f5] text-[#b31324] border border-[#b31324] rounded-[10px] py-6 text-base font-normal"
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
                                        selectedProduct && isInWishlist(selectedProduct.id) && "bg-[#b31324]/5 border-[#b31324]/20 text-[#b31324]"
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
                                className="inline-flex items-center gap-2 text-[#b31324] text-sm sm:text-base border border-[#b31324]/30 px-6 py-2 rounded-full w-fit hover:bg-[#b31324]/5 transition-colors cursor-pointer"
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

            <style jsx global>{`
                .shop-copy > * {
                    animation: shop-copy-reveal 720ms cubic-bezier(.2, .8, .2, 1) both;
                }

                .shop-copy > :nth-child(2) { animation-delay: 90ms; }
                .shop-copy > :nth-child(3) { animation-delay: 180ms; }
                .shop-copy > :nth-child(4) { animation-delay: 270ms; }

                .shop-accent {
                    position: relative;
                    display: inline;
                }

                .shop-accent::after {
                    position: absolute;
                    right: 0;
                    bottom: 0.02em;
                    left: 0;
                    height: 0.07em;
                    content: "";
                    background: linear-gradient(90deg, #ff5a6d, #ffd1d7);
                    transform: scaleX(0);
                    transform-origin: left;
                    animation: shop-accent-draw 850ms 520ms cubic-bezier(.2, .8, .2, 1) forwards;
                }

                .shop-cta::before {
                    position: absolute;
                    inset: -70% auto -70% -45%;
                    width: 30%;
                    content: "";
                    background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.42), transparent);
                    transform: skewX(-18deg);
                    animation: shop-cta-glint 3.8s 1.1s ease-in-out infinite;
                }

                .shop-stage-aurora {
                    background:
                        radial-gradient(circle at 12% 18%, rgb(95 190 226 / 0.34), transparent 27%),
                        radial-gradient(circle at 58% 8%, rgb(163 205 91 / 0.2), transparent 24%),
                        radial-gradient(circle at 82% 38%, rgb(241 209 73 / 0.2), transparent 25%),
                        radial-gradient(circle at 88% 84%, rgb(161 123 194 / 0.32), transparent 30%);
                    background-size: 118% 118%;
                    animation: shop-aurora-drift 8s ease-in-out infinite alternate;
                }

                .shop-lab-grid {
                    background-image:
                        linear-gradient(rgb(20 18 16 / 0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgb(20 18 16 / 0.06) 1px, transparent 1px);
                    background-size: 48px 48px;
                    animation: shop-grid-drift 18s linear infinite;
                }

                .shop-scan-line {
                    left: -25%;
                    background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.38), transparent);
                    filter: blur(5px);
                    transform: skewX(-12deg);
                    animation: shop-scan 5.6s 1s cubic-bezier(.4, 0, .2, 1) infinite;
                }

                .shop-product-card {
                    animation:
                        shop-card-reveal 720ms cubic-bezier(.2, .8, .2, 1) both,
                        shop-card-float 4.5s ease-in-out infinite alternate;
                }

                .shop-product-card:nth-child(1) { animation-delay: 160ms, -0.4s; }
                .shop-product-card:nth-child(2) { animation-delay: 270ms, -1.3s; }
                .shop-product-card:nth-child(3) { animation-delay: 380ms, -2.2s; }
                .shop-product-card:nth-child(4) { animation-delay: 490ms, -3.1s; }

                .shop-product-card:hover {
                    animation-play-state: paused;
                }

                .shop-product-stage {
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
                }

                .shop-catalog-grid {
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
                }

                @keyframes shop-copy-reveal {
                    from { opacity: 0; translate: 0 22px; }
                    to { opacity: 1; translate: 0 0; }
                }

                @keyframes shop-accent-draw {
                    to { transform: scaleX(1); }
                }

                @keyframes shop-cta-glint {
                    0%, 62% { left: -45%; opacity: 0; }
                    72% { opacity: 1; }
                    100% { left: 125%; opacity: 0; }
                }

                @keyframes shop-aurora-drift {
                    from { transform: translate3d(-2%, -1%, 0) scale(0.98); }
                    to { transform: translate3d(3%, 2%, 0) scale(1.04); }
                }

                @keyframes shop-grid-drift {
                    to { background-position: 48px 48px; }
                }

                @keyframes shop-scan {
                    0%, 22% { left: -25%; opacity: 0; }
                    34% { opacity: 1; }
                    72% { opacity: 0.7; }
                    88%, 100% { left: 115%; opacity: 0; }
                }

                @keyframes shop-card-reveal {
                    from { opacity: 0; filter: blur(8px); scale: 0.94; }
                    to { opacity: 1; filter: blur(0); scale: 1; }
                }

                @keyframes shop-card-float {
                    from { translate: 0 -4px; }
                    to { translate: 0 6px; }
                }

                @media (max-width: 1023px) {
                    .shop-product-card {
                        animation: shop-card-reveal 720ms cubic-bezier(.2, .8, .2, 1) both;
                    }
                }
            `}</style>
        </div>
    );
};

export default ShopSection;
