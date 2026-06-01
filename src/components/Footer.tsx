"use client";

import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { CONTACT_INFO, SERVICES } from "@/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const tNavbar = useTranslations("navbar");
  const tServices = useTranslations("services");
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact");

  const getServiceTitleKey = (id: string) => {
    return `title_${id.replace(/-/g, "_")}`;
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
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
    }
  };

  const handleApplyNow = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("job-seeker");
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
      
      window.location.hash = "#job-seeker";
    }
  };

  return (
    <footer className="bg-[#0B192C] text-slate-400 pt-16 pb-16 sm:pb-8 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(182,146,91,0.02),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-3 group focus:outline-none">
              <div className="relative h-11 w-11 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <Image
                  src="/images/Untitled design (2).png"
                  alt="Trendy Fortune Overseas logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Trendy <span className="text-[#B6925B]">Fortune</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-sm">
              An ISO certified and government registered overseas manpower recruitment consultancy helping businesses hire global talent and guiding job seekers to secure visa placements globally.
            </p>
            <div className="text-xs text-slate-500 font-medium font-sans">
              Licence No: B-1209/MUM/COM/1000+/5/9876/2026 <br />
              (ISO 9001:2015 Certified Agency)
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">{tFooter("quickLinks")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("home")}
                </a>
              </li>
              <li>
                <a href="#jobs-abroad" onClick={(e) => handleScrollTo(e, "#jobs-abroad")} className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("jobs")}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("services")}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("about")}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("contact")}
                </a>
              </li>
              <li>
                <a href="#job-seeker" onClick={handleApplyNow} className="text-[#B6925B] hover:text-[#B6925B]/80 font-semibold transition-colors focus:outline-none inline-flex items-center gap-0.5">
                  {tNavbar("applyNow")} <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="/appointment" className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("bookAppointment") || "Book Appointment"}
                </a>
              </li>
              <li>
                <a href="/pay" className="hover:text-[#B6925B] transition-colors focus:outline-none">
                  {tNavbar("completePayment") || "Complete Payment"}
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">{tNavbar("services")}</h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.filter(s => s.active !== false).map((s) => (
                <li key={s.id}>
                  <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-[#B6925B] transition-colors">
                    {tServices(getServiceTitleKey(s.id))}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details Col */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">{tContact("tag")}</h4>
            <ul className="space-y-3.5 text-sm font-sans">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#B6925B] shrink-0 mt-1" />
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#B6925B] shrink-0 mt-1" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin className="h-4 w-4 text-[#B6925B] shrink-0 mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits / Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} Trendy Fortune. {tFooter("rights")}
          </div>
          <div className="flex gap-6">
            <a href="#job-seeker" onClick={handleApplyNow} className="hover:text-slate-400">Terms of Service</a>
            <a href="#job-seeker" onClick={handleApplyNow} className="hover:text-slate-400">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
