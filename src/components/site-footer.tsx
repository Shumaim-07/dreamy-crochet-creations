import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div className="max-w-xs">
            <Link
              to="/"
              className="font-display text-2xl italic tracking-tight text-foreground"
            >
              Dreamy Crochet
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Slow fashion for slow living. Handcrafted with care, shipped
              worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                Studio
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-foreground">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <span className="hover:text-foreground cursor-pointer">
                    Shipping
                  </span>
                </li>
                <li>
                  <span className="hover:text-foreground cursor-pointer">
                    Returns
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                Social
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between border-t border-border pt-8 text-[11px] font-mono uppercase tracking-widest text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Dreamy Crochet Studio</p>
          <p>Built for the slow life.</p>
        </div>
      </div>
    </footer>
  );
}
