import * as React from "react";
import dynamic from "next/dynamic";

// Import Above-the-fold/Immediate Components
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Import Skeletons for Loading Fallbacks
import {
  CountryCardsSkeleton,
  ServicesSkeleton,
  CardGridSkeleton,
  FormSkeleton
} from "@/components/ui/skeletons";

// Dynamically load all below-the-fold components for code-splitting
const TrustStrip = dynamic(
  () => import("@/components/TrustStrip").then((mod) => mod.TrustStrip)
);

const CountriesSection = dynamic(
  () => import("@/components/CountriesSection").then((mod) => mod.CountriesSection),
  {
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-4">
          <div className="h-4 w-32 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto animate-pulse" />
        </div>
        <CountryCardsSkeleton />
      </div>
    )
  }
);

const ServicesSection = dynamic(
  () => import("@/components/ServicesSection").then((mod) => mod.ServicesSection),
  {
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-4">
          <div className="h-4 w-32 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto animate-pulse" />
        </div>
        <ServicesSkeleton />
      </div>
    )
  }
);

const IndustrySection = dynamic(
  () => import("@/components/IndustrySection").then((mod) => mod.IndustrySection),
  {
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-4">
          <div className="h-4 w-32 bg-slate-200 rounded mx-auto animate-pulse" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto animate-pulse" />
        </div>
        <CardGridSkeleton />
      </div>
    )
  }
);

const HowItWorks = dynamic(
  () => import("@/components/HowItWorks").then((mod) => mod.HowItWorks)
);

const SplitCTA = dynamic(
  () => import("@/components/SplitCTA").then((mod) => mod.SplitCTA)
);

const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection").then((mod) => mod.TestimonialsSection)
);

const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((mod) => mod.FAQSection)
);

const LeadForm = dynamic(
  () => import("@/components/LeadForm").then((mod) => mod.LeadForm),
  {
    loading: () => (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FormSkeleton />
      </div>
    )
  }
);

const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((mod) => mod.ContactSection)
);

const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer)
);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 w-full">
        <Hero />
        <TrustStrip />
        <CountriesSection />
        <ServicesSection />
        <IndustrySection />
        <HowItWorks />
        <SplitCTA />
        <TestimonialsSection />
        <FAQSection />
        <LeadForm />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
