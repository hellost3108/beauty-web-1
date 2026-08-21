"use client";

import { Suspense } from "react";
import Collection from "@/views/Collection2026";

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <Collection />
    </Suspense>
  );
}
