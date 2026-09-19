import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lightbulb, PartyPopper, RotateCcw, Trophy, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/site/PageHeader";
import { tipOfTheDay } from "@/lib/waste-data";
import { KEYS, newId, useStoredList, type QuizRecord } from "@/lib/storage";

export const Route = createFileRoute("/challenge")({
  head: () => ({
    meta: [
      { title: "Eco Challenge & Quiz — EcoSort AI" },
      {
        name: "description",
        content:
          "Five-question quiz on segregation, recycling symbols, composting and e-waste, with instant explanations and a local leaderboard.",
      },
      { property: "og:title", content: "Eco Challenge & Quiz — EcoSort AI" },
      {
        property: "og:description",
        content: "Test your waste knowledge and climb the local leaderboard.",
      },
    ],
  }),
  component: ChallengePage,
});

type Question = {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    q: "You finish a cup of tea. Where do the used tea leaves belong?",
    options: ["Dry recyclables bin", "Wet waste / compost bin", "Hazardous waste", "General waste"],
    answer: 1,
    explanation:
      "Tea leaves are organic matter. They compost quickly and, if binned dry-side, they wet and contaminate paper and cardboard.",
  },
  {
    q: "What does the recycling symbol ♳ (number 1, PET) usually indicate?",
    options: [
      "The item is compostable",
      "The plastic resin type used, commonly in drink bottles",
      "The item has already been recycled",
      "The item is hazardous",
    ],
    answer: 1,
    explanation:
      "The number inside the chasing-arrows triangle is a resin identification code. ♳ is PET — common in drink bottles and widely accepted by recyclers.",
  },
  {
    q: "Which of these should NOT go into a home compost bin?",
    options: ["Vegetable peels", "Dry leaves", "Plastic-lined tea bags", "Coffee grounds"],
    answer: 2,
    explanation:
      "Many tea bags contain polypropylene sealing plastic, which breaks into microplastics in compost. Tear them open and compost only the leaves.",
  },
  {
    q: "What is the correct way to dispose of an old mobile phone battery?",
    options: [
      "Burn it so nothing is left",
      "Put it in the general waste bin",
      "Tape the terminals and drop it at a certified e-waste centre",
      "Bury it in the garden",
    ],
    answer: 2,
    explanation:
      "Batteries are hazardous e-waste. Burning releases toxic fumes and burying leaches heavy metals. Tape the terminals and use an authorised collection point.",
  },
  {
    q: "A greasy pizza box is best handled how?",
    options: [
      "Recycle the whole box with paper",
      "Compost the greasy part, recycle the clean part",
      "Put it in the glass bin",
      "Throw it in with e-waste",
    ],
    answer: 1,
    explanation:
      "Oil ruins paper recycling. Tear off and compost the soiled base, and recycle the clean lid with your paper stream.",
  },
];

function ChallengePage() {
  const leaderboard = useStoredList<QuizRecord>(KEYS.quiz);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const question = QUESTIONS[index]!;
  const progress = ((index + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  const top = useMemo(
    () => [...leaderboard.items].sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt)).slice(0, 5),
    [leaderboard.items],
  );

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setSaved(false);
    setName("");
  };

  const saveScore = () => {
    const record: QuizRecord = {
      id: newId(),
      name: name.trim() || "Anonymous eco-warrior",
      score,
      total: QUESTIONS.length,
      createdAt: new Date().toISOString(),
    };
    leaderboard.add(record);
    setSaved(true);
  };

  return (
    <div>
      <PageHeader
        icon={Trophy}
        eyebrow="Learn by playing"
        title="Eco Challenge & Quiz"
        description="Five quick questions on segregation, recycling symbols, composting and hazardous waste — with an explanation after every answer."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <Card className="glass border-lime/25">
            <CardContent className="flex gap-3 pt-6">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-lime" />
              <div>
                <p className="text-sm font-semibold">Daily eco tip</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {tipOfTheDay()}
                </p>
              </div>
            </CardContent>
          </Card>

          {!done ? (
            <Card className="glass">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    Question {index + 1} of {QUESTIONS.length}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Score: {score}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <CardTitle className="pt-2 text-xl leading-snug">{question.q}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((opt, i) => {
                  const isAnswer = i === question.answer;
                  const isPicked = selected === i;
                  const state =
                    selected === null
                      ? "border-border bg-background/30 hover:border-primary/60 hover:bg-accent/40"
                      : isAnswer
                        ? "border-primary bg-primary/15"
                        : isPicked
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-background/20 opacity-60";
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pick(i)}
                      disabled={selected !== null}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${state}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && isAnswer && <Check className="size-4 text-primary" />}
                      {selected !== null && isPicked && !isAnswer && (
                        <X className="size-4 text-destructive" />
                      )}
                    </button>
                  );
                })}

                {selected !== null && (
                  <div className="animate-in fade-in space-y-4 rounded-xl border border-border bg-background/40 p-4">
                    <p className="text-sm font-semibold">
                      {selected === question.answer ? "Correct!" : "Not quite."}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {question.explanation}
                    </p>
                    <Button onClick={next}>
                      {index + 1 >= QUESTIONS.length ? "See my score" : "Next question"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass animate-in fade-in zoom-in-95">
              <CardContent className="space-y-5 py-10 text-center">
                <PartyPopper className="mx-auto size-12 text-lime" />
                <h2 className="text-3xl font-bold">
                  {score}/{QUESTIONS.length}
                </h2>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                  {score === QUESTIONS.length
                    ? "Perfect score — you could run a segregation workshop on campus."
                    : score >= 3
                      ? "Solid work. Revisit the disposal guide to lock in the rest."
                      : "Good start. The disposal guide covers every question you missed."}
                </p>

                {!saved ? (
                  <div className="mx-auto flex max-w-sm flex-col gap-3">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name for the local leaderboard"
                      maxLength={28}
                    />
                    <Button onClick={saveScore}>Save my score</Button>
                  </div>
                ) : (
                  <p className="text-sm text-primary">Score saved to your local leaderboard.</p>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="secondary" onClick={restart}>
                    <RotateCcw className="size-4" /> Try again
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/guide">Study the guide</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="glass sticky top-24">
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="size-5 text-lime" /> Local leaderboard
              </CardTitle>
              {leaderboard.items.length > 0 && (
                <Button variant="ghost" size="sm" onClick={leaderboard.clear}>
                  Clear
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {top.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No scores yet — finish the quiz to claim the top spot.
                </p>
              ) : (
                <ol className="space-y-2">
                  {top.map((entry, i) => (
                    <li
                      key={entry.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/30 px-3 py-2.5"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        {entry.score}/{entry.total}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Leaderboard entries are saved only in this browser.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
