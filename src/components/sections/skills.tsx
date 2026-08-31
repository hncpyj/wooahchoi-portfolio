"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SKILLS, getSkill, type SkillCategory } from "@/data/taxonomy";
import {
  facetCounts,
  filterWork,
  refinedCounts,
  workIndex,
} from "@/lib/workIndex";
import { ArrowRight, Briefcase, FolderGit2, X } from "lucide-react";

const CATEGORY_ORDER: SkillCategory[] = [
  "NLP & Search",
  "ML/AI",
  "Data",
  "Languages",
  "Infrastructure",
  "Backend",
];

// One accent per category, used only for the selected state and the heading
// rule. Everything else stays neutral so 55 chips do not fight each other.
const accent: Record<SkillCategory, { text: string; rule: string; on: string }> = {
  "NLP & Search": { text: "text-violet-600 dark:text-violet-400", rule: "bg-violet-500", on: "bg-violet-600" },
  "ML/AI": { text: "text-cyan-600 dark:text-cyan-400", rule: "bg-cyan-500", on: "bg-cyan-600" },
  Data: { text: "text-amber-600 dark:text-amber-400", rule: "bg-amber-500", on: "bg-amber-600" },
  Languages: { text: "text-blue-600 dark:text-blue-400", rule: "bg-blue-500", on: "bg-blue-600" },
  Infrastructure: { text: "text-slate-600 dark:text-slate-400", rule: "bg-slate-500", on: "bg-slate-600" },
  Backend: { text: "text-emerald-600 dark:text-emerald-400", rule: "bg-emerald-500", on: "bg-emerald-600" },
};

/**
 * Chip order, fixed once at module load.
 *
 * Primary key is the strength of the evidence: skills backed by paid production
 * work come first, then personal projects, then coursework. Two and a half years
 * of shipping search systems for enterprise clients should not sit below a
 * weekend project just because more repos happen to mention it.
 *
 * Count is only the tiebreaker within a tier.
 *
 * Order is computed from the unfiltered counts and never recomputed. Sorting by
 * the live filtered counts made every chip jump position on each click, which
 * made the panel unreadable.
 */
const EVIDENCE_RANK: Record<string, number> = {
  experience: 0,
  project: 1,
  coursework: 2,
  none: 3,
};

const ORDERED_BY_CATEGORY = (() => {
  const base = facetCounts();
  const out = {} as Record<SkillCategory, typeof SKILLS>;
  for (const category of CATEGORY_ORDER) {
    out[category] = SKILLS.filter((s) => s.category === category).sort(
      (a, b) =>
        (EVIDENCE_RANK[a.evidence] ?? 9) - (EVIDENCE_RANK[b.evidence] ?? 9) ||
        (base[b.id] ?? 0) - (base[a.id] ?? 0)
    );
  }
  return out;
})();

export function Skills() {
  const [selected, setSelected] = useState<string[]>([]);

  const counts = useMemo(() => refinedCounts(selected), [selected]);
  const results = useMemo(
    () => (selected.length === 0 ? workIndex : filterWork(selected)),
    [selected]
  );

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id]));

  return (
    <section id="skills" className="border-t bg-muted/20 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            What I work with
          </span>
        </div>
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Select a skill to see the work behind it. Counts show how many
            projects and client deliveries match; add more to narrow.
          </p>
        </div>

        {/* Four-column grid. The two biggest groups take half the width each on
            the top row; the four smaller ones sit underneath. That gives the
            long chip lists room to breathe instead of wrapping into towers. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((category) => {
            const a = accent[category];
            const inCategory = ORDERED_BY_CATEGORY[category];
            const wide = category === "NLP & Search" || category === "ML/AI";
            return (
              <div
                key={category}
                className={wide ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("h-3.5 w-[3px] rounded-full", a.rule)} />
                  <h3
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.14em]",
                      a.text
                    )}
                  >
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {inCategory.map((skill) => {
                    const count = counts[skill.id] ?? 0;
                    const on = selected.includes(skill.id);
                    const dead = count === 0 && !on;
                    return (
                      <button
                        key={skill.id}
                        onClick={() => toggle(skill.id)}
                        disabled={dead}
                        title={skill.note ?? undefined}
                        className={cn(
                          // No borders anywhere. Fill and weight carry the state.
                          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[13px] transition-colors",
                          on
                            ? cn("font-medium text-white shadow-sm", a.on)
                            : dead
                              ? "cursor-not-allowed text-muted-foreground/35"
                              : "bg-background text-foreground/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-foreground hover:text-background"
                        )}
                      >
                        <span className="whitespace-nowrap">
                          {skill.label}
                          {skill.evidence === "coursework" && (
                            <span className="ml-1 align-super text-[9px] font-normal opacity-50">
                              course
                            </span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "tabular-nums text-[11px] font-semibold",
                            on
                              ? "text-white/70"
                              : dead
                                ? "text-muted-foreground/30"
                                : "text-muted-foreground group-hover:text-background"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback bar. Sticks to the bottom while filters are active so a
            click always produces a visible response, even 900px above the
            results. */}
        {selected.length > 0 && (
          <div className="sticky bottom-4 z-20 mx-auto mt-6 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full bg-foreground/95 px-4 py-2 text-background shadow-lg backdrop-blur">
            <span className="text-sm font-semibold tabular-nums">
              {results.length}
            </span>
            <span className="text-sm opacity-70">
              of {workIndex.length} match
            </span>
            <span className="mx-1 h-4 w-px bg-background/25" />
            {selected.map((id) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="inline-flex items-center gap-1 rounded-full bg-background/15 px-2 py-0.5 text-xs hover:bg-background/25"
              >
                {getSkill(id)?.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={() => setSelected([])}
              className="text-xs underline underline-offset-4 opacity-70 hover:opacity-100"
            >
              Reset
            </button>
          </div>
        )}

        {/* Results */}
        <div className="mt-14">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {selected.length === 0
              ? `All work · ${workIndex.length}`
              : `${results.length} result${results.length === 1 ? "" : "s"}`}
          </h3>

          {results.length === 0 ? (
            <p className="rounded-xl bg-background p-8 text-center text-muted-foreground shadow-sm">
              Nothing matches all of those together. Try removing one.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {results.map((doc) => {
                const isWork = doc.kind === "experience";
                const inner = (
                  <div
                    className={cn(
                      // Idea 5, kept: paid client work should not look identical
                      // to a side project.
                      "h-full rounded-lg border-l-[3px] bg-background p-4 shadow-sm transition-shadow hover:shadow-md",
                      isWork
                        ? "border-l-cyan-500 bg-cyan-50/40 dark:bg-cyan-500/[0.04]"
                        : "border-l-transparent"
                    )}
                  >
                    <div
                      className={cn(
                        "mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wide",
                        isWork
                          ? "font-semibold text-cyan-700 dark:text-cyan-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {isWork ? (
                        <Briefcase className="h-3 w-3" />
                      ) : (
                        <FolderGit2 className="h-3 w-3" />
                      )}
                      {isWork ? `${doc.context} · ${doc.period}` : "Project"}
                    </div>
                    <h4 className="font-semibold leading-snug">{doc.title}</h4>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1">
                      {doc.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[11px]",
                            selected.includes(t)
                              ? "bg-cyan-600 font-medium text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {getSkill(t)?.label ?? t}
                        </span>
                      ))}
                      {doc.tags.length > 5 && (
                        <span className="text-[11px] text-muted-foreground">
                          +{doc.tags.length - 5}
                        </span>
                      )}
                      {doc.href && (
                        <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                );
                return doc.href ? (
                  <Link key={doc.id} href={doc.href} className="block">
                    {inner}
                  </Link>
                ) : (
                  <div key={doc.id}>{inner}</div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
