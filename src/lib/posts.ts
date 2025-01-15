/* eslint-disable @typescript-eslint/no-explicit-any */

import matter from "gray-matter";

export type Post = {
  name: string;
  path: string;
  html_url: string;
};

export async function fetchBlogPosts(): Promise<Post[]> {
  const baseUrl = process.env.GITHUB_API_BASE_URL;
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(baseUrl!, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.url}`);
  }

  const files: Promise<Post[]> = await response.json();

  return files;
}

export async function fetchMdxFromGitHub(
  file: string
): Promise<{ content: any; data: any }> {
  const baseUrl = process.env.GITHUB_RAW_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "GITHUB_RAW_BASE_URL is not defined in environment variables"
    );
  }

  const url = `${baseUrl}/${file}.mdx`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch MDX file: ${url}, Status: ${response.status}`
    );
  }

  const mdxContent = await response.text();
  const { content, data } = matter(mdxContent);

  return { content, data };
}
