"use client";

import { Suspense } from "react";
import Collection from "@/views/Collection";

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <Collection />
    </Suspense>
  );
}
