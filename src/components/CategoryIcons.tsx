"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';
import { Star, ChevronDown, Minus, Plus, Share2, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/productsData';

const CategoryIcons = () => {
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleWishlist = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleAddToCart = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-white">
      {/* Soft Pink Smoky Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/loved.png"
          alt=""
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl leading-none tracking-tight">
            <span className="text-[#1a1a1a]">Bộ Sưu Tập </span>
            <span className="text-[#f01a33]">Energy Shot</span>
          </h2>
          <p className="font-body text-[#666666] text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            4 công thức mặt nạ hydrogel — mỗi loại giải quyết một nhu cầu riêng của làn da bạn.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col group bg-[#f9f8f7] rounded-[20px] border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
              {/* Image Section */}
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
                      onClick={(e) => handleWishlist(product, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isInWishlist(product.id) ? 'bg-[#f01a33] text-white' : 'bg-white hover:bg-[#f01a33] hover:text-white'}`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handleShare}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f01a33] hover:text-white transition-all duration-300 shadow-md"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="relative w-full bg-[#f01a33] text-white py-3 rounded-[12px] font-display font-semibold text-sm overflow-hidden group/btn shadow-lg hover:shadow-xl transition-shadow duration-500"
                    >
                      <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Thêm Vào Giỏ</span>
                      <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover/btn:h-full transition-all duration-700 ease-liquid"
                        style={{ transformOrigin: 'bottom right' }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Section */}
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

        {/* View All Action */}
        <div className="flex justify-center mt-8">
          <Button asChild className="relative bg-[#f01a33] text-white px-24 py-4 text-[1rem] rounded-[16px] h-auto font-body font-medium overflow-hidden group shadow-[0_12px_40px_-10px_rgba(240,26,51,0.35)] hover:shadow-xl transition-shadow duration-500">
            <Link href="/collection">
              <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">Xem Tất Cả</span>
              <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid"
                style={{ transformOrigin: 'bottom right' }} />
            </Link>
          </Button>
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
