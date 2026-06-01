"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import DottedMap from "dotted-map";
import { fetchCountries, Country } from "@/lib/countries";

// India origin point (routes radiate from here)
const INDIA = { lat: 20.5937, lng: 78.9629, name: "India" };

// Elegant connection routes from India to exactly 5 core regional hubs to avoid clutter
const HUBS = [
  { slug: "uae", name: "Middle East" },
  { slug: "czech-republic", name: "Europe" },
  { slug: "russia", name: "Russia & CIS" },
  { slug: "vietnam", name: "Southeast Asia" },
  { slug: "fiji", name: "Pacific Islands" }
];

// Helper to convert ISO 2-letter country code into flag emoji
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Create elegant high-arc control points between two coordinates
const arcControlPoint = (startX: number, startY: number, endX: number, endY: number) => {
  const midX = (startX + endX) / 2;
  const dx = endX - startX;
  const dy = endY - startY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const midY = Math.min(startY, endY) - Math.max(30, dist * 0.18);
  return { cx: midX, cy: midY };
};

export function InteractiveWorldMap() {
  const t = useTranslations("countries");
  const viewJobsText = t("viewJobs") || "View Jobs";

  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    async function loadData() {
      const data = await fetchCountries();
      if (active) {
        setCountries(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  // Filter countries for map rendering based on active status and coordinates presence
  const mapDots = React.useMemo(() => {
    return countries.filter((c) => {
      const hasCoords = c.map_x !== undefined && c.map_x !== null && c.map_x !== "" &&
                        c.map_y !== undefined && c.map_y !== null && c.map_y !== "";
      const isActive = c.is_active === "YES";

      if (isActive && !hasCoords) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`Missing map coordinates for country: ${c.country_name}`);
        }
      }

      return isActive && hasCoords;
    });
  }, [countries]);

  // Create a single map instance and extract its properties and points
  const mapData = React.useMemo(() => {
    const map = new DottedMap({ height: 120 });
    const points = Object.values(map.points).map((pt) => ({
      x: pt.x,
      y: pt.y,
    }));
    return {
      points,
      width: map.width,
      height: map.height,
      project: (lat: number, lng: number) => {
        const pin = map.getPin({ lat, lng });
        if (pin) {
          return {
            x: (pin.x / map.width) * 800,
            y: (pin.y / map.height) * 400,
          };
        }
        // Mercator projection fallback
        const x = (lng + 180) * (800 / 360);
        const latRad = (lat * Math.PI) / 180;
        const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
        const y = 200 - (800 * mercN) / (2 * Math.PI);
        return { x, y };
      }
    };
  }, []);

  // Precompute the individual dots as a single, optimized SVG path
  const mapPathD = React.useMemo(() => {
    const r = 1.25;
    return mapData.points
      .map((pt) => {
        const cx = (pt.x / mapData.width) * 800;
        const cy = (pt.y / mapData.height) * 400;
        return `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
      })
      .join(" ");
  }, [mapData]);

  // Precompute dynamic SVG coordinates for the active connection routes
  const activeHubRoutes = React.useMemo(() => {
    return HUBS.map((hub) => {
      const match = mapDots.find((c) => c.country_slug === hub.slug);
      if (!match) return null;

      const endX = (Number(match.map_x) / 100) * 800;
      const endY = (Number(match.map_y) / 100) * 400;

      return {
        slug: match.country_slug,
        endX,
        endY,
      };
    }).filter((route): route is { slug: string; endX: number; endY: number } => route !== null);
  }, [mapDots]);

  return (
    /* ---- FLUID RESPONSIVE CONTAINER ---- */
    <div className="relative w-full h-full min-h-[160px] xs:min-h-[220px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[660px] xl:min-h-[720px] flex items-center justify-center transition-all duration-500 overflow-visible" style={{ aspectRatio: "2 / 1" }}>

      {/* ═══════════ AMBIENT BACKGROUND GLOW LAYERS ═══════════ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[110%] h-[110%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(182,146,91,0.12)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,62,98,0.10)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[38%] left-[55%] w-[25%] h-[25%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,transparent_70%)] pointer-events-none blur-xl animate-pulse z-0" />

      {/* ═══════════ USER INSTRUCTION BADGE ═══════════ */}
      <div className="absolute top-2 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-max max-w-[90%] text-center">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0B192C]/90 backdrop-blur-sm border border-[#B6925B]/40 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B6925B] animate-pulse shrink-0" />
          <span className="text-[9px] sm:text-xs md:text-sm font-sans font-bold tracking-wider text-white uppercase select-none">
            {t("mapInstruction") || "Tap any country dot to view available jobs"}
          </span>
        </div>
      </div>

      {/* ═══════════ SVG ROUTING, DOTS, & ARCS ═══════════ */}
      <svg
        className="absolute inset-0 w-full h-full select-none z-10"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="heroRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.02" />
            <stop offset="35%" stopColor="#B6925B" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#B6925B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
          </linearGradient>

          <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dotted World Map Background */}
        <g 
          className="text-slate-900/22 transition-opacity duration-500 hover:text-slate-900/28"
          opacity="0.9"
          style={{ maskImage: "linear-gradient(to bottom, transparent, white 8%, white 92%, transparent)" }}
        >
          <path d={mapPathD} fill="currentColor" />
        </g>

        {/* Curved regional hub routes */}
        <g>
          {activeHubRoutes.map((route) => {
            const startPoint = mapData.project(INDIA.lat, INDIA.lng);
            const ctrl = arcControlPoint(startPoint.x, startPoint.y, route.endX, route.endY);
            return (
              <path
                key={`hub-arc-${route.slug}`}
                d={`M ${startPoint.x},${startPoint.y} Q ${ctrl.cx},${ctrl.cy} ${route.endX},${route.endY}`}
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

        {/* India origin marker */}
        {(() => {
          const pt = mapData.project(INDIA.lat, INDIA.lng);
          return (
            <g key="origin-india">
              <circle cx={pt.x} cy={pt.y} r="22" fill="url(#indiaGlow)" />
              <circle cx={pt.x} cy={pt.y} r="5.5" fill="#0B192C" />
              <circle cx={pt.x} cy={pt.y} r="2.2" fill="#10B981" />
              <circle cx={pt.x} cy={pt.y} r="2.2" fill="#10B981" opacity="0.6">
                <animate attributeName="r" from="2.2" to="11" dur="2.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })()}
      </svg>

      {/* ═══════════ INTERACTIVE COUNTRY MARKERS ═══════════ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {mapDots.map((country) => {
          return (
            <div
              key={country.country_slug}
              className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-none z-20 hover:z-[999] focus-within:z-[999]"
              style={{
                left: `${Number(country.map_x)}%`,
                top: `${Number(country.map_y)}%`
              }}
            >
              <a
                href={`/jobs/${country.country_slug}`}
                className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 cursor-pointer focus:outline-none pointer-events-auto"
                aria-label={`View jobs in ${country.country_name}`}
              >
                {/* Focus ring for keyboard accessibility */}
                <span className="absolute inset-0 rounded-full ring-0 group-focus-visible:ring-2 group-focus-visible:ring-[#B6925B] group-focus-visible:ring-offset-2 transition-all pointer-events-none" />

                {/* Pulsing gold glow ring animation on hover and focus */}
                <span
                  className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#B6925B]/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping group-focus-visible:opacity-100 group-focus-visible:animate-ping pointer-events-none transition-all duration-300"
                  style={{ animationDuration: "1.2s" }}
                />

                {/* Marker body: navy shell with glowing gold/emerald core */}
                <span className="relative flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#0B192C] border border-[#B6925B]/40 shadow-[0_0_12px_rgba(182,146,91,0.6)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.9)] group-hover:scale-[1.3] group-hover:border-[#10B981] group-focus-visible:scale-[1.3] group-focus-visible:border-[#10B981] transition-all duration-250">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B6925B] group-hover:bg-[#10B981] transition-colors duration-200" />
                </span>

                {/* ── Premium Frosted Glass Tooltip Card (country name, flag and gold clickable button) ── */}
                {/* Pointer events are set to none by default to completely prevent distant hover triggering. It is set to auto only when hovered or focused. */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-max min-w-[150px] sm:min-w-[170px] opacity-0 scale-95 origin-bottom translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 transition-all duration-200 z-[999] pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                  <div className="bg-[#0B192C] text-white py-3 px-4 rounded-2xl shadow-[0_10px_30px_rgba(11,25,44,0.45)] border border-[#B6925B]/40 flex flex-col items-center gap-2">
                    {/* Flag and Name Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl select-none leading-none" role="img" aria-label={`${country.country_name} Flag`}>
                        {getFlagEmoji(country.country_code)}
                      </span>
                      <span className="font-display font-extrabold text-[14px] sm:text-[15px] tracking-tight leading-none whitespace-nowrap">
                        {country.country_name}
                      </span>
                    </div>

                    {/* Highly clickable View Jobs button */}
                    <span className="w-full h-8 px-3 rounded-lg bg-[#B6925B] hover:bg-[#B6925B]/90 active:scale-[0.98] text-[#0B192C] font-bold text-[11px] sm:text-[12px] flex items-center justify-center gap-1 transition-all duration-200 select-none cursor-pointer">
                      <span>{viewJobsText}</span>
                      <span className="text-[12px] font-sans">→</span>
                    </span>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-2.5 h-2.5 bg-[#0B192C] border-r border-b border-[#B6925B]/40 rotate-45 mx-auto -mt-[5px]" />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* ═══════════ KEYFRAME ANIMATIONS ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroRouteShimmer {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -100; }
        }
        .animate-heroRouteShimmer {
          animation: heroRouteShimmer 14s linear infinite;
        }
      ` }} />
    </div>
  );
}

