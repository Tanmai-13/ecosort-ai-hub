import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ClipboardList, MapPin, Megaphone, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Disclaimer, PageHeader } from "@/components/site/PageHeader";
import { KEYS, newId, useStoredList, type ReportRecord } from "@/lib/storage";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Community Waste Reporting — EcoSort AI" },
      {
        name: "description",
        content:
          "Log campus or neighbourhood waste issues — overflowing bins, littering, mixed waste — and track their demo status.",
      },
      { property: "og:title", content: "Community Waste Reporting — EcoSort AI" },
      {
        property: "og:description",
        content: "Report and track local waste issues in this prototype demo log.",
      },
    ],
  }),
  component: ReportPage,
});

const ISSUE_TYPES = ["Overflowing Bin", "Littering", "Mixed Waste", "Broken Infrastructure"];
const PRESET_IMAGES = ["🗑️ Overflowing bin", "🧃 Scattered litter", "♻️ Mixed bin", "🧱 Broken bin"];
const STATUSES: ReportRecord["status"][] = ["Reported", "Under Review", "Resolved"];

const STATUS_STYLES: Record<ReportRecord["status"], string> = {
  Reported: "bg-lime/15 text-lime hover:bg-lime/15",
  "Under Review": "bg-primary/15 text-primary hover:bg-primary/15",
  Resolved: "bg-emerald/20 text-emerald hover:bg-emerald/20",
};

type Errors = Partial<Record<"issueType" | "location" | "description" | "reporter", string>>;

function ReportPage() {
  const store = useStoredList<ReportRecord>(KEYS.reports);
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reporter, setReporter] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [image, setImage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!issueType) e.issueType = "Please choose an issue type.";
    if (location.trim().length < 3) e.location = "Enter a location with at least 3 characters.";
    if (description.trim().length < 15)
      e.description = "Please describe the issue in at least 15 characters.";
    if (!anonymous && reporter.trim().length < 2)
      e.reporter = "Enter your name, or switch on anonymous reporting.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const record: ReportRecord = {
      id: newId(),
      issueType,
      location: location.trim(),
      description: description.trim(),
      reporter: anonymous ? "Anonymous" : reporter.trim(),
      anonymous,
      ...(image ? { image } : {}),
      status: "Reported",
      createdAt: new Date().toISOString(),
    };
    store.add(record);
    setConfirmation(`Report logged for “${record.location}”. Reference: ${record.id}`);
    setIssueType("");
    setLocation("");
    setDescription("");
    setReporter("");
    setAnonymous(false);
    setImage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const cycleStatus = (id: string) => {
    store.replace(
      store.items.map((r) =>
        r.id === id
          ? { ...r, status: STATUSES[(STATUSES.indexOf(r.status) + 1) % STATUSES.length]! }
          : r,
      ),
    );
  };

  return (
    <div>
      <PageHeader
        icon={Megaphone}
        eyebrow="Community module"
        title="Community Waste Reporting"
        description="Spotted an overflowing bin or a littered corridor? Log it here and follow its status through the prototype tracker."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
        <Card className="glass lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Report an issue</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="issue">Issue type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger id="issue" className="w-full">
                    <SelectValue placeholder="Select the kind of problem" />
                  </SelectTrigger>
                  <SelectContent>
                    {ISSUE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.issueType} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / campus area</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Block C canteen, near the water cooler"
                />
                <FieldError message={errors.location} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What did you see? How long has it been like this? Any safety concern?"
                />
                <FieldError message={errors.description} />
              </div>

              <div className="space-y-2">
                <Label>Photo (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setImage(p)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        image === p
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-background/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="text-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImage(`📷 ${file.name}`);
                    }}
                  />
                  {image && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setImage("")}>
                      <X className="size-4" /> Remove
                    </Button>
                  )}
                </div>
                {image && <p className="text-xs text-muted-foreground">Attached: {image}</p>}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-background/30 px-4 py-3">
                <div>
                  <Label htmlFor="anon" className="text-sm">
                    Report anonymously
                  </Label>
                  <p className="text-xs text-muted-foreground">Your name won't be stored.</p>
                </div>
                <Switch id="anon" checked={anonymous} onCheckedChange={setAnonymous} />
              </div>

              {!anonymous && (
                <div className="space-y-2">
                  <Label htmlFor="reporter">Your name</Label>
                  <Input
                    id="reporter"
                    value={reporter}
                    onChange={(e) => setReporter(e.target.value)}
                    placeholder="Full name"
                  />
                  <FieldError message={errors.reporter} />
                </div>
              )}

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Submit report
              </Button>

              {confirmation && (
                <p className="flex items-start gap-2 rounded-xl border border-primary/40 bg-primary/10 p-3 text-sm animate-in fade-in">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {confirmation}
                </p>
              )}

              <Disclaimer>
                Reports submitted in this prototype are demonstration logs stored in your browser.
                They are not sent to municipal authorities, campus facilities or any third party.
              </Disclaimer>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="size-5 text-primary" /> Report tracker
              </CardTitle>
              {store.items.length > 0 && (
                <Button variant="outline" size="sm" onClick={store.clear}>
                  <Trash2 className="size-4" /> Clear
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {store.items.length === 0 ? (
                <div className="grid place-items-center py-14 text-center">
                  <div>
                    <AlertTriangle className="mx-auto size-9 text-muted-foreground" />
                    <p className="mt-3 font-medium">No reports logged yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Submit the form and your entry will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                store.items.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-background/30 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{r.issueType}</p>
                      <Badge className={STATUS_STYLES[r.status]}>{r.status}</Badge>
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" /> {r.location}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {r.description}
                    </p>
                    {r.image && <p className="mt-2 text-xs text-muted-foreground">{r.image}</p>}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>
                        {r.reporter} · {new Date(r.createdAt).toLocaleString()}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => cycleStatus(r.id)}>
                        Advance status
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-destructive">
      <AlertTriangle className="size-3.5" /> {message}
    </p>
  );
}
