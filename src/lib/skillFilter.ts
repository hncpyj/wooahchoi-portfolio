/**
 * Selecting a skill from a project badge is client state, not a route change.
 * Linking to /?skill=... made Next re-navigate the same route and wait on an
 * RSC payload before anything moved, so the badge felt slow. These helpers
 * update the URL in place and tell the skills section directly.
 */
export const SKILL_EVENT = "portfolio:select-skill";

export function selectSkill(id: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("skill", id);
  url.hash = "skills";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new CustomEvent<string>(SKILL_EVENT, { detail: id }));
  document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
}
