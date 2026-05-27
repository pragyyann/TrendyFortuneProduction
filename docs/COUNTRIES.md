# Country Data Management & Flag Marquee Architecture

This document covers the centralized database structure for target recruitment countries, the slug mapping system, and the zero-dependency infinite CSS marquee animation implemented in the **Trendy Fortune** portal.

---

## 🗺️ Centralized Country Database

To keep code robust, modular, and maintainable, all data about destination countries is stored centrally in [countries.ts](file:///c:/Users/pragy/OneDrive/Desktop/TrendyFortune/src/data/countries.ts). This avoids duplication across the Flag Marquee and the Country Grid sections.

### The Country Schema
Every country is defined using the strict TypeScript interface `CountryData`:

```typescript
export interface CountryData {
  name: string;        // Readable name (e.g. "Czech Republic")
  countryCode: string; // ISO 3166-1 alpha-2 code for SVG flags (e.g. "CZ")
  slug: string;        // URL-friendly identifier (e.g. "czech-republic")
  description: string; // Brief, localized marketing summary of vacancy types
  popularJobs: string[]; // Top 4 high-demand job categories
  jobsUrl: string;     // URL path to specific vacancies (opens in a new tab)
}
```

---

## 🇨🇳 Target Countries Directory

Currently, Trendy Fortune manages job streams across **14 key destination countries** spanning the Middle East, Eastern Europe, Central Asia, and Southeast Asia:

| Country Name | ISO Code | Slug | Popular Sectors | Target Link (`jobsUrl`) |
| :--- | :--- | :--- | :--- | :--- |
| **UAE** | `AE` | `uae` | Construction, Hospitality, Security, Logistics | `/jobs/uae` |
| **Russia** | `RU` | `russia` | Welding, Machinery, Construction, Factory Work | `/jobs/russia` |
| **Oman** | `OM` | `oman` | Logistics, Healthcare, Engineering, Hospitality | `/jobs/oman` |
| **Bulgaria** | `BG` | `bulgaria` | Agriculture, Manufacturing, Logistics, Construction | `/jobs/bulgaria` |
| **Serbia** | `RS` | `serbia` | Construction, Carpentry, Electrical, Metal Work | `/jobs/serbia` |
| **Uzbekistan** | `UZ` | `uzbekistan` | Civil Engineering, Masonry, Rigging, Heavy Equipment | `/jobs/uzbekistan` |
| **Ukraine** | `UA` | `ukraine` | Agriculture, Construction, General Labor, Logistics | `/jobs/ukraine` |
| **Czech Republic** | `CZ` | `czech-republic` | Warehouse, Automotive Assembly, Forklift, Packaging | `/jobs/czech-republic` |
| **Belarus** | `BY` | `belarus` | Factory Work, Agriculture, Food Processing, Welding | `/jobs/belarus` |
| **Malaysia** | `MY` | `malaysia` | Manufacturing, Hospitality, Agriculture, Services | `/jobs/malaysia` |
| **Mauritius** | `MU` | `mauritius` | Tourism, Textile Industry, Culinary Arts, Retail | `/jobs/mauritius` |
| **Fiji** | `FJ` | `fiji` | Hotel Staff, Retail Sales, Construction, Farming | `/jobs/fiji` |
| **Vietnam** | `VN` | `vietnam` | Electronics Assembly, Garments, Teaching, Tech Support | `/jobs/vietnam` |
| **Saudi Arabia** | `SA` | `saudi-arabia` | Construction, Healthcare, Manufacturing, Engineering | `/jobs/saudi-arabia` |

---

## 🎠 Floating Country Flag Marquee Component

To capture candidates' attention, the homepage displays a **floating flag marquee** using [CountryFlagMarquee.tsx](file:///c:/Users/pragy/OneDrive/Desktop/TrendyFortune/src/components/CountryFlagMarquee.tsx).

### 1. Architectural Guidelines & Best Practices
- **Strict CSS-Only Loop**: To guarantee that low-end Android mobile phones and high-latency rural connections run smoothly, the animation utilizes **zero JavaScript timers**. The slide mechanism is fully powered by native CSS `@keyframes marquee` transformations inside [globals.css](file:///c:/Users/pragy/OneDrive/Desktop/TrendyFortune/src/app/globals.css).
- **Infinite Carousel Illusion**: To prevent any blank gaps, the list of 14 countries is **duplicated inside the component** (`[...CENTRAL_COUNTRIES, ...CENTRAL_COUNTRIES]`). This creates a seamless, continuous flow when the position resets.
- **Micro-Animations on Interaction**:
  - **Pause on Hover**: Hovering over the marquee card container sets `animation-play-state: paused` to let users read card details easily.
  - **Scale and Sheen**: Cards scale up gently on hover (`hover:scale-105`) with a premium golden ring shadow border.

---

## 🛠️ Adding or Editing Target Countries

Expanding the database is simple, secure, and type-safe:

### Add a New Destination Country
1. Locate [countries.ts](file:///c:/Users/pragy/OneDrive/Desktop/TrendyFortune/src/data/countries.ts).
2. Append a new object to the `CENTRAL_COUNTRIES` array:
   ```typescript
   {
     name: "Poland",
     countryCode: "PL",
     slug: "poland",
     jobsUrl: "/jobs/poland",
     description: "EU-backed manufacturing and logistics opportunities.",
     popularJobs: ["Logistics", "Food Production", "Metal Assembly", "Forklift"]
   }
   ```
3. Save the file. The marquee card and grid interfaces will **instantly render the new country** without requiring any updates to JSX components!
4. The system will load the corresponding flag automatically since it resolves `PL` dynamically from `country-flag-icons`.
