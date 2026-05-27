# Quality Assurance & Testing Protocol

This document outlines the testing strategy, compile-time assertions, linting instructions, and manual QA validation protocols implemented to ensure the highest standards of reliability and visual excellence for **Trendy Fortune**.

---

## 🤖 1. Automated Validations (Compile & Build Checks)

Before pushing any changes to source control or staging, run the following automated pipeline in order:

### A. Static Code Quality & Lint Validation
To guarantee that the codebase complies with strict Next.js App Router rules and React 19 standards, run:
```bash
npm run lint
```
* **Critical Pass Checks**:
  - No synchronous `setState` in effect warnings (`react-hooks/set-state-in-effect`).
  - No unused imports or variables (`@typescript-eslint/no-unused-vars`).
  - Correct hoisting of definitions (e.g., in `toast.tsx` components).
  - Explicit typing across interfaces and props (no arbitrary `any` fallbacks).

### B. Next.js Production Compilation
To verify standard SSR/SSG rendering, routing, static optimization, and asset resolution, run a production build:
```bash
npm run build
```
* **Critical Pass Checks**:
  - Production bundles compiled without type constraints or syntax regressions.
  - Page generation checks: `/` and `/_not-found` are exported successfully.
  - Zero hydration exceptions during building.

---

## 🔍 2. Manual Visual & Functional QA Protocols

Since Trendy Fortune targets rural Indian users who may operate on **low-end Android devices** and **slower 3G/4G networks**, testing must include performance and UX audits.

### Protocol A: Hydration & Rendering Smoothness
1. Set Chrome Developer Tools Network throttle to **"Fast 3G"** or **"Slow 3G"**.
2. Refresh the homepage (`/`).
3. **Verify**:
   - The 1.2-second static skeletal layouts (`src/components/ui/skeleton.tsx`) are visible immediately and pulse in place.
   - The user interface loads without structural shifts.
   - After the mount timer completes, components fade in smoothly (`transition-opacity duration-500`).
   - Text elements load without hydration jumps.

### Protocol B: Multi-Language Switcher Interactions
1. **Desktop View**:
   - Hover over the Language dropdown in the header navbar.
   - Select each language: **Hindi** (हिन्दी), **Bangla** (বাংলা), **Tamil** (தமிழ்), **Malayalam** (മലയാളം).
   - Verify that fonts dynamically load Noto fallbacks with clean line-heights.
   - Verify that the dropdown stays open when hovered and closes immediately on selection or hover-out.
   - Try keyboard navigation: press `Tab` to focus, use arrow keys to navigate options, and press `Enter` to switch.
2. **Mobile View**:
   - Shrink the viewport to mobile width (<768px).
   - Open the hamburger menu drawer.
   - Verify that the Language Selector is displayed as a clean, highly accessible grid.
   - Select a language and confirm the sidebar closes seamlessly, updating the page instantly.

### Protocol C: Dynamic Regional WhatsApp Encoding
1. Switch to a non-English language (e.g. Malayalam).
2. Find any CTA or WhatsApp button (such as in the Hero or Split CTA).
3. Hover over the link or click it.
4. **Verify**:
   - The WhatsApp link encodes a translated custom prefix (e.g., for Hindi: `https://wa.me/91XXXXXXXXXX?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5...`).
   - The target phone number remains correct.
   - On mobile, it triggers the WhatsApp application directly.

### Protocol D: Country Flag Marquee & View Jobs Action
1. Scroll down to the country flag carousel section.
2. **Verify**:
   - The marquee moves horizontally in a smooth, seamless infinite loop.
   - Hovering over any card immediately pauses the marquee motion (`animation-play-state: paused`).
   - The card scales up slightly with a gold border shadow, highlighting job category badges.
   - Pressing "View Jobs" on a country card:
     - Opens `/jobs/[country-slug]` in a **new tab** (`target="_blank"`).
     - Does not cause the parent page to scroll to the top or jump.
     - Performs with zero rendering latency.

---

## 📝 3. QA Checklist Registry

Keep this checklist recorded for each release iteration:

- [x] Lint validations complete with zero errors.
- [x] Production compilation is successful without errors.
- [x] Hydration skeletons render correctly during network throttling.
- [x] All 5 languages render legible typography across both desktop and mobile screens.
- [x] Language dropdown is fully keyboard accessible (meets WCAG requirements).
- [x] WhatsApp messaging strings are correctly localized and URL-encoded.
- [x] Flag marquee paused state activates correctly on mouse hover.
- [x] Country card "View Jobs" buttons open target paths in separate tabs (`target="_blank"`).
