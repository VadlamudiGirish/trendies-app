# Trendies Referral & Social Login

> A Next.js 15 + React 19 application implementing a referral system with social login (GitHub & Google) and a modern UI powered by Tailwind CSS, Mantine, Framer Motion, and PostgresDB using Prisma.

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Live Demo](#live-demo)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
   - [Referral System](#referral-system)
   - [Social Login](#social-login)
5. [Project Structure](#project-structure)
6. [Setup & Installation](#setup--installation)
7. [Running Locally](#running-locally)
8. [Usage](#usage)
9. [Deployment (Vercel)](#deployment-vercel)
10. [Suggested Improvements](#suggested-improvements)

---

## 📝 Introduction

This project implements the **Referral System & Social Login** feature for **Trendies**, a luxury resale marketplace. Users can:

- Generate a unique referral link on sign-up.
- Refer new users and automatically credit the referrer.
- Sign in using GitHub or Google OAuth.
- See an animated, real-time dashboard of their referral count.

---

## 🌐 Live Demo

▶️ https://trendies-app.vercel.app

---

## 🧰 Tech Stack

- **Next.js 15** (Turbopack)
- **React 19**
- **Prisma** + PostgreSQL
- **NextAuth.js** (JWT sessions, Prisma adapter)
- **Tailwind CSS** & **Mantine** for styling
- **Framer Motion** for animations
- **Vercel** for hosting

---

## 🚀 Features

### Referral System

1. **Landing & Cookie**

   - Visiting `/signup?ref=<code>` sets a 24-hour, HttpOnly `referral=<code>` cookie.

2. **Login Preservation**

   - Header’s `handleLogin` grabs any `ref` query and writes it into the same cookie before triggering OAuth.

3. **Credit Logic (`/api/dashboard`)**

   - Authenticates via `getServerSession`.
   - Reads `referral` from cookies.
   - If the logged-in user has never been referred and `referral` ≠ their own code:
     - In one Prisma `$transaction`:
       1. `user.referredBy = referrer.id`
       2. `referrer.referredCount += 1`
   - Clears the cookie so it never fires again.
   - Returns your own `referralCode` and updated `referredCount`.

4. **Instant UI Update**
   - The dashboard’s SWR hook uses `mutate()` in a `useEffect` so the new count appears immediately after crediting.

### Social Login

- Dynamically fetches providers via `getProviders()`.
- Renders OAuth buttons for **GitHub** and **Google**, complete with official SVG icons.
- Fully client-driven in the sticky header—no separate sign-in page needed.
- After OAuth callback, users are redirected to `/` and can navigate to `/dashboard`.

---

## 📂 Project Structure

```text
.
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ pages/
│  │  ├─ api/
│  │  │  ├─ auth/[…nextauth].ts    # NextAuth handler
│  │  │  ├─ signup.ts                # sets referral cookie
│  │  │  └─ dashboard.ts             # credit logic + JSON API
│  │  ├─ _app.tsx                    # global providers + layout
│  │  ├─ index.tsx                   # landing page
│  │  ├─ signup.tsx                  # client redirect to /api/signup
│  │  └─ dashboard.tsx               # SWR dashboard UI
│  ├─ components/
│  │  ├─ Header.tsx                  # sticky header + OAuth UI
│  │  ├─ Footer.tsx                  # site footer
│  │  └─ CopyInput.tsx               # animated copy-link card
│  ├─ lib/
│  │  ├─ auth.ts                     # NextAuth options & callbacks
│  │  └─ prisma.ts                   # Prisma client instance
│  └─ styles/
│     └─ globals.css
├─ .env.local
├─ tailwind.config.ts
├─ postcss.config.js
└─ package.json
```

---

## ⚙️ Setup & Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/YourUsername/trendies-app.git
   cd trendies-app
   npm install
   ```
2. **Environment Variables**

   ```text
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your-random-secret>
   GITHUB_CLIENT_ID=<github-id>
   GITHUB_CLIENT_SECRET=<github-secret>
   GOOGLE_CLIENT_ID=<google-id>
   GOOGLE_CLIENT_SECRET=<google-secret>
   ```

3. **Database Migrations**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

---

## ▶️ Running Locally

```bash
npm run dev
```

- Visit http://localhost:3000
- API endpoints:
- Dashboard data: GET /api/dashboard
- Set referral cookie: GET /api/signup?ref=<>

## 🖥️ Usage

    1. Visit Landing
        - See marketing hero and “Login with…” button in header.
    2. Share Referral
        - Copy your link from the Dashboard → others hit /signup?ref=….
    3. Sign In
        - Authenticate via GitHub or Google.
    4. Dashboard
        - First visit triggers database credit; your referrer count increments.
        - Animated “Copy Link” card and live counter update instantly.

---

## 📦 Deployment (Vercel)

    1. Push to GitHub.
    2. Import project in Vercel.
    3. In Settings → Environment Variables, add the same keys from your .env.local.
    4. Vercel will run your prepare script to generate Prisma Client automatically.

---

## 💡 Suggested Improvements

    1. More Providers
        - Add Apple, Facebook, etc., by installing additional NextAuth providers.
    2. Abuse Protection
        - Rate-limit /signup?ref= to prevent fraudulent visits.
    3. Email Notifications
        - Send “Thanks for referring!” emails via a serverless function.
    4. Analytics Dashboard
        - Add charts (Recharts) showing referral trends and conversion rates.

---
