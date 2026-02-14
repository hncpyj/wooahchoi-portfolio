"use client";

import { skills } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Layers,
  Database,
  Cloud,
  Globe,
  Wrench,
} from "lucide-react";

const skillCategories = [
  {
    key: "languages" as const,
    label: "Languages",
    icon: Code2,
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    badgeBg:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-500/25",
    border: "border-violet-200 dark:border-violet-500/20",
  },
  {
    key: "frameworks" as const,
    label: "Frameworks",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    badgeBg:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-500/25",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  {
    key: "databases" as const,
    label: "Databases",
    icon: Database,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    badgeBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-500/25",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    key: "cloud" as const,
    label: "Cloud & DevOps",
    icon: Cloud,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    badgeBg:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-500/25",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  {
    key: "api" as const,
    label: "API & Auth",
    icon: Globe,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    badgeBg:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-500/25",
    border: "border-rose-200 dark:border-rose-500/20",
  },
  {
    key: "tools" as const,
    label: "Tools",
    icon: Wrench,
    gradient: "from-sky-500 to-indigo-600",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    badgeBg:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-500/25",
    border: "border-sky-200 dark:border-sky-500/20",
  },
];

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 px-4">
      <div
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Tech stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.key}
              className={cn(
                "p-6 rounded-xl border hover:shadow-lg transition-all duration-500 hover:-translate-y-1",
                category.bg,
                category.border,
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br",
                    category.gradient
                  )}
                >
                  <category.icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold">{category.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills[category.key].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className={cn(
                      "cursor-default transition-colors border-0",
                      category.badgeBg
                    )}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
