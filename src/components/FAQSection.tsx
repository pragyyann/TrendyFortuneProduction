"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = React.useState<number | null>(1); // First item open by default

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden w-full border-t border-[#B8945E]/15">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -z-10 w-[450px] h-[450px] bg-[#071426]/3 rounded-full blur-[90px] -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 -z-10 w-[400px] h-[400px] bg-[#B8945E]/4 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#926F34] tracking-widest uppercase">
            {t("sectionLabel")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071426]">
            {t("heading")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            {t("subtitle")}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#B8945E]/45 bg-[#FAFAF7] shadow-sm"
                    : "border-slate-100 bg-white hover:border-[#B8945E]/30"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-display font-extrabold text-base md:text-lg text-[#071426] cursor-pointer focus:outline-none focus:text-[#B8945E] transition-colors"
                >
                  <span className={isOpen ? "text-[#B8945E]" : ""}>
                    {t(item.questionKey)}
                  </span>
                  <span className={`shrink-0 ml-4 p-1.5 rounded-lg transition-colors ${
                    isOpen ? "bg-[#B8945E]/10 text-[#B8945E]" : "bg-slate-50 text-[#071426]"
                  }`}>
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Collapsible Answer Panel */}
                <div
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-slate-500 leading-relaxed font-sans border-t border-[#B8945E]/10 bg-[#FAFAF7]/50">
                      {t(item.answerKey)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
