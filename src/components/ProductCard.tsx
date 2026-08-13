"use client";

import { Heart, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  id?: string | number;
  image: string;
  name: string;
  description: string;
  price: string;
}

const ProductCard = ({ id = 1, image, name, description, price }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart, addToWishlist } = useShop();

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: Number(id),
      name,
      price,
      image
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist({
      id: Number(id),
      name,
      price,
      image
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality can be implemented here
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistClick}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-card transition-all duration-300 shadow-sm"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={handleShareClick}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-card transition-all duration-300 shadow-sm"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-brand text-lg text-foreground mb-1">{name}</h3>
        <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-button font-medium text-foreground">{price}</span>
          <button
            onClick={handleAddToCart}
            className="font-button text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
