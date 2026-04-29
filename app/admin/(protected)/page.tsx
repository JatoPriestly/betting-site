"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusSquare, Trash2, Pencil, ExternalLink, Zap } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
}

interface ApiUsage {
  used: number;
  budget: number;
  remaining: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ApiUsageCard() {
  const [usage, setUsage] = useState<ApiUsage | null>(null);

  useEffect(() => {
    fetch("/api/admin/api-usage")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setUsage(d))
      .catch(() => {});
  }, []);

  if (!usage) return null;

  const pct = Math.min(100, Math.round((usage.used / usage.budget) * 100));
  const barColor =
    usage.remaining === 0
      ? "var(--mb-red)"
      : usage.remaining <= 2
      ? "var(--mb-amber)"
      : "var(--mb-green)";

  return (
    <div
      style={{
        background: "var(--mb-surface)",
        border: "1px solid var(--mb-border)",
        borderRadius: 14,
        padding: "20px 24px",
        marginBottom: 32,
        display: "flex",
        gap: 24,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(212,175,55,0.1)",
          border: "1px solid rgba(212,175,55,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "var(--mb-gold)",
        }}
      >
        <Zap size={18} />
      </div>

      <div style={{ flex: "0 0 auto" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
            color: "var(--mb-muted)",
            marginBottom: 4,
          }}
        >
          Sports API — Today
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: barColor,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {usage.used}
          </span>
          <span style={{ fontSize: "0.875rem", color: "var(--mb-muted)" }}>
            / {usage.budget} calls used
          </span>
        </div>
        <div
          style={{ fontSize: "0.78rem", color: "var(--mb-muted)", marginTop: 3 }}
        >
          {usage.remaining === 0
            ? "Budget exhausted — serving cached data only"
            : `${usage.remaining} call${usage.remaining !== 1 ? "s" : ""} remaining · resets at UTC midnight`}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 180 }}>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: barColor,
              borderRadius: 99,
              transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: `0 0 8px ${barColor}66`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            fontSize: "0.68rem",
            color: "var(--mb-muted)",
          }}
        >
          <span>0</span>
          <span>{pct}% used</span>
          <span>{usage.budget}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function fetchPosts() {
    const res = await fetch("/api/admin/posts");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    setDeleting(null);
    fetchPosts();
  }

  return (
    <div className="admin-page">
      <ApiUsageCard />

      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Blog Posts</h1>
          <p
            style={{
              color: "var(--mb-muted)",
              fontSize: "0.875rem",
              marginTop: 4,
            }}
          >
            {loading
              ? "Loading…"
              : `${posts.length} post${posts.length !== 1 ? "s" : ""} published`}
          </p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn-primary">
          <PlusSquare size={15} />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="admin-empty">
          <p>No posts yet. Create your first one.</p>
          <Link href="/admin/posts/new" className="admin-btn-primary">
            <PlusSquare size={15} /> Create Post
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <a
                      href={`/en/blog/${post.slug}`}
                      target="_blank"
                      className="admin-table__title-link"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      {post.title}
                      <ExternalLink size={11} style={{ opacity: 0.4, flexShrink: 0 }} />
                    </a>
                  </td>
                  <td>
                    <span className="admin-badge">{post.category}</span>
                  </td>
                  <td style={{ color: "var(--mb-muted)", fontSize: "0.85rem" }}>
                    {post.author}
                  </td>
                  <td style={{ color: "var(--mb-muted)", fontSize: "0.85rem" }}>
                    {formatDate(post.publishedAt)}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        onClick={() =>
                          router.push(`/admin/posts/${post.slug}/edit`)
                        }
                        className="admin-btn-edit"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug, post.title)}
                        className="admin-btn-delete"
                        disabled={deleting === post.slug}
                        style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                      >
                        <Trash2 size={12} />
                        {deleting === post.slug ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
