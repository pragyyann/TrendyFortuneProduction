"use client";

import { ArrowRight } from "lucide-react";
import { CENTRAL_COUNTRIES, CountryData } from "@/data/countries";
import * as Flags from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";

export function CountriesSection() {
  const t = useTranslations("countries");
  
  // Duplicate array for seamless looping animation
  const marqueeItems = [...CENTRAL_COUNTRIES, ...CENTRAL_COUNTRIES];

  return (
    <section id="jobs-abroad" className="py-20 bg-white relative overflow-hidden w-full">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            {t("tag")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            {t("desc")}
          </p>
        </div>
      </div>

      {/* Marquee Wrapper - Full Width with Left & Right Gradient Fades */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left and Right Subtle Gradient Fades to blend into white bg */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-8 py-4 px-4">
          {marqueeItems.map((country: CountryData, index: number) => {
            const FlagComponents = Flags as unknown as Record<string, React.ComponentType<{ className?: string; title?: string }>>;
            const FlagComponent = FlagComponents[country.countryCode];
            
            return (
              <div
                key={`${country.slug}-${index}`}
                className="group flex-shrink-0 w-[240px] sm:w-[270px] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-[#B6925B]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between cursor-default"
              >
                {/* Gold Highlight top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B6925B] to-[#D4AF37]" />

                {/* Flag Container - noticeably larger and clean */}
                <div className="w-20 sm:w-24 h-12 sm:h-14 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0 mb-4 mt-2 transition-transform duration-300 group-hover:scale-105">
                  {FlagComponent ? (
                    <FlagComponent className="w-full h-full object-cover" title={`${country.name} Flag`} />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                </div>

                {/* Country Name - bold, prominent and centered */}
                <h3 className="font-display font-extrabold text-[#0B192C] text-lg sm:text-xl text-center tracking-tight mb-6 mt-1 transition-colors duration-300 group-hover:text-[#B6925B] truncate w-full px-2">
                  {country.name}
                </h3>

                {/* Strong View Jobs Filled Navy Button with Gold Hover */}
                <a
                  href={country.jobsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] text-white hover:bg-[#B6925B] font-bold text-sm transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{t("viewJobs")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
