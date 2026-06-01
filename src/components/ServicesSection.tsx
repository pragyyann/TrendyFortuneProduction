"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, FileText, GraduationCap, FileSpreadsheet, Compass, ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase: Briefcase,
  Users: Users,
  FileText: FileText,
  GraduationCap: GraduationCap,
  FileSpreadsheet: FileSpreadsheet,
  Compass: Compass,
};

export function ServicesSection() {
  const t = useTranslations("services");

  const getServiceTitleKey = (id: string) => {
    return `title_${id.replace(/-/g, "_")}`;
  };

  const handleServiceClick = (serviceId: string) => {
    const isEmployerService = serviceId === "manpower-supply";
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
        const tabId = isEmployerService ? "tab-employer" : "tab-seeker";
        const trigger = document.getElementById(tabId);
        if (trigger) trigger.click();
        
        // Focus industry or preferred option if possible
        if (isEmployerService) {
          const industrySelect = document.getElementById("industry");
          if (industrySelect) industrySelect.focus();
        } else {
          const jobCatInput = document.getElementById("jobCategory");
          if (jobCatInput) jobCatInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#926F34] tracking-widest uppercase">
            {t("tag")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071426]">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            {t("desc")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.filter(service => service.active !== false).map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Briefcase;
            const isManpower = service.id === "manpower-supply";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-8 rounded-3xl border border-slate-100/80 bg-white hover-card flex flex-col justify-between hover:border-[#B6925B]/40 hover:shadow-[0_15px_30px_rgba(7,20,38,0.05)] shadow-sm"
              >
                <div>
                  {/* Service Icon */}
                  <div className="bg-[#FAFAF7] text-[#071426] group-hover:bg-[#071426] group-hover:text-white transition-all duration-300 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#B6925B]/10 group-hover:shadow-[0_0_12px_rgba(182,146,91,0.35)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl text-[#071426] mb-3 group-hover:text-[#B6925B] transition-colors">
                    {t(getServiceTitleKey(service.id))}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* CTA Link */}
                <div className="pt-2 border-t border-slate-50">
                  <Button
                    onClick={() => handleServiceClick(service.id)}
                    variant="link"
                    size="sm"
                    className="gap-2 font-bold text-[#071426] group-hover:text-[#B6925B] transition-colors inline-flex items-center cursor-pointer"
                  >
                    {isManpower ? t("cta_manpower") : t("cta_support")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
