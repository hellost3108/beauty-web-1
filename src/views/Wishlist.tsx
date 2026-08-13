"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useShop();

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-16 px-6 md:px-12 text-center min-h-[60vh]">
                <h1 className="font-display text-4xl mb-8 text-[#1a1a1a]">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center gap-4">
                        <p className="font-body text-[#666666]">Your wishlist is currently empty.</p>
                        <Link href="/shop">
                            <Button className="bg-[#e7406e] text-white hover:bg-[#d63a63]">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {wishlist.map((product) => (
                            <div key={product.id} className="flex flex-col group bg-white rounded-[20px] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                                <div className="relative w-full aspect-square overflow-hidden bg-[#f9f8f7]">
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Button
                                            onClick={() => addToCart(product)}
                                            className="w-full bg-white/90 hover:bg-white text-[#e7406e] shadow-sm backdrop-blur-sm"
                                        >
                                            <ShoppingBag className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-display text-lg text-[#1a1a1a] mb-1">{product.name}</h3>
                                    <p className="font-display text-[#e7406e] font-bold">Rs. {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;

