"use client";

import * as React from "react";
import { useLanguage, Locale } from "@/context/LanguageContext";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Locale; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" }
];

const languageLabels = {
  en: "English · हिंदी",
  hi: "English · हिंदी",
  bn: "বাংলা",
  ta: "தமிழ்",
  ml: "മലയാളം",
};

export function LanguageSwitcher({
  isMobile = false,
  isMobileHeader = false
}: {
  isMobile?: boolean;
  isMobileHeader?: boolean;
}) {
  const { locale, setLocale, sessionLocale } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
  };

  const activeLocale = sessionLocale || "en";
  const displayLabel = languageLabels[activeLocale] || "English · हिंदी";

  // Mode 1: Mobile drawer grid switcher (nested inside hamburger menu)
  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <label className="text-sm font-bold text-slate-500 flex items-center gap-2 px-4">
          <Globe className="h-4 w-4 text-[#B6925B]" />
          <span>Language / भाषा</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => handleLocaleChange(lang.code)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] cursor-pointer",
                  isSelected
                    ? "bg-[#0B192C] text-white border-[#0B192C] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                )}
              >
                <span>{lang.nativeName}</span>
                {isSelected && <Check className="h-4 w-4 text-[#B6925B]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Mode 2 & 3: Dropdown triggers (Desktop or Mobile Topbar Header)
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#B8945E]/30 bg-white/5 text-white font-semibold hover:bg-white/10 hover:border-[#B8945E]/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8945E] transition-all cursor-pointer shrink-0 whitespace-nowrap",
          isMobileHeader 
            ? "h-10 px-2.5 sm:px-3 text-[12px] sm:text-[13px]" 
            : "h-11 px-4 text-sm"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change language / भाषा बदलें"
      >
        <Globe className="h-4 w-4 text-[#B6925B] shrink-0" />
        <span className="font-sans tracking-wide">
          {displayLabel}
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0", isOpen ? "transform rotate-180" : "")} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 ring-1 ring-black/5 z-50 overflow-hidden transform origin-top-right transition-all duration-200",
            isMobileHeader ? "top-full" : ""
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {/* Subtle dropdown helper */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
            Choose Language / भाषा चुनें
          </div>
          <div className="py-1" role="none">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLocaleChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left font-medium cursor-pointer border-b border-slate-50 last:border-b-0",
                    isSelected
                      ? "bg-slate-50 text-[#0B192C] font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0B192C]"
                  )}
                  role="menuitem"
                >
                  <div className="flex flex-col">
                    <span className={cn("text-sm", isSelected ? "text-[#0B192C] font-bold" : "text-slate-900")}>
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal font-sans">{lang.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#B6925B]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
