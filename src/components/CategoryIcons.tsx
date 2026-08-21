"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';
import { ArrowUpRight, Star, ChevronDown, Minus, Plus, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/productsData';

const CategoryIcons = () => {
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleWishlist = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleAddToCart = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section className="border-y border-black/[0.07] bg-[#f4f2ee] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-14">
        <div className="mb-12 grid gap-7 border-b border-black/10 pb-10 md:mb-14 md:grid-cols-12 md:items-end md:pb-12">
          <div data-reveal="left" className="md:col-span-7">
            <div className="mb-5 flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f01a33]">
              <span className="h-px w-8 bg-current" />
              Chăm sóc theo nhu cầu da
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.98] tracking-[-0.045em] text-[#191816]">
              Energy Shot <span className="text-[#f01a33]">Hydrogel</span>
            </h2>
          </div>
          <p data-reveal="right" data-reveal-delay="110" className="max-w-xl font-body text-sm leading-7 text-black/60 md:col-span-5 md:justify-self-end md:text-base">
            Bốn công thức tập trung vào bốn nhu cầu thiết yếu: cấp ẩm, phục hồi, làm sáng và duy trì vẻ rạng rỡ của làn da.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {allProducts.map((product, index) => {
            const tones = [
              { surface: '#eaf6fb', accent: '#207da7' },
              { surface: '#f0f6e8', accent: '#4b762e' },
              { surface: '#fff7d9', accent: '#9a7600' },
              { surface: '#f1ebf7', accent: '#745493' },
            ][index];

            return (
              <article
                key={product.id}
                data-reveal="scale"
                data-reveal-delay={String(index * 95)}
                className="group flex flex-col rounded-[24px] border border-black/[0.07] bg-white p-2.5 shadow-[0_18px_45px_-42px_rgba(20,18,16,0.8)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_65px_-42px_rgba(20,18,16,0.45)]"
              >
                <div
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-[18px]"
                  style={{ backgroundColor: tones.surface }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-black/75 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tones.accent }} />
                    {product.category}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleWishlist(product, e)}
                    aria-label={`Thêm ${product.name} vào danh sách yêu thích`}
                    className={`absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/70 backdrop-blur-md transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-[#f01a33] text-white'
                        : 'bg-white/85 text-black/70 hover:bg-white hover:text-[#f01a33]'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: tones.accent }}>
                      {product.subtitle}
                    </span>
                    <span className="shrink-0 font-body text-sm font-semibold text-[#191816]">{product.price}đ</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="mb-3 text-left font-display text-[1.35rem] leading-[1.16] tracking-[-0.025em] text-[#191816] transition-colors hover:text-[#f01a33]"
                  >
                    {product.name}
                  </button>
                  <p className="mb-6 line-clamp-2 font-body text-xs leading-5 text-black/52">
                    {product.description}
                  </p>

                  <div className="mt-auto grid grid-cols-[1fr_auto] gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className="rounded-full bg-[#191816] px-4 py-2.5 font-body text-xs font-semibold text-white transition-colors hover:bg-[#f01a33]"
                    >
                      Thêm vào giỏ
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`Xem nhanh ${product.name}`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-black/15 text-[#191816] transition-colors hover:border-[#f01a33] hover:text-[#f01a33]"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div data-reveal="fade" data-reveal-delay="180" className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/collection"
            className="group inline-flex items-center gap-3 border-b border-black/25 pb-2 font-body text-sm font-semibold text-[#191816] transition-colors hover:border-[#f01a33] hover:text-[#f01a33]"
          >
            Xem toàn bộ bộ sưu tập
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto bg-[#fdfcfc] border-none rounded-[30px] gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>Xem nhanh {selectedProduct?.name}</DialogDescription>
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
                  <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Mua Ngay</span>
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
                    toast.success("Đã thêm vào giỏ hàng");
                  }}
                  className="flex-1 bg-white hover:bg-[#fff5f5] text-[#f01a33] border border-[#f01a33] rounded-[10px] py-6 text-base font-normal"
                >
                  Thêm Vào Giỏ
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
                <span>Xem chi tiết sản phẩm</span>
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
    </section>
  );
};

export default CategoryIcons;
