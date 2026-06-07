"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(path) {
    return pathname === path;
  }

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,9,8,0.96)" : "rgba(10,9,8,0.7)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid #2a2520" : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 1.5rem",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #c9a96e, #a07840)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>◼</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#f0ebe3", letterSpacing: "0.02em" }}>TileArt</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hide-mobile">
          {[
            { path: "/", label: "Home" },
            { path: "/all-tiles", label: "All Tiles" },
            { path: "/my-profile", label: "My Profile" },
          ].map(({ path, label }) => (
            <Link key={path} href={path} style={{
              fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.1em",
              color: isActive(path) ? "#c9a96e" : "#8a7f74",
              textTransform: "uppercase", transition: "color 0.2s",
              borderBottom: isActive(path) ? "1px solid #c9a96e" : "1px solid transparent",
              paddingBottom: 2,
            }}>{label}</Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {session?.user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/my-profile" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #c9a96e", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9a96e, #a07840)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "#0a0908", fontWeight: 700 }}>
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ fontSize: "0.85rem", color: "#8a7f74" }} className="hide-mobile">
                  {session.user.name?.split(" ")[0]}
                </span>
              </Link>
              <button onClick={handleLogout} className="btn-outline" style={{ padding: "0.45rem 1.1rem", fontSize: "0.75rem" }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn-gold" style={{ padding: "0.55rem 1.5rem", fontSize: "0.78rem" }}>
                Login
              </button>
            </Link>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#f0ebe3", fontSize: "1.4rem", display: "none" }} className="mobile-menu-btn">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#131110", borderTop: "1px solid #2a2520", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { path: "/", label: "Home" },
            { path: "/all-tiles", label: "All Tiles" },
            { path: "/my-profile", label: "My Profile" },
          ].map(({ path, label }) => (
            <Link key={path} href={path} onClick={() => setMenuOpen(false)} style={{ color: "#8a7f74", fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}