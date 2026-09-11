"use client";

import type { ReactNode } from "react";
import { personalInfo } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Brain, Search, Microscope, Server } from "lucide-react";

/** Highlight order: 진한 파란색 → 보라색 → 밝은 초록색 → 하늘색 */
const HIGHLIGHT_COLORS = [
  "font-semibold text-blue-700 dark:text-blue-500",
  "font-semibold text-violet-600 dark:text-violet-400",
  "font-semibold text-emerald-500 dark:text-emerald-400",
  "font-semibold text-sky-600 dark:text-sky-400",
] as const;

function paragraphWithHighlights(
  text: string,
  blue: string[] = [],
  green: string[] = []
): ReactNode[] {
  type Seg = { text: string; colorIndex: number | null };
  let segs: Seg[] = [{ text, colorIndex: null }];
  let highlightIndex = 0;

  const splitByPhrase = (phrase: string) => {
    const next: Seg[] = [];
    for (const s of segs) {
      if (s.colorIndex !== null) {
        next.push(s);
        continue;
      }
      const tokens = s.text.split(phrase);
      if (tokens.length === 1) {
        next.push(s);
        continue;
      }
      tokens.forEach((t, i) => {
        if (t) next.push({ text: t, colorIndex: null });
        if (i < tokens.length - 1) {
          next.push({ text: phrase, colorIndex: highlightIndex % 4 });
          highlightIndex += 1;
        }
      });
    }
    segs = next;
  };

  blue.forEach((p) => splitByPhrase(p));
  green.forEach((p) => splitByPhrase(p));

  return segs.map((part, i) =>
    part.colorIndex !== null ? (
      <span key={i} className={HIGHLIGHT_COLORS[part.colorIndex]}>
        {part.text}
      </span>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

/**
 * These four are the site's positioning statement, so they are ordered by what
 * the work actually evidences: ML first, then the search depth underneath it,
 * then the evaluation angle that is genuinely rare, then production.
 *
 * The production card stays. Backend is not a dilution of an ML profile — it is
 * what lets a model reach users, and 8/21 screened postings ask for Docker/CI-CD,
 * 6/21 for cloud, 5/21 for SQL. What was removed is the *web-app* framing that
 * used to be here (NestJS, GraphQL, TypeORM, auth), which appeared in 0/21 and
 * described a different job to the one the rest of this site evidences.
 */
const highlights = [
  {
    icon: Brain,
    title: "Machine Learning",
    description:
      "PyTorch, transformers and reinforcement learning — from fine-tuning BERT for production NER to training a causal Transformer policy with PPO",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
  {
    icon: Search,
    title: "Search & Retrieval",
    description:
      "Indexing at 100M+ scale, ranking and scoring logic, query understanding and expansion — the retrieval layer the current wave of AI is built on",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "border-blue-200 dark:border-blue-500/20",
  },
  {
    icon: Microscope,
    title: "Evaluation & Interpretability",
    description:
      "Worst-case metrics, causal ablations and failure typologies — telling apart systems that work from systems that only score well",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-200 dark:border-amber-500/20",
  },
  {
    icon: Server,
    title: "Production Engineering",
    description:
      "Java, Spring and Python services, data pipelines, Oracle and PostgreSQL at scale, Docker and CI/CD on AWS — models are worth what they are worth in production",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-500/20",
  },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();
  const blue = "aboutHighlightBlue" in personalInfo ? (personalInfo as { aboutHighlightBlue?: string[] }).aboutHighlightBlue : [];
  const green = "aboutHighlightGreen" in personalInfo ? (personalInfo as { aboutHighlightGreen?: string[] }).aboutHighlightGreen : [];
  const paragraphs = personalInfo.about.split(/\n\n+/);

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 max-w-2xl h-full -z-10 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, rgba(192,132,252,0.12) 0%, rgba(236,72,153,0.08) 50%, transparent 100%)",
        }}
      />
      <div
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-left max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Get to know me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-lg text-muted-foreground leading-relaxed text-left"
            >
              {paragraphWithHighlights(
                para,
                Array.isArray(blue) ? blue : [],
                Array.isArray(green) ? green : []
              )}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className={cn(
                "group p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                item.bg,
                item.borderColor
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br",
                  item.color
                )}
              >
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
