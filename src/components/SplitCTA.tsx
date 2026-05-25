"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2 } from "lucide-react";
import { Button } from "./ui/button";

export function SplitCTA() {
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
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* For Job Seekers (Dark Premium Card) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B192C] via-[#122237] to-[#1E3E62] p-8 md:p-12 text-white shadow-xl flex flex-col justify-between"
          >
            {/* Background vector */}
            <div className="absolute top-0 right-0 -z-10 w-[200px] h-[200px] bg-[#B6925B]/10 rounded-full blur-3xl translate-x-10 -translate-y-10" />
            
            <div className="space-y-6">
              <div className="bg-[#B6925B] text-white p-3 rounded-2xl w-fit">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
                For Job Seekers
              </h3>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-md">
                Find verified overseas career opportunities across Europe, the Gulf, and North America. Get absolute guidance on profiling, embassy interviews, visa paperwork, and logistics from start to finish.
              </p>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => scrollToForm("seeker")}
                variant="accent"
                className="gap-2 cursor-pointer"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* For Employers (Light Clean Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 md:p-12 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="bg-[#0B192C] text-white p-3 rounded-2xl w-fit">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[#0B192C]">
                For Employers
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-md">
                Source vetted, medically certified, and technically proficient manpower for your business requirements. We support high-volume deployments and specialized technical recruiting across core industries.
              </p>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => scrollToForm("employer")}
                variant="primary"
                className="gap-2 cursor-pointer"
              >
                Request Manpower
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
