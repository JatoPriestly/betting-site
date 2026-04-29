import { getAllPosts, savePost, slugify } from "@/app/lib/posts";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

async function isAuthorized() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value ?? "");
}

export async function GET() {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await getAllPosts());
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = body.slug?.trim() || slugify(body.title);
  const now = new Date().toISOString();

  const post = await savePost({
    id: Date.now().toString(),
    slug,
    title: body.title,
    excerpt: body.excerpt || "",
    content: body.content || "",
    category: body.category || "General",
    author: body.author || "Admin",
    coverImage: body.coverImage || "",
    publishedAt: body.publishedAt || now,
    seoTitle: body.seoTitle || body.title,
    seoDescription: body.seoDescription || body.excerpt || "",
    keywords: body.keywords || [],
  });

  return Response.json(post, { status: 201 });
}

