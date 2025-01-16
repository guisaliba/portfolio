import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.frontmatter?.title ?? post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
