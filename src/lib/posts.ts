import matter from "gray-matter";
import path from "path";

// (Optional) define a shape for frontmatter you expect
interface Frontmatter {
  title?: string;
  [key: string]: any;
}

export interface MDXRawPost {
  name: string;
  slug: string;
  content: string; // the raw MDX string
  frontmatter: Frontmatter; // the parsed frontmatter
  // plus anything else you might want
}

interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
  [key: string]: any;
}

async function getMDXFiles(
  repoOwner: string,
  repoName: string,
  directory: string
) {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.filter((file: GitHubFile) => path.extname(file.name) === ".mdx");
}

async function readMDXFile(downloadUrl: string) {
  const response = await fetch(downloadUrl);
  const rawContent = await response.text();

  // Grab frontmatter + content
  const { data, content } = matter(rawContent);

  return {
    frontmatter: data,
    content, // raw MDX
  };
}

export async function getPosts(): Promise<MDXRawPost[]> {
  const repoOwner = "guisaliba";
  const repoName = "brain";
  const directory = "blog/posts";

  const mdxFiles = await getMDXFiles(repoOwner, repoName, directory);

  // Build an array of raw MDX posts
  return Promise.all(
    mdxFiles.map(async (file) => {
      const { frontmatter, content } = await readMDXFile(file.download_url);

      const slug = path.basename(file.name, path.extname(file.name));

      return {
        name: file.name,
        slug,
        content, // raw MDX
        frontmatter, // any frontmatter data
      };
    })
  );
}
