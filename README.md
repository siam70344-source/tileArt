# 🎨 TileArt Gallery

**TileArt** is a premium tile gallery web application showcasing ceramic, marble, terracotta, and mosaic tile designs from artisans around the world. Users can browse collections, view details, and explore artisan profiles.

🔗 **Live Site:** [tiles-art01.vercel.app](https://tiles-art01.vercel.app/)
🔗 **Repository:** [tileArt](https://github.com/SafayatCode/tileArt.git)

<!-- ![TileArt Screenshot](./screenshot.png) -->
> 📸 *Add a screenshot of the homepage here (screenshot.png) once available.*

---

## ✨ Key Features

- 🖼️ **Tile Gallery** — Browse a curated collection of ceramic, marble, terracotta, and mosaic tile designs
- 🔎 **Search & Filter** — Explore tiles by category, material, or artisan
- 👤 **Artisan Profiles** — View details about the artisans behind each design
- 🔐 **User Authentication** — Secure login/register powered by Better Auth
- ✨ **Toast Notifications & Animations** — Smooth UI feedback and transitions
- ⚡ **Fast Performance** — Built with Next.js (App Router) for optimized loading and SEO

---

## 🛠️ Tech Stack

**Framework:** Next.js 16, React 18
**Database:** MongoDB (Mongoose)
**Authentication:** Better Auth
**Styling/UI:** Animate.css, React Hot Toast
**Deployment:** Vercel

---

## 📦 Dependencies

```json
"animate.css": "^4.1.1",
"better-auth": "^1.2.7",
"kysely": "^0.27.4",
"mongoose": "^8.0.0",
"next": "^16.2.9",
"react": "^18.3.1",
"react-dom": "^18.3.1",
"react-hot-toast": "^2.4.1"
```

---

## 🚀 Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/SafayatCode/tileArt.git
cd tileArt
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` (or `.env.local`) file with:

```
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

> ⚠️ Update these variable names to match exactly what your project's Better Auth and MongoDB setup expects.

**4. Run the development server**

```bash
npm run dev
```

**5. Open in browser**

```
http://localhost:3000
```

---

## 🔗 Links

- 🌐 Live Site: [tiles-art01.vercel.app](https://tiles-art01.vercel.app/)
- 💻 Repository: [tileArt](https://github.com/SafayatCode/tileArt.git)
