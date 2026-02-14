"use client";

import type { ReactNode } from "react";
import { personalInfo } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Highlight order: 진한 파란색 → 보라색 → 밝은 초록색 → 하늘색 */
const HIGHLIGHT_COLORS = [
  "font-semibold text-blue-700 dark:text-blue-500",        // 0 진한 파란색
  "font-semibold text-violet-600 dark:text-violet-400",   // 1 보라색
  "font-semibold text-emerald-500 dark:text-emerald-400", // 2 밝은 초록색
  "font-semibold text-sky-600 dark:text-sky-400",         // 3 하늘색
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

export function About() {
  const { ref, isVisible } = useScrollAnimation();
  const blue = "aboutHighlightBlue" in personalInfo ? (personalInfo as { aboutHighlightBlue?: string[] }).aboutHighlightBlue : [];
  const green = "aboutHighlightGreen" in personalInfo ? (personalInfo as { aboutHighlightGreen?: string[] }).aboutHighlightGreen : [];
  const paragraphs = personalInfo.about.split(/\n\n+/);

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Figma-style: subtle gradient on the right */}
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
          "max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-left mb-8">
          About Me
        </h2>

        <div className="space-y-6 text-left">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {paragraphWithHighlights(
                para,
                Array.isArray(blue) ? blue : [],
                Array.isArray(green) ? green : []
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
