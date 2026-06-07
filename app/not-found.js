import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", paddingTop: 70, display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
      textAlign: "center",
    }}>
      <div className="animate__animated animate__fadeIn">
        <p style={{ color: "#c9a96e", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Error 404</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(4rem, 10vw, 8rem)", color: "#f0ebe3", fontWeight: 300, lineHeight: 1, marginBottom: "1rem" }}>
          Not Found
        </h1>
        <p style={{ color: "#8a7f74", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 400, margin: "0 auto 2.5rem" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <button className="btn-gold" style={{ padding: "1rem 2.5rem" }}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}