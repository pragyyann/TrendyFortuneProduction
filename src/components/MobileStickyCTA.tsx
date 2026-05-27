"use client";

import * as React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/constants";

export function getWhatsAppLink(locale: string) {
  const phone = "919220809078";
  let text = "Hi Trendy Fortune, I want to know more about overseas jobs";
  if (locale === "hi") {
    text = "नमस्ते Trendy Fortune, मुझे विदेश नौकरी के बारे में जानकारी चाहिए। मेरा नाम: ___, जिला: ___, काम: ___, अनुभव: ___";
  } else if (locale === "bn") {
    text = "নমস্কার Trendy Fortune, আমি বিদেশে চাকরির বিষয়ে জানতে চাই। আমার নাম: ___, জেলা: ___, কাজ: ___, অভিজ্ঞতা: ___";
  } else if (locale === "ta") {
    text = "வணக்கம் Trendy Fortune, வெளிநாட்டு வேலை பற்றி தகவல் வேண்டும். என் பெயர்: ___, மாவட்டம்: ___, வேலை: ___, அனுபவம்: ___";
  } else if (locale === "ml") {
    text = "നമസ്കാരം Trendy Fortune, വിദേശ ജോലിയെക്കുറിച്ച് അറിയണം. എന്റെ പേര്: ___, ജില്ല: ___, ജോലി: ___, അനുഭവം: ___";
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function MobileStickyCTA() {
  const t = useTranslations("sticky");
  const { locale } = useLanguage();
  const whatsappUrl = getWhatsAppLink(locale);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-3 px-4 shadow-2xl flex items-center gap-3 lg:hidden">
      {/* Call Now button */}
      <a
        href={`tel:${CONTACT_INFO.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-2 h-12 bg-slate-100 hover:bg-slate-200 text-[#0B192C] rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
      >
        <Phone className="h-4 w-4 text-[#B6925B]" />
        <span>{t("call")}</span>
      </a>

      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/10"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        <span>{t("whatsapp")}</span>
      </a>
    </div>
  );
}
