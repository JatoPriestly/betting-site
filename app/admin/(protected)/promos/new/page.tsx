import PromoForm from "../../components/PromoForm";

export default function NewPromoPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">New Promo Code</h1>
      </div>
      <PromoForm mode="create" />
    </div>
  );
}
