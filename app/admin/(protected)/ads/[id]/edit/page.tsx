"use client";

import { useEffect, useState, use } from "react";
import AdForm, { SystemAd } from "../../AdForm";

export default function EditAdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [ad, setAd] = useState<SystemAd | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/ads/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Ad not found");
        return r.json();
      })
      .then(setAd)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="admin-page"><div className="form-error">{error}</div></div>;
  if (!ad) return <div className="admin-page"><div className="admin-loading">Loading...</div></div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page__title" style={{ marginBottom: "32px" }}>
        Edit Ad
      </h1>
      <AdForm initialData={ad} />
    </div>
  );
}
