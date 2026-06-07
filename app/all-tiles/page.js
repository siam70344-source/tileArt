"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles")
      .then((r) => r.json())
      .then((data) => { setTiles(data); setFiltered(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(tiles.filter((t) => t.title.toLowerCase().includes(q)));
  }, [search, tiles]);

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div className="container" style={{ padding: "3rem 1.5rem" }}>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Our Collection</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f0ebe3", marginBottom: "2rem" }}>All Tiles</h1>

          {/* Search Bar */}
          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#4a4540" }}>🔍</span>
            <input
              type="text"
              className="input-field"
              placeholder="Search tiles by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "2.5rem", borderRadius: 100 }}
            />
          </div>
        </div>

        <hr className="gold-line" style={{ marginBottom: "2rem" }} />

        <p style={{ color: "#4a4540", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          Showing {filtered.length} tiles
        </p>

        {loading ? (
          <div className="loading-screen"><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ color: "#4a4540", fontSize: "1.1rem" }}>No tiles found for "{search}"</p>
          </div>
        ) : (
          <div className="tiles-grid">
            {filtered.map((tile) => (
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
                    <span style={{ color: "#c9a96e", fontWeight: 600 }}>${tile.price}</span>
                    <Link href={`/tile/${tile._id}`}>
                      <button className="btn-outline" style={{ padding: "0.35rem 1rem", fontSize: "0.75rem" }}>Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}