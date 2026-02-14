"use client";

import { projects } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github, Rocket } from "lucide-react";

const cardAccents = [
  {
    gradient: "from-violet-500 via-purple-500 to-blue-500",
    iconBg: "bg-violet-100 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    badgeBg:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    statusBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    statusBgAlt:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    iconBg: "bg-blue-100 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBg:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    statusBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    statusBgAlt:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    statusBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    statusBgAlt:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
];

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/50 via-transparent to-violet-50/50 dark:from-sky-950/20 dark:via-transparent dark:to-violet-950/20" />

      <div
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            My work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const accent = cardAccents[index % cardAccents.length];
            return (
              <Card
                key={project.title}
                className={cn(
                  "group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden border-0 shadow-md",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                {/* Gradient top bar */}
                <div
                  className={cn(
                    "h-1.5 bg-gradient-to-r",
                    accent.gradient
                  )}
                />
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center",
                        accent.iconBg
                      )}
                    >
                      <Rocket className={cn("h-5 w-5", accent.iconColor)} />
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs border-0",
                        project.status === "Active"
                          ? accent.statusBg
                          : accent.statusBgAlt
                      )}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className={cn("text-xs border-0", accent.badgeBg)}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {project.github && (
                      <Button asChild variant="ghost" size="sm">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {"link" in project && typeof project.link === "string" ? (
                      <Button asChild variant="ghost" size="sm">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
