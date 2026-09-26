# 🌿 Rethread — Sustainable Thrift & Vintage Clothing Marketplace

> **Full Stack JavaScript (MERN) Project**  
> Give clothes a second life. Thrift, sell, and rethread circular fashion.

---

## 📖 Overview

**Rethread** is a modern, eco-conscious e-commerce web application designed to counter fast fashion by enabling users to buy and sell pre-loved, vintage, and thrifted clothes. Every listed garment tracks tangible ecological impact—measuring **clean water conserved** and **CO₂ emissions diverted** from landfills.

---

## 🛠️ Tech Stack

### **Frontend (`client/`)**
- **React (v19)** with **Vite** — High-performance modern UI rendering
- **Tailwind CSS (v3)** — Bespoke earthy, thrift-aesthetic design system
- **Lucide Icons** — Clean, minimalist iconography
- **React Router (v7)** — Client-side SPA routing with protected views
- **Axios** — HTTP client with auto-injecting JWT authorization interceptor
- **React Hot Toast & Canvas Confetti** — Interactive feedback & celebration animations

### **Backend (`server/`)**
- **Node.js** & **Express.js (ES Modules)** — RESTful API architecture
- **MongoDB** & **Mongoose** — Flexible document schema for garments, users, & orders
- **JWT (JSON Web Tokens)** & **Bcrypt.js** — Secure password hashing and token-based authentication
- **Multer** — Multipart image file uploads for seller clothes
- **Morgan & CORS** — Request logging & cross-origin communication

---

## ✨ Standout Features

1. **Circular Fashion & Eco-Impact Tracker**:
   - Automated calculations for water conserved (e.g. ~7,500L per pair of Levi's denim) and carbon offset.
   - Live platform-wide community statistics banner and dedicated `/eco-impact` breakdown.
   - Earn **+20 Eco Points** for listing and **+50 Eco Points** for buying thrifted items.

2. **Thrift Marketplace Catalog (`/shop`)**:
   - Filter by **Category** (*Denim & Jeans, Jackets & Coats, Sweaters & Knits, Vintage & Rare, etc.*).
   - Filter by **Department/Gender** (*Women, Men, Unisex, Kids*).
   - Filter by **Condition Grade** (*Brand New with Tags, Like New, Gently Used, Vintage Distressed*).
   - Dynamic price slider and real-time keyword search.

3. **Curator & Seller Studio (`/sell`)**:
   - Upload clothes via photo file upload or URL.
   - Add garment backstory (*"Why I'm letting this go"*), fabric specs, measurements, and condition notes.
   - Auto-calculated retail discount tags (*"Save 65%"*).

4. **Bag & Checkout Simulation (`/cart`, `/checkout`)**:
   - Real-time subtotal, savings comparison vs. retail, and eco-shipping tiers.
   - Address form with **1-Click Demo Autofill** for fast testing.
   - Instant mock card / net banking and Cash on Delivery (COD) payment gateways.
   - Order confirmation with festive confetti, environmental milestone, and printable receipt.

5. **Customer Reviews & Ratings**:
   - 5-star rating system with verified buyer comments on garments.

6. **Admin Dashboard (`/admin`)**:
   - Total Gross Sales (GMV), Active Listings, and Registered Users.
   - Order management: easily update fulfillment status (*Placed &rarr; Processing &rarr; Shipped &rarr; Delivered*).
   - Moderation tools to review and remove listings or flag accounts.

---

## 🔑 Demo Evaluation Accounts

Three pre-configured accounts are seeded with realistic data for immediate testing:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@rethread.eco` | `password123` | Full access, Admin Dashboard, Order & Product Moderation |
| **Seller** | `aarav@rethread.eco` | `password123` | Vintage curator with pre-seeded active clothes and orders |
| **Buyer** | `priya@rethread.eco` | `password123` | Eco shopper with purchase history and wishlist |

> **Tip:** The Login page includes **1-Click Demo Login** buttons so you don't have to manually type credentials during evaluation!

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** running locally on port `27017` (or MongoDB Atlas URI in `server/.env`)

### 2. Seed Database (One-time Setup)
Populate the database with demo users, reviews, and 12+ fashionable vintage garments:
```bash
npm run seed
```

### 3. Run the Full Application
Start both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
c:\sem3\fsj project\
├── client\                     # React Frontend
│   ├── src\
│   │   ├── api\                # Axios instance with JWT interceptor
│   │   ├── components\         # Navbar, Footer, ProductCard, EcoImpactBanner, ProtectedRoute
│   │   ├── context\            # AuthContext, CartContext, WishlistContext
│   │   ├── pages\              # Home, Shop, ProductDetails, SellItem, Cart, Checkout,
│   │   │                       # OrderSuccess, Orders, Profile, Wishlist, EcoImpact, AdminDashboard, Login, Register
│   │   ├── App.jsx             # Route definitions
│   │   ├── index.css           # Tailwind base styles
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js          # Dev proxy config
│   └── package.json
├── server\                     # Express Backend
│   ├── config\                 # MongoDB connection
│   ├── controllers\            # Auth, Product, Order, User controllers
│   ├── middleware\             # JWT verification, Admin guard, Multer upload, Error handlers
│   ├── models\                 # User, Product, Order schemas
│   ├── routes\                 # API routes (/api/auth, /api/products, /api/orders, /api/users, /api/upload)
│   ├── utils\                  # Seeder script & JWT generator
│   ├── uploads\                # Local uploads folder for clothing photos
│   ├── .env                    # PORT, MONGO_URI, JWT_SECRET
│   ├── server.js               # Entrypoint
│   └── package.json
├── package.json                # Root scripts (concurrently)
└── README.md
```

---

## 📡 REST API Summary

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`, `PUT /api/auth/profile`
- **Products**: `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`, `GET /api/products/featured`, `GET /api/products/eco-impact`, `POST /api/products/:id/reviews`
- **Orders**: `POST /api/orders`, `GET /api/orders/my-orders`, `GET /api/orders/seller-orders`, `GET /api/orders/:id`, `PUT /api/orders/:id/status`, `GET /api/orders` (Admin)
- **Users**: `GET /api/users/wishlist`, `POST /api/users/wishlist/:id`, `GET /api/users` (Admin), `DELETE /api/users/:id` (Admin)
- **Upload**: `POST /api/upload` (Single image), `POST /api/upload/multiple`
