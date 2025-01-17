// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

// remark/rehype plugins
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";

import Container from "@/app/ui/Container";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import NavBar from "@/app/ui/Navbar";

import { getPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

interface BlogParams {
  params: {
    slug: string;
  };
}

interface Frontmatter {
  title: string;
}

export default async function Blog({ params }: BlogParams) {
  const { slug } = await params;

  const posts = await getPosts();

  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const { content: compiledContent } = await compileMDX<Frontmatter>({
    source: post.content,
    options: {
      // 'parseFrontmatter: true' is optional
      // (you already have frontmatter from getPosts)

      mdxOptions: {
        // crucial to parse # Headings => <h1>, etc.
        remarkPlugins: [remarkParse, remarkGfm, remarkRehype],
        rehypePlugins: [],
      },
    },
    components: {
      Header,
      Footer,
      NavBar,
    },
  });

  // 5) Render your UI
  return (
    <>
      <div className={cn("max-w-[80rem] px-6 md:px-12 mx-auto")}>
        <h1 className="mb-2 text-4xl font-bold">{post.frontmatter.title}</h1>
        <h2 className="mb-2 text-lg font-bold">
          {post.frontmatter.description}
        </h2>
        <h2 className="text-sm font-bold">Reading time: {post.readingTime}</h2>
        <h2 className="text-sm font-bold">
          Tags: {post.frontmatter.tags?.join(", ")}
        </h2>
      </div>

      <Container className="mt-10">{compiledContent}</Container>
    </>
  );
}
