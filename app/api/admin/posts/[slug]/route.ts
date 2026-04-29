import { getPostBySlug, savePost, deletePost } from "@/app/lib/posts";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

async function isAuthorized() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value ?? "");
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/posts/[slug]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const post = getPostBySlug(slug);
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(post);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/posts/[slug]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const existing = getPostBySlug(slug);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const updated = savePost({ ...existing, ...body, slug });
  return Response.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/posts/[slug]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const ok = deletePost(slug);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}
