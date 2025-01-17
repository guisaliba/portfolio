import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
            <br />
            <small>
              {post.frontmatter.tags?.join(", ")} — {post.readingTime}
            </small>
            <p>{post.frontmatter.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
