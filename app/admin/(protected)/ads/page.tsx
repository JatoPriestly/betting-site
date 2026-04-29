"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface SystemAd {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  delaySeconds: number;
  placement: string;
  active: boolean;
  createdAt: string;
}

export default function AdminAdsPage() {
  const [ads, setAds] = useState<SystemAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  async function fetchAds() {
    const res = await fetch("/api/admin/ads");
    if (res.ok) setAds(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchAds();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete ad "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/ads/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchAds();
  }

  async function handleToggleActive(ad: SystemAd) {
    setToggling(ad.id);
    await fetch(`/api/admin/ads/${ad.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !ad.active }),
    });
    setToggling(null);
    fetchAds();
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">System Ads</h1>
          <p style={{ color: "var(--mb-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Manage pop-ups and ads displayed across the site.
          </p>
        </div>
        <Link href="/admin/ads/new" className="admin-btn-primary">
          <PlusCircle size={15} />
          New Ad
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading…</div>
      ) : ads.length === 0 ? (
        <div className="admin-empty">
          <p>No ads configured yet.</p>
          <Link href="/admin/ads/new" className="admin-btn-primary">
            <PlusCircle size={15} /> Create Ad
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Placement</th>
                <th>Delay</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div dangerouslySetInnerHTML={{ __html: ad.title }} />
                    <div style={{ fontSize: "0.75rem", color: "var(--mb-muted)", marginTop: 4 }}>
                      {ad.badgeText}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge" style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa", borderColor: "rgba(59,130,246,0.2)" }}>
                      {ad.placement}
                    </span>
                  </td>
                  <td style={{ color: "var(--mb-muted)", fontSize: "0.85rem" }}>
                    {ad.delaySeconds}s
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(ad)}
                      disabled={toggling === ad.id}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        border: "1px solid",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.15s",
                        background: ad.active
                          ? "rgba(34,197,94,0.08)"
                          : "rgba(255,255,255,0.04)",
                        color: ad.active ? "var(--mb-green)" : "var(--mb-muted)",
                        borderColor: ad.active
                          ? "rgba(34,197,94,0.2)"
                          : "var(--mb-border)",
                        opacity: toggling === ad.id ? 0.5 : 1,
                      }}
                    >
                      {toggling === ad.id
                        ? "…"
                        : ad.active
                        ? "● Live"
                        : "○ Off"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        onClick={() => router.push(`/admin/ads/${ad.id}/edit`)}
                        className="admin-btn-edit"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id, ad.title)}
                        className="admin-btn-delete"
                        disabled={deleting === ad.id}
                        style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                      >
                        <Trash2 size={12} />
                        {deleting === ad.id ? "Deleting…" : "Delete"}
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
