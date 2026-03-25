import { getPromoById } from "@/app/lib/promos";
import { notFound } from "next/navigation";
import PromoForm from "../../../components/PromoForm";

export default async function EditPromoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promo = getPromoById(id);
  if (!promo) notFound();

  const initialData = {
    ...promo,
    rank: String(promo.rank),
    rating: String(promo.rating),
    tags: (promo.tags || []).join(", "),
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Edit Promo — {promo.bookmaker}</h1>
      </div>
      <PromoForm mode="edit" id={id} initialData={initialData} />
    </div>
  );
}
