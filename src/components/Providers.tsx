"use client";

import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShopProvider } from "@/context/ShopContext";
import SplashLoader from "@/components/SplashLoader";
import ScrollMotion from "@/components/ScrollMotion";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollMotion />
          {isLoading && <SplashLoader onComplete={finishLoading} />}
          <div className="motion-page-2026" data-motion-page>
            {children}
          </div>
        </TooltipProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}
