"use client";

import AdForm from "../AdForm";

export default function NewAdPage() {
  return (
    <div className="admin-page">
      <h1 className="admin-page__title" style={{ marginBottom: "32px" }}>
        Create System Ad
      </h1>
      <AdForm />
    </div>
  );
}
