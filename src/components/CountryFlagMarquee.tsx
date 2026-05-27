"use client";

import * as React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { CENTRAL_COUNTRIES, CountryData } from "@/data/countries";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

export function CountryFlagMarquee() {
  const t = useTranslations("countries");
  
  // Duplicate the array to ensure seamless infinite looping animation
  const marqueeItems = [...CENTRAL_COUNTRIES, ...CENTRAL_COUNTRIES];

  return (
    <section className="py-12 bg-slate-50/50 border-y border-slate-100 overflow-hidden w-full relative">
      {/* Section Sub-Header for marquee if needed, or keep it clean */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            {t("tag")}
          </span>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left and Right Gradient Fades for a premium, modern feel */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 py-2">
          {marqueeItems.map((country: CountryData, index: number) => {
            const FlagComponents = Flags as unknown as Record<string, React.ComponentType<{ className?: string; title?: string }>>;
            const FlagComponent = FlagComponents[country.countryCode];
            
            return (
              <div
                key={`${country.slug}-${index}`}
                className="flex-shrink-0 w-[260px] p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-[#B6925B]/30 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-8 rounded-md overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                    {FlagComponent ? (
                      <FlagComponent className="w-full h-full object-cover" title={`${country.name} Flag`} />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-[#0B192C] text-base truncate group-hover:text-[#B6925B] transition-colors">
                    {country.name}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans h-8">
                  {country.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="flex flex-wrap gap-1 max-w-[140px] overflow-hidden truncate">
                    <span className="text-[10px] text-slate-500 font-sans truncate bg-slate-50 px-2 py-0.5 rounded-md">
                      {country.popularJobs[0]}
                    </span>
                  </div>
                  <a
                    href={country.jobsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#B6925B] hover:text-[#A37F48] transition-colors cursor-pointer group/btn"
                  >
                    <span>{t("viewJobs")}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
