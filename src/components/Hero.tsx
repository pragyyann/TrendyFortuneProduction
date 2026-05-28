"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "./MobileStickyCTA";
import { InteractiveWorldMap } from "./InteractiveWorldMap";

export function Hero() {
  const t = useTranslations("hero");
  const { locale } = useLanguage();
  const whatsappUrl = getWhatsAppLink(locale);

  const scrollToForm = (formType: "seeker" | "employer") => {
    const element = document.getElementById("lead-forms");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Switch form tab
      setTimeout(() => {
        const tabId = formType === "seeker" ? "tab-seeker" : "tab-employer";
        const trigger = document.getElementById(tabId);
        if (trigger) trigger.click();
      }, 500);
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:py-0 lg:h-screen lg:max-h-[850px] xl:max-h-[920px] lg:min-h-[750px] flex items-center overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#ffffff]">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[550px] h-[550px] bg-[#B6925B]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[450px] h-[450px] bg-[#1E3E62]/5 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center">
          
          {/* Hero Content — Floating Frosted Premium Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-white/80 border border-white/60 shadow-[0_24px_50px_rgba(148,163,184,0.06)] rounded-[2.5rem] p-8 md:p-10 space-y-6 relative z-10"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/50 px-4 py-1.5 rounded-full text-sm font-semibold text-[#0B192C]">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
              {t("badge")}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[2.85rem] font-display font-extrabold text-[#0B192C] leading-[1.2] tracking-tight">
              {t("title")}
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-[1.05rem] text-slate-600 leading-relaxed font-sans">
              {t("subtitle")}
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100/80">
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="h-[18px] w-[18px] text-[#10B981] shrink-0" />
                <span className="text-sm font-medium">100% Verified Employers</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="h-[18px] w-[18px] text-[#10B981] shrink-0" />
                <span className="text-sm font-medium">Complete Emigration Support</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="h-[18px] w-[18px] text-[#10B981] shrink-0" />
                <span className="text-sm font-medium">Skilled & Industrial Experts</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="h-[18px] w-[18px] text-[#10B981] shrink-0" />
                <span className="text-sm font-medium">Rapid Talent Deployment</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                onClick={() => scrollToForm("seeker")}
                variant="primary"
                size="lg"
                className="gap-2.5 shadow-lg shadow-slate-900/10 cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="h-5 w-5 shrink-0" />
                {t("applyBtn")}
              </Button>
              <Button
                onClick={() => scrollToForm("employer")}
                variant="outline"
                size="lg"
                className="gap-2.5 bg-white hover:bg-slate-50 cursor-pointer whitespace-nowrap"
              >
                <Users className="h-5 w-5 shrink-0" />
                {t("hireBtn")}
              </Button>
            </div>
          </motion.div>
 
          {/* Hero Visual — Large format borderless world map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            className="w-full lg:absolute lg:right-[-2%] xl:right-[-4%] lg:w-[60%] xl:w-[62%] lg:h-[88%] lg:max-h-[720px] flex items-center justify-center z-0 lg:pointer-events-none"
          >
            <div className="w-full h-full pointer-events-auto">
              <InteractiveWorldMap />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive WhatsApp Button (Bottom Right) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-semibold group focus:outline-none focus:ring-4 focus:ring-emerald-200"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 shrink-0 fill-current animate-pulse" />
        <span className="hidden sm:inline text-sm">{t("whatsappBtn")}</span>
      </a>
    </section>
  );
}
