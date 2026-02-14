"use client";

import { personalInfo } from "@/data/portfolio";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Code2, Server, Cloud, Database } from "lucide-react";

const highlights = [
  {
    icon: Server,
    title: "Backend Architecture",
    description:
      "Designing scalable APIs and microservices with Spring and NestJS",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Optimizing database performance with PostgreSQL, Redis, and TypeORM",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Deploying and managing infrastructure on AWS with Docker and CI/CD",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    icon: Code2,
    title: "API Design",
    description:
      "Building RESTful and GraphQL APIs with authentication and authorization",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-500/20",
  },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-4">
      <div
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Get to know me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-blue-600 mx-auto rounded-full" />
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed">
          {personalInfo.about}
        </p>

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
