"use client";

import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
      lineId: null,
    });
  };

  return (
    <article className="group flex flex-col">
      <Link
        to="/products/$handle"
        params={{ handle: product.node.handle }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary ring-1 ring-black/5"
      >
        {image?.url ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            loading="lazy"
            width={600}
            height={750}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg text-foreground">
              <Link
                to="/products/$handle"
                params={{ handle: product.node.handle }}
                className="hover:text-primary"
              >
                {product.node.title}
              </Link>
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {product.node.description}
            </p>
          </div>
          <p className="font-display text-lg text-primary">
            ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}
          </p>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || !variant || !variant.availableForSale}
          className="mt-4 w-full"
          variant="outline"
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
      </div>
    </article>
  );
}
