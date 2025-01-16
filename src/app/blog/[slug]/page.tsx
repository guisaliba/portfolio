import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import NavBar from "@/app/ui/Navbar";
import Header from "@/app/ui/Header";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <article>
        {/* <h1>{post.frontmatter?.title ?? post.slug}</h1> */}
        <MDXRemote
          source={post.content} // RAW MDX
          options={
            {
              // e.g. remark/rehype plugins
              // remarkPlugins: [require("remark-gfm")],
              // rehypePlugins: [require("rehype-slug")],
            }
          }
          components={{
            // e.g. custom React components
            // that appear in your MDX files:
            // Header, CodeBlock, etc.
            Header,
          }}
        />
      </article>
    </>
  );
}
