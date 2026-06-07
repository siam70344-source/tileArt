export default function Marquee() {
  const text = "New Arrivals: Marble White Elite | Weekly Feature: Modern Geometric Patterns | Join the Community | Zellige Gold Pattern Now Available | Handcrafted Terracotta Earth | Premium Ceramic Collection | ";
  const repeated = text.repeat(3);

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <span style={{ color: "#8a7f74", fontSize: "0.8rem", letterSpacing: "0.08em", whiteSpace: "nowrap", paddingRight: "2rem" }}>
          {repeated}
        </span>
        <span style={{ color: "#8a7f74", fontSize: "0.8rem", letterSpacing: "0.08em", whiteSpace: "nowrap", paddingRight: "2rem" }}>
          {repeated}
        </span>
      </div>
    </div>
  );
}