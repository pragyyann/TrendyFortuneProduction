"use client";

import * as React from "react";
import { Menu, X, ArrowUpRight, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section highlights
      const scrollPos = window.scrollY + 100;
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
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
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId.substring(1));
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
    }
  };

  const handleApplyClick = () => {
    setIsOpen(false);
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

      // Optionally, focus the Job Seeker Form trigger if needed
      setTimeout(() => {
        const trigger = document.getElementById("tab-seeker");
        if (trigger) trigger.click();
      }, 500);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
          scrolled
            ? "glass-nav shadow-sm border-b border-slate-100 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="bg-[#0B192C] text-[#B6925B] p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Globe2 className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-xl md:text-2xl text-[#0B192C] tracking-tight">
                Trendy <span className="text-[#B6925B]">Fortune</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                const navKey = getNavLinkKey(link.label);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-[#B6925B] relative py-1 focus:outline-none",
                      isActive ? "text-[#B6925B]" : "text-slate-600"
                    )}
                  >
                    {t(navKey)}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B6925B]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <Button onClick={handleApplyClick} variant="primary" className="gap-2 group">
                {t("applyNow")}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0B192C] hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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
            className="fixed inset-x-0 top-[72px] z-30 lg:hidden border-b border-slate-100 bg-white/95 backdrop-blur-lg shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-6">
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
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
              <div className="px-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
                <LanguageSwitcher isMobile={true} />
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
