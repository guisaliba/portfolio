import matter from "gray-matter";
import path from "path";

export type Post = {
  name: string;
  download_url: string;
};

interface MDXPost extends Post {
  data: string;
  slug: string;
  content: string;
}

async function getMDXFiles(
  repoOwner: string,
  repoName: string,
  directory: string
) {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return data.filter((file: Post) => path.extname(file.name) === ".mdx");
}

async function readMDXFile(downloadUrl: string) {
  const response = await fetch(downloadUrl);
  const rawContent = await response.text();

  return matter(rawContent);
}

async function getMDXData(
  repoOwner: string,
  repoName: string,
  directory: string
): Promise<MDXPost[]> {
  const mdxFiles = await getMDXFiles(repoOwner, repoName, directory);
  return Promise.all(
    mdxFiles.map(async (file: Post) => {
      const { data, content } = await readMDXFile(file.download_url);
      const slug = path.basename(file.name, path.extname(file.name));

      return {
        data,
        slug,
        content,
      };
    })
  );
}

export async function getPosts() {
  return getMDXData("guisaliba", "brain", "blog/posts");
}
