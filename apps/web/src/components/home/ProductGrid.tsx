"use client";

import { useSuspenseQuery } from "@apollo/client";
import { ProductsQuery } from "@lib/gql/graphql";
import { productsQuery } from "@lib/queries/productsQuery";
import Card from "@repo/ui/Card";

export default function ProductGrid() {
  const { data } = useSuspenseQuery<ProductsQuery>(productsQuery);
  return (
    <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.products.items.map((product, i) => (
        <Card
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
          imageUrl={product.image}
          priority={i < 1}
        />
      ))}
    </div>
  );
}
