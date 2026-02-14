import Parser from "rss-parser";

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
    });
    const feed = await parser.parseURL(
      "https://backenddeveloper.tistory.com/rss"
    );

    return feed.items.slice(0, 5).map((item) => ({
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
