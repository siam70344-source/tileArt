"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const result = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
      });
      if (result.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 70, display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
    }}>
      <div className="animate__animated animate__fadeInUp" style={{
        width: "100%", maxWidth: 460, padding: "2.5rem",
        background: "#131110", border: "1px solid #2a2520", borderRadius: 4, margin: "1rem",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f0ebe3", marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ color: "#8a7f74", fontSize: "0.9rem" }}>Join the TileArt community</p>
        </div>

        <hr className="gold-line" style={{ marginBottom: "2rem" }} />

        {/* Google Register */}
        <button onClick={handleGoogle} disabled={googleLoading} style={{
          width: "100%", padding: "0.85rem", background: "#1e1a17", border: "1px solid #2a2520",
          color: "#f0ebe3", borderRadius: 2, fontSize: "0.9rem", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem", cursor: "pointer",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a96e"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2520"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <hr style={{ flex: 1, border: "none", borderTop: "1px solid #2a2520" }} />
          <span style={{ color: "#4a4540", fontSize: "0.8rem" }}>or</span>
          <hr style={{ flex: 1, border: "none", borderTop: "1px solid #2a2520" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="input-field" placeholder="John Smith" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Photo URL (optional)</label>
            <input type="url" name="photoUrl" className="input-field" placeholder="https://example.com/photo.jpg" value={form.photoUrl} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="input-field" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirm" className="input-field" placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-gold" style={{ padding: "0.9rem", marginTop: "0.5rem" }} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#8a7f74", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#c9a96e" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}