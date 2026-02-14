import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { getBlogPosts } from "@/lib/rss";

export const revalidate = 3600;

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Blog posts={blogPosts} />
    </>
  );
}
