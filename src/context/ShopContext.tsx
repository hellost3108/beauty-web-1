"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type Product = {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    image: string;
    images?: string[];
    rawPrice?: number;
    subtitle?: string;
    description?: string;
    category?: string;
    ingredients?: string;
    usage?: string;
    slug?: string;
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
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }

        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
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
        toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
        toast.success('Đã xoá khỏi giỏ hàng');
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
        toast.success(`Đã thêm ${product.name} vào yêu thích`);
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
        toast.success('Đã xoá khỏi danh sách yêu thích');
    };

    const isInWishlist = (productId: number) => wishlist.some(item => item.id === productId);
    const isInCart = (productId: number) => cart.some(item => item.id === productId);

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
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
