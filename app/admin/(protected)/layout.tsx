import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { Dice5, List, Edit2, Ticket, PlusCircle, Globe, LogOut } from "lucide-react";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const authed =
    cookieStore.get("admin_auth")?.value === process.env.ADMIN_PIN;

  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Dice5 size={24} /> Dice Admin
        </div>
        <nav className="admin-sidebar__nav">
          <Link href="/admin" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <List size={18} /> All Posts
          </Link>
          <Link href="/admin/posts/new" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Edit2 size={18} /> New Post
          </Link>
          <div style={{ margin: "16px 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", paddingLeft: 14 }}>
            Promos
          </div>
          <Link href="/admin/promos" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Ticket size={18} /> All Promos
          </Link>
          <Link href="/admin/promos/new" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PlusCircle size={18} /> New Promo
          </Link>
          <Link href="/blog" className="admin-nav-link" target="_blank" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={18} /> View Blog ↗
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            const { cookies: getCookies } = await import("next/headers");
            const c = await getCookies();
            c.delete("admin_auth");
            redirect("/admin/login");
          }}
        >
          <button type="submit" className="admin-logout-btn" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LogOut size={18} /> Logout
          </button>
        </form>
      </aside>
      {/* Main */}
      <main className="admin-main">{children}</main>
    </div>
  );
}
