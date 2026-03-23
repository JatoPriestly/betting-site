import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

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
        <div className="admin-sidebar__logo">🎲 Dice Admin</div>
        <nav className="admin-sidebar__nav">
          <Link href="/admin" className="admin-nav-link">
            📋 All Posts
          </Link>
          <Link href="/admin/posts/new" className="admin-nav-link">
            ✏️ New Post
          </Link>
          <Link href="/blog" className="admin-nav-link" target="_blank">
            🌐 View Blog ↗
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
          <button type="submit" className="admin-logout-btn">
            🚪 Logout
          </button>
        </form>
      </aside>
      {/* Main */}
      <main className="admin-main">{children}</main>
    </div>
  );
}
