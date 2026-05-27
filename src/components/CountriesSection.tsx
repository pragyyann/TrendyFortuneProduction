"use client";

import { ArrowRight, MapPin } from "lucide-react";
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
        {/* Left and Right Gradient Fades to blend into white bg */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 py-4">
          {marqueeItems.map((country: CountryData, index: number) => {
            const FlagComponents = Flags as unknown as Record<string, React.ComponentType<{ className?: string; title?: string }>>;
            const FlagComponent = FlagComponents[country.countryCode];
            
            return (
              <div
                key={`${country.slug}-${index}`}
                className="group flex-shrink-0 w-[300px] md:w-[320px] p-6 rounded-2xl border border-slate-100 bg-[#f8fafc]/40 hover:bg-white hover-card relative overflow-hidden flex flex-col justify-between"
              >
                {/* Highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#B6925B] transition-colors" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Flag and Label */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-sm overflow-hidden border border-slate-100 flex-shrink-0">
                        {FlagComponent ? (
                          <FlagComponent className="w-full h-full object-cover" title={`${country.name} Flag`} />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base md:text-lg text-[#0B192C] group-hover:text-[#B6925B] transition-colors truncate max-w-[130px]">
                        {country.name}
                      </h3>
                    </div>
                    <div className="text-slate-300 group-hover:text-[#B6925B] transition-colors flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4 font-sans line-clamp-2 h-10 overflow-hidden">
                    {country.description}
                  </p>

                  {/* Popular jobs tags/chips for aesthetic enhancement */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {country.popularJobs.slice(0, 2).map((job, idx) => (
                      <span key={idx} className="text-[10px] md:text-[11px] text-slate-500 font-sans font-medium bg-slate-100/70 group-hover:bg-slate-50 px-2 py-0.5 rounded-md transition-colors">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between">
                  <a
                    href={country.jobsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 font-semibold text-[#0B192C] hover:text-[#B6925B] transition-colors inline-flex items-center text-sm underline underline-offset-4 cursor-pointer"
                  >
                    {t("viewJobs")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
