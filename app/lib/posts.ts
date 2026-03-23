import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

function readPosts(): BlogPost[] {
  const raw = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(raw) as BlogPost[];
}

function writePosts(posts: BlogPost[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2), "utf-8");
}

export function getAllPosts(): BlogPost[] {
  return readPosts().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function savePost(post: BlogPost): BlogPost {
  const posts = readPosts();
  const existingIndex = posts.findIndex((p) => p.slug === post.slug);
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.push(post);
  }
  writePosts(posts);
  return post;
}

export function deletePost(slug: string): boolean {
  const posts = readPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  if (filtered.length === posts.length) return false;
  writePosts(filtered);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
