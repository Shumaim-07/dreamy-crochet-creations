import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Dreamy Crochet" },
      {
        name: "description",
        content:
          "Discover the story behind Dreamy Crochet. Hand-stitched, slow-made pieces crafted with intention and care.",
      },
      { property: "og:title", content: "About — Dreamy Crochet" },
      {
        property: "og:description",
        content:
          "Discover the story behind Dreamy Crochet. Hand-stitched, slow-made pieces crafted with intention and care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
            Our Story
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Woven with <span className="italic">intention</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
            Dreamy Crochet began as a quiet rebellion against fast fashion. In a small
            sun-drenched studio, every piece is made to order, ensuring zero waste and
            a truly personal connection between maker and owner.
          </p>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-[2rem] bg-accent object-cover ring-1 ring-black/5" />
          </div>
          <div className="space-y-8">
            <h2 className="font-display text-3xl italic text-foreground">
              Slow-made for slow living
            </h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              We believe the objects we surround ourselves with should carry the warmth
              of human hands. Each stitch is a mindful pause, a celebration of the
              imperfectly human touch.
            </p>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              Our yarns are sourced from small, sustainable producers who share our
              respect for the craft. From organic cotton to recycled wool blends, we
              choose materials that feel good and do good.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-display text-3xl text-primary">01</p>
                <p className="mt-2 text-sm text-muted-foreground">Made to order</p>
              </div>
              <div>
                <p className="font-display text-3xl text-primary">02</p>
                <p className="mt-2 text-sm text-muted-foreground">Sustainable fibers</p>
              </div>
              <div>
                <p className="font-display text-3xl text-primary">03</p>
                <p className="mt-2 text-sm text-muted-foreground">Zero waste</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
