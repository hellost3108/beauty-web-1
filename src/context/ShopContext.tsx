"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type Product = {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    image: string;
};

type ShopContextType = {
    cart: Product[];
    wishlist: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    isInCart: (productId: number) => boolean;
    removeOneFromCart: (productId: number) => void;
    clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount and sanitize images
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedWishlist = localStorage.getItem('wishlist');
        
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Sanitize images in cart: Keep if it's already a placeholder, else replace
                const sanitizedCart = parsedCart.map((item: Product) => ({
                    ...item,
                    image: item.image && (item.image.startsWith('/assets/placeholder') || item.image.startsWith('/assets/sanpham')) ? item.image : "/assets/sanpham400x500.png"
                }));
                setCart(sanitizedCart);
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
        
        if (savedWishlist) {
            try {
                const parsedWishlist = JSON.parse(savedWishlist);
                // Sanitize images in wishlist
                const sanitizedWishlist = parsedWishlist.map((item: Product) => ({
                    ...item,
                    image: item.image && (item.image.startsWith('/assets/placeholder') || item.image.startsWith('/assets/sanpham')) ? item.image : "/assets/sanpham400x500.png"
                }));
                setWishlist(sanitizedWishlist);
            } catch (e) {
                console.error("Failed to parse wishlist from localStorage", e);
            }
        }
        
        setIsInitialized(true);
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, product]);
        setWishlist(prev => prev.filter(item => item.id !== product.id));
        toast.success(`Added ${product.name} to cart`);
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
        toast.success('Removed from cart');
    };

    const removeOneFromCart = (productId: number) => {
        setCart(prev => {
            const index = prev.findIndex(item => item.id === productId);
            if (index > -1) {
                const newCart = [...prev];
                newCart.splice(index, 1);
                return newCart;
            }
            return prev;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const addToWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            return;
        }
        setWishlist(prev => [...prev, product]);
        toast.success(`Added ${product.name} to wishlist`);
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (productId: number) => wishlist.some(item => item.id === productId);
    const isInCart = (productId: number) => cart.some(item => item.id === productId);

    return (
        <ShopContext.Provider value={{
            cart: cart.map(item => ({ ...item, image: item.image && (item.image.startsWith('/assets/placeholder') || item.image.startsWith('/assets/sanpham')) ? item.image : "/assets/sanpham400x500.png" })),
            wishlist: wishlist.map(item => ({ ...item, image: item.image && (item.image.startsWith('/assets/placeholder') || item.image.startsWith('/assets/sanpham')) ? item.image : "/assets/sanpham400x500.png" })),
            addToCart,
            removeFromCart,
            removeOneFromCart,
            clearCart,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            isInCart
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};
