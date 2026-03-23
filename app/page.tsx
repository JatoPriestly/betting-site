import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-redirect">
      <div style={{ fontSize: "4rem" }}>🎲</div>
      <h1>Dice Bets</h1>
      <p>Your home for expert sports betting strategies and insights.</p>
      <div className="cta-links">
        <Link href="/blog" className="cta-link cta-link--primary">
          Read the Blog
        </Link>
        <Link href="/admin" className="cta-link cta-link--secondary">
          Admin Portal
        </Link>
      </div>
    </div>
  );
}
