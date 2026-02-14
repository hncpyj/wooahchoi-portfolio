"use client";

import { experiences } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/50 via-transparent to-sky-50/50 dark:from-violet-950/20 dark:via-transparent dark:to-sky-950/20" />

      <div
        ref={ref}
        className={cn(
          "max-w-4xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Career journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </div>

        {experiences.map((exp) => (
          <div key={exp.company} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center mt-1 shadow-lg shadow-violet-500/20">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{exp.company}</h3>
                <p className="text-violet-600 dark:text-violet-400 font-medium">
                  {exp.role}
                </p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-muted-foreground mt-2">{exp.description}</p>
              </div>
            </div>

            <div className="ml-7 border-l-2 border-gradient-violet pl-10 space-y-8 border-violet-300 dark:border-violet-700">
              {exp.projects.map((project, index) => (
                <div
                  key={project.name}
                  className={cn(
                    "relative space-y-3 p-5 rounded-xl bg-card border border-border/50 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-500/30 transition-all duration-500",
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  )}
                  style={{
                    transitionDelay: isVisible
                      ? `${(index + 1) * 150}ms`
                      : "0ms",
                  }}
                >
                  <div className="absolute -left-[2.85rem] top-5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 ring-4 ring-background" />
                  <h4 className="font-semibold text-lg">{project.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-xs bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300 border-0"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
