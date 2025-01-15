import { fetchBlogPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();

  return posts.map((post) => ({
    title: post.name.replace(/\.mdx$/, ""),
    url: post.html_url,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ title: string; url: string }>;
}) {
  const { title, url } = await params;
  return (
    <div>
      <h1>{title}</h1>
      <a href={url}>View on GitHub</a>
    </div>
  );
}
