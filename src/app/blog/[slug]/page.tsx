import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import NavBar from "@/app/ui/Navbar";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import Container from "@/app/ui/Container";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogParams {
  params: {
    slug: string;
  };
}

interface Frontmatter {
  title: string;
}

export default async function Blog({ params }: BlogParams) {
  const availableComponents = { Header, Footer, NavBar };

  const { slug } = await params;

  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const data = await compileMDX<Frontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: true,
    },
    components: availableComponents,
  });

  return <Container className="mt-10">{data.content}</Container>;
}

export const dynamicParams = false;
