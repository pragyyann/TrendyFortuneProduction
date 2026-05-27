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

export function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const { locale, setLocale } = useLanguage();
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

  const activeLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <label className="text-sm font-semibold text-slate-500 flex items-center gap-2 px-4">
          <Globe className="h-4 w-4" />
          <span>Language / भाषा</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98]",
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B192C] transition-all cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-[#B6925B]" />
        <span>{activeLang.nativeName}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "transform rotate-180" : "")} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-100 ring-1 ring-black/5 z-50 overflow-hidden transform origin-top-right transition-all duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left font-medium",
                    isSelected
                      ? "bg-slate-50 text-[#0B192C] font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0B192C]"
                  )}
                  role="menuitem"
                >
                  <div className="flex flex-col">
                    <span className="text-slate-900">{lang.nativeName}</span>
                    <span className="text-xs text-slate-400 font-normal">{lang.name}</span>
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
