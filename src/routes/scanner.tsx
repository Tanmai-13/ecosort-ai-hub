import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ImagePlus,
  Info,
  Loader2,
  RefreshCw,
  ScanLine,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Disclaimer, PageHeader } from "@/components/site/PageHeader";
import { CATEGORIES, SAMPLE_PRESETS, type CategoryId, type SamplePreset } from "@/lib/waste-data";
import { KEYS, newId, pushRecord, type ScanRecord } from "@/lib/storage";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Waste Scanner — EcoSort AI" },
      {
        name: "description",
        content:
          "Upload a waste photo or pick a sample item to see a transparent demo classification with step-by-step disposal guidance.",
      },
      { property: "og:title", content: "Waste Scanner — EcoSort AI" },
      {
        property: "og:description",
        content: "Transparent demo-mode waste classification with disposal steps and bin colours.",
      },
    ],
  }),
  component: ScannerPage,
});

type Result = {
  category: CategoryId;
  label: string;
  description: string;
  breakdown: { category: CategoryId; score: number }[];
  steps: string[];
  mode: "Demo" | "Simulated";
};

const KEYWORDS: { match: string[]; preset: string }[] = [
  { match: ["bottle", "plastic", "pet", "wrapper", "polythene"], preset: "bottle" },
  { match: ["apple", "food", "banana", "fruit", "organic", "veg", "compost"], preset: "apple" },
  { match: ["can", "tin", "metal", "aluminium", "aluminum", "foil"], preset: "can" },
  { match: ["card", "box", "paper", "news", "carton"], preset: "cardboard" },
  { match: ["battery", "phone", "cable", "charger", "laptop", "ewaste", "e-waste"], preset: "battery" },
];

function presetFromFilename(name: string): SamplePreset {
  const lower = name.toLowerCase();
  const hit = KEYWORDS.find((k) => k.match.some((m) => lower.includes(m)));
  if (hit) return SAMPLE_PRESETS.find((p) => p.id === hit.preset)!;
  let hash = 0;
  for (let i = 0; i < lower.length; i++) hash = (hash * 31 + lower.charCodeAt(i)) % 9973;
  return SAMPLE_PRESETS[hash % SAMPLE_PRESETS.length]!;
}

function ScannerPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [preset, setPreset] = useState<SamplePreset | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setImageUrl(null);
    setImageName("");
    setPreset(null);
    setResult(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image. Please choose a JPG, PNG or WEBP photo.");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      setError("Image is larger than 6 MB. Please pick a smaller photo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setError(null);
      setResult(null);
      setPreset(null);
      setImageName(file.name);
      setImageUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  }, []);

  const choosePreset = (p: SamplePreset) => {
    setError(null);
    setResult(null);
    setImageUrl(null);
    setImageName(`${p.label} (sample preset)`);
    setPreset(p);
    if (inputRef.current) inputRef.current.value = "";
  };

  const classify = () => {
    if (!preset && !imageUrl) return;
    const chosen = preset ?? presetFromFilename(imageName);
    const mode: Result["mode"] = preset ? "Demo" : "Simulated";
    setLoading(true);
    setResult(null);
    setProgress(8);

    const ticker = window.setInterval(
      () => setProgress((p) => (p >= 92 ? 92 : p + Math.random() * 14)),
      180,
    );

    window.setTimeout(() => {
      window.clearInterval(ticker);
      setProgress(100);
      const next: Result = {
        category: chosen.category,
        label: chosen.label,
        description: chosen.description,
        breakdown: chosen.breakdown,
        steps: chosen.steps,
        mode,
      };
      setResult(next);
      setLoading(false);
      const record: ScanRecord = {
        id: newId(),
        createdAt: new Date().toISOString(),
        category: next.category,
        label: next.label,
        mode,
        confidence: chosen.breakdown[0]!.score,
        disposalStatus: "Guidance shown",
      };
      pushRecord<ScanRecord>(KEYS.scans, record);
    }, 1700);
  };

  const info = result ? CATEGORIES[result.category] : null;
  const ResultIcon = info?.icon ?? ScanLine;

  return (
    <div>
      <PageHeader
        icon={ScanLine}
        eyebrow="Core feature"
        title="Waste Scanner"
        description="Upload a photo of a waste item or try one of the sample presets. EcoSort returns a category estimate plus a step-by-step disposal routine."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-6 lg:col-span-3">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Upload className="size-5 text-primary" /> Upload an image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    inputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
                className={`relative grid min-h-[230px] cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                  dragging
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/60 hover:bg-accent/30"
                }`}
              >
                {imageUrl || preset ? (
                  <div className="w-full">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Uploaded waste item preview"
                        className="mx-auto max-h-64 rounded-xl object-contain"
                      />
                    ) : (
                      <div className="mx-auto grid size-32 place-items-center rounded-2xl bg-primary/10 text-6xl">
                        {preset?.emoji}
                      </div>
                    )}
                    <p className="mt-3 truncate text-sm text-muted-foreground">{imageName}</p>
                  </div>
                ) : (
                  <div>
                    <ImagePlus className="mx-auto size-10 text-primary" />
                    <p className="mt-3 font-medium">Drag & drop an image here</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      or click to browse — JPG, PNG or WEBP up to 6 MB
                    </p>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>

              {error && (
                <p className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
                  <AlertTriangle className="size-4 shrink-0" /> {error}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <Button onClick={classify} disabled={loading || (!imageUrl && !preset)} size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Analysing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Classify Waste
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={reset}
                  disabled={loading || (!imageUrl && !preset && !result)}
                >
                  <X className="size-4" /> Clear
                </Button>
              </div>

              {loading && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Running demo classification pipeline — matching visual features against the
                    sample category library…
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">No photo handy? Try a sample item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SAMPLE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => choosePreset(p)}
                    className={`glass-hover rounded-xl border p-4 text-left ${
                      preset?.id === p.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background/30"
                    }`}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <p className="mt-2 text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="glass border-lime/25">
            <CardContent className="flex gap-3 pt-6">
              <Info className="mt-0.5 size-5 shrink-0 text-lime" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Demo Mode — Sample Prediction</p>
                <p className="text-muted-foreground">
                  This prototype does not run a trained computer-vision model. Sample presets return
                  a fixed, human-written classification. Uploaded photos are matched by filename and
                  a deterministic rule, and are labelled <strong>Simulated</strong> — the image
                  itself is never analysed and never leaves your device.
                </p>
              </div>
            </CardContent>
          </Card>

          {!result && !loading && (
            <Card className="glass">
              <CardContent className="grid min-h-[260px] place-items-center py-10 text-center">
                <div>
                  <ScanLine className="mx-auto size-10 text-muted-foreground" />
                  <p className="mt-3 font-medium">No result yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick an image or a sample item, then hit Classify Waste.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {result && info && (
            <Card className="glass animate-in fade-in slide-in-from-bottom-2">
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-lime/20 text-lime hover:bg-lime/20">
                    {result.mode === "Demo" ? "Demo Mode — Sample Prediction" : "Simulated Result"}
                  </Badge>
                  <Badge variant="outline">{info.recyclable}</Badge>
                </div>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/15">
                    <ResultIcon className="size-6 text-primary" />
                  </span>
                  {result.category}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sample category breakdown
                  </p>
                  <div className="space-y-2">
                    {result.breakdown.map((b) => (
                      <div key={b.category}>
                        <div className="flex justify-between text-sm">
                          <span>{b.category}</span>
                          <span className="text-muted-foreground">
                            {Math.round(b.score * 100)}%
                          </span>
                        </div>
                        <Progress value={b.score * 100} className="mt-1 h-1.5" />
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    These percentages are illustrative sample values, not model confidence scores.
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step-by-step disposal
                  </p>
                  <ol className="space-y-2">
                    {result.steps.map((s, i) => (
                      <li key={s} className="flex gap-3 text-sm">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
                  <span
                    className="size-4 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: info.binSwatch }}
                  />
                  <span className="text-sm">
                    Recommended bin: <strong>{info.binColor}</strong>
                  </span>
                </div>

                {info.note && (
                  <p className="flex gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-foreground">
                    <AlertTriangle className="size-4 shrink-0 text-destructive" /> {info.note}
                  </p>
                )}

                <Disclaimer>
                  AI predictions are estimates. Check local waste management guidelines before
                  disposal.
                </Disclaimer>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={reset} variant="secondary">
                    <RefreshCw className="size-4" /> Scan Another Item
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/dashboard">
                      <Trash2 className="size-4" /> View history
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Saved to your scan history in this browser's local storage.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
