import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, BookOpen, Check, Lightbulb, SearchX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Disclaimer, PageHeader } from "@/components/site/PageHeader";
import { CATEGORIES, CATEGORY_IDS, type CategoryId } from "@/lib/waste-data";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Smart Disposal Guide — EcoSort AI" },
      {
        name: "description",
        content:
          "Search waste items and learn the right bin, do's and don'ts, reduction tips and safe e-waste handling.",
      },
      { property: "og:title", content: "Smart Disposal Guide — EcoSort AI" },
      {
        property: "og:description",
        content: "Category-by-category disposal rules, bin colours and reuse tips.",
      },
    ],
  }),
  component: GuidePage,
});

const FILTERS = ["All", ...CATEGORY_IDS] as const;

function GuidePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORY_IDS.filter((id) => filter === "All" || filter === id)
      .map((id) => CATEGORIES[id])
      .filter((c) => {
        if (!q) return true;
        const haystack = [c.id, c.blurb, c.binColor, ...c.accepted, ...c.dos, ...c.donts, ...c.tips]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
  }, [query, filter]);

  return (
    <div>
      <PageHeader
        icon={BookOpen}
        eyebrow="Knowledge base"
        title="Smart Disposal Guide"
        description="Find any waste stream, see what belongs in it, and follow the right handling routine — including safe handling for hazardous e-waste."
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an item — bottle, battery, pizza box, foil…"
            className="h-12 bg-card/50 text-base"
            aria-label="Search disposal guide"
          />
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <Card className="glass">
            <CardContent className="grid place-items-center py-20 text-center">
              <div>
                <SearchX className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold">No matches for “{query}”</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a broader word like “plastic”, “battery” or “compost”, or switch the filter
                  back to All.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((c) => (
              <CategoryCard key={c.id} id={c.id} />
            ))}
          </div>
        )}

        <Disclaimer>
          Disposal rules vary between municipalities, campuses and collection partners. Bin colours
          and accepted materials shown here follow common Indian two-bin / three-bin practice —
          always confirm with your local waste management authority.
        </Disclaimer>
      </div>
    </div>
  );
}

function CategoryCard({ id }: { id: CategoryId }) {
  const c = CATEGORIES[id];
  const Icon = c.icon;
  return (
    <Card className="glass glass-hover">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
              <Icon className="size-6 text-primary" />
            </span>
            <CardTitle className="text-xl">{c.id}</CardTitle>
          </div>
          <Badge variant="outline">{c.recyclable}</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">
          <span
            className="size-3.5 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: c.binSwatch }}
          />
          {c.binColor}
        </div>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Accepted items
          </p>
          <div className="flex flex-wrap gap-2">
            {c.accepted.map((a) => (
              <span key={a} className="rounded-full bg-accent/50 px-3 py-1 text-xs">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Do's</p>
            <ul className="space-y-1.5">
              {c.dos.map((d) => (
                <li key={d} className="flex gap-2 text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-destructive">
              Don'ts
            </p>
            <ul className="space-y-1.5">
              {c.donts.map((d) => (
                <li key={d} className="flex gap-2 text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-lime/25 bg-lime/5 p-3">
          <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime">
            <Lightbulb className="size-3.5" /> Reduce & reuse
          </p>
          <ul className="space-y-1 text-muted-foreground">
            {c.tips.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        </div>

        {c.note && (
          <p className="flex gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs">
            <AlertTriangle className="size-4 shrink-0 text-destructive" /> {c.note}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
