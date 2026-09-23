"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useShop } from "@/context/ShopContext";
import type { StorefrontProduct } from "@/lib/cms/types";

const ProductsContext = createContext<StorefrontProduct[]>([]);

export function ProductsProvider({ products, children }: { products: StorefrontProduct[]; children: ReactNode }) {
  const { syncCatalog } = useShop();

  // Keep names, prices and images of items already in the cart/wishlist in
  // step with what the Admin has published.
  useEffect(() => {
    syncCatalog(products);
  }, [products, syncCatalog]);

  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
