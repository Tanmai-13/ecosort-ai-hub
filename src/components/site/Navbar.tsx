import { Link } from "@tanstack/react-router";
import { Leaf, Menu, Recycle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/scanner", label: "Waste Scanner" },
  { to: "/guide", label: "Disposal Guide" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/challenge", label: "Eco Challenge" },
  { to: "/report", label: "Community Report" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="EcoSort AI home">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Leaf className="size-5 text-primary" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight">EcoSort AI</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Scan · Learn · Sort
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                activeProps={{ className: "bg-primary/15 text-primary hover:bg-primary/20" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/scanner">
              <Recycle className="size-4" /> Scan Waste
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] border-border bg-card p-0">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <Leaf className="size-5 text-primary" />
                <span className="font-display font-bold">EcoSort AI</span>
              </div>
              <ul className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                      activeProps={{ className: "bg-primary/15 text-primary" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-3">
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link to="/scanner">Scan Waste</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
