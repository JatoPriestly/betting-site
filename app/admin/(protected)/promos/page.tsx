"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Promo {
  id: string;
  rank: number;
  bookmaker: string;
  promoCode: string;
  bonusAmount: string;
  rating: number;
  active: boolean;
}

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function fetchPromos() {
    const res = await fetch("/api/admin/promos");
    if (res.ok) setPromos(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchPromos();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete promo for "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchPromos();
  }

  async function handleToggleActive(promo: Promo) {
    await fetch(`/api/admin/promos/${promo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !promo.active }),
    });
    fetchPromos();
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Promo Codes</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Manage bookmaker promo codes shown on{" "}
            <a href="/promos" target="_blank" style={{ color: "#a78bfa" }}>
              /promos ↗
            </a>
          </p>
        </div>
        <Link href="/admin/promos/new" className="admin-btn-primary">
          + New Promo
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading…</div>
      ) : promos.length === 0 ? (
        <div className="admin-empty">
          <p>No promo codes yet.</p>
          <Link href="/admin/promos/new" className="admin-btn-primary mt-4">
            Add your first promo code
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Bookmaker</th>
                <th>Code</th>
                <th>Bonus</th>
                <th>Rating</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id}>
                  <td style={{ fontWeight: 700, color: "#a78bfa" }}>
                    #{promo.rank}
                  </td>
                  <td style={{ fontWeight: 600 }}>{promo.bookmaker}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: "monospace",
                        background: "rgba(124,58,237,0.15)",
                        padding: "3px 10px",
                        borderRadius: 4,
                        fontSize: "0.85rem",
                        color: "#c4b5fd",
                      }}
                    >
                      {promo.promoCode}
                    </span>
                  </td>
                  <td style={{ color: "#fbbf24", fontWeight: 700 }}>
                    {promo.bonusAmount}
                  </td>
                  <td>{promo.rating}/10</td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(promo)}
                      className={
                        promo.active ? "admin-btn-edit" : "admin-btn-delete"
                      }
                      style={{ minWidth: 72, justifyContent: "center" }}
                    >
                      {promo.active ? "Live ✓" : "Off"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        onClick={() =>
                          router.push(`/admin/promos/${promo.id}/edit`)
                        }
                        className="admin-btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id, promo.bookmaker)}
                        className="admin-btn-delete"
                        disabled={deleting === promo.id}
                      >
                        {deleting === promo.id ? "Deleting…" : "Delete"}
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
