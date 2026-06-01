"use client";

import * as React from "react";
import { Menu, X, ArrowUpRight, CreditCard, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const moreDropdownRef = React.useRef<HTMLDivElement>(null);

  const isJobPage = pathname?.startsWith("/jobs");
  const currentActiveSection = isJobPage ? "jobs-abroad" : activeSection;

  const getNavLinkKey = (label: string) => {
    switch (label.toLowerCase()) {
      case "home": return "home";
      case "jobs abroad": return "jobs";
      case "services": return "services";
      case "for employers": return "employers";
      case "about": return "about";
      case "contact": return "contact";
      default: return "home";
    }
  };

  // Track scroll position for sticky header styling
  React.useEffect(() => {
    if (isJobPage) return; // Skip scroll tracking on job listing pages

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section highlights
      const scrollPos = window.scrollY + 100;
      for (const link of NAV_LINKS) {
        const hashIndex = link.href.indexOf("#");
        const id = hashIndex !== -1 ? link.href.substring(hashIndex + 1) : "";
        if (!id) continue;
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isJobPage]);

  // Close More dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If not on homepage or not an anchor link, let the normal link navigation handle it
    if (pathname !== "/" || !href.includes("#")) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setIsOpen(false);

    const hashIndex = href.indexOf("#");
    const elementId = hashIndex !== -1 ? href.substring(hashIndex + 1) : "";
    const targetId = elementId === "for-employers" ? "employer" : elementId;
    const element = targetId ? document.getElementById(targetId) : null;

    if (element) {
      const offset = 80; // Adjust for sticky navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      if (elementId === "job-seeker" || elementId === "employer" || elementId === "for-employers") {
        window.location.hash = elementId === "for-employers" ? "#employer" : `#${elementId}`;
      }
    }
  };

  const handleApplyClick = () => {
    setIsOpen(false);
    if (pathname !== "/") {
      window.location.href = "/apply";
      return;
    }
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
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0B192C] border-b border-[#B8945E]/20 py-4 shadow-sm overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-4 2xl:gap-6 min-w-0">
            {/* Logo Group */}
            <div className="flex items-center shrink-0">
              <a
                href="/#home"
                onClick={(e) => handleScrollTo(e, "/#home")}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-12 lg:w-12 2xl:h-16 2xl:w-16 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                  <Image
                    src="/images/Untitled design (2).png"
                    alt="Trendy Fortune Overseas logo"
                    fill
                    sizes="(max-width: 768px) 40px, 64px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="hidden 2xl:flex flex-col items-center select-none">
                  <span className="font-serif font-extrabold text-base md:text-xl text-[#B8945E] uppercase tracking-wide leading-none" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    TRENDY FORTUNE
                  </span>
                  <span className="font-serif text-[9px] md:text-xs text-[#B8945E] uppercase tracking-[0.18em] text-center leading-none mt-1" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    OVERSEAS
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-5 whitespace-nowrap min-w-0">
              {NAV_LINKS.map((link) => {
                const hashIndex = link.href.indexOf("#");
                const id = hashIndex !== -1 ? link.href.substring(hashIndex + 1) : link.href;
                const isActive = currentActiveSection === id;
                const navKey = getNavLinkKey(link.label);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={cn(
                      "text-[13px] xl:text-sm 2xl:text-base font-medium transition-colors hover:text-[#B8945E] relative py-2 focus:outline-none whitespace-nowrap",
                      isActive ? "text-[#B8945E] font-semibold" : "text-white/85"
                    )}
                  >
                    {t(navKey)}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-[#B8945E]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions (Language Switcher + Complete Payment + Apply Now) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 2xl:gap-3.5 shrink-0 whitespace-nowrap">
              {/* More Dropdown (visible strictly between 1024px and 1439px) */}
              <div className="hidden lg:block 2xl:hidden relative" ref={moreDropdownRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8945E] transition-all cursor-pointer whitespace-nowrap text-sm"
                  aria-haspopup="true"
                  aria-expanded={isMoreOpen}
                  aria-label="More navigation links"
                >
                  <span>{t("more") || "More"}</span>
                  <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isMoreOpen ? "transform rotate-180" : "")} />
                </button>

                {isMoreOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-100 ring-1 ring-black/5 z-50 p-3 space-y-3 transform origin-top-right transition-all duration-200">
                    <div className="bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                      More Actions
                    </div>
                    
                    {/* Language Switcher Nested */}
                    <div className="w-full">
                      <LanguageSwitcher isDropdown={true} />
                    </div>

                    {/* Book Appointment Nested */}
                    <a
                      href="/appointment"
                      onClick={() => setIsMoreOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 border border-slate-100 transition-all duration-200 whitespace-nowrap"
                    >
                      <Calendar className="h-4 w-4 text-[#B8945E] shrink-0" />
                      <span className="truncate">{t("bookAppointment") || "Book Appointment"}</span>
                    </a>

                    {/* Complete Payment Nested */}
                    <a
                      href="/pay"
                      onClick={() => setIsMoreOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 border border-slate-100 transition-all duration-200 whitespace-nowrap"
                    >
                      <CreditCard className="h-4 w-4 text-[#B8945E] shrink-0" />
                      <span className="truncate">{t("completePayment") || "Complete Payment"}</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="hidden 2xl:block">
                <LanguageSwitcher />
              </div>
              <a
                href="/appointment"
                className="hidden 2xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                <Calendar className="h-4 w-4 text-[#B8945E]" />
                {t("bookAppointment") || "Book Appointment"}
              </a>
              <a
                href="/pay"
                className="hidden 2xl:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#B8945E] border border-[#B8945E]/30 hover:border-[#B8945E]/60 hover:bg-[#B8945E]/10 transition-all duration-300 whitespace-nowrap"
              >
                <CreditCard className="h-4 w-4" />
                {t("completePayment")}
              </a>
              <Button
                onClick={handleApplyClick}
                variant="primary"
                className="gap-1.5 group px-3.5 py-2 2xl:gap-2 2xl:px-5 2xl:py-2.5 whitespace-nowrap bg-[#B8945E] text-[#071426] hover:bg-[#A37F48] hover:shadow-[0_0_15px_rgba(184,148,94,0.35)] hover:-translate-y-0.5 transition-all duration-300 border border-white/10 font-bold text-sm 2xl:text-base"
              >
                {t("applyNow")}
                <ArrowUpRight className="h-4 w-4 text-[#071426] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>

            {/* Mobile Actions Container (Language Switcher outside Hamburger + Hamburger Toggle) */}
            <div className="flex lg:hidden items-center gap-1.5 xs:gap-2.5 shrink-0">
              <div>
                <LanguageSwitcher isMobileHeader={true} />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-white hover:bg-white/10 focus:outline-none cursor-pointer shrink-0 transition-colors"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-30 lg:hidden border-b border-slate-100 bg-white/95 backdrop-blur-lg shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-6">
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const hashIndex = link.href.indexOf("#");
                  const id = hashIndex !== -1 ? link.href.substring(hashIndex + 1) : link.href;
                  const isActive = currentActiveSection === id;
                  const navKey = getNavLinkKey(link.label);
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={cn(
                        "text-lg font-medium px-4 py-2.5 rounded-xl transition-colors",
                        isActive
                          ? "bg-slate-50 text-[#B6925B] font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#0B192C]"
                      )}
                    >
                      {t(navKey)}
                    </a>
                  );
                })}
              </nav>
              <div className="px-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <LanguageSwitcher isMobile={true} />
                <a
                  href="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold text-[#0B192C] border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all"
                >
                  <Calendar className="h-4 w-4 text-[#B8945E]" />
                  {t("bookAppointment") || "Book Appointment"}
                </a>
                <a
                  href="/pay"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold text-[#0B192C] border-2 border-[#B8945E]/40 hover:border-[#B8945E] hover:bg-[#B8945E]/5 transition-all"
                >
                  <CreditCard className="h-4 w-4 text-[#B8945E]" />
                  {t("completePayment")}
                </a>
                <Button onClick={handleApplyClick} variant="primary" className="w-full justify-center">
                  {t("applyNow")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
