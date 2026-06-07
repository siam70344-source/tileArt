"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{ background: "#0a0908", borderTop: "1px solid #2a2520", padding: "3rem 0 2rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>

          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#f0ebe3", marginBottom: "0.75rem" }}>TileArt Gallery</h3>
            <p style={{ color: "#4a4540", fontSize: "0.85rem", lineHeight: 1.7 }}>
              Premium tile gallery showcasing ceramic, marble, terracotta and mosaic tiles from artisans worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Login" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: "#4a4540", fontSize: "0.85rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#c9a96e"}
                  onMouseLeave={e => e.target.style.color = "#4a4540"}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ color: "#4a4540", fontSize: "0.85rem" }}>📧 hello@tileart.gallery</p>
              <p style={{ color: "#4a4540", fontSize: "0.85rem" }}>📍 Dhaka, Bangladesh</p>
              <p style={{ color: "#4a4540", fontSize: "0.85rem" }}>📞 +8801609240557</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Follow Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Pinterest", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} style={{
                  width: 36, height: 36, background: "#1e1a17", border: "1px solid #2a2520",
                  borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#4a4540", fontSize: "0.7rem", fontWeight: 600, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2520"; e.currentTarget.style.color = "#4a4540"; }}
                >{label.charAt(0)}</a>
              ))}
            </div>
          </div>
        </div>

        <hr className="gold-line" style={{ marginBottom: "1.5rem" }} />

        <p style={{ textAlign: "center", color: "#4a4540", fontSize: "0.8rem" }}>
          © 2026 TileArt Gallery. All rights reserved. Built with ❤️ in Bangladesh.
        </p>
      </div>
    </footer>
  );
}