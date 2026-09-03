"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowDownRight,
    ArrowUpRight,
    ChevronDown,
    Heart,
    Minus,
    Plus,
    Share2,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShop } from "@/context/ShopContext";
import { allProducts } from "@/data/productsData";
import { cn } from "@/lib/utils";

import BeautyDiaries from "./BeautyDiaries";

type Product = (typeof allProducts)[number];

const categoryOrder = ["Cấp Ẩm", "Phục Hồi", "Làm Sáng", "Rạng Rỡ"];

const categories = [
    "Tất Cả",
    ...Array.from(new Set(allProducts.map((product) => product.category))).sort((a, b) => {
        const left = categoryOrder.indexOf(a);
        const right = categoryOrder.indexOf(b);
        if (left === -1 && right === -1) return a.localeCompare(b, "vi");
        if (left === -1) return 1;
        if (right === -1) return -1;
        return left - right;
    }),
];

const categoryAccents: Record<string, string> = {
    "Cấp Ẩm": "#2f8fc0",
    "Phục Hồi": "#638d39",
    "Làm Sáng": "#c89500",
    "Rạng Rỡ": "#8055a6",
};

const sciencePillars = [
    { index: "01", title: "Melanin Science", description: "Hiểu cơ chế sắc tố" },
    { index: "02", title: "Antioxidant Defense", description: "Bảo vệ trước oxy hoá" },
    { index: "03", title: "Barrier Stability", description: "Ổn định hàng rào da" },
];

const formulaNotes: Record<string, string> = {
    "Cấp Ẩm": "Hydration / Barrier",
    "Phục Hồi": "Recovery / Calm",
    "Làm Sáng": "Brightening / Tone",
    "Rạng Rỡ": "Radiance / Firming",
};

const ShopBrand2026 = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Tất Cả");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [sortBy, setSortBy] = useState("featured");
    const { addToCart, addToWishlist, isInWishlist } = useShop();

    const productCountLabel = String(allProducts.length).padStart(2, "0");
    const heroProducts = allProducts.slice(0, 4);

    const filteredProducts = useMemo(() => {
        return allProducts
            .filter((product) => activeCategory === "Tất Cả" || product.category === activeCategory)
            .sort((a, b) => {
                if (sortBy === "price-low-high") return a.rawPrice - b.rawPrice;
                if (sortBy === "price-high-low") return b.rawPrice - a.rawPrice;
                return 0;
            });
    }, [activeCategory, sortBy]);

    const shareProduct = async (product: Product) => {
        const shareData = {
            title: product.name,
            text: product.description,
            url: `${window.location.origin}/product/${product.id}`,
        };

        if (navigator.share) {
            await navigator.share(shareData).catch(() => undefined);
            return;
        }

        await navigator.clipboard?.writeText(shareData.url).catch(() => undefined);
    };

    return (
        <div className="shop-page w-full overflow-hidden bg-[#f3f0ea] text-[#151412]">
            <section className="relative px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
                <div className="mx-auto grid max-w-[1680px] overflow-hidden rounded-[26px] border border-black/10 bg-[#151513] lg:min-h-[690px] lg:grid-cols-[0.9fr_1.1fr] lg:rounded-[34px]">
                    <div className="relative z-10 flex flex-col justify-between px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-10 lg:py-12 2xl:px-[4.5rem] 2xl:py-14">
                        <div className="flex items-center justify-between gap-6 border-b border-white/15 pb-5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                            <span className="flex items-center gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#d3172b]" />
                                Melalogy / Store
                            </span>
                            <span className="whitespace-nowrap">Energy Shot · {productCountLabel}</span>
                        </div>

                        <div className="shop-hero-copy py-12 lg:py-10">
                            <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ef3340] sm:text-[11px]">
                                Chọn theo tín hiệu làn da
                            </p>
                            <h1 className="max-w-[38rem] text-balance font-display text-[clamp(2.8rem,4.3vw,5.2rem)] font-normal tracking-[-0.045em]">
                                Chọn đúng cơ chế. <span className="block pt-2 text-[#ef3340]">Chạm đúng nhu cầu da.</span>
                            </h1>
                            <p className="mt-8 max-w-[33rem] font-body text-sm leading-7 text-white/60 sm:text-base">
                                Không chạy theo “trắng nhanh”. Mỗi Energy Shot bắt đầu từ một tín hiệu da, một cơ chế khoa học và một công thức hydrogel được kiểm soát.
                            </p>

                            <a
                                href="#shop-products"
                                className="shop-primary-cta group mt-9 inline-flex items-center gap-4 rounded-full bg-[#d3172b] px-6 py-3.5 font-body text-sm font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#ed1c32]"
                            >
                                Tìm Energy Shot của bạn
                                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5 font-body">
                            <div>
                                <strong className="block text-base font-semibold sm:text-lg">{productCountLabel}</strong>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/38">Công thức</span>
                            </div>
                            <div>
                                <strong className="block text-base font-semibold sm:text-lg">2 giờ</strong>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/38">Giải phóng</span>
                            </div>
                            <div>
                                <strong className="block text-base font-semibold sm:text-lg">Kiểm soát</strong>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/38">Hệ dẫn truyền</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative min-h-[500px] overflow-hidden bg-[#eeeae3] p-5 sm:min-h-[590px] sm:p-8 lg:min-h-full lg:p-10">
                        <div className="shop-science-wash absolute inset-0" />
                        <div className="shop-science-grid absolute inset-0" />
                        <div className="shop-target-ring shop-target-ring-one absolute" />
                        <div className="shop-target-ring shop-target-ring-two absolute" />
                        <div className="shop-target-line absolute" />

                        <div className="relative z-[2] flex h-full flex-col justify-between">
                            <div className="flex items-start justify-between gap-4 font-body text-[10px] font-semibold uppercase tracking-[0.17em] text-black/45 sm:text-[11px]">
                                <span>Melalogy Science / Controlled Delivery</span>
                                <span className="hidden text-right sm:block">Active Reservoir · Controlled Release</span>
                            </div>

                            <div className="shop-formula-stage mx-auto grid w-full max-w-[900px] grid-cols-2 items-end gap-3 py-12 sm:gap-4 lg:grid-cols-4 lg:py-7">
                                {heroProducts.map((product, index) => {
                                    const accent = categoryAccents[product.category] ?? "#d3172b";
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            className="shop-formula-card group relative min-w-0 border border-white/85 bg-white/70 p-2.5 shadow-[0_30px_70px_-45px_rgba(20,18,16,.65)] backdrop-blur-xl transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:bg-white/90 hover:shadow-[0_36px_72px_-38px_rgba(20,18,16,.55)]"
                                            style={{ "--formula-accent": accent } as CSSProperties}
                                        >
                                            <div className="aspect-[0.86] overflow-hidden bg-white/75">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                                                />
                                            </div>
                                            <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-3 font-body">
                                                <div className="min-w-0">
                                                    <span className="block text-[8px] font-semibold uppercase tracking-[0.16em] text-black/35">
                                                        Formula {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <strong className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-black/70 sm:text-[11px]">
                                                        {product.category}
                                                    </strong>
                                                </div>
                                                <span className="mb-1 h-2 w-2 shrink-0 rounded-full bg-[var(--formula-accent)]" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4 font-body text-[10px] uppercase tracking-[0.15em] text-black/40">
                                <span>The science of melanin</span>
                                {allProducts.length > heroProducts.length && (
                                    <span>+ {allProducts.length - heroProducts.length} công thức trong catalog</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-black/10 bg-[#151513] text-white">
                <div className="mx-auto grid max-w-[1680px] divide-y divide-white/10 px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-10 lg:px-14">
                    {sciencePillars.map((pillar) => (
                        <div key={pillar.index} data-reveal="fade" className="flex items-center gap-5 py-6 md:px-7 lg:py-7">
                            <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-[#ef3340]">{pillar.index}</span>
                            <div>
                                <strong className="block font-body text-sm font-semibold tracking-[0.02em]">{pillar.title}</strong>
                                <span className="mt-1 block font-body text-xs text-white/42">{pillar.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="shop-products" className="scroll-mt-24 bg-[#f3f0ea] py-16 md:py-24">
                <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 md:px-10 lg:px-14">
                    <div className="grid gap-9 border-b border-black/15 pb-9 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                        <div data-reveal="fade">
                            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c41327]">Energy Shot Hydrogel / Catalog</p>
                            <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.7rem,5vw,5.7rem)] font-normal leading-[0.96] tracking-[-0.04em]">
                                Mỗi làn da gửi một tín hiệu khác nhau.
                            </h2>
                        </div>
                        <p data-reveal="fade" data-reveal-delay="90" className="max-w-xl font-body text-sm leading-7 text-black/56 md:text-base lg:justify-self-end">
                            Bắt đầu từ trạng thái da hiện tại. Chọn công thức theo cơ chế, không theo lời hứa phóng đại.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 border-b border-black/10 py-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="shop-category-tabs -mx-2 flex gap-1 overflow-x-auto px-2 pb-1">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={cn(
                                        "group flex min-h-11 shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 font-body text-xs font-semibold transition-colors duration-300 sm:px-5 sm:text-sm",
                                        activeCategory === category
                                            ? "border-[#151513] bg-[#151513] text-white"
                                            : "border-black/12 bg-transparent text-black/58 hover:border-black/35 hover:text-black"
                                    )}
                                >
                                    <span className={activeCategory === category ? "text-[#ef3340]" : "text-black/28"}>
                                        {String(index).padStart(2, "0")}
                                    </span>
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between gap-5 lg:justify-end">
                            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-black/38">
                                {String(filteredProducts.length).padStart(2, "0")} sản phẩm
                            </span>
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex min-h-11 shrink-0 items-center gap-3 border-b border-black/25 px-1 py-2 font-body text-xs font-semibold text-black/68 transition-colors hover:border-black hover:text-black sm:text-sm">
                                        {sortBy === "featured"
                                            ? "Nổi bật"
                                            : sortBy === "price-low-high"
                                                ? "Giá thấp → cao"
                                                : "Giá cao → thấp"}
                                        <ChevronDown className="h-4 w-4" />
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

                    <div className="shop-catalog-grid grid gap-x-5 gap-y-9 pt-9 md:gap-x-6 md:gap-y-12">
                        {filteredProducts.map((product, index) => {
                            const hoverImage = product.images?.[1];
                            const accent = categoryAccents[product.category] ?? "#d3172b";

                            return (
                                <article
                                    key={product.id}
                                    data-reveal="scale"
                                    data-reveal-delay={String((index % 4) * 80)}
                                    className="shop-catalog-card group flex min-w-0 flex-col border-t border-black/15"
                                    style={{ "--formula-accent": accent } as CSSProperties}
                                >
                                    <div className="flex items-center justify-between gap-4 py-3 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                                        <span>Formula {String(index + 1).padStart(2, "0")}</span>
                                        <span className="flex items-center gap-2 text-black/58">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--formula-accent)]" />
                                            {product.category}
                                        </span>
                                    </div>

                                    <div
                                        className="shop-product-media relative aspect-[0.92] cursor-pointer overflow-hidden bg-[#e9e5df]"
                                        onClick={() => setSelectedProduct(product)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Xem nhanh ${product.name}`}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                setSelectedProduct(product);
                                            }
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={cn(
                                                "h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.025]",
                                                hoverImage && hoverImage !== product.image && "group-hover:opacity-0"
                                            )}
                                        />
                                        {hoverImage && hoverImage !== product.image && (
                                            <img
                                                src={hoverImage}
                                                alt={`Bao bì hộp ${product.name}`}
                                                className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                                                loading="lazy"
                                            />
                                        )}

                                        <div className="shop-product-actions absolute right-3 top-3 z-20 flex translate-x-14 flex-col gap-2 transition-transform duration-500 group-hover:translate-x-0">
                                            <button
                                                type="button"
                                                aria-label={`Yêu thích ${product.name}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    addToWishlist(product);
                                                }}
                                                className={cn(
                                                    "flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-colors hover:bg-[#151513] hover:text-white",
                                                    isInWishlist(product.id) && "bg-[#d3172b] text-white"
                                                )}
                                            >
                                                <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Chia sẻ ${product.name}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    void shareProduct(product);
                                                }}
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-colors hover:bg-[#151513] hover:text-white"
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="shop-product-quick-add absolute inset-x-3 bottom-3 z-20 translate-y-[calc(100%+1rem)] transition-transform duration-500 group-hover:translate-y-0">
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    addToCart(product);
                                                }}
                                                className="flex min-h-11 w-full items-center justify-between bg-[#151513] px-5 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-[#d3172b]"
                                            >
                                                Thêm vào giỏ
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col pt-5">
                                        <div className="mb-3 flex items-center justify-between gap-4 font-body text-[10px] font-semibold uppercase tracking-[0.13em] text-black/40">
                                            <span>{formulaNotes[product.category] ?? "Melalogy Formula"}</span>
                                            <span>{product.price}đ</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProduct(product)}
                                            className="text-left font-display text-[clamp(1.45rem,2vw,2rem)] leading-[1.08] tracking-[-0.02em] transition-colors hover:text-[#c41327]"
                                        >
                                            {product.name}
                                        </button>
                                        <p className="mt-4 line-clamp-2 font-body text-xs leading-6 text-black/50 sm:text-sm">
                                            {product.description}
                                        </p>
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="mt-6 inline-flex w-fit items-center gap-2 border-b border-black/25 pb-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#c41327] hover:text-[#c41327]"
                                        >
                                            Xem cơ chế
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                </div>
            </section>

            <BeautyDiaries />

            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="max-h-[90vh] max-w-4xl gap-0 overflow-y-auto rounded-[24px] border-none bg-[#f5f1eb] p-0">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedProduct?.name}</DialogTitle>
                        <DialogDescription>Xem nhanh cho {selectedProduct?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2">
                        <div className="flex flex-col justify-center p-7 sm:p-9 md:p-11">
                            <p className="mb-5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c41327]">Melalogy / Energy Shot</p>
                            <div className="mb-3 flex items-start justify-between gap-4">
                                <h2 className="font-display text-3xl leading-[1.05] text-[#111] md:text-4xl">{selectedProduct?.name}</h2>
                                <div className="flex shrink-0 items-center gap-1 border border-[#c41327]/40 px-2 py-1">
                                    <span className="font-body text-xs font-bold text-[#c41327]">4.8</span>
                                    <Star className="h-3 w-3 fill-[#c41327] text-[#c41327]" />
                                </div>
                            </div>
                            <span className="mb-5 font-body text-lg font-semibold text-[#c41327]">{selectedProduct?.price}đ</span>
                            <p className="mb-7 font-body text-sm leading-7 text-black/55">{selectedProduct?.description}</p>

                            <div className="mb-7 flex items-center border-y border-black/10 py-4">
                                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-11 w-11 items-center justify-center text-black/50 hover:text-black" aria-label="Giảm số lượng">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center font-body text-sm font-semibold">{quantity}</span>
                                <button type="button" onClick={() => setQuantity(quantity + 1)} className="flex h-11 w-11 items-center justify-center text-black/50 hover:text-black" aria-label="Tăng số lượng">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            for (let i = 0; i < quantity; i += 1) addToCart(selectedProduct);
                                        }
                                        setSelectedProduct(null);
                                        setQuantity(1);
                                        router.push("/cart");
                                    }}
                                    className="h-auto rounded-none bg-[#d3172b] py-4 font-body text-sm font-semibold text-white hover:bg-[#151513]"
                                >
                                    Mua ngay
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedProduct) {
                                            for (let i = 0; i < quantity; i += 1) addToCart(selectedProduct);
                                        }
                                        setSelectedProduct(null);
                                        setQuantity(1);
                                    }}
                                    className="h-auto rounded-none border border-black/25 bg-transparent py-4 font-body text-sm font-semibold text-black hover:bg-black hover:text-white"
                                >
                                    Thêm vào giỏ
                                </Button>
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => selectedProduct && addToWishlist(selectedProduct)}
                                    className={cn("inline-flex items-center gap-2 font-body text-xs text-black/55 hover:text-black", selectedProduct && isInWishlist(selectedProduct.id) && "text-[#c41327]")}
                                >
                                    <Heart className={cn("h-4 w-4", selectedProduct && isInWishlist(selectedProduct.id) && "fill-current")} />
                                    Lưu sản phẩm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!selectedProduct) return;
                                        const productId = selectedProduct.id;
                                        setSelectedProduct(null);
                                        router.push(`/product/${productId}`);
                                    }}
                                    className="inline-flex items-center gap-2 font-body text-xs font-semibold text-[#c41327]"
                                >
                                    Xem chi tiết
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative min-h-[360px] bg-[#e7e2db] md:min-h-[620px]">
                            <img src={selectedProduct?.image} alt={selectedProduct?.name} className="h-full w-full object-cover" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <style jsx global>{`
                .shop-hero-copy > * {
                    animation: shop-copy-enter 760ms cubic-bezier(.2,.8,.2,1) both;
                }

                .shop-hero-copy h1 {
                    line-height: .94;
                }

                .shop-hero-copy > :nth-child(2) { animation-delay: 80ms; }
                .shop-hero-copy > :nth-child(3) { animation-delay: 160ms; }
                .shop-hero-copy > :nth-child(4) { animation-delay: 240ms; }

                .shop-primary-cta { box-shadow: 0 14px 34px -20px rgb(211 23 43 / .9); }

                .shop-science-wash {
                    background:
                        radial-gradient(circle at 8% 14%, rgb(55 171 215 / .22), transparent 30%),
                        radial-gradient(circle at 92% 10%, rgb(210 197 93 / .14), transparent 34%),
                        radial-gradient(circle at 92% 88%, rgb(137 85 171 / .16), transparent 31%),
                        linear-gradient(135deg, #e9e6e0 0%, #f6f3ec 62%, #e9e3dc 100%);
                }

                .shop-science-grid {
                    background-image:
                        linear-gradient(rgb(20 18 16 / .045) 1px, transparent 1px),
                        linear-gradient(90deg, rgb(20 18 16 / .045) 1px, transparent 1px);
                    background-size: 54px 54px;
                    mask-image: linear-gradient(to bottom, black, transparent 92%);
                }

                .shop-target-ring {
                    border: 1px solid rgb(211 23 43 / .18);
                    border-radius: 999px;
                    animation: shop-ring-breathe 6s ease-in-out infinite alternate;
                }

                .shop-target-ring-one { right: -8rem; top: -9rem; width: 28rem; height: 28rem; }
                .shop-target-ring-two { left: 11%; bottom: -10rem; width: 24rem; height: 24rem; animation-delay: -2.5s; }

                .shop-target-line {
                    top: 20%;
                    right: -6%;
                    width: 58%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgb(211 23 43 / .4), transparent);
                    rotate: -24deg;
                    transform-origin: right;
                }

                .shop-formula-card { animation: shop-card-enter 720ms cubic-bezier(.2,.8,.2,1) both; }
                .shop-formula-card:nth-child(1) { animation-delay: 140ms; transform: translateY(34px) rotate(-1.2deg); }
                .shop-formula-card:nth-child(2) { animation-delay: 220ms; transform: translateY(-18px) rotate(.8deg); }
                .shop-formula-card:nth-child(3) { animation-delay: 300ms; transform: translateY(16px) rotate(-.6deg); }
                .shop-formula-card:nth-child(4) { animation-delay: 380ms; transform: translateY(-28px) rotate(.9deg); }
                .shop-formula-card:hover { transform: translateY(-8px) rotate(0deg); }

                .shop-catalog-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); }

                .shop-product-media::after {
                    position: absolute;
                    inset: 0;
                    content: "";
                    pointer-events: none;
                    border: 1px solid rgb(255 255 255 / .45);
                    mix-blend-mode: screen;
                }

                @keyframes shop-copy-enter {
                    from { opacity: 0; translate: 0 24px; }
                    to { opacity: 1; translate: 0 0; }
                }

                @keyframes shop-card-enter {
                    from { opacity: 0; filter: blur(8px); scale: .95; }
                    to { opacity: 1; filter: blur(0); scale: 1; }
                }

                @keyframes shop-ring-breathe {
                    from { scale: .96; opacity: .45; }
                    to { scale: 1.05; opacity: 1; }
                }

                @media (max-width: 1023px) {
                    .shop-formula-card:nth-child(n) { transform: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .shop-hero-copy > *, .shop-formula-card, .shop-target-ring { animation: none !important; }
                }
            `}</style>
        </div>
    );
};

export default ShopBrand2026;
