import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TileArt Gallery",
  description: "Premium tile gallery — browse ceramic, marble, terracotta and mosaic tiles from artisans around the world.",
  icons: {
icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%23c9a96e'/><rect x='10' y='10' width='37' height='37' rx='4' fill='%23a07840'/><rect x='53' y='10' width='37' height='37' rx='4' fill='%23a07840'/><rect x='10' y='53' width='37' height='37' rx='4' fill='%23a07840'/><rect x='53' y='53' width='37' height='37' rx='4' fill='%23a07840'/></svg>",  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e1a17",
              color: "#f0ebe3",
              border: "1px solid #2a2520",
            },
          }}
        />
      </body>
    </html>
  );
}