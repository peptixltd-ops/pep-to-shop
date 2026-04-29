import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/data/products";

export const Route = createFileRoute("/routine")({
  head: () => ({
    meta: [
      { title: "Routine Builder — Pondok" },
      { name: "description", content: "Answer 3 questions and we'll suggest a tailored Pondok supplement routine." },
      { property: "og:title", content: "Routine Builder — Pondok" },
      { property: "og:description", content: "Build a tailored supplement routine in 3 steps." },
    ],
  }),
  component: RoutinePage,
});

const goals = ["Recovery", "Performance", "Sleep", "Daily"] as const;

function RoutinePage() {
  const [goal, setGoal] = useState<typeof goals[number] | null>(null);
  const [training, setTraining] = useState<string | null>(null);
  const [sleep, setSleep] = useState<string | null>(null);

  const recs = goal ? products.filter(p => p.category === goal).slice(0, 3) : [];

  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Routine Builder</p>
        <h1 className="font-display text-5xl text-ink">Build Your <span className="text-primary italic">Stack</span></h1>
        <p className="mt-4 text-muted-foreground">Three quick questions. We'll suggest a routine tailored to your priorities.</p>
      </div>

      <div className="space-y-10">
        <div>
          <p className="text-sm uppercase tracking-wider text-ink mb-4">1. What's your main priority?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {goals.map(g => (
              <button key={g} onClick={() => setGoal(g)} className={`p-5 border text-sm uppercase tracking-wider transition ${goal === g ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>{g}</button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-ink mb-4">2. How often do you train?</p>
          <div className="grid grid-cols-3 gap-3">
            {["1–2x", "3–4x", "5+"].map(t => (
              <button key={t} onClick={() => setTraining(t)} className={`p-5 border text-sm transition ${training === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>{t} per week</button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-ink mb-4">3. How's your sleep?</p>
          <div className="grid grid-cols-3 gap-3">
            {["Great", "Inconsistent", "Poor"].map(t => (
              <button key={t} onClick={() => setSleep(t)} className={`p-5 border text-sm transition ${sleep === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {goal && training && sleep && (
        <div className="mt-16 bg-mist p-8 border border-border">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Your suggested routine</p>
          <h2 className="font-display text-2xl text-ink mb-6">A {goal.toLowerCase()}-focused stack</h2>
          <ul className="divide-y divide-border">
            {recs.map(p => (
              <li key={p.slug} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <p className="font-medium">£{p.price}</p>
              </li>
            ))}
          </ul>
          <Link to="/shop" className="mt-6 inline-flex bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider hover:bg-primary/90">Shop these products</Link>
          <p className="mt-4 text-xs text-muted-foreground">Suggestions are general lifestyle recommendations. Speak to a qualified healthcare professional before starting any new supplement routine.</p>
        </div>
      )}
    </div>
  );
}
