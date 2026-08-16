import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-display text-2xl italic tracking-tight text-foreground"
          >
            Dreamy Crochet
          </Link>
          <nav className="hidden gap-6 text-sm font-medium tracking-wide md:flex">
            <Link
              to="/products"
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
