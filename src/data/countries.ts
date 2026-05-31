export interface CountryData {
  name: string;
  countryCode: string;
  slug: string;
  description?: string;
  popularJobs?: string[];
  jobsUrl: string;
}

export const CENTRAL_COUNTRIES: CountryData[] = [
  {
    name: "UAE",
    countryCode: "AE",
    slug: "uae",
    jobsUrl: "/jobs/uae",
    description: "Overseas job opportunities in UAE for skilled and semi-skilled workers.",
    popularJobs: ["Construction", "Hospitality", "Security", "Logistics"]
  },
  {
    name: "Russia",
    countryCode: "RU",
    slug: "russia",
    jobsUrl: "/jobs/russia",
    description: "Promising job placements in Russia's booming industrial and manufacturing sectors.",
    popularJobs: ["Welding", "Machinery", "Construction", "Factory Work"]
  },
  {
    name: "Oman",
    countryCode: "OM",
    slug: "oman",
    jobsUrl: "/jobs/oman",
    description: "Stable careers in Logistics, Healthcare, Engineering, and Hospitality fields.",
    popularJobs: ["Logistics", "Healthcare", "Engineering", "Hospitality"]
  },
  {
    name: "Bulgaria",
    countryCode: "BG",
    slug: "bulgaria",
    jobsUrl: "/jobs/bulgaria",
    description: "Exciting job vacancies in Bulgaria offering EU work permit benefits.",
    popularJobs: ["Agriculture", "Manufacturing", "Logistics", "Construction"]
  },
  {
    name: "Serbia",
    countryCode: "RS",
    slug: "serbia",
    jobsUrl: "/jobs/serbia",
    description: "Growing employment opportunities in Serbia for technical and construction work.",
    popularJobs: ["Construction", "Carpentry", "Electrical", "Metal Work"]
  },
  {
    name: "Uzbekistan",
    countryCode: "UZ",
    slug: "uzbekistan",
    jobsUrl: "/jobs/uzbekistan",
    description: "Lucrative construction and infrastructure project placements in Uzbekistan.",
    popularJobs: ["Civil Engineering", "Masonry", "Rigging", "Heavy Equipment"]
  },
  {
    name: "Ukraine",
    countryCode: "UA",
    slug: "ukraine",
    jobsUrl: "/jobs/ukraine",
    description: "Reconstruction and agricultural opportunities in European regions.",
    popularJobs: ["Agriculture", "Construction", "General Labor", "Logistics"]
  },
  {
    name: "Czech Republic",
    countryCode: "CZ",
    slug: "czech-republic",
    jobsUrl: "/jobs/czech-republic",
    description: "High demand for skilled and warehouse workers in the heart of Europe.",
    popularJobs: ["Warehouse", "Automotive Assembly", "Forklift Operator", "Packaging"]
  },
  {
    name: "Belarus",
    countryCode: "BY",
    slug: "belarus",
    jobsUrl: "/jobs/belarus",
    description: "Industrial, agricultural, and factory employment avenues in Belarus.",
    popularJobs: ["Factory Work", "Agriculture", "Food Processing", "Welding"]
  },
  {
    name: "Malaysia",
    countryCode: "MY",
    slug: "malaysia",
    jobsUrl: "/jobs/malaysia",
    description: "Vibrant job openings in Malaysia's plantation, hospitality, and electronic sectors.",
    popularJobs: ["Manufacturing", "Hospitality", "Agriculture", "Services"]
  },
  {
    name: "Mauritius",
    countryCode: "MU",
    slug: "mauritius",
    jobsUrl: "/jobs/mauritius",
    description: "Scenic and rewarding placements in Mauritius's tourism and apparel industries.",
    popularJobs: ["Tourism", "Textile Industry", "Culinary Arts", "Retail"]
  },
  {
    name: "Fiji",
    countryCode: "FJ",
    slug: "fiji",
    jobsUrl: "/jobs/fiji",
    description: "Hospitality, retail, and construction jobs in the beautiful island nation of Fiji.",
    popularJobs: ["Hotel Staff", "Retail Sales", "Construction", "Farming"]
  },
  {
    name: "Vietnam",
    countryCode: "VN",
    slug: "vietnam",
    jobsUrl: "/jobs/vietnam",
    description: "Expanding technical, manufacturing, and teaching positions in Vietnam.",
    popularJobs: ["Electronics Assembly", "Garments", "English Teaching", "Tech Support"]
  },
  {
    name: "Saudi Arabia",
    countryCode: "SA",
    slug: "saudi-arabia",
    jobsUrl: "/jobs/saudi-arabia",
    description: "Mega-projects recruitment in Construction, Manufacturing, and Healthcare sectors.",
    popularJobs: ["Construction", "Healthcare", "Manufacturing", "Engineering"]
  }
];
