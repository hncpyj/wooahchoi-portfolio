import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_KO_DIR = path.join(process.cwd(), "content/blog-ko");
const BLOG_EN_DIR = path.join(process.cwd(), "content/blog-en");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  source_url: string;
  original_slug: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  lang: "ko" | "en";
  migration_status: string;
  asset_path?: string;
  excerpt?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function readPostsFromDir(dir: string, lang: "ko" | "en"): BlogPostMeta[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => {
    const slug = filename.replace(/(?:\.[a-z]{2})?\.mdx$/, "");
    const fullPath = path.join(dir, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const excerpt = content
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/#+\s/g, "")
      .trim()
      .slice(0, 160);
    return {
      slug,
      lang,
      title: data.title || slug,
      date: data.date || "",
      source_url: data.source_url || "",
      original_slug: data.original_slug || "",
      category: data.category || "",
      subcategory: data.subcategory,
      tags: data.tags || [],
      migration_status: data.migration_status || "unknown",
      asset_path: data.asset_path,
      excerpt,
    };
  });
}

export function getAllPosts(lang?: "ko" | "en"): BlogPostMeta[] {
  const koPosts = lang !== "en" ? readPostsFromDir(BLOG_KO_DIR, "ko") : [];
  const enPosts = lang !== "ko" ? readPostsFromDir(BLOG_EN_DIR, "en") : [];
  const all = [...koPosts, ...enPosts];
  return all.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(
  slug: string,
  lang: "ko" | "en" = "ko"
): BlogPost | null {
  const dir = lang === "ko" ? BLOG_KO_DIR : BLOG_EN_DIR;
  const candidates =
    lang === "en"
      ? [`${slug}.en.mdx`, `${slug}.mdx`]
      : [`${slug}.mdx`];
  const fullPath = candidates
    .map((c) => path.join(dir, c))
    .find((p) => fs.existsSync(p));
  if (!fullPath) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    lang,
    title: data.title || slug,
    date: data.date || "",
    source_url: data.source_url || "",
    original_slug: data.original_slug || "",
    category: data.category || "",
    subcategory: data.subcategory,
    tags: data.tags || [],
    migration_status: data.migration_status || "unknown",
    asset_path: data.asset_path,
    content,
  };
}
