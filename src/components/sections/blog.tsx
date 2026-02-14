"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Calendar, Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/rss";

interface BlogSectionProps {
  posts: BlogPost[];
}

const postColors = [
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog({ posts: initialPosts }: BlogSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Client-side refresh from API
  useEffect(() => {
    if (initialPosts.length === 0) {
      setIsRefreshing(true);
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => {
          if (data.posts && data.posts.length > 0) {
            setPosts(data.posts);
          }
        })
        .catch(console.error)
        .finally(() => setIsRefreshing(false));
    }
  }, [initialPosts]);

  return (
    <section id="blog" className="py-24 px-4">
      <div
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto space-y-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            From my blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Latest Blog Posts
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full" />
          <p className="text-muted-foreground">
            Writing about backend development, system design, and engineering
            practices
          </p>
        </div>

        {isRefreshing ? (
          <div className="text-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 mx-auto text-orange-500 animate-spin" />
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card
                  className={cn(
                    "h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 shadow-md",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: isVisible
                      ? `${index * 100}ms`
                      : "0ms",
                  }}
                >
                  <div
                    className={cn(
                      "h-1.5 bg-gradient-to-r",
                      postColors[index % postColors.length]
                    )}
                  />
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      {formatDate(post.pubDate)}
                    </div>
                    <CardTitle className="text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.contentSnippet}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.slice(0, 3).map((cat) => (
                          <Badge
                            key={cat}
                            variant="secondary"
                            className="text-xs border-0 bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-muted-foreground">
              Blog posts are temporarily unavailable.
            </p>
          </div>
        )}

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-lg shadow-orange-500/25"
          >
            <a
              href="https://backenddeveloper.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View All Posts
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
