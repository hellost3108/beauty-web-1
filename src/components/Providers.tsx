"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShopProvider } from "@/context/ShopContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import SplashLoader from "@/components/SplashLoader";
import ScrollMotion from "@/components/ScrollMotion";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <ShopProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {!isAdmin && <ScrollMotion />}
            {!isAdmin && isLoading && <SplashLoader onComplete={finishLoading} />}
            <div
              className={isAdmin ? undefined : "motion-page-2026"}
              data-motion-page={isAdmin ? undefined : ""}
            >
              {children}
            </div>
          </TooltipProvider>
        </ShopProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  );
}
