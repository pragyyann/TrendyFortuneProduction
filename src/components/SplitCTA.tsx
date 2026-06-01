"use client";

import { ArrowRight, Briefcase, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function SplitCTA() {
  const t = useTranslations("split");

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* For Job Seekers (Dark Premium Card) */}
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B192C] via-[#122237] to-[#1E3E62] p-8 md:p-12 text-white shadow-xl flex flex-col justify-between"
          >
            {/* Background vector */}
            <div className="absolute top-0 right-0 -z-10 w-[200px] h-[200px] bg-[#B6925B]/10 rounded-full blur-3xl translate-x-10 -translate-y-10" />
            
            <div className="space-y-6">
              <div className="bg-[#B6925B] text-white p-3 rounded-2xl w-fit">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
                {t("seeker_title")}
              </h3>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-md">
                {t("seeker_desc")}
              </p>
            </div>

            <div className="pt-8">
              <a
                href="#job-seeker"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B6925B] hover:bg-[#926F34] hover:text-white text-[#0B192C] font-extrabold rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {t("seeker_btn")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* For Employers (Light Clean Card) */}
          <div
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 md:p-12 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="bg-[#0B192C] text-white p-3 rounded-2xl w-fit">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[#0B192C]">
                {t("employer_title")}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-md">
                {t("employer_desc")}
              </p>
            </div>

            <div className="pt-8">
              <a
                href="#employer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B192C] hover:bg-[#122237] text-white font-extrabold rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {t("employer_btn")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
