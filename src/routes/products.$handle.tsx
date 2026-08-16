"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import {
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";

const productQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product as ShopifyProduct["node"] | null;
    },
  });

export const Route = createFileRoute("/products/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: "Product — Dreamy Crochet" },
      {
        name: "description",
        content: "View this handmade crochet piece from Dreamy Crochet.",
      },
      { property: "og:title", content: "Product — Dreamy Crochet" },
      {
        property: "og:description",
        content: "View this handmade crochet piece from Dreamy Crochet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(productQueryOptions(params.handle));
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants.edges[0]?.node,
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-foreground">Product not found</h1>
          <p className="mt-4 text-muted-foreground">
            This crochet piece is no longer available.
          </p>
          <Button asChild className="mt-8 rounded-full px-6">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to shop
            </Link>
          </Button>
        </section>
      </main>
    );
  }

  const image = product.images.edges[0]?.node;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
      lineId: null,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Button
          asChild
          variant="ghost"
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 text-sm"
        >
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] ring-1 ring-black/5">
            {image?.url ? (
              <img
                src={image.url}
                alt={image.altText || product.title}
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-accent">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              {product.productType || "Handmade"}
            </span>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-6 font-display text-3xl text-primary">
              ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
            </p>
            <p className="mt-8 leading-relaxed text-muted-foreground text-pretty">
              {product.description}
            </p>

            {product.options.length > 1 ||
              (product.options.length === 1 && product.options[0].name !== "Title") ? (
              <div className="mt-8 space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <p className="mb-2 text-sm font-medium text-foreground">
                      {option.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variant = product.variants.edges.find((v) =>
                          v.node.selectedOptions.some(
                            (o) => o.name === option.name && o.value === value,
                          ),
                        )?.node;
                        const isSelected = selectedVariant?.selectedOptions.some(
                          (o) => o.name === option.name && o.value === value,
                        );
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={!variant?.availableForSale}
                            onClick={() => variant && setSelectedVariant(variant)}
                            className="rounded-full"
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant || !selectedVariant.availableForSale}
                size="lg"
                className="rounded-full px-8"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Adding
                  </span>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link to="/products">Keep shopping</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-display text-xl text-foreground">Made to order</p>
                <p className="mt-1 text-xs text-muted-foreground">5-7 days</p>
              </div>
              <div>
                <p className="font-display text-xl text-foreground">Natural fibers</p>
                <p className="mt-1 text-xs text-muted-foreground">Organic cotton</p>
              </div>
              <div>
                <p className="font-display text-xl text-foreground">Worldwide</p>
                <p className="mt-1 text-xs text-muted-foreground">Tracked shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
