"use client";

import { Play, Quote, ArrowUpRight } from "lucide-react";
import { TESTIMONIALS, testimonialVideoUrl } from "@/data/testimonials";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  // Duplicate items twice to ensure smooth, infinite, seamless looping marquee on wider screens
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-20 bg-[#FAFAF7] relative overflow-hidden w-full border-t border-[#B8945E]/15">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[450px] h-[450px] bg-[#B8945E]/4 rounded-full blur-[90px] translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-[#071426]/4 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
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

        {/* Featured Video Testimonial Card */}
        <div className="max-w-3xl mx-auto mb-20">
          <a
            href={testimonialVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Trendy Fortune testimonial video on YouTube"
            className="group block bg-white rounded-[2rem] border border-[#B8945E]/20 p-4 md:p-6 shadow-[0_15px_45px_rgba(7,20,38,0.03)] hover:shadow-[0_20px_60px_rgba(184,148,94,0.12)] hover:border-[#B8945E]/45 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#071426]"
          >
            {/* Visual Thumbnail Area */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#071426] via-[#152A42] to-[#2A3544] flex items-center justify-center shadow-inner border border-slate-100">
              
              {/* Subtle background abstract lines pattern */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FAFAF7_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Pulsing Play Button */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#B8945E] hover:bg-[#A37F48] text-[#071426] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <span className="absolute inset-0 rounded-full bg-[#B8945E]/30 animate-ping" />
                <Play className="h-8 w-8 fill-current ml-1" />
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 bg-[#071426]/75 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-[#B8945E] flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("video_label")}
              </div>
            </div>

            {/* Content Details inside Card */}
            <div className="pt-6 pb-2 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <h3 className="font-display font-extrabold text-xl text-[#071426] group-hover:text-[#B8945E] transition-colors">
                  {t("video_title")}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  {t("video_description")}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#071426] text-white font-bold text-sm shadow-md group-hover:bg-[#B8945E] group-hover:text-[#071426] transition-colors">
                  {t("video_cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Infinite Horizontal Testimonial Marquee */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        {/* Left/Right Subtle Shadow Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#FAFAF7] via-[#FAFAF7]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#FAFAF7] via-[#FAFAF7]/70 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 w-[300px] sm:w-[350px] p-6 rounded-2xl bg-white border border-[#B8945E]/10 shadow-sm hover:border-[#B8945E]/30 transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-4 right-4 text-[#B8945E]/10 group-hover:text-[#B8945E]/20">
                <Quote className="h-8 w-8 fill-current rotate-180" />
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6 relative z-10">
                "{t(item.textKey)}"
              </p>

              {/* Candidate Info with Subtle Gold Line Accent */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#071426]">
                    {t(item.nameKey)}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {t(item.roleKey)}
                  </p>
                </div>
                <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#B8945E] to-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
