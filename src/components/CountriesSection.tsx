"use client";

import { motion as framerMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { COUNTRIES } from "@/constants";
import { Button } from "./ui/button";

export function CountriesSection() {
  const handleApplyCountry = (countryName: string) => {
    // 1. Trigger custom event to pre-select country in form
    const event = new CustomEvent("preselect-country", {
      detail: { country: countryName }
    });
    window.dispatchEvent(event);

    // 2. Scroll to form smoothly
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

      // Switch form tab to Job Seeker
      setTimeout(() => {
        const trigger = document.getElementById("tab-seeker");
        if (trigger) trigger.click();
      }, 500);
    }
  };

  return (
    <section id="jobs-abroad" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            Global Destinations
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            International Locations We Recruit For
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            We partner with legally registered employers across major global destinations. Explore visa pathways and open vacancies waiting for you.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {COUNTRIES.map((country, idx) => (
            <framerMotion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group p-6 rounded-2xl border border-slate-100 bg-[#f8fafc]/30 hover:bg-white hover-card relative overflow-hidden"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#B6925B] transition-colors" />

              <div className="flex justify-between items-start mb-5">
                {/* Flag and Label */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={`${country.name} Flag`}>
                    {country.flag}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#0B192C] group-hover:text-[#B6925B] transition-colors">
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

              <Button
                onClick={() => handleApplyCountry(country.name)}
                variant="link"
                size="sm"
                className="gap-2 font-semibold text-[#0B192C] group-hover:text-[#B6925B] transition-colors inline-flex items-center"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </framerMotion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
