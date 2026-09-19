import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { NAV_LINKS } from "./Navbar";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Leaf className="size-5 text-primary" />
            </span>
            <span className="font-display text-lg font-bold">EcoSort AI</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Scan Waste. Learn. Sort Better. A student-built sustainability platform for waste
            education, disposal guidance and campus-level environmental awareness.
          </p>
          <p className="mt-4 max-w-md rounded-xl border border-border/60 bg-background/40 p-3 text-xs leading-relaxed text-muted-foreground">
            Prototype notice: this build runs in transparent demo mode. Classifications are
            rule-based sample predictions, not live computer-vision output, and all data stays in
            your browser.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Good practice</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Separate wet and dry waste at source</li>
            <li>Rinse recyclables before binning</li>
            <li>Never burn plastic or e-waste</li>
            <li>Use certified e-waste drop-off centres</li>
            <li>Always check local municipal rules</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} EcoSort AI — hackathon prototype. Built with React, TypeScript,
        Tailwind CSS and Recharts.
      </div>
    </footer>
  );
}
