import dynamic from "next/dynamic";
import { PreloadQuery } from "@lib/client";
import { productsQuery } from "@lib/queries/productsQuery";
import { Suspense } from "react";

const ProductGrid = dynamic(() => import("@/components/home/ProductGrid"));

export default async function Page() {
  return (
    <PreloadQuery query={productsQuery}>
      <main className="flex flex-col items-center justify-between min-h-screen sm:p-12 md:p-24">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid />
        </Suspense>
      </main>
    </PreloadQuery>
  );
}
