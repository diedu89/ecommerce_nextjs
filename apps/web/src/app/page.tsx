import dynamic from "next/dynamic";
import { PreloadQuery } from "@lib/client";
import { productsQuery } from "@lib/queries/productsQuery";
import { Suspense } from "react";
import { auth, signOut } from "../auth/auth";

const ProductGrid = dynamic(() => import("@/components/home/ProductGrid"));

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <PreloadQuery query={productsQuery}>
      <nav className="flex items-center justify-between w-full p-8 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">E-commerce</h1>
        <div className="flex items-center space-x-4">
          {!user && <a href="/api/auth/signin">Sign in</a>}
          {user && (
            <>
              <a
                href="/account"
                className="hover:text-gray-300 transition-colors"
              >
                My Account
              </a>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="hover:text-gray-300 transition-colors"
                >
                  Sign out
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
      <main className="flex flex-col items-center justify-between min-h-screen sm:p-12 md:p-24">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid />
        </Suspense>
      </main>
    </PreloadQuery>
  );
}
