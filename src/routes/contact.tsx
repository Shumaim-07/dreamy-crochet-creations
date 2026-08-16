import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Dreamy Crochet" },
      {
        name: "description",
        content:
          "Get in touch with Dreamy Crochet. Questions, custom orders, or wholesale inquiries — we would love to hear from you.",
      },
      { property: "og:title", content: "Contact — Dreamy Crochet" },
      {
        property: "og:description",
        content:
          "Get in touch with Dreamy Crochet. Questions, custom orders, or wholesale inquiries — we would love to hear from you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
            Get in Touch
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Say <span className="italic">hello</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
            Questions, custom orders, or wholesale inquiries — we would love to hear
            from you.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl text-foreground">Email</h2>
              <a
                href="mailto:hello@dreamycrochet.studio"
                className="mt-2 text-muted-foreground transition-colors hover:text-primary"
              >
                hello@dreamycrochet.studio
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl text-foreground">Studio Hours</h2>
              <p className="mt-2 text-muted-foreground">
                Monday — Friday, 9am — 5pm
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-foreground">Social</h2>
              <div className="mt-2 flex gap-4 text-muted-foreground">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Instagram
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-accent/30 p-8 ring-1 ring-black/5">
            {submitted ? (
              <div className="text-center">
                <h2 className="font-display text-2xl text-foreground">
                  Message sent
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Thank you for reaching out. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
