import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Code2,
  Compass,
  GraduationCap,
  Info,
  MapPin,
  Rocket,
  ScanEye,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer, PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — EcoSort AI" },
      {
        name: "description",
        content:
          "EcoSort AI is a hackathon prototype for waste education: its mission, personas, tech stack, honest limitations and roadmap.",
      },
      { property: "og:title", content: "About the Project — EcoSort AI" },
      {
        property: "og:description",
        content: "Mission, personas, tech stack and the honest limitations of this prototype.",
      },
    ],
  }),
  component: AboutPage,
});

const PERSONAS = [
  {
    icon: GraduationCap,
    title: "College students",
    body: "Learn what goes where in seconds, build habits in hostels and classrooms, and compete on eco challenges.",
  },
  {
    icon: Building2,
    title: "College administrators",
    body: "See where segregation breaks down on campus and collect waste issue reports in one place.",
  },
  {
    icon: Users,
    title: "Communities & RWAs",
    body: "Share a simple, common reference for wet/dry separation and safe hazardous-waste handling.",
  },
  {
    icon: Compass,
    title: "Awareness groups",
    body: "Use the guide and quiz as ready-made teaching material for drives and workshops.",
  },
];

const STACK = [
  { name: "React 19", note: "Component UI" },
  { name: "TypeScript", note: "Type-safe app logic" },
  { name: "TanStack Router", note: "File-based routing" },
  { name: "Tailwind CSS v4", note: "Design tokens & glassmorphism" },
  { name: "Lucide Icons", note: "Consistent iconography" },
  { name: "Recharts", note: "Dashboard charts" },
  { name: "LocalStorage", note: "Client-side persistence" },
];

const LIMITS = [
  "No trained computer-vision model — classifications are rule-based sample predictions, clearly labelled Demo or Simulated.",
  "Uploaded images are read in the browser only; they are never uploaded, stored on a server, or analysed.",
  "Impact statistics on the home page are illustrative sample figures, not measured data.",
  "Community reports are demonstration logs. They do not reach municipal authorities or campus staff.",
  "Disposal guidance follows common practice and may differ from your municipality's rules.",
  "All data lives in one browser — clearing site data erases scans, quiz scores and reports.",
];

const ROADMAP = [
  {
    icon: ScanEye,
    title: "Real computer vision",
    body: "Integrate a TensorFlow.js model in-browser, with an optional custom Vision API endpoint for higher accuracy and true confidence scores.",
  },
  {
    icon: ShieldCheck,
    title: "Verified municipal guides",
    body: "Partner with city waste boards so bin colours and accepted materials are officially sourced per region.",
  },
  {
    icon: Building2,
    title: "Campus collection partners",
    body: "Route community reports to facility teams and certified e-waste handlers with status workflows.",
  },
  {
    icon: MapPin,
    title: "Geolocation tagging",
    body: "Pin reported waste issues to map coordinates and surface nearby drop-off centres.",
  },
];

function AboutPage() {
  return (
    <div>
      <PageHeader
        icon={Info}
        eyebrow="Hackathon project"
        title="About EcoSort AI"
        description="A student-built sustainability platform that turns everyday waste confusion into clear, teachable action — built transparently, with no faked intelligence."
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="size-5 text-primary" /> Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Most waste is not hard to sort — people just don't know the rules, and the rules are
              never where the bin is. EcoSort AI puts identification, disposal guidance and habit
              tracking into one place that works on any phone.
            </p>
            <p>
              The project deliberately ships in transparent demo mode. Rather than inventing model
              accuracy numbers to look impressive, every prediction in this build is labelled as a
              sample so judges, teachers and users can see exactly where the intelligence ends and
              the roadmap begins.
            </p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold">Who it's for</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map((p) => (
              <Card key={p.title} className="glass glass-hover">
                <CardContent className="pt-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                    <p.icon className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Code2 className="size-5 text-primary" /> Tech stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {STACK.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/30 px-3 py-2"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.note}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="size-5 text-lime" /> Honest limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {LIMITS.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime" />
                    {l}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <Rocket className="size-5 text-primary" />
            <h2 className="text-2xl font-bold">Roadmap</h2>
            <Badge variant="outline">Post-hackathon</Badge>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {ROADMAP.map((r) => (
              <Card key={r.title} className="glass glass-hover">
                <CardContent className="flex gap-4 pt-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime/15">
                    <r.icon className="size-5 text-lime" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Disclaimer>
          EcoSort AI is an educational prototype. Nothing here should replace guidance from your
          municipal waste authority or certified hazardous-waste handlers.
        </Disclaimer>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/scanner">Try the scanner</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/guide">Read the disposal guide</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
