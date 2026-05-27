"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, FileCheck, Compass, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustStrip() {
  const t = useTranslations("trust");

  const trustItems = [
    {
      icon: ShieldCheck,
      title: t("item1_title"),
      description: t("item1_desc")
    },
    {
      icon: Users,
      title: t("item2_title"),
      description: t("item2_desc")
    },
    {
      icon: FileCheck,
      title: t("item3_title"),
      description: t("item3_desc")
    },
    {
      icon: Compass,
      title: t("item4_title"),
      description: t("item4_desc")
    },
    {
      icon: HeartHandshake,
      title: t("item5_title"),
      description: t("item5_desc")
    }
  ];

  return (
    <section className="bg-[#0B192C] py-8 text-white relative overflow-hidden border-y border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,62,98,0.2),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 lg:divide-x divide-slate-800">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-4 md:p-6 first:pt-4 md:first:pt-6 pt-6"
              >
                <div className="bg-[#1E3E62] text-[#B6925B] p-3 rounded-2xl mb-4 shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base text-slate-100 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[170px] mx-auto leading-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

