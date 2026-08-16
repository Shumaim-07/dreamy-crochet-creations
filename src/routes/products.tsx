import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import {
  STOREFRONT_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

const productsQueryOptions = queryOptions({
  queryKey: ["shopify-products", "all"],
  queryFn: async () => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
    return (data?.data?.products?.edges as ShopifyProduct[]) || [];
  },
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop — Dreamy Crochet" },
      {
        name: "description",
        content:
          "Shop handmade crochet pieces from Dreamy Crochet. Totes, cardigans, home decor, and more — crafted with care.",
      },
      { property: "og:title", content: "Shop — Dreamy Crochet" },
      {
        property: "og:description",
        content:
          "Shop handmade crochet pieces from Dreamy Crochet. Totes, cardigans, home decor, and more — crafted with care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(productsQueryOptions);
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
            The Collection
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Shop our <span className="italic">favorites</span>
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 rounded-[2rem] bg-accent/30 py-24 text-center ring-1 ring-black/5">
            <p className="text-muted-foreground">
              No products found yet. Add your first crochet product to the
              Shopify store to see it here.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
