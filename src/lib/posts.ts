import matter from "gray-matter";
import readingTime from "reading-time";
import path from "path";

interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
}

export interface MDXPost {
  slug: string;
  frontmatter: {
    title?: string;
    tags?: string[];
    description?: string;
  };
  content: string;
  readingTime: string; // computed reading time
}

/**
 * Fetch all MDX files at a given path in a GitHub repo
 * and return the uncompiled content + frontmatter.
 */
export async function getPosts(): Promise<MDXPost[]> {
  const repoOwner = "guisaliba";
  const repoName = "brain";
  const directory = "blog/posts";

  const files = await getMDXFiles(repoOwner, repoName, directory);

  const posts = await Promise.all(
    files.map(async (file) => {
      const rawContent = await fetchMDXFile(file.download_url);

      // Parse frontmatter
      const { data, content } = matter(rawContent);

      // Calculate reading time from the post content
      const stats = readingTime(content);

      const slug = path.basename(file.name, path.extname(file.name));

      console.log(data.description);

      return {
        slug,
        frontmatter: {
          title: data.title || slug,
          tags: data.tags || [],
          description: data.description || "",
        },
        content,
        readingTime: stats.text,
      };
    })
  );

  return posts;
}

/**
 * Fetch the list of .mdx files in a GitHub repo directory
 */
async function getMDXFiles(
  repoOwner: string,
  repoName: string,
  directory: string
) {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data: GitHubFile[] = await response.json();
  return data.filter((file) => path.extname(file.name) === ".mdx");
}

/**
 * Fetch the raw text of a single MDX file from GitHub
 */
async function fetchMDXFile(downloadUrl: string): Promise<string> {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${downloadUrl}`);
  }
  return response.text();
}
