"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/constants";

export function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            Our Pipeline
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            How We Get You Deployed Abroad
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            A transparent, highly organized, and legal recruitment pathway that ensures safe and hassle-free relocation for candidates.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-8">
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-slate-100 lg:border-0 shadow-sm lg:shadow-none"
              >
                {/* Number Circle */}
                <div className="bg-white border-4 border-slate-100 text-[#0B192C] font-display font-extrabold text-2xl w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md hover:bg-[#B6925B] hover:text-white transition-colors duration-300">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="font-display font-extrabold text-lg text-[#0B192C] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-[280px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
