# Thar Fish — Project Build Summary

A record of everything built for the **Thar Fish — Complete Demo Website**, from the spec in `THAR FISH - COMPLETE DEMO WEBSITE.txt`.

- **Project location:** `D:\Projects\THAR-FISH\TharFishWeb\thar-fish`
- **Status:** ✅ Complete — builds clean (0 errors, 0 warnings), all 24 routes serve, login verified working
- **Type:** Front-end only demo — mock/local data, no backend

---

## 1. Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | Custom shadcn/ui-style library (built on Radix primitives) |
| Charts | Recharts |
| Icons | Lucide |
| State / Session | React Context + `localStorage` |

> The referenced `pcp-citizen-portal` uses Next.js but with Ant Design. I followed the spec's explicit stack (Tailwind + shadcn + Recharts) instead of PCP's component library.

---

## 2. How to Run

```bash
cd D:\Projects\THAR-FISH\TharFishWeb\thar-fish
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build (fast, no compile delays)
```

### Demo Logins
| Role | Email | Password | Lands on |
| --- | --- | --- | --- |
| Admin | `admin@tharfish.com` | `admin123` | `/admin` |
| User | `user@tharfish.com` | `user123` | `/dashboard` |

Click a demo card on the login page to autofill.

---

## 3. What Was Built

### Foundation
- Scaffolded Next.js 15 project (`create-next-app`) with TypeScript, Tailwind, ESLint, `src/` dir, `@/*` alias
- Custom design system in `globals.css` — Rajasthan + aquaculture palette (Deep Ocean Blue, Aqua Green, Desert Sand, Gold), light + dark mode, gradients, glassmorphism, animations
- `next.config.ts` configured for Unsplash remote images

### UI Component Library (`src/components/ui/`)
button · card · input · textarea · label · badge · table · dialog · dropdown-menu · tabs · select · switch · avatar · separator · progress · toast (custom provider)

### Core Libraries (`src/lib/`)
- `types.ts` — all domain types
- `data.ts` — **seeded** deterministic mock data generator (no hydration mismatches)
- `images.ts` — curated Unsplash imagery + gallery catalog
- `auth.tsx` — AuthProvider, role-based login, localStorage session
- `cart.tsx` — CartProvider, localStorage cart
- `utils.ts` — `cn()`, currency/number/date formatters

### Auth & Routing
- `/login` — split-screen glassmorphism login with branding, hero image, live stats, demo-account cards
- Root `/` — redirects by auth state/role
- `AuthGuard` — protects routes, role-aware redirects

### User Portal — `src/app/(site)/` (navbar + footer)
| Route | Highlights |
| --- | --- |
| `/dashboard` | Hero, quick stats, featured services, gallery preview, testimonials, news, contact CTA |
| `/marketplace` | 6 fish species, search/filter/sort, add-to-cart |
| `/cart` | Quantity controls, GST/delivery summary, mock checkout |
| `/tourism` | 5 resort packages, mock booking dialog |
| `/consultancy` | 6 services + enquiry form (saved to localStorage) |
| `/about` | Story, mission/vision, journey timeline, sustainability |
| `/gallery` | Category filter + lightbox |
| `/contact` | Info cards, message form, embedded map |

### Admin Panel — `src/app/admin/` (sidebar + topbar, breadcrumbs, notifications, dark-mode toggle)
| Route | Highlights |
| --- | --- |
| `/admin` | 6 KPI cards + 6 Recharts charts + recent orders |
| `/admin/orders` | 1,080 orders, search + payment filter, pagination |
| `/admin/inventory` | Fish CRUD (add / edit / delete) |
| `/admin/ponds` | 15 ponds, visual cards, full CRUD |
| `/admin/hatchery` | Batch tracking, growth stage, mortality |
| `/admin/customers` | 524 customers, search + status filter |
| `/admin/bookings` | 56 resort bookings, status filter |
| `/admin/enquiries` | 214 enquiries — view / mark completed / delete |
| `/admin/reports` | Revenue, sales, pond, hatchery, tourism + export buttons |
| `/admin/settings` | Business / Theme / Notifications / Profile tabs |

### Admin building blocks (`src/components/admin/`)
sidebar · topbar · page-header · kpi-card · charts (6 Recharts wrappers) · data-table (reusable: search + pagination)

---

## 4. Demo Data (deterministic, seeded)

524 customers · 1,080 orders · 15 ponds · 6 fish species · 56 resort bookings · 214 enquiries · 12 months of revenue/sales/growth analytics. Realistic Rajasthan content — no lorem ipsum.

---

## 5. Verification Done

- `tsc --noEmit` — passes
- `next build` — compiles clean, all 24 pages prerender, 0 warnings
- Dev server smoke test — all 24 routes return HTTP 200, no runtime errors
- **Login flow verified with Playwright** — admin → `/admin`, user → `/dashboard` (both redirect correctly)

---

## 6. Issue Investigated & Resolved

**Reported:** "Says *Welcome back* but doesn't redirect."

**Root cause:** Not a bug — Next.js **dev mode compiles each page on first visit** (the dashboard took ~40s the first time). After "Welcome back," the redirect was waiting on that compile, so it looked stuck.

**Confirmed:** Playwright test showed both logins redirect correctly with no errors.

**Fix applied:** The login button now stays in the "Signing in…" spinner state through the redirect (instead of flashing "Welcome back" and going idle), giving clear feedback during the first-load compile. Subsequent navigations are ~300ms.

> Tip: a production build (`npm run build` + `npm start`) has no compile delays.

---

## 7. Project Structure

```
src/
  app/
    login/                 # glassmorphism login
    (site)/                # user portal (navbar + footer)
      dashboard, marketplace, cart, tourism,
      consultancy, about, gallery, contact
    admin/                 # admin panel (sidebar + topbar)
      orders, inventory, ponds, hatchery, customers,
      bookings, enquiries, reports, settings
  components/
    ui/                    # shadcn-style primitives
    site/                  # navbar, footer, section headings
    admin/                 # sidebar, topbar, charts, kpi, data-table
    brand.tsx, providers.tsx, auth-guard.tsx
  lib/                     # auth, cart, types, data, images, utils
```

---

## 8. Known Cosmetic Warnings (non-blocking)

- `next/image` `fill` images missing a `sizes` prop (performance hint only)
- Recharts logs a transient `width(-1)` message before the container measures (harmless)

Both are cosmetic and can be silenced on request.

## 9. Possible Next Steps

- Swap Unsplash URLs for bundled local images (fully offline)
- Silence the cosmetic warnings
- Wire real APIs / database behind the existing mock data layer
- Deploy (Vercel) for a shareable client link
