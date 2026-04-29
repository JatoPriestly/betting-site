import { kvGetJson, kvPutJson } from "./cfKv";

const KV_KEY_POSTS = "blog_posts";

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

async function readPosts(): Promise<BlogPost[]> {
  const posts = await kvGetJson<BlogPost[]>(KV_KEY_POSTS);
  return posts || [];
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await kvPutJson(KV_KEY_POSTS, posts, 3600 * 24 * 365);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await readPosts();
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await readPosts();
  return posts.find((p) => p.slug === slug);
}

export async function savePost(post: BlogPost): Promise<BlogPost> {
  const posts = await readPosts();
  const existingIndex = posts.findIndex((p) => p.slug === post.slug);
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.push(post);
  }
  await writePosts(posts);
  return post;
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await readPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  if (filtered.length === posts.length) return false;
  await writePosts(filtered);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

