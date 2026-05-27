# Trendy Fortune — Overseas Recruitment & Visa Consultancy Website

Trendy Fortune is a modern, premium, highly conversion-focused single-page marketing and lead-generation website built for overseas recruitment, manpower supply, and visa consulting operations. Designed with a mobile-first philosophy, fluid responsive layouts, clean shadows, global connections vector aesthetics, and validated data collection pathways.

---

## 🚀 Key Features

* **Interactive Single-Page Layout**: Seamless anchor-link navigation across Home, Jobs Abroad, Services, About, and Contact.
* **Modern Brand Aesthetics**: Built with premium corporate Navy base (`#0B192C`), Gold accent (`#B6925B`), and Emerald WhatsApp highlight details.
* **Simulated Loading Skeletons**: Integrated mount state timers demonstrate how standard layout segments (Hero, country grids, forms) look while fetching backend APIs.
* **Advanced Multi-Tab Leads Form**: Fully validated candidate registration and company request cards leveraging Zod and React Hook Form.
* **Loose-Coupled Pre-selection Event**: Clicking "Apply Now" on country cards scrolls automatically and fills in the corresponding drop-down option in the Lead form.
* **Government Recruitment Licence display**: Visual validation tags reinforcing consultancy credibility.
* **Full SEO Metadata Integration**: Utilizes Next.js Metadata API and structured JSON-LD schema markup (`EmploymentAgency`) for superior local SEO indexing.
* **Multilingual Support (i18n)**: Professional, localized translation for 5 target regional languages (English, Hindi, Bangla, Tamil, Malayalam) with seamless deferred rendering to avoid hydration mismatches.
* **Floating CSS-Only Country Flag Marquee**: A lightweight, zero-dependency, infinite-loop flag slider displaying 14 target countries with full pause-on-hover interaction capabilities.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 (configured inside `globals.css` with `@theme`)
* **Animations**: Framer Motion (reveal grids, mobile drawer slider, bouncing floaters)
* **Forms & Validation**: React Hook Form, Zod, and `@hookform/resolvers`
* **Icons**: Lucide React

---

## 📂 Project Directory Structure

```
TrendyFortune/
├── docs/                             # Full architectural & guide documentations
│   ├── ARCHITECTURE.md               # Technical decisions, theme variables
│   ├── SEO.md                        # Next.js Metadata API, JSON-LD Schema details
│   ├── FORMS.md                      # Form hooks, Zod validation, backend integration guide
│   ├── CONTENT-EDITING.md            # Simple content manual (editing phone, address, etc.)
│   ├── I18N.md                       # Multilingual setup, client-side translation framework
│   ├── COUNTRIES.md                  # Centralized countries data, zero-dependency flag marquee
│   └── TESTING.md                    # Quality Assurance, automated checks, visual manual testing
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Fonts, Page framing, Metadata API, JSON-LD structure
│   │   ├── page.tsx                  # Single-page compiler, Skeletons mounting state
│   │   └── providers.tsx             # Toast & global context wrappers
│   ├── components/
│   │   ├── ui/                       # Visual primitives (Buttons, input, select, custom tabs, toast)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── skeletons.tsx         # Five reusable pulsing layout loader screens
│   │   ├── Navbar.tsx                # Sticky navbar, responsive mobile dropdown menu
│   │   ├── Hero.tsx                  # Heading display, CTAs, animated global vector SVG
│   │   ├── TrustStrip.tsx            # Corporate credibility indicators
│   │   ├── CountriesSection.tsx      # Country selection grid, auto-preselect hooks
│   │   ├── ServicesSection.tsx       # Core service lines
│   │   ├── IndustrySection.tsx       # 8 major sectors served
│   │   ├── HowItWorks.tsx            # Deployment timeline stages
│   │   ├── SplitCTA.tsx              # Candidate / Business segmented CTA banners
│   │   ├── LeadForm.tsx              # Job Seeker & Employer lead forms
│   │   └── ContactSection.tsx        # Physical coordinates, Google Map wrapper, direct tel/mail anchors
│   ├── constants/
│   │   └── index.ts                  # Centralized content repository (edit phone, email, lists here)
│   ├── lib/
│   │   └── utils.ts                  # Class-merging Tailwind helper
│   └── schemas/
│       └── formSchemas.ts            # Type-safe Zod schema definitions
├── tailwind.config.ts                # Tailwind metadata configurations
├── tsconfig.json
├── package.json
└── README.md                         # This file
```

---

## ⚡ Quick Start

### 1. Pre-requisites
Ensure you have **Node.js (v18.0.0 or higher)** installed on your machine.

### 2. Install Dependencies
Clone the repository and run:
```bash
npm install
```

### 3. Start Development Server
Run the local dev compiler:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Production Build
Verify there are no TypeScript or compilation anomalies:
```bash
npm run build
```

---

## 📈 Vercel Deployment Roadmap

This Next.js application is fully prepared for one-click deployment to **Vercel**:

1. Push this codebase to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: initial production-ready website build"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com).
3. Click **"Add New"** -> **"Project"**.
4. Select the `TrendyFortune` repository.
5. Vercel automatically detects Next.js configurations. Keep default settings.
6. Click **"Deploy"**. The site is live on a secure SSL subdomain within seconds!
