"use client";

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShopProvider } from "@/context/ShopContext";
import SplashLoader from "@/components/SplashLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isLoading && <SplashLoader onComplete={() => setIsLoading(false)} />}
          {children}
        </TooltipProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}
