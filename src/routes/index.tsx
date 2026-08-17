import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import {
  STOREFRONT_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";
import heroImage from "@/assets/hero-blanket.jpg";

const productsQueryOptions = queryOptions({
  queryKey: ["shopify-products", "home"],
  queryFn: async () => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 6 });
    return (data?.data?.products?.edges as ShopifyProduct[]) || [];
  },
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dreamy Crochet — Handmade Crochet Pieces" },
      {
        name: "description",
        content:
          "Slow-made crochet pieces crafted from organic wool and recycled cotton. Each stitch tells a story of patience and warmth.",
      },
      { property: "og:title", content: "Dreamy Crochet — Handmade Crochet Pieces" },
      {
        property: "og:description",
        content:
          "Slow-made crochet pieces crafted from organic wool and recycled cotton. Each stitch tells a story of patience and warmth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(productsQueryOptions);
  },
  component: Index,
});

function Index() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              Handcrafted with care
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Slow-made crochet for{" "}
              <span className="italic">slow living</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
              Each piece is hand-stitched in our sunlit studio using organic
              cotton and recycled wool. Made to order, made to last.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/products">
                  Shop the collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full px-6"
              >
                <Link to="/about">Read our story</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] ring-1 ring-black/5">
              <img
                src={heroImage}
                alt="Cream crochet blanket draped over a vintage wooden chair"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"

              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              The Collection
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Shop our <span className="italic">favorites</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground md:inline-flex"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
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

        <div className="mt-10 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/products">View all products</Link>
          </Button>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="rounded-[2.5rem] bg-accent/30 px-8 py-16 ring-1 ring-black/5 md:px-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              Why we make
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
              Crafted for the <span className="italic">home</span> and the
              planet
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Made to order",
                description:
                  "Every piece is crocheted after you order, so we never produce waste.",
              },
              {
                title: "Natural fibers",
                description:
                  "We choose organic cotton, brushed merino, and recycled wool.",
              },
              {
                title: "One-of-a-kind",
                description:
                  "Handmade means subtle variation — no two pieces are identical.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-display text-3xl text-primary">0{i + 1}</p>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
            Stay in touch
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-5xl">
            Join the <span className="italic">slow list</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            New drops, studio notes, and early access to limited pieces.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="h-11 rounded-full border border-input bg-background px-5 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring sm:w-80"
            />
            <Button type="submit" className="rounded-full px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
