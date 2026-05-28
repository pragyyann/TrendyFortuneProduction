"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CENTRAL_COUNTRIES } from "@/data/countries";

interface MapMarker {
  name: string;
  slug: string;
  jobsUrl: string;
  countryCode: string;
  /** Percentage-based position over the SVG map area */
  x: number;
  y: number;
  /** SVG viewBox coordinates for drawing route arcs */
  svgX: number;
  svgY: number;
}

// India origin point in SVG coordinates (routes radiate from here)
const INDIA = { svgX: 640, svgY: 248, name: "India" };

// 14 target countries positioned on a 1009×500 Mercator-style projection
const COUNTRY_MARKERS: MapMarker[] = [
  { name: "Czech Republic", slug: "czech-republic", countryCode: "CZ", jobsUrl: "/jobs/czech-republic", x: 43.8, y: 34.5, svgX: 442, svgY: 172 },
  { name: "Serbia",         slug: "serbia",         countryCode: "RS", jobsUrl: "/jobs/serbia",         x: 45.3, y: 37.8, svgX: 457, svgY: 189 },
  { name: "Bulgaria",       slug: "bulgaria",       countryCode: "BG", jobsUrl: "/jobs/bulgaria",       x: 47.5, y: 37.0, svgX: 479, svgY: 185 },
  { name: "Ukraine",        slug: "ukraine",        countryCode: "UA", jobsUrl: "/jobs/ukraine",        x: 51.2, y: 32.2, svgX: 517, svgY: 161 },
  { name: "Belarus",        slug: "belarus",        countryCode: "BY", jobsUrl: "/jobs/belarus",        x: 49.8, y: 30.0, svgX: 502, svgY: 150 },
  { name: "Russia",         slug: "russia",         countryCode: "RU", jobsUrl: "/jobs/russia",         x: 62.0, y: 22.0, svgX: 625, svgY: 110 },
  { name: "Uzbekistan",     slug: "uzbekistan",     countryCode: "UZ", jobsUrl: "/jobs/uzbekistan",     x: 59.0, y: 34.0, svgX: 595, svgY: 170 },
  { name: "Saudi Arabia",   slug: "saudi-arabia",   countryCode: "SA", jobsUrl: "/jobs/saudi-arabia",   x: 53.5, y: 52.0, svgX: 540, svgY: 260 },
  { name: "UAE",            slug: "uae",            countryCode: "AE", jobsUrl: "/jobs/uae",            x: 57.0, y: 50.5, svgX: 575, svgY: 252 },
  { name: "Oman",           slug: "oman",           countryCode: "OM", jobsUrl: "/jobs/oman",           x: 58.5, y: 53.5, svgX: 590, svgY: 268 },
  { name: "Vietnam",        slug: "vietnam",        countryCode: "VN", jobsUrl: "/jobs/vietnam",        x: 75.0, y: 51.0, svgX: 757, svgY: 255 },
  { name: "Malaysia",       slug: "malaysia",       countryCode: "MY", jobsUrl: "/jobs/malaysia",       x: 74.0, y: 62.0, svgX: 747, svgY: 310 },
  { name: "Mauritius",      slug: "mauritius",      countryCode: "MU", jobsUrl: "/jobs/mauritius",      x: 60.0, y: 76.0, svgX: 605, svgY: 380 },
  { name: "Fiji",           slug: "fiji",           countryCode: "FJ", jobsUrl: "/jobs/fiji",           x: 90.5, y: 68.0, svgX: 913, svgY: 340 },
];

// Elegant connection routes from India to exactly 5 core regional hubs to avoid clutter
const HUBS = [
  { slug: "uae", name: "Middle East" },
  { slug: "czech-republic", name: "Europe" },
  { slug: "russia", name: "Russia & CIS" },
  { slug: "vietnam", name: "Southeast Asia" },
  { slug: "fiji", name: "Pacific Islands" }
];

/**
 * Compute a quadratic Bézier control point that arcs *away* from the
 * straight line between origin and destination, producing elegant
 * curved flight-path routes. The arc bows upward for destinations
 * above or level with the origin, and to the side for destinations
 * below.
 */
function arcControlPoint(
  ox: number, oy: number, dx: number, dy: number
): { cx: number; cy: number } {
  const midX = (ox + dx) / 2;
  const midY = (oy + dy) / 2;
  const dist = Math.hypot(dx - ox, dy - oy);
  // Perpendicular offset proportional to distance
  const offset = dist * 0.25;
  // Perpendicular direction (rotated 90°)
  const nx = -(dy - oy) / dist;
  const ny = (dx - ox) / dist;
  // Always arc upward (negative Y in SVG = up)
  const sign = ny >= 0 ? -1 : 1;
  return {
    cx: midX + nx * offset * sign,
    cy: midY + ny * offset * sign,
  };
}

export function InteractiveWorldMap() {
  const t = useTranslations("countries");
  const viewJobsText = t("viewJobs") || "View Jobs";

  // Filter central countries data for markers
  const activeMarkers = React.useMemo(() => {
    return COUNTRY_MARKERS.map((marker) => {
      const match = CENTRAL_COUNTRIES.find((c) => c.slug === marker.slug);
      return {
        ...marker,
        jobsUrl: match?.jobsUrl || marker.jobsUrl,
        name: match?.name || marker.name,
      };
    });
  }, []);

  // Filter markers to only get coordinates for our 5 core hubs
  const hubRoutes = React.useMemo(() => {
    return HUBS.map((hub) => {
      const marker = activeMarkers.find((m) => m.slug === hub.slug);
      return marker;
    }).filter((m): m is MapMarker => !!m);
  }, [activeMarkers]);

  return (
    /* ---- FLUID RESPONSIVE CONTAINER (No fixed pixels) ---- */
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[580px] xl:min-h-[640px] flex items-center justify-center transition-all duration-500" style={{ aspectRatio: "1009 / 500" }}>

      {/* ═══════════ AMBIENT BACKGROUND GLOW LAYERS ═══════════ */}
      {/* Soft warm gold radial glow behind visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[110%] h-[110%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(182,146,91,0.14)_0%,transparent_70%)] pointer-events-none" />
      {/* Cooler navy radial glow offset to upper-right */}
      <div className="absolute top-[10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,62,98,0.12)_0%,transparent_70%)] pointer-events-none" />
      {/* Soft emerald accent glow around India region */}
      <div className="absolute top-[38%] left-[55%] w-[25%] h-[25%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16)_0%,transparent_70%)] pointer-events-none blur-xl animate-pulse" />

      {/* ═══════════ SVG WORLD MAP + ROUTES ═══════════ */}
      <svg
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        viewBox="0 0 1009 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Continent Gradient: Deep premium slate-navy with gold hints */}
          <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E4F75" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#112B4D" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#B6925B" stopOpacity="0.10" />
          </linearGradient>

          {/* Route arc gradient: navy → gold → emerald */}
          <linearGradient id="heroRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.02" />
            <stop offset="35%" stopColor="#B6925B" stopOpacity="0.30" />
            <stop offset="65%" stopColor="#B6925B" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.08" />
          </linearGradient>

          {/* Radial glow filter for the India origin dot */}
          <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Subtle latitude grid lines ── */}
        <g opacity="0.10" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="4 6">
          <line x1="0" y1="125" x2="1009" y2="125" />
          <line x1="0" y1="250" x2="1009" y2="250" />
          <line x1="0" y1="375" x2="1009" y2="375" />
        </g>

        {/* ── Continent silhouettes with premium gradient ── */}
        <g fill="url(#continentGrad)">
          {/* North America */}
          <path d="M125 50h45v5h-10v5h-10v5l-5 5-5-5-5 5v5h-15l-10 10-10 5h-10l-5 5v5h-5l-5 10-10 15v10l-10 5-5 5v5l-5 5-5-5-5 5v15l5 10 5 5v10l5 5h10l5-5 5 10 5 5 10 5 5-5 5 5h10v5l5 5v10l5 5 5-5v-10h10v-5h10l5-5h5l5 5h5v5l-5 5-10 5-5 10-10 5-5 10v10h5l10-5 10 5 5 5 15 10 10 15v10l5 10v10l5 5h5l5-5 5 5v5h5l5-5h10v-10l5-5 5-10 5-5 10-15v-10l5-5v-5l5-5 10-5 10-10 5-5 10-10 5-15h10l5-5v-10l5-10 5-5 5-10 5-5 10-5h10l5-5 15-5h10l5-5v-10l10-10 5-10v-15l-5-10-5-5-5-10v-5h-10v-5l-5-5v-10l-10-5z" />
          {/* South America */}
          <path d="M210 270l5 5v5l5 10 5 5v10l10 10v10l5 5 5 10v10l5 5h10l5 5h5l5 10 5 5 10 10 5 10 5 5 10 10 5 10v10l5 10-5 10-5 10-10 10-5 15-10 10-5 5-10 5-10 10-5 5h-5l-5-10-5-5-5-5-5-10v-10l-5-10-5-5-5-15-5-10-5-10v-10l-5-10-5-5-10-10-5-15v-10l5-10v-10l5-10v-10l5-10-5-10 5-10 5-10 5-5 10-5z" />
          {/* Greenland */}
          <path d="M420 15h60l10 10v10l-10 15-10 10-20 5h-20l-15-10-5-15zM220 20h20v10h-20zM280 10h30v10h-30z" />
          {/* Eurasia */}
          <path d="M425 150h5l10-10h10l5-5h15l5-10 10-5 10-10v-5l10-5h10v-5l10-5h10l10 5 10 10v5l5 5v5h10l5-5 10-15v-5l10-5h20l10 5 5 5 10-5 10 5 10 15v10l10 5 10-5h10l10 5 10 10h10l10-5 10 5 10-5 20-5 10 5 10-5 15 5 10-5 15 5v5l10 5h10l10 5 10-5h15l10 5 10-5 10 5 15-5h25v5l15 10v10l-5 10-10 10-5 10-5 15v15l5 10 10 5 5 15-5 10v10l-5 10-10 5-5 10v10l-5 5-5 10-15 10-10 10-10 15-5 10-10 10-5 10-5 15-10 10-15 5h-10l-5 5v5l-5 5v5h-5l-10 5v-10l-5-10 5-15 5-10v-15l-5-10-10-5-5-10-5-5-10-5v-10l-10-5-5-10-5-5h-10l-5 5-5 10-5 5h-10l-5-5v-5l-5-10-10-5-10-15-5-5-10-5h-10l-5 5-5 10-10 5-10 5-5 10-5 5h-15l-5-10v-10l-10-5-5-10-5-5h-10l-5 5-5 10-5 5-5-5-5-15-10-5-5-5v-10l-5-10-10-5h-10l-5 5v10l-5 10-5 5h-15l-5-5-5-10-10-5-5-10-15-5-10-5-5 5v15l-5 10-5 5h-5l-5-10-5-5v-5l-10-10-5-5h-10l-5 5-5 10-5 5v10l5 15v10l-5 5-5-5-10-5-10 5-10-5-5 5h-15l-5-10v-10l-10-5-5-10-5-10-10-5-5 5v10l5 10v10l-5 5-10 5-5 10-15 5-10-5-5-10v-15l5-10 5-5v-10l-5-10-10-5-5-10v-10l5-10v-15l-5-10-10-5z" />
          {/* Africa */}
          <path d="M430 230l10 5 10 5 15 5h15l10 5 15 15 15 5 10 10v10l5 10v10l5 10 5 5 10 10 5 10 5 15v15l-5 15-5 10-15 15-10 10-5 10-5 15-10 10h-10l-10-15-5-10-5-15-5-10-10-15-5-15-10-15-15-15-10-10-5-15v-15l5-15 5-10 5-15v-10z" />
          {/* Australia */}
          <path d="M780 370l15-5 15-5 15 5 15 15v10l5 15 10 10 10 15 5 10-5 15-10 15-15 10h-25l-15-10-15-10-10-10-5-15 5-15 10-10 5-15z" />
          {/* British Isles */}
          <path d="M410 130h10v10h-10zM395 140h10v10h-10z" />
          {/* Japan */}
          <path d="M840 185l5 10-5 15-5 10-5-10z" />
          {/* Madagascar */}
          <path d="M595 380l5 10 5 15-5 10-5-15z" />
          {/* New Zealand */}
          <path d="M880 435l10 15-5 15-10-15z" />
        </g>

        {/* ── Subtly curved regional hub routes (exactly 5 pathways from India) ── */}
        <g>
          {hubRoutes.map((m) => {
            const ctrl = arcControlPoint(INDIA.svgX, INDIA.svgY, m.svgX, m.svgY);
            return (
              <path
                key={`hub-arc-${m.slug}`}
                d={`M ${INDIA.svgX},${INDIA.svgY} Q ${ctrl.cx},${ctrl.cy} ${m.svgX},${m.svgY}`}
                stroke="url(#heroRouteGrad)"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                className="animate-heroRouteShimmer"
                fill="none"
                opacity="0.25"
              />
            );
          })}
        </g>

        {/* ── India origin marker (strong glowing emerald dot + pulse animation) ── */}
        <circle cx={INDIA.svgX} cy={INDIA.svgY} r="22" fill="url(#indiaGlow)" />
        <circle cx={INDIA.svgX} cy={INDIA.svgY} r="5.5" fill="#0B192C" />
        <circle cx={INDIA.svgX} cy={INDIA.svgY} r="2.2" fill="#10B981" />
        <circle cx={INDIA.svgX} cy={INDIA.svgY} r="2.2" fill="#10B981" opacity="0.6">
          <animate attributeName="r" from="2.2" to="11" dur="2.5s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2.5s" begin="0s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* ═══════════ INTERACTIVE COUNTRY MARKERS (Clean & Uncluttered) ═══════════ */}
      <div className="absolute inset-0 w-full h-full">
        {activeMarkers.map((country) => (
          <div
            key={country.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ left: `${country.x}%`, top: `${country.y}%` }}
          >
            <a
              href={country.jobsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-10 h-10 cursor-pointer focus:outline-none"
              aria-label={`View jobs in ${country.name}`}
            >
              {/* Focus ring for keyboard accessibility */}
              <span className="absolute inset-0 rounded-full ring-0 group-focus-visible:ring-2 group-focus-visible:ring-[#B6925B] group-focus-visible:ring-offset-2 transition-all pointer-events-none" />

              {/* Pulsing outer glow - ONLY visible on hover to maintain clean idle state */}
              <span
                className="absolute w-7 h-7 rounded-full bg-[#B6925B]/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping group-focus-visible:opacity-100 group-focus-visible:animate-ping pointer-events-none transition-all duration-300"
                style={{ animationDuration: "1.5s" }}
              />

              {/* Marker body: navy shell with glowing gold core (no permanent labels/chips) */}
              <span className="relative flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#0B192C] shadow-[0_0_10px_rgba(182,146,91,0.5)] group-hover:shadow-[0_0_18px_rgba(16,185,129,0.85)] group-hover:scale-[1.3] group-focus-visible:scale-[1.3] transition-all duration-250">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6925B] group-hover:bg-[#10B981] transition-colors duration-200" />
              </span>

              {/* ── Premium Frosted Glass Tooltip (country name only on hover/focus) ── */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-max max-w-[170px] pointer-events-none opacity-0 scale-95 origin-bottom translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 transition-all duration-200 z-30">
                <div className="bg-white/95 backdrop-blur-md text-[#0B192C] py-2 px-3.5 rounded-xl shadow-xl border border-slate-200/50 flex flex-col items-center">
                  <span className="font-display font-bold text-[13px] tracking-tight leading-tight">{country.name}</span>
                  <span className="text-[10px] text-[#B6925B] font-bold mt-0.5 flex items-center gap-1 uppercase tracking-wider">
                    {viewJobsText} <span className="text-[11px] font-sans">→</span>
                  </span>
                </div>
                {/* Tooltip arrow */}
                <div className="w-2.5 h-2.5 bg-white/95 border-r border-b border-slate-200/50 rotate-45 mx-auto -mt-[5px]" />
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* ═══════════ KEYFRAME ANIMATIONS ═══════════ */}
      <style jsx global>{`
        @keyframes heroRouteShimmer {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -100; }
        }
        .animate-heroRouteShimmer {
          animation: heroRouteShimmer 14s linear infinite;
        }
      `}</style>
    </div>
  );
}
