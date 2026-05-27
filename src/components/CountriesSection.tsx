"use client";

import { motion as framerMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { CENTRAL_COUNTRIES, CountryData } from "@/data/countries";
import * as Flags from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";

export function CountriesSection() {
  const t = useTranslations("countries");

  return (
    <section id="jobs-abroad" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CENTRAL_COUNTRIES.map((country: CountryData, idx: number) => {
            const FlagComponents = Flags as unknown as Record<string, React.ComponentType<{ className?: string; title?: string }>>;
            const FlagComponent = FlagComponents[country.countryCode];
            
            return (
              <framerMotion.div
                key={country.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-6 rounded-2xl border border-slate-100 bg-[#f8fafc]/30 hover:bg-white hover-card relative overflow-hidden flex flex-col justify-between"
              >
                {/* Highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#B6925B] transition-colors" />

                <div>
                  <div className="flex justify-between items-start mb-5">
                    {/* Flag and Label */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-sm overflow-hidden border border-slate-100 flex-shrink-0">
                        {FlagComponent ? (
                          <FlagComponent className="w-full h-full object-cover" title={`${country.name} Flag`} />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#0B192C] group-hover:text-[#B6925B] transition-colors truncate max-w-[120px]">
                        {country.name}
                      </h3>
                    </div>
                    <div className="text-slate-300 group-hover:text-[#B6925B] transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-sans">
                    {country.description}
                  </p>
                </div>

                <div className="pt-2">
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
              </framerMotion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

