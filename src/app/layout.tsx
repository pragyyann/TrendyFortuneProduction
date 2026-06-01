import type { Metadata } from "next";
import { Sora, Inter, Noto_Sans_Devanagari, Noto_Sans_Bengali, Noto_Sans_Tamil, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LanguageProvider } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/constants";

// Google Fonts Setup
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

const deval = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const bengal = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const tamilFont = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const malayalamFont = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

// Next.js Metadata API configuration for high-end SEO indexing
export const metadata: Metadata = {
  title: "Trendy Fortune | Overseas Recruitment & Manpower Consultancy",
  description: "Trendy Fortune provides premium overseas job placement, skilled manpower supply, work permit assistance, study visa support, and global career consulting for job seekers and employers.",
  keywords: [
    "overseas recruitment agency",
    "manpower consultancy",
    "Gulf jobs",
    "work permit assistance",
    "study visa",
    "overseas jobs",
    "manpower supply India",
    "hire skilled workers",
    "international recruitment",
    "study abroad consultancy",
    "Saudi Arabia recruitment",
    "UAE jobs",
    "Europe visa agency"
  ],
  alternates: {
    canonical: "https://www.trendyfortune.com"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Trendy Fortune | Overseas Recruitment & Manpower Consultancy",
    description: "Verified global career placements and reliable bulk manpower supply across GCC, Europe, and North America.",
    url: "https://www.trendyfortune.com",
    siteName: "Trendy Fortune",
    images: [
      {
        url: "https://www.trendyfortune.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trendy Fortune Overseas Recruitment Network"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendy Fortune | Overseas Recruitment & Manpower Consultancy",
    description: "Helping skilled professionals find global opportunities and helping employers hire certified workforce worldwide.",
    images: ["https://www.trendyfortune.com/og-image.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "Trendy Fortune",
    "image": "https://www.trendyfortune.com/og-image.jpg",
    "description": "Overseas recruitment agency supplying skilled technical manpower and work permit visa support.",
    "@id": "https://www.trendyfortune.com/#agency",
    "url": "https://www.trendyfortune.com",
    "telephone": CONTACT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_INFO.address.split(",")[0],
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400614",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.028387,
      "longitude": 73.016335
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:30"
    },
    "sameAs": [
      "https://www.facebook.com/trendyfortune",
      "https://www.linkedin.com/company/trendyfortune",
      "https://www.instagram.com/trendyfortune"
    ]
  };

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${deval.variable} ${bengal.variable} ${tamilFont.variable} ${malayalamFont.variable} h-full antialiased`}>
      <head>
        {/* Injecting JSON-LD script directly in the head element */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
