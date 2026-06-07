"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  if (isPending) return <div className="loading-screen" style={{ paddingTop: 70 }}><div className="spinner"></div></div>;
  if (!session) return null;

  const user = session.user;

console.log("User image:", user?.image);
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div className="container" style={{ padding: "3rem 1.5rem", maxWidth: 680 }}>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
         {user?.image ? (
  <img 
    src={user.image} 
    alt={user.name} 
    referrerPolicy="no-referrer"
    style={{ width: 90, height: 90, borderRadius: "50%", border: "2px solid #c9a96e", objectFit: "cover", margin: "0 auto 1.5rem", display: "block" }} 
  />
) : (
  <div style={{ width: 90, height: 90, background: "linear-gradient(135deg, #c9a96e, #a07840)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem", fontFamily: "'Playfair Display', serif", color: "#0a0908", fontWeight: 700 }}>
    {initials}
  </div>
)}

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#f0ebe3", marginBottom: "0.25rem" }}>{user?.name}</h1>
          <p style={{ color: "#8a7f74", fontSize: "0.9rem" }}>{user?.email}</p>
        </div>

        <hr className="gold-line" style={{ marginBottom: "2.5rem" }} />

        {/* Profile Info */}
        <div style={{ background: "#131110", border: "1px solid #2a2520", borderRadius: 4, padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#f0ebe3", marginBottom: "1.5rem" }}>Profile Information</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Account ID", value: user?.id?.slice(0, 12) + "..." },
              { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A" },
            ].map((item) => (
              <div key={item.label} style={{ background: "#1e1a17", border: "1px solid #2a2520", borderRadius: 2, padding: "1rem" }}>
                <p style={{ fontSize: "0.7rem", color: "#4a4540", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{item.label}</p>
                <p style={{ color: "#f0ebe3", fontSize: "0.9rem" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Update Button */}
        <Link href="/update-profile">
          <button className="btn-gold" style={{ width: "100%", padding: "0.9rem", marginBottom: "1rem" }}>
            Update Profile
          </button>
        </Link>

        <button onClick={handleLogout} style={{ width: "100%", background: "transparent", border: "1px solid #2a2520", color: "#4a4540", padding: "0.9rem", borderRadius: 2, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.08em", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#e05a5a"; e.currentTarget.style.color = "#e05a5a"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2520"; e.currentTarget.style.color = "#4a4540"; }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}