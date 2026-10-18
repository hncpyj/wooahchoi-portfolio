import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | WooAh Choi",
  description: "Writing about machine learning, AI safety, evaluation, and production ML systems.",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Writing
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Notes on machine learning, AI evaluation, and production systems. Korean posts are the original source — English translations follow.
          </p>
          <a
            href="https://backenddeveloper.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 hover:underline"
          >
            Korean Blog (Tistory) →
          </a>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={`${post.lang}-${post.slug}`} className="group border-b pb-8 last:border-0">
                <Link href={post.lang === "en" ? `/blog/en/${post.slug}` : `/blog/${post.slug}`} className="block space-y-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.category && (
                      <>
                        <span>·</span>
                        <span>{post.subcategory || post.category}</span>
                      </>
                    )}
                    {post.lang === "ko" ? (
                      <>
                        <span>·</span>
                        <span className="text-xs bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded">
                          KO
                        </span>
                      </>
                    ) : (
                      <>
                        <span>·</span>
                        <span className="text-xs bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded">
                          EN
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
