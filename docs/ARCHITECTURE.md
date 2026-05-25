# Architectural Overview & Technical Design Decisions

This document outlines the software engineering patterns, tech stack justifications, design system choices, and component architecture implemented in the **Trendy Fortune** website.

---

## 🛠️ Technological Foundations

### 1. Next.js 15+ App Router
* **Justification**: App Router leverages React Server Components (RSC) to render lightning-fast static layouts directly on the server, offloading runtime weight from browsers. Below-the-fold sections and static content can render instantly.
* **Component Split**:
  * **Server Context**: Basic layouts and SEO header configurations are built statically.
  * **Client Context (`"use client"`)**: Pages and specific blocks that use interactivity (smooth anchors, form validation, tabs, responsive sliding nav drawers, mounting delayed timers) are marked as client modules.

### 2. React 19 & Strict TypeScript
* **Justification**: Compiles clean, optimized production bundles. Type safety across models (Countries, Services, Form Schemas) guarantees that text modifications or structural expansions won't trigger silent JavaScript execution faults.

### 3. Tailwind CSS v4
* **Justification**: Uses modern CSS compiler modules. Tailored `@theme` configurations compile variables directly into the native CSS pipeline (`src/app/globals.css`), eliminating overhead from classic JS configs and speeding up compilation times.

---

## 🎨 Visual Design System & Brand Palette

The branding guidelines target a **highly trustworthy, credible, premium international feel**:

* **Clean Backgrounds**: Mostly pure whites (`#ffffff`) and slate-50 blocks (`#f8fafc`) to emulate professional global recruitment dashboards.
* **Primary base (Navy)**: `--color-navy-900: #0B192C` (highly corporate, credible deep blue) and `--color-navy-700: #1E3E62`.
* **Accent highlights (Gold)**: `--color-gold-600: #B6925B` (Premium gold metallic sheen for tags, buttons, icons, highlights).
* **Positive Actions (Emerald)**: `--color-emerald-500: #10B981` (Specifically reserved for conversion targets: WhatsApp floating buttons, success ticks, and positive toasting).
* **Typography**:
  * Headings & Brand Logos: **Outfit** (Elegant, modern geo-geometry).
  * Informative Body text: **Inter** (Industry-standard readability).

---

## ⚙️ Mounting State Skeletons (Simulated API Pipeline)

To adhere to senior software design practices and facilitate future API hooks, we implemented a simulated mount pipeline:

```
[Page Mounts] ──> [useEffect Triggers 1.2s delay] ──> [Render Skeletons]
                                                               │
                                                               ▼
[Static Components Mounted] <── [Smooth Fade-in Animation] <── [Set Loading = False]
```

* **Skeleton Primitives (`src/components/ui/skeletons.tsx`)**: Reusable components pulsing in place of the Hero block, the Country Grid, the Services columns, and the Lead Form.
* **Future Upgrade**: When you hook up a real database (like Supabase) to pull vacancies or countries dynamically:
  1. Simply replace `isLoading` state hook with a standard React Query or standard `fetch()` await response.
  2. The exact same skeleton layouts will automatically cover page loads while async requests are active!

---

## ✨ Micro-Animations & Interactivity

Animations are kept **subtle, elegant, and non-distracting** to preserve professional integrity:
* **Entrance Effects**: Grid cards slide in sequentially using Framer Motion's `whileInView` and structured staggered delays.
* **Interactive Scales**: Primary CTA buttons scale down slightly on clicks (`active:scale-[0.98]`) to give rich tactile feedback.
* **Bouncing Floaters**: The floating WhatsApp floater in the bottom corner utilizes a soft, continuous bounce keyframe to invite dialogue without distracting readers.
* **Glassmorphism Blur**: The sticky navbar implements a glassmorphism backing (`backdrop-filter: blur(12px)`) that merges seamlessly with underlying content during scroll sweeps.
