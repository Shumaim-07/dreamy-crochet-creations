import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
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
});

function ProductsPage() {
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

        <div className="mt-16">
          <p className="text-center text-muted-foreground">
            No products found yet. Add your first crochet product to the Shopify store
            to see it here.
          </p>
        </div>
      </section>
    </main>
  );
}
