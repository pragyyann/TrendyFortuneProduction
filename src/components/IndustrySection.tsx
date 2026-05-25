"use client";

import { motion } from "framer-motion";
import { HardHat, Hotel, HeartPulse, Factory, Truck, ShieldAlert, Flame, ShoppingBag } from "lucide-react";
import { INDUSTRIES } from "@/constants";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  HardHat: HardHat,
  Hotel: Hotel,
  HeartPulse: HeartPulse,
  Factory: Factory,
  Truck: Truck,
  ShieldAlert: ShieldAlert,
  Flame: Flame,
  ShoppingBag: ShoppingBag,
};

export function IndustrySection() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            Industries We Serve
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            Empowering Key Global Sectors
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed font-sans">
            We provide skilled, semi-skilled, and general workers trained specifically to meet compliance regulations of various core international sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, idx) => {
            const Icon = ICON_MAP[industry.iconName] || HardHat;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-[#f8fafc]/30 hover:bg-[#0B192C] hover:text-white transition-all duration-300 text-center cursor-pointer shadow-sm hover:shadow-xl"
              >
                {/* Circle Icon */}
                <div className="bg-white text-[#0B192C] group-hover:bg-[#B6925B] group-hover:text-white transition-all duration-300 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100/50">
                  <Icon className="h-6 w-6" />
                </div>
                
                {/* Industry Name */}
                <h3 className="font-display font-bold text-base md:text-lg text-[#0B192C] group-hover:text-white transition-colors">
                  {industry.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
