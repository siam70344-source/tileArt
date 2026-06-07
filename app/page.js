import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/Marquee";

async function getFeaturedTiles() {
  try {
    const res = await fetch(`${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/tiles?limit=4`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const tiles = await getFeaturedTiles();

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", paddingTop: 70,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 40%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,169,110,0.025) 80px, rgba(201,169,110,0.025) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,169,110,0.025) 80px, rgba(201,169,110,0.025) 81px)",
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <p className="animate__animated animate__fadeInDown" style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 500 }}>
            Premium Tile Gallery
          </p>

          <h1 className="animate__animated animate__fadeInUp" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 400, lineHeight: 1.05, color: "#f0ebe3", marginBottom: "2rem",
          }}>
            Discover Your<br />
            <span style={{ color: "#c9a96e", fontStyle: "italic" }}>Perfect Aesthetic</span>
          </h1>

          <p className="animate__animated animate__fadeIn animate__delay-1s" style={{
            color: "#8a7f74", fontSize: "1.1rem", maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7, fontWeight: 300,
          }}>
            Explore handpicked ceramic, marble, terracotta and mosaic tiles from artisans around the world.
          </p>

          <div className="animate__animated animate__fadeInUp animate__delay-1s" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/all-tiles">
              <button className="btn-gold" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }}>
                Browse Now
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }}>
                Join Free
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "5rem", flexWrap: "wrap" }}>
            {[{ num: "500+", label: "Tile Designs" }, { num: "12", label: "Categories" }, { num: "100%", label: "Authentic" }].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#c9a96e", fontWeight: 600 }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "#8a7f74", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Featured Tiles */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Handpicked</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0ebe3", marginBottom: "1rem" }}>Featured Collection</h2>
            <hr className="gold-line" style={{ maxWidth: 200, margin: "0 auto" }} />
          </div>

          <div className="tiles-grid">
            {tiles.slice(0, 4).map((tile) => (
              <div key={tile._id} className="tile-card">
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <img src={tile.image} alt={tile.title} style={{ width: "100%", height: 220, objectFit: "cover", transition: "transform 0.5s ease", display: "block" }} />
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                    <span className={`badge ${tile.inStock ? "badge-in" : "badge-out"}`}>
                      {tile.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#f0ebe3", marginBottom: "0.4rem" }}>{tile.title}</h3>
                  <p style={{ color: "#8a7f74", fontSize: "0.8rem", marginBottom: "1rem" }}>{tile.category} • {tile.dimensions}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#c9a96e", fontWeight: 600, fontSize: "1.1rem" }}>${tile.price}</span>
                    <Link href={`/tile/${tile._id}`}>
                      <button className="btn-outline" style={{ padding: "0.35rem 1rem", fontSize: "0.75rem" }}>View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/all-tiles">
              <button className="btn-outline" style={{ padding: "0.85rem 2.5rem" }}>View All Tiles</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}