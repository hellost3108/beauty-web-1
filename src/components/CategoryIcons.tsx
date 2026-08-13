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

const categories = [
  { icon: "/assets/lotion.png", label: 'Lotion' },
  { icon: "/assets/lipstick.png", label: 'Lipstick' },
  { icon: "/assets/maskara.png", label: 'Mascara' },
  { icon: "/assets/serum.png", label: 'Serum' },
  { icon: "/assets/conceler.png", label: 'Concealer' },
];

// Expanded mock data with categories
const allProducts = [
  // Lotion
  { id: 201, image: "/assets/placeholder-400x500.png", name: 'Glow Skin Lotion', price: '1,199', oldPrice: '1,299', category: 'Lotion' },
  { id: 202, image: "/assets/placeholder-400x500.png", name: 'Hydrating Body Milk', price: '1,199', oldPrice: '1,299', category: 'Lotion' },
  { id: 203, image: "/assets/placeholder-400x500.png", name: 'Shea Butter Lotion', price: '1,199', oldPrice: '1,299', category: 'Lotion' },
  { id: 204, image: "/assets/placeholder-400x500.png", name: 'Silk Touch Lotion', price: '1,199', oldPrice: '1,299', category: 'Lotion' },

  // Lipstick
  { id: 205, image: "/assets/placeholder-400x500.png", name: 'Matte Red Lipstick', price: '899', oldPrice: '1,099', category: 'Lipstick' },
  { id: 206, image: "/assets/placeholder-400x500.png", name: 'Glossy Pink', price: '899', oldPrice: '1,099', category: 'Lipstick' },
  { id: 207, image: "/assets/placeholder-400x500.png", name: 'Nude Shade', price: '899', oldPrice: '1,099', category: 'Lipstick' },
  { id: 208, image: "/assets/placeholder-400x500.png", name: 'Berry Crush', price: '899', oldPrice: '1,099', category: 'Lipstick' },

  // Mascara
  { id: 209, image: "/assets/placeholder-400x500.png", name: 'Volume Boost Mascara', price: '999', oldPrice: '1,199', category: 'Mascara' },
  { id: 210, image: "/assets/placeholder-400x500.png", name: 'Lengthening Mascara', price: '999', oldPrice: '1,199', category: 'Mascara' },
  { id: 211, image: "/assets/placeholder-400x500.png", name: 'Waterproof Black', price: '999', oldPrice: '1,199', category: 'Mascara' },
  { id: 212, image: "/assets/placeholder-400x500.png", name: 'Curl Defining', price: '999', oldPrice: '1,199', category: 'Mascara' },

  // Serum
  { id: 213, image: "/assets/placeholder-400x500.png", name: 'Vitamin C Serum', price: '1,499', oldPrice: '1,799', category: 'Serum' },
  { id: 214, image: "/assets/placeholder-400x500.png", name: 'Hyaluronic Acid', price: '1,499', oldPrice: '1,799', category: 'Serum' },
  { id: 215, image: "/assets/placeholder-400x500.png", name: 'Retinol Serum', price: '1,499', oldPrice: '1,799', category: 'Serum' },
  { id: 216, image: "/assets/placeholder-400x500.png", name: 'Niacinamide Glow', price: '1,499', oldPrice: '1,799', category: 'Serum' },

  // Concealer
  { id: 217, image: "/assets/placeholder-400x500.png", name: 'Full Coverage', price: '799', oldPrice: '999', category: 'Concealer' },
  { id: 218, image: "/assets/placeholder-400x500.png", name: 'Under Eye Brightener', price: '799', oldPrice: '999', category: 'Concealer' },
  { id: 219, image: "/assets/placeholder-400x500.png", name: 'Liquid Concealer', price: '799', oldPrice: '999', category: 'Concealer' },
  { id: 220, image: "/assets/placeholder-400x500.png", name: 'Stick Concealer', price: '799', oldPrice: '999', category: 'Concealer' },
];


const CategoryIcons = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Lotion');
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  // Filter products based on active category
  // If we don't have enough products for a category, we fallback to showing the first 4 products 
  // to ensure the grid isn't empty (or we could show specific "Coming Soon" styling)
  const displayProducts = allProducts.filter(p => p.category === activeCategory).slice(0, 4);

  const handleShare = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality disabled
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
      {/* Soft Pink Smoky Background using loved.png */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base loved.png image */}
        <img
          src="/assets/loved.png"
          alt=""
          className="w-full h-full object-cover opacity-100"
        />

        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl leading-none tracking-tight">
            <span className="text-[#1a1a1a]">Loved at </span>
            <span className="text-[#f01a33]">Every Level</span>
          </h2>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-12 mb-16 md:mb-24">
          {categories.map((category) => (
            <div
              key={category.label}
              onClick={() => setActiveCategory(category.label)}
              className="flex flex-col items-center gap-6 group cursor-pointer"
            >
              {/* Circle container exactly as screenshot */}
              <div className={`w-20 h-20 md:w-26 md:h-26 rounded-full border flex items-center justify-center transition-all duration-300 ${activeCategory === category.label
                ? 'border-[#f01a33] bg-[#fff5f6]'
                : 'border-[#f01a33] group-hover:bg-[#fff5f6]'
                }`}>
                <img
                  src={category.icon}
                  alt={category.label}
                  className={`w-12 h-12 object-contain transition-all duration-300 ${activeCategory === category.label
                    ? '[filter:invert(19%)_sepia(94%)_saturate(7400%)_hue-rotate(349deg)_brightness(91%)_contrast(100%)]'
                    : 'group-hover:[filter:invert(19%)_sepia(94%)_saturate(7400%)_hue-rotate(349deg)_brightness(91%)_contrast(100%)]'
                    }`}
                />
              </div>
              <span className={`font-display text-lg md:text-2xl transition-colors duration-300 tracking-tight ${activeCategory === category.label ? 'text-[#f01a33]' : 'text-[#1a1a1a] group-hover:text-[#f01a33]'
                }`}>
                {category.label}
              </span>
            </div>
          ))}
        </div>

        {/* Curated Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 min-h-[400px]">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col group bg-[#f9f8f7] rounded-[20px] border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in"
              >
                {/* Image Section */}
                <div
                  className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7] cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    {/* Action Icons - Top Right - Slide in from right */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-auto">
                      {/* Heart/Wishlist Icon */}
                      <button
                        onClick={(e) => handleWishlist(product, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isInWishlist(product.id) ? 'bg-[#f01a33] text-white' : 'bg-white hover:bg-[#f01a33] hover:text-white'}`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>

                      {/* Share Icon */}
                      <button
                        onClick={(e) => handleShare(product, e)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f01a33] hover:text-white transition-all duration-300 shadow-md"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Add to Cart Button - White fills from bottom-right upward */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
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
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="font-display text-lg italic text-[#1a1a1a] opacity-90 hover:text-[#f01a33] transition-colors"
                  >
                    {product.name}
                  </button>
                </div>
              </div>
            ))) : (
            <div className="col-span-full flex items-center justify-center p-12 text-gray-400">
              Coming soon...
            </div>
          )}
        </div>

        {/* View All Action */}
        <div className="flex justify-center mt-8">
          <Button asChild className="relative bg-[#f01a33] text-white px-24 py-4 text-[1rem] rounded-[16px] h-auto font-body font-medium overflow-hidden group shadow-[0_12px_40px_-10px_rgba(240,26,51,0.35)] hover:shadow-xl transition-shadow duration-500">
            <Link href="/collection">
              <span className="relative z-10 group-hover:text-[#f01a33] transition-colors duration-700">View all</span>
              {/* White fill animation from bottom-right rising upward */}
              <div className="absolute bottom-0 right-0 w-full h-0 bg-white group-hover:h-full transition-all duration-700 ease-liquid"
                style={{ transformOrigin: 'bottom right' }} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick View Modal - Standardized Style */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto bg-[#fdfcfc] border-none rounded-[30px] gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>Quick view for {selectedProduct?.name}</DialogDescription>
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
                <span className="text-[#f01a33] font-display text-2xl font-bold">Rs. {selectedProduct?.price}</span>
                <span className="text-gray-400 text-sm line-through">Rs. {selectedProduct?.oldPrice}</span>
              </div>

              <p className="font-body text-[#666666] text-sm leading-relaxed mb-8">
                A potent blend of Ayurvedic herbs and modern science designed to illuminate dull skin. Infused with saffron and hyaluronic acid, this lightweight serum deeply penetrates to hydrate, brighten, and restore your natural radiance overnight.
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
                  <span className="relative z-10 group-hover/btn:text-[#f01a33] transition-colors duration-700">Buy Now</span>
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
