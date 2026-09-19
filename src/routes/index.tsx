import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Leaf,
  Lightbulb,
  Recycle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Trash2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Disclaimer } from "@/components/site/PageHeader";
import { CATEGORY_IDS } from "@/lib/waste-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoSort AI — Scan Waste. Learn. Sort Better." },
      {
        name: "description",
        content:
          "EcoSort AI helps students and communities identify waste, learn responsible disposal and build sustainability habits — with transparent demo-mode predictions.",
      },
      { property: "og:title", content: "EcoSort AI — Scan Waste. Learn. Sort Better." },
      {
        property: "og:description",
        content:
          "AI-assisted waste identification, smart disposal guidance and sustainability tracking for campuses and communities.",
      },
    ],
  }),
  component: Index,
});

const PROBLEMS = [
  {
    icon: Trash2,
    title: "Improper segregation",
    body: "Wet and dry waste get mixed at source, so entire truckloads of recoverable material end up in landfill.",
  },
  {
    icon: Brain,
    title: "Awareness gap",
    body: "Most people were never taught resin codes, bin colours or why batteries must never enter household bins.",
  },
  {
    icon: TriangleAlert,
    title: "Disposal confusion",
    body: "Rules change between cities and campuses, and the guidance is never available at the moment of binning.",
  },
];

const PILLARS = [
  {
    icon: ScanLine,
    title: "AI-assisted classification",
    body: "Upload a photo or pick a sample item and get a clear category estimate with an honest demo-mode label.",
    to: "/scanner" as const,
    cta: "Open scanner",
  },
  {
    icon: BookOpen,
    title: "Smart disposal guidance",
    body: "Bin colours, accepted materials, do's and don'ts, reuse tips and safe handling rules for hazardous e-waste.",
    to: "/guide" as const,
    cta: "Read the guide",
  },
  {
    icon: BarChart3,
    title: "Sustainability tracking",
    body: "Charts of your category mix and weekly activity, plus quiz scores and community reports in one dashboard.",
    to: "/dashboard" as const,
    cta: "View dashboard",
  },
];

const STEPS = [
  { icon: Upload, step: "Step 1", title: "Upload", body: "Drop in a photo of the item, or tap one of the built-in sample presets." },
  { icon: Sparkles, step: "Step 2", title: "Identify", body: "EcoSort returns a category estimate with a transparent sample breakdown." },
  { icon: Recycle, step: "Step 3", title: "Learn & dispose", body: "Follow the step-by-step routine and drop it in the right coloured bin." },
];

const STATS = [
  { value: "5", label: "Sample scan presets" },
  { value: "7", label: "Waste categories covered" },
  { value: "62%", label: "Sample: campus waste that is recoverable" },
  { value: "3 min", label: "Sample: time to learn your bin colours" },
];

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <Badge className="bg-lime/15 text-lime hover:bg-lime/15">
              <Leaf className="mr-1.5 size-3.5" /> Scan Waste. Learn. Sort Better.
            </Badge>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Smarter Waste Management{" "}
              <span className="text-gradient-eco">Starts With You</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Use AI-assisted waste identification, learn responsible disposal, and build better
              sustainability habits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/scanner">
                  <ScanLine className="size-4" /> Scan Waste
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/guide">
                  Explore Disposal Guide <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Zero-landfill mindset", "Transparent demo mode", "Privacy-first", "Campus ready"].map(
                (b) => (
                  <span
                    key={b}
                    className="glass rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Live category library</span>
                <Badge variant="outline">7 streams</Badge>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CATEGORY_IDS.map((id) => (
                  <div
                    key={id}
                    className="rounded-xl border border-border bg-background/30 px-3 py-4 text-center text-sm font-medium"
                  >
                    {id}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-lime/25 bg-lime/5 p-3 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-lime" />
                Demo mode is clearly labelled everywhere. No fabricated model accuracy, no hidden
                data collection.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">The problem we're tackling</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Waste sorting fails at the last metre — right at the bin, where people need answers fast.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <Card key={p.title} className="glass glass-hover">
              <CardContent className="pt-6">
                <span className="grid size-11 place-items-center rounded-xl bg-destructive/15">
                  <p.icon className="size-5 text-destructive" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Three pillars of the solution</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <Card key={p.title} className="glass glass-hover">
                <CardContent className="flex h-full flex-col pt-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                    <p.icon className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                  <Button asChild variant="ghost" className="mt-4 justify-start px-0 text-primary">
                    <Link to={p.to}>
                      {p.cta} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <Card key={s.step} className="glass glass-hover">
              <CardContent className="pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-lime">
                  {s.step}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                    <s.icon className="size-5 text-primary" />
                  </span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Sample impact snapshot</h2>
            <Badge variant="outline">Illustrative demo figures</Badge>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-bold text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Disclaimer>
              These figures are sample/demo metrics used to illustrate the interface. They are not
              measured results from real deployments.
            </Disclaimer>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-10 text-center">
          <Lightbulb className="mx-auto size-10 text-lime" />
          <h2 className="mt-4 text-3xl font-bold">Start sorting better today</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Scan your first item, take the five-question eco challenge, and see your habits build up
            on the dashboard.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/scanner">Scan Waste</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/challenge">Take the Eco Challenge</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
