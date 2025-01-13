import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Header from "@/app/components/Header";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  Header,
};

export async function getStaticProps({
  params,
}: {
  params: Promise<{ file: string }>;
}) {
  const file = (await params).file;
  const baseUrl = process.env.GITHUB_RAW_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "GITHUB_RAW_BASE_URL is not defined in environment variables"
    );
  }

  const url = `${baseUrl}${file}.mdx`;

  const response = await fetch(url);
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const mdxContent = await response.text();
  const mdxSource = await serialize(mdxContent);

  return {
    props: { mdxSource },
  };
}

export default async function BlogPost({ mdxSource }: Props) {
  return <MDXRemote {...mdxSource} components={components} />;
}
