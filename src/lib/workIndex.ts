import { projects, experiences } from "@/data/portfolio";
import { EXTRA_TAGS, expandSkill, resolveSkill, SKILLS } from "@/data/taxonomy";

export type WorkDoc = {
  id: string;
  kind: "project" | "experience";
  title: string;
  /** Employer or context line, e.g. "Konan Technology". */
  context?: string;
  description: string;
  /** Canonical skill ids. */
  tags: string[];
  href?: string;
  period?: string;
};

/** Raw tags plus the curated extras, resolved to canonical ids, deduped. */
function tagsFor(key: string, raw: string[]): string[] {
  const out = new Set<string>();
  for (const t of raw) {
    const id = resolveSkill(t);
    if (id) out.add(id);
  }
  for (const id of EXTRA_TAGS[key] ?? []) out.add(id);
  return Array.from(out);
}

/**
 * One index over everything: personal projects and paid client work.
 * Experience matters here — the Konan deliveries are the strongest evidence
 * for the search and NLP skills, and they are not "projects" on this site.
 *
 * Paid client work is listed first, for the same reason the chips are sorted
 * by evidence: shipped production work outranks a side project, and the
 * results list is read top-down.
 */
export const workIndex: WorkDoc[] = [
  ...experiences.flatMap((exp) =>
    (exp.projects ?? []).map((sub): WorkDoc => ({
      id: sub.name,
      kind: "experience",
      title: sub.name,
      context: exp.company,
      period: exp.period,
      description: sub.description,
      tags: tagsFor(sub.name, sub.tech ?? []),
      // Client deliveries only have a detail page if they were given a slug.
      href: "slug" in sub ? `/projects/${sub.slug}` : undefined,
    }))
  ),
  ...projects.map((p): WorkDoc => ({
    id: p.slug,
    kind: "project",
    title: p.title,
    description: p.description,
    tags: tagsFor(p.slug, p.tech),
    href: `/projects/${p.slug}`,
  })),
];

/** How many documents each facet would return, honouring parent/child. */
export function facetCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const skill of SKILLS) {
    const family = expandSkill(skill.id);
    counts[skill.id] = workIndex.filter((doc) =>
      family.some((id) => doc.tags.includes(id))
    ).length;
  }
  return counts;
}

/**
 * Documents matching every selected facet (AND). Narrowing rather than
 * widening is what people expect when they add a second filter.
 */
export function filterWork(selected: string[]): WorkDoc[] {
  if (selected.length === 0) return [];
  return workIndex.filter((doc) =>
    selected.every((sel) =>
      expandSkill(sel).some((id) => doc.tags.includes(id))
    )
  );
}

/**
 * Counts if one more facet were added to the current selection — so a chip can
 * show what it would leave, and dead ends can be disabled before they are
 * clicked.
 */
export function refinedCounts(selected: string[]): Record<string, number> {
  const base = selected.length ? filterWork(selected) : workIndex;
  const counts: Record<string, number> = {};
  for (const skill of SKILLS) {
    const family = expandSkill(skill.id);
    counts[skill.id] = base.filter((doc) =>
      family.some((id) => doc.tags.includes(id))
    ).length;
  }
  return counts;
}
