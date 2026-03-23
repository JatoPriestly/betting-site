import { getAllPosts, savePost, slugify } from "@/app/lib/posts";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function isAuthorized(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_auth")?.value === process.env.ADMIN_PIN;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(getAllPosts());
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = body.slug?.trim() || slugify(body.title);
  const now = new Date().toISOString();

  const post = savePost({
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
