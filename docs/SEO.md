# Search Engine Optimization (SEO) & Accessibility (A11y) Strategy

This document details the search engine configurations, local schema structures, semantic headings, and accessibility implementations that guarantee high-ranking capabilities for **Trendy Fortune**.

---

## 📈 Metadata API Settings (`src/app/layout.tsx`)

We utilize the Next.js **Metadata API** for type-safe header injections. This prevents client-side shifts and allows search bots to scrape metadata without parsing javascript.

```typescript
export const metadata: Metadata = {
  title: "Trendy Fortune | Overseas Recruitment & Manpower Consultancy",
  description: "Trendy Fortune provides premium overseas job placement...",
  keywords: ["overseas recruitment agency", "manpower consultancy", "Gulf jobs"...],
  alternates: {
    canonical: "https://www.trendyfortune.com"
  },
  robots: {
    index: true,
    follow: true
  }
}
```

### Structured SEO Fields
1. **Canonical URLs**: Declared explicitly to prevent duplicate crawling penalties from search engines if duplicate domain redirects occur.
2. **OpenGraph & Twitter Cards**: Configured with custom og-image previews, dimensions, and cards to look outstanding when links are shared on LinkedIn, WhatsApp, or Facebook.
3. **Robots direct indexing**: Tells bots to index the main landing and follow all anchor trees for internal weights.

---

## 🏢 Local Business Structured Schema (JSON-LD)

To establish immediate credibility with Google Search, a structured **JSON-LD Schema** representing an `EmploymentAgency` is embedded in the layout head. This enables rich search snippets in Google local search results.

```json
{
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "name": "Trendy Fortune",
  "telephone": "+91 9220809078",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No. 42, Sector 11, CBD Belapur",
    "addressLocality": "Navi Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400614",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.028387,
    "longitude": 73.016335
  }
}
```

* **SEO Impact**: Google reads coordinates, operational hours, official licences, and contact details to verify the business as an active, legitimate local recruitment office.

---

## 🏗️ Semantic HTML Hierarchy

Search bots rely on hierarchical heading trees to understand the semantic flow of copywriting. We strictly enforce:

* **Singular `<h1>`**: Main H1 is placed exclusively on the Hero section:
  * `<h1>Overseas Recruitment & Manpower Solutions You Can Trust</h1>`
* **Sequential `<h2>` Hierarchy**: Every subsequent page section uses an `<h2>` for its primary title block:
  * `<h2>International Locations We Recruit For</h2>` (Countries)
  * `<h2>Professional Manpower & Recruitment Services</h2>` (Services)
  * `<h2>Empowering Key Global Sectors</h2>` (Industries)
  * `<h2>Submit Your Inquiry Today</h2>` (Lead Form)
* **`<h3>` Child Subsections**: Specific item headers use `<h3>`:
  * Card names, individual steps in timelines, and contact column blocks.

---

## ♿ Accessibility (A11y) Best Practices

A premium website must be usable by everyone. We implement:

1. **ARIA Labels**: Descriptive labels (`aria-label`, `aria-expanded`) placed on mobile menu buttons, interactive form buttons, and map iframes to support screen readers.
2. **Tab Navigation Focus**: Form inputs, select dropdowns, custom tab triggers, and button variants implement custom focus rings (`focus-visible:ring-2 focus-visible:ring-[#0B192C]`) to maintain visual clarity for keyboard navigators.
3. **Interactive element sizing**: Buttons and navigation triggers are designed with standard touch targets (minimum `h-11` or `h-12`) to prevent accidental clicks on mobile screens.
4. **Contrast Integrity**: High contrast borders (`border-slate-200`) and dark text colors on light backgrounds satisfy standard AAA visibility guidelines.
