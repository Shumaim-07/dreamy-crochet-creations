import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$handle")({
  component: ProductDetailPage,
  head: () => ({
    meta: [
      { title: "Product — Dreamy Crochet" },
      {
        name: "description",
        content: "View this handmade crochet piece from Dreamy Crochet.",
      },
      { property: "og:title", content: "Product — Dreamy Crochet" },
      { property: "og:description", content: "View this handmade crochet piece from Dreamy Crochet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ProductDetailPage() {
  const { handle } = Route.useParams();
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-center text-muted-foreground">
          Product detail for {handle} — loading real data from Shopify soon.
        </p>
      </section>
    </main>
  );
}
