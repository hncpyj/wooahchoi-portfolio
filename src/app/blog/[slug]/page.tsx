import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import LangSwitch from "@/components/LangSwitch";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const koPosts = getAllPosts("ko");
  const enPosts = getAllPosts("en");
  return [...koPosts, ...enPosts].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug, "ko") ?? getPostBySlug(params.slug, "en");
  if (!post) return {};
  return {
    title: `${post.title} | WooAh Choi`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, "ko") ?? getPostBySlug(params.slug, "en");
  if (!post) notFound();

  const enPost = getPostBySlug(params.slug, "en");

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Blog
          </Link>
          {enPost && (
            <LangSwitch
              current="ko"
              koHref={`/blog/${params.slug}`}
              enHref={`/blog/en/${params.slug}`}
            />
          )}
        </div>

        <header className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.category && (
              <>
                <span>·</span>
                <span>{post.subcategory || post.category}</span>
              </>
            )}
            {post.lang === "ko" && (
              <>
                <span>·</span>
                <span className="text-xs bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded">
                  Korean source
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {post.title}
          </h1>
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
            >
              Original on Tistory →
            </a>
          )}
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-lg prose-img:shadow-md prose-pre:bg-neutral-900 prose-code:text-violet-600 dark:prose-code:text-violet-400">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
