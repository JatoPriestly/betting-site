"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function fetchPosts() {
    const res = await fetch("/api/admin/posts");
    if (res.ok) {
      setPosts(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    setDeleting(null);
    fetchPosts();
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">All Posts</h1>
        <Link href="/admin/posts/new" className="admin-btn-primary">
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="admin-empty">
          <p>No posts yet.</p>
          <Link href="/admin/posts/new" className="admin-btn-primary mt-4">
            Create your first post
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
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="admin-table__title-link"
                    >
                      {post.title}
                    </a>
                  </td>
                  <td>
                    <span className="admin-badge">{post.category}</span>
                  </td>
                  <td>{post.author}</td>
                  <td>{formatDate(post.publishedAt)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        onClick={() =>
                          router.push(`/admin/posts/${post.slug}/edit`)
                        }
                        className="admin-btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="admin-btn-delete"
                        disabled={deleting === post.slug}
                      >
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
