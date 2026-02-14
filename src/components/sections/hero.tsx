"use client";

import type { ReactNode } from "react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download, BookOpen } from "lucide-react";

const HIGHLIGHT_COLORS = [
  "font-semibold text-blue-700 dark:text-blue-500",       // 0 진한 파란색
  "font-semibold text-violet-600 dark:text-violet-400",  // 1 보라색
  "font-semibold text-emerald-500 dark:text-emerald-400", // 2 밝은 초록색
  "font-semibold text-sky-600 dark:text-sky-400",        // 3 하늘색
] as const;

function introWithHighlights(text: string, phrases: string[] = []): ReactNode[] {
  type Seg = { text: string; colorIndex: number | null };
  let segs: Seg[] = [{ text, colorIndex: null }];
  let highlightIndex = 0;
  for (const phrase of phrases) {
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
  }
  return segs.map((seg, i) =>
    seg.colorIndex !== null ? (
      <span key={i} className={HIGHLIGHT_COLORS[seg.colorIndex]}>
        {seg.text}
      </span>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

export function Hero() {
  const introPhrases = "introHighlight" in personalInfo ? (personalInfo as { introHighlight?: string[] }).introHighlight : [];
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden"
    >
      {/* Figma-style: subtle radial gradient center-top */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] max-w-4xl h-[70vh] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(165,180,252,0.35) 0%, rgba(192,132,252,0.2) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #93b5e0 0%, #a78bfa 50%, #7c3aed 100%)",
              }}
            >
              {personalInfo.name}
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {personalInfo.title}
          </p>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {introWithHighlights(personalInfo.intro, Array.isArray(introPhrases) ? introPhrases : [])}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in [animation-delay:200ms] opacity-0">
          <Button
            asChild
            size="lg"
            className="rounded-xl border-0 shadow-lg shadow-violet-500/20 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-white px-6"
          >
            <a href="/api/cv" download="WooAh_Choi_Resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6"
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6"
          >
            <a href={`mailto:${personalInfo.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6"
          >
            <a
              href={personalInfo.blog}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Blog
            </a>
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
