# TileArt Gallery

## Project Purpose
A premium tile gallery website to showcase and discover beautiful tiles from around the world. Users can browse ceramic, marble, terracotta, mosaic, and designer tiles with detailed information.

## Live URL
[TileArt Gallery](https://your-live-url.vercel.app)

## Key Features
- 🏠 Home page with hero banner and featured tiles slider
- 🔍 Search tiles by title on All Tiles page
- 🔐 User authentication (Email/Password + Google OAuth)
- 👤 My Profile page with update functionality
- 📱 Fully responsive on mobile, tablet, and desktop
- 🎨 Unique luxury dark gold design theme
- ✨ Smooth animations and transitions
- 🔒 Private routes for tile details and profile
- 📄 Not-found page for invalid routes
- ⏳ Loading spinner on data fetching

## Pages
| Page | Route | Access |
|------|-------|--------|
| Home | / | Public |
| All Tiles | /all-tiles | Public |
| Login | /login | Public |
| Register | /register | Public |
| Tile Details | /tile/[id] | Private |
| My Profile | /my-profile | Private |
| Update Profile | /update-profile | Private |

## NPM Packages Used
| Package | Purpose |
|---------|---------|
| better-auth | Authentication |
| mongoose | MongoDB connection |
| react-hot-toast | Toast notifications |
| swiper | Featured tiles slider |
| json-server | Mock API for tile data |
| next | React framework |
| typescript | Type safety |
| tailwindcss | Styling |

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Authentication:** BetterAuth with MongoDB Adapter
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS + Custom CSS
- **UI Library:** Custom components with DaisyUI concepts
- **Animation:** SwiperJS + CSS Animations

## Environment Variables