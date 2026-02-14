import Parser from "rss-parser";

const FEED_URL = "https://backenddeveloper.tistory.com/rss";

const DATA_SCIENCE_MATCHERS = [
  "Data Science",
  "DataScience",
  "Data science",
  "데이터 과학",
  "Data Science ", // trailing space
];

function normalizeCategory(c: string): string {
  return c.trim().toLowerCase().replace(/\s+/g, " ");
}

function isDataScienceItem(item: {
  categories?: string[];
  link?: string;
  [key: string]: unknown;
}): boolean {
  const allCats: string[] = [];
  (item.categories || []).forEach((c) => allCats.push(...(Array.isArray(c) ? c : [String(c)])));
  const subject = item["dc:subject"] ?? item["subject"];
  if (subject != null) {
    allCats.push(...(Array.isArray(subject) ? subject : [String(subject)]));
  }
  const categoryAlt = item["categoryAlt"];
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
  const link = item.link || "";
  return link.includes("Data%20Science") || link.includes("Data+Science");
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const parser = new Parser({
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://github.com/hncpyj)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      timeout: 10000,
      customFields: {
        item: [["dc:subject", "dc:subject"], ["category", "categoryAlt"]],
      },
    });
    const feed = await parser.parseURL(FEED_URL);
    const filtered = (feed.items || []).filter(isDataScienceItem);

    return filtered.slice(0, 5).map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet?.slice(0, 150) + "..." || "",
      categories: item.categories || [],
    }));
  } catch {
    return [];
  }
}
