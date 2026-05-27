"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "./MobileStickyCTA";

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
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#ffffff]">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#B6925B]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-[#1E3E62]/5 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/50 px-4 py-1.5 rounded-full text-sm font-semibold text-[#0B192C]">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
              {t("badge")}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0B192C] leading-[1.2] tracking-tight">
              {t("title")}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-sans">
              {t("subtitle")}
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="font-medium">100% Verified Employers</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="font-medium">Complete Visa & Flight Support</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="font-medium">Skilled & Technical Experts</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="font-medium">Rapid Manpower Deployments</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToForm("seeker")}
                variant="primary"
                size="lg"
                className="gap-2 shadow-lg shadow-slate-900/10 cursor-pointer"
              >
                <Briefcase className="h-5 w-5" />
                {t("applyBtn")}
              </Button>
              <Button
                onClick={() => scrollToForm("employer")}
                variant="outline"
                size="lg"
                className="gap-2 bg-white hover:bg-slate-50 cursor-pointer"
              >
                <Users className="h-5 w-5" />
                {t("hireBtn")}
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual Graphic (Animated Dashboard / Global Map Vector) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:block"
          >
            <div className="relative w-full aspect-[5/4] sm:aspect-square md:aspect-[5/4] max-w-xl mx-auto rounded-3xl border border-slate-100 bg-white/40 backdrop-blur-md shadow-2xl p-6 md:p-8 flex items-center justify-center overflow-hidden">
              {/* Spinning background circles */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[300px] h-[300px] border border-slate-200/50 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[420px] h-[420px] border border-dashed border-slate-200/40 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
              </div>

              {/* Premium Vector UI elements */}
              <svg className="w-full h-full text-slate-100" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines */}
                <path d="M120 280 L250 140 M250 140 L380 260 M250 140 L250 310" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M120 280 L380 260" stroke="#e2e8f0" strokeWidth="1.5" />
                
                {/* Glowing paths */}
                <path d="M120 280 Q200 200 250 140" stroke="url(#gradient-blue)" strokeWidth="3" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="150" className="animate-[dash_4s_ease-in-out_infinite]" />
                <path d="M250 140 Q300 200 380 260" stroke="url(#gradient-gold)" strokeWidth="3" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="150" className="animate-[dash_4s_ease-in-out_2s_infinite]" />

                {/* Node Circles */}
                <circle cx="250" cy="140" r="14" fill="#0B192C" />
                <circle cx="250" cy="140" r="24" stroke="#0B192C" strokeOpacity="0.15" strokeWidth="6" className="animate-ping" style={{ animationDuration: '3s' }} />
                
                <circle cx="120" cy="280" r="10" fill="#B6925B" />
                <circle cx="380" cy="260" r="10" fill="#1E3E62" />
                <circle cx="250" cy="310" r="8" fill="#10B981" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-blue" x1="120" y1="280" x2="250" y2="140">
                    <stop offset="0%" stopColor="#B6925B" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0B192C" />
                  </linearGradient>
                  <linearGradient id="gradient-gold" x1="250" y1="140" x2="380" y2="260">
                    <stop offset="0%" stopColor="#0B192C" />
                    <stop offset="100%" stopColor="#B6925B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Float Cards */}
              <div className="absolute top-8 left-8 bg-[#0B192C] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700/30 animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="bg-[#B6925B] text-white p-2 rounded-xl">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs opacity-75 font-medium uppercase">Active Placements</div>
                  <div className="text-xl font-bold font-display">12,500+</div>
                </div>
              </div>

              <div className="absolute bottom-10 right-8 bg-white text-[#0B192C] p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 animate-bounce" style={{ animationDuration: '8s' }}>
                <div className="bg-[#10B981]/15 text-[#10B981] p-2 rounded-xl">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase">Visa Approval</div>
                  <div className="text-xl font-bold font-display text-[#10B981]">98.6%</div>
                </div>
              </div>
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

      {/* Inline styles for SVG path animations */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
