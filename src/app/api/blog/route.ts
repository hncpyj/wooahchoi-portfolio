import { NextResponse } from "next/server";
import Parser from "rss-parser";

const FEED_URL = "https://backenddeveloper.tistory.com/rss";

const DATA_SCIENCE_MATCHERS = [
  "Data Science",
  "DataScience",
  "Data science",
  "데이터 과학",
  "Data Science ",
];

function normalizeCategory(c: string): string {
  return c.trim().toLowerCase().replace(/\s+/g, " ");
}

function isDataScienceItem(item: unknown): boolean {
  const i = item as { categories?: string[]; link?: string; [key: string]: unknown };
  const allCats: string[] = [];
  (i.categories || []).forEach((c) => allCats.push(...(Array.isArray(c) ? c : [String(c)])));
  const subject = i["dc:subject"] ?? i["subject"];
  if (subject != null) {
    allCats.push(...(Array.isArray(subject) ? subject : [String(subject)]));
  }
  const categoryAlt = i["categoryAlt"];
  if (categoryAlt != null) {
    allCats.push(...(Array.isArray(categoryAlt) ? categoryAlt : [String(categoryAlt)]));
  }
  const normalizedTargets = DATA_SCIENCE_MATCHERS.map((m) => normalizeCategory(m));
  if (allCats.length > 0) {
    const match = allCats.some((c) => {
      const n = normalizeCategory(String(c));
      return normalizedTargets.some((t) => n === t) || (n.includes("data") && n.includes("science"));
    });
    if (match) return true;
  }
  const link = i.link || "";
  return link.includes("Data%20Science") || link.includes("Data+Science");
}

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const parser = new Parser({
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://github.com/hncpyj)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      timeout: 10000,
      customFields: {
        item: [
          ["dc:subject", "dc:subject"],
          ["category", "categoryAlt"],
        ],
      },
    });
    const feed = await parser.parseURL(FEED_URL);
    const filtered = (feed.items || []).filter(isDataScienceItem);

    const posts = filtered.slice(0, 5).map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet?.slice(0, 150) + "..." || "",
      categories: item.categories || [],
    }));

    return NextResponse.json(
      { posts, total: filtered.length, feedTitle: feed.title },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("RSS fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts", posts: [] },
      { status: 500 }
    );
  }
}
