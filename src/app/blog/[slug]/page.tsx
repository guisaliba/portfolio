import { getPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const posts = await fetchBlogPosts();

//   return posts.map((post: Post) => ({
//     post: post.name.replace(/\.mdx$/, ""),
//   }));
// }

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}) {
  const { title } = params;
  return { title: `${title}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  try {
    return (
      <article className="prose mx-auto">
        <MDXRemote source={post.content} />
        <p>
          <a href={post.download_url}>View on GitHub</a>
        </p>
      </article>
    );
  } catch (error) {
    return <h1>Could not load post: {`${error}`}</h1>;
  }
}
