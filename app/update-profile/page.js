"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (session?.user) {
      setForm({ name: session.user.name || "", image: session.user.image || "" });
    }
  }, [session, isPending, router]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, image: form.image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      await refetch();
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) return <div className="loading-screen" style={{ paddingTop: 70 }}><div className="spinner"></div></div>;
  if (!session) return null;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)" }}>
      <div className="animate__animated animate__fadeInUp" style={{ width: "100%", maxWidth: 460, padding: "2.5rem", background: "#131110", border: "1px solid #2a2520", borderRadius: 4, margin: "1rem" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f0ebe3", marginBottom: "0.5rem" }}>Update Profile</h1>
          <p style={{ color: "#8a7f74", fontSize: "0.9rem" }}>Change your name and profile photo</p>
        </div>

        <hr className="gold-line" style={{ marginBottom: "2rem" }} />

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="input-field" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Photo URL</label>
            <input type="url" name="image" className="input-field" placeholder="https://example.com/photo.jpg" value={form.image} onChange={handleChange} />
          </div>

          {form.image && (
            <div style={{ textAlign: "center" }}>
              <img src={form.image} alt="Preview" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid #c9a96e" }} onError={e => e.target.style.display = "none"} />
            </div>
          )}

          <button type="submit" className="btn-gold" style={{ padding: "0.9rem" }} disabled={loading}>
            {loading ? "Saving..." : "Update Information"}
          </button>

          <button type="button" onClick={() => router.push("/my-profile")} className="btn-outline" style={{ padding: "0.9rem" }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}