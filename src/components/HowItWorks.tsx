"use client";

import { HOW_IT_WORKS_STEPS } from "@/constants";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const getStepTitleKey = (num: number) => `step${num}_title`;
  const getStepDescKey = (num: number) => `step${num}_desc`;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#926F34] tracking-widest uppercase">
            {t("tag")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            {t("desc")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-8">
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-slate-100 lg:border-0 shadow-sm lg:shadow-none"
              >
                {/* Number Circle */}
                <div className="bg-white border-4 border-slate-100 text-[#0B192C] font-display font-extrabold text-2xl w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md hover:bg-[#B6925B] hover:text-white transition-colors duration-300">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="font-display font-extrabold text-lg text-[#0B192C] mb-3">
                  {t(getStepTitleKey(step.number))}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-[280px]">
                  {t(getStepDescKey(step.number))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
