"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "./MobileStickyCTA";
import dynamic from "next/dynamic";

const InteractiveWorldMap = dynamic(
  () => import("./InteractiveWorldMap").then((mod) => mod.InteractiveWorldMap),
  {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[300px] bg-slate-50/50 animate-pulse rounded-3xl border border-slate-100/50" />
  }
);

export function Hero() {
  const t = useTranslations("hero");
  const { locale } = useLanguage();
  const whatsappUrl = getWhatsAppLink(locale);

  const scrollToForm = (formType: "seeker" | "employer") => {
    const targetId = formType === "seeker" ? "job-seeker" : "employer";
    const element = document.getElementById(targetId);
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

      window.location.hash = `#${targetId}`;
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-12 xs:pt-32 xs:pb-20 md:pt-40 md:pb-28 lg:py-0 lg:h-screen lg:max-h-[850px] xl:max-h-[920px] lg:min-h-[750px] flex items-center overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#ffffff]">
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
            className="w-full bg-white/80 border border-white/60 shadow-[0_24px_50px_rgba(148,163,184,0.06)] rounded-[1.5rem] xs:rounded-[2rem] sm:rounded-[2.5rem] p-4 xs:p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6 relative z-10 max-w-full"
          >
            {/* Tagline */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-[#FAFAF7] border border-[#B6925B]/30 px-4 py-1.5 rounded-full text-sm font-semibold text-[#071426] shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
              {t("badge")}
            </div>

            {/* Headline */}
            <h1 className="text-[32px] xs:text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[2.85rem] font-display font-extrabold text-[#071426] leading-tight tracking-tight">
              {t("title")}
            </h1>

            {/* Subheadline */}
            <p className="text-sm xs:text-base md:text-[1.05rem] text-slate-600 leading-relaxed font-sans">
              {t("subtitle")}
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-slate-100/80">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 sm:h-[18px] sm:w-[18px] text-[#10B981] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">100% Verified Employers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 sm:h-[18px] sm:w-[18px] text-[#10B981] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Complete Emigration Support</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 sm:h-[18px] sm:w-[18px] text-[#10B981] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Skilled & Industrial Experts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5 sm:h-[18px] sm:w-[18px] text-[#10B981] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Rapid Talent Deployment</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full">
              <Button
                onClick={() => scrollToForm("seeker")}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center gap-2.5 shadow-xl shadow-slate-900/10 cursor-pointer whitespace-nowrap bg-[#071426] hover:bg-[#122237] border border-[#B6925B]/20 text-white hover:shadow-[0_0_20px_rgba(182,146,91,0.3)] transition-all duration-300 py-3 sm:py-4 text-sm sm:text-base font-bold"
              >
                <Briefcase className="h-5 w-5 shrink-0 text-[#B6925B]" />
                {t("applyBtn")}
              </Button>
              <Button
                onClick={() => scrollToForm("employer")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center gap-2.5 bg-white border-2 border-[#B6925B]/30 hover:border-[#B6925B] text-[#071426] hover:bg-[#FAFAF7] hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap py-3 sm:py-4 text-sm sm:text-base font-bold"
              >
                <Users className="h-5 w-5 shrink-0 text-[#B6925B]" />
                {t("hireBtn")}
              </Button>
            </div>
          </motion.div>
 
          {/* Hero Visual — Large format borderless world map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            className="w-full lg:absolute lg:right-[-2%] xl:right-[-4%] lg:w-[60%] xl:w-[62%] lg:h-[94%] lg:max-h-[780px] flex items-center justify-center z-0 lg:pointer-events-none relative"
          >
            {/* Soft gold/emerald radial glowing background map shadow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[550px] h-[550px] bg-gradient-to-tr from-[#B6925B]/8 via-[#10B981]/4 to-transparent rounded-full blur-[110px] pointer-events-none animate-pulse" />
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center bg-[#10B981] hover:bg-[#059669] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-semibold group focus:outline-none focus:ring-4 focus:ring-emerald-200 w-12 h-12 sm:w-auto sm:h-auto sm:px-5 sm:py-3 shrink-0"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 shrink-0 fill-current animate-pulse" />
        <span className="hidden sm:inline text-sm">{t("whatsappBtn")}</span>
      </a>
    </section>
  );
}
