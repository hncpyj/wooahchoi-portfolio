import { NextResponse } from "next/server";
import Parser from "rss-parser";

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
    });
    const feed = await parser.parseURL(
      "https://backenddeveloper.tistory.com/rss"
    );

    const posts = feed.items.slice(0, 5).map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet?.slice(0, 150) + "..." || "",
      categories: item.categories || [],
    }));

    return NextResponse.json(
      { posts, total: feed.items.length, feedTitle: feed.title },
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
