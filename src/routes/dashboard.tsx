import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Database,
  Lightbulb,
  ListChecks,
  ScanLine,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer, PageHeader } from "@/components/site/PageHeader";
import { CATEGORIES, RECOMMENDATIONS, tipOfTheDay } from "@/lib/waste-data";
import {
  KEYS,
  useStoredList,
  type QuizRecord,
  type ReportRecord,
  type ScanRecord,
} from "@/lib/storage";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Sustainability Dashboard — EcoSort AI" },
      {
        name: "description",
        content:
          "Track your scans, category distribution, weekly activity, quiz score and community reports — all stored in your browser.",
      },
      { property: "og:title", content: "Sustainability Dashboard — EcoSort AI" },
      {
        property: "og:description",
        content: "Charts and history for your waste sorting activity, stored locally.",
      },
    ],
  }),
  component: DashboardPage,
});

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DashboardPage() {
  const scans = useStoredList<ScanRecord>(KEYS.scans);
  const quiz = useStoredList<QuizRecord>(KEYS.quiz);
  const reports = useStoredList<ReportRecord>(KEYS.reports);

  const categoryData = useMemo(() => {
    const counts = new Map<string, number>();
    scans.items.forEach((s) => counts.set(s.category, (counts.get(s.category) ?? 0) + 1));
    return [...counts.entries()].map(([name, value]) => ({
      name,
      value,
      fill: CATEGORIES[name as keyof typeof CATEGORIES]?.binSwatch ?? "#64748b",
    }));
  }, [scans.items]);

  const weeklyData = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(today);
      day.setDate(today.getDate() - (6 - i));
      const key = day.toDateString();
      return {
        day: DAY_LABELS[day.getDay()]!,
        scans: scans.items.filter((s) => new Date(s.createdAt).toDateString() === key).length,
      };
    });
  }, [scans.items]);

  const topCategory = useMemo(() => {
    if (!categoryData.length) return "—";
    return categoryData.reduce((a, b) => (b.value > a.value ? b : a)).name;
  }, [categoryData]);

  const bestQuiz = useMemo(() => {
    if (!quiz.items.length) return null;
    return quiz.items.reduce((a, b) => (b.score > a.score ? b : a));
  }, [quiz.items]);

  const metrics = [
    { label: "Total Scans", value: String(scans.items.length), icon: ScanLine, hint: "Saved locally" },
    { label: "Most Common Category", value: topCategory, icon: TrendingUp, hint: "From your scans" },
    {
      label: "Eco Quiz Score",
      value: bestQuiz ? `${bestQuiz.score}/${bestQuiz.total}` : "—",
      icon: Sparkles,
      hint: bestQuiz ? "Best attempt" : "Not attempted yet",
    },
    {
      label: "Local Reports",
      value: String(reports.items.length),
      icon: ListChecks,
      hint: "Demo logs",
    },
  ];

  return (
    <div>
      <PageHeader
        icon={BarChart3}
        eyebrow="Your activity"
        title="Sustainability Dashboard"
        description="Everything you scan, answer and report is summarised here so you can see your sorting habits taking shape over time."
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-2xl border border-lime/25 bg-lime/5 p-4">
          <Database className="mt-0.5 size-5 shrink-0 text-lime" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Data transparency:</strong> all metrics below come
            from your own activity stored in this browser's local storage. Nothing is uploaded, and
            no external analytics are collected. Clearing your browser data resets these numbers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label} className="glass glass-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <m.icon className="size-4 text-primary" />
                </div>
                <p className="mt-3 truncate font-display text-3xl font-bold">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Waste Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {categoryData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {categoryData.map((d) => (
                        <Cell key={d.name} fill={d.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.24 0.04 165)",
                        border: "1px solid oklch(0.38 0.045 163)",
                        borderRadius: 12,
                        color: "white",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart />
              )}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Scan Activity — Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      background: "oklch(0.24 0.04 165)",
                      border: "1px solid oklch(0.38 0.045 163)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Bar dataKey="scans" fill="#34d399" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
            <CardTitle className="text-lg">Recent scan history</CardTitle>
            {scans.items.length > 0 && (
              <Button variant="outline" size="sm" onClick={scans.clear}>
                <Trash2 className="size-4" /> Clear history
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {scans.items.length === 0 ? (
              <div className="grid place-items-center py-14 text-center">
                <div>
                  <ScanLine className="mx-auto size-9 text-muted-foreground" />
                  <p className="mt-3 font-medium">No scans yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Classify your first item to start building history.
                  </p>
                  <Button asChild className="mt-4">
                    <Link to="/scanner">Open the scanner</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {scans.items.slice(0, 12).map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/30 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{s.category}</Badge>
                      <Badge className="bg-lime/15 text-lime hover:bg-lime/15">{s.mode}</Badge>
                      <span className="text-xs text-muted-foreground">{s.disposalStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass border-lime/25 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="size-5 text-lime" /> Daily eco tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{tipOfTheDay()}</p>
              <Button asChild variant="secondary" className="mt-4 w-full">
                <Link to="/challenge">Take today's quiz</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Waste reduction recommendations</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {RECOMMENDATIONS.map((r) => (
                <div key={r.title} className="flex gap-3 rounded-xl border border-border bg-background/30 p-4">
                  <r.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Disclaimer>
          Charts render your locally stored activity. Any figures shown elsewhere on the site as
          "sample impact" are illustrative and not measured outcomes.
        </Disclaimer>
      </div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-full place-items-center text-center">
      <div>
        <BarChart3 className="mx-auto size-9 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          Scan a few items and your category mix will appear here.
        </p>
      </div>
    </div>
  );
}
