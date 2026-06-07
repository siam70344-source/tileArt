"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function TileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetch(`/api/tiles/${id}`)
        .then((r) => r.json())
        .then((data) => { setTile(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [id, session]);

  if (isPending || loading) return <div className="loading-screen" style={{ paddingTop: 70 }}><div className="spinner"></div></div>;
  if (!session) return null;
  if (!tile) return (
    <div style={{ paddingTop: 120, textAlign: "center" }}>
      <p style={{ color: "#8a7f74" }}>Tile not found.</p>
      <Link href="/all-tiles"><button className="btn-outline" style={{ marginTop: "1rem" }}>Back to Gallery</button></Link>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div className="container" style={{ padding: "3rem 1.5rem" }}>

        <Link href="/all-tiles" style={{ color: "#8a7f74", fontSize: "0.85rem", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          ← Back to Collection
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="detail-grid">

          {/* Image */}
          <div style={{ borderRadius: 4, overflow: "hidden", border: "1px solid #2a2520" }}>
            <img src={tile.image} alt={tile.title} style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
          </div>

          {/* Info */}
          <div>
            <span className={`badge ${tile.inStock ? "badge-in" : "badge-out"}`} style={{ marginBottom: "1rem", display: "inline-block" }}>
              {tile.inStock ? "In Stock" : "Out of Stock"}
            </span>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f0ebe3", marginBottom: "0.5rem" }}>{tile.title}</h1>

            <p style={{ color: "#8a7f74", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2rem" }}>
              {tile.category} • by {tile.creator}
            </p>

            <hr className="gold-line" style={{ marginBottom: "2rem" }} />

            <p style={{ color: "#8a7f74", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem" }}>{tile.description}</p>

            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { label: "Material", value: tile.material },
                { label: "Dimensions", value: tile.dimensions },
                { label: "Category", value: tile.category },
                { label: "Price", value: `$${tile.price}` },
              ].map((s) => (
                <div key={s.label} style={{ background: "#131110", border: "1px solid #2a2520", borderRadius: 2, padding: "1rem" }}>
                  <p style={{ fontSize: "0.7rem", color: "#4a4540", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{s.label}</p>
                  <p style={{ color: "#f0ebe3", fontSize: "0.95rem" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {tile.tags && (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                {tile.tags.map((tag) => (
                  <span key={tag} style={{ background: "rgba(201,169,110,0.08)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.2)", padding: "0.3rem 0.8rem", borderRadius: 2, fontSize: "0.75rem", letterSpacing: "0.08em" }}>{tag}</span>
                ))}
              </div>
            )}

            <div style={{ fontSize: "2rem", color: "#c9a96e", fontFamily: "'Playfair Display', serif", fontWeight: 600, marginBottom: "1.5rem" }}>
              ${tile.price} <span style={{ fontSize: "0.9rem", color: "#8a7f74", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>/ tile</span>
            </div>

            <button className="btn-gold" style={{ width: "100%", padding: "1rem" }} disabled={!tile.inStock}>
              {tile.inStock ? "Request Quote" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}