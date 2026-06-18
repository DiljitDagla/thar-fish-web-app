# Thar Fish — Complete Demo Website

A premium, investor-ready demo for **Thar Fish Hatchery Rathore Farm** (Raner, Bikaner, Rajasthan) — a digital platform for fish hatchery, fish farming, aquaculture consultancy, fish sales, and a lakeside eco-resort.

Everything runs on **mock/local data** — no backend required.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + custom shadcn/ui-style component library
- **Recharts** for analytics charts
- **Lucide** icons
- Auth + cart persisted in **localStorage**

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Demo Logins

| Role  | Email                | Password   | Lands on       |
| ----- | -------------------- | ---------- | -------------- |
| Admin | `admin@tharfish.com` | `admin123` | `/admin` panel |
| User  | `user@tharfish.com`  | `user123`  | `/dashboard`   |

On the login page you can click a demo card to autofill credentials.

## What's Inside

### User Portal (top-nav site)
- **Home Dashboard** — hero, quick stats, featured services, gallery preview, testimonials, news, contact CTA
- **Marketplace** — 6 fish species with search/filter/sort and add-to-cart
- **Cart** — quantity controls, order summary, mock checkout
- **Tourism & Resort** — 5 packages with a mock booking flow
- **Consultancy** — 6 services + enquiry form (saved to localStorage)
- **About** — story, mission/vision, journey timeline, sustainability
- **Gallery** — filterable categories with lightbox
- **Contact** — info cards, message form, embedded map

### Admin Panel (sidebar dashboard)
- **Dashboard** — 6 KPI cards + 6 Recharts visualizations + recent orders
- **Orders** — 1,080 orders, searchable/filterable, paginated
- **Fish Inventory** — full add / edit / delete CRUD
- **Pond Management** — 15 ponds, visual cards, full CRUD
- **Hatchery** — batch tracking with growth stage & mortality
- **Customers** — 524 customers, search + status filter
- **Resort Bookings** — 56 bookings with status filter
- **Enquiries** — 214 enquiries with view / mark-completed / delete
- **Reports** — revenue, sales, pond, hatchery, tourism with export buttons
- **Settings** — business, theme (incl. dark mode), notifications, profile tabs

## Demo Data (deterministic, seeded)

524 customers · 1,080 orders · 15 ponds · 6 fish species · 56 resort bookings · 214 enquiries · 12 months of revenue/sales analytics.

Data is generated with a seeded RNG (`src/lib/data.ts`) so server and client render identically.

## Project Structure

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
    admin/                 # sidebar, topbar, charts, KPI, data table
  lib/                     # auth, cart, types, data, images, utils
```

## Theme

Rajasthan + aquaculture palette — Deep Ocean Blue, Aqua Green, Desert Sand, Gold accent — with premium gradients and glassmorphism. Light & dark modes supported.

> Note: imagery is loaded from Unsplash, so an internet connection is needed for photos to appear.
