export interface Country {
  id: string;
  name: string;
  code: string;
  description: string;
  flag: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  active?: boolean;
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export const CONTACT_INFO = {
  phone: "+91 8700917348",
  phoneRaw: "+918700917348",
  email: "info@trendyfortune.com",
  address: "Office No-C616-C617, NoidaOne Tower C, Sector 62, Noida, U.P. - 201309",
  whatsappUrl: "https://wa.me/918700917348?text=Hi%20Trendy%20Fortune%2C%20I%20want%20to%20know%20more%20about%20overseas%20jobs.",
  whatsappNumber: "+91 8700917348",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1384021571477!2d77.3621457!3d28.6255734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5d1cb37ab%3A0x6b8bc27f10b777a2!2sNoidaOne%20Tower%20C%2C%20Sector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1716768393849!5m2!1sen!2sin"
};

export const COUNTRIES: Country[] = [
  {
    id: "uae",
    name: "UAE",
    code: "AE",
    description: "Opportunities in Dubai, Abu Dhabi & Sharjah across Hospitality, Construction, and Retail.",
    flag: "🇦🇪"
  },
  {
    id: "qatar",
    name: "Qatar",
    code: "QA",
    description: "High-paying opportunities in Infrastructure, Oil & Gas, and Security services.",
    flag: "🇶🇦"
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    code: "SA",
    description: "Mega-projects recruitment in Construction, Manufacturing, and Healthcare sectors.",
    flag: "🇸🇦"
  },
  {
    id: "oman",
    name: "Oman",
    code: "OM",
    description: "Stable careers in Logistics, Healthcare, Engineering, and Hospitality fields.",
    flag: "🇴🇲"
  },
  {
    id: "kuwait",
    name: "Kuwait",
    code: "KW",
    description: "Excellent jobs in Maintenance, Retail, Logistics, and Administration.",
    flag: "🇰🇼"
  },
  {
    id: "europe",
    name: "Europe",
    code: "EU",
    description: "Schengen work permit assistance for Poland, Croatia, Malta, and Lithuania.",
    flag: "🇪🇺"
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    code: "GB",
    description: "Skilled visa placements in Health & Care, Engineering, and IT sectors.",
    flag: "🇬🇧"
  },
  {
    id: "canada",
    name: "Canada",
    code: "CA",
    description: "Express Entry, LMIA jobs, Study permits, and PNP pathway consulting.",
    flag: "🇨🇦"
  }
];

export const SERVICES: Service[] = [
  {
    id: "job-placement",
    title: "Overseas Job Placement",
    description: "End-to-end recruitment matching skilled Indian professionals with verified employers worldwide.",
    iconName: "Briefcase",
    active: true
  },
  {
    id: "manpower-supply",
    title: "Manpower Supply",
    description: "Reliable bulk and specialized labor supply for global corporations in diverse industrial sectors.",
    iconName: "Users",
    active: true
  },
  {
    id: "work-permit",
    title: "Work Permit Assistance",
    description: "Seamless processing support for visas, documentation validation, and embassy clearance.",
    iconName: "FileText",
    active: true
  },
  {
    id: "study-overseas",
    title: "Study Overseas",
    description: "Comprehensive university selection guidance and application support for top study destinations.",
    iconName: "GraduationCap",
    active: false
  },
  {
    id: "study-visa",
    title: "Study Visa Support",
    description: "Step-by-step guidance for education loan proof, document checklist, and visa interviews.",
    iconName: "FileSpreadsheet",
    active: false
  },
  {
    id: "career-consulting",
    title: "Career Consulting",
    description: "Expert profile building, international resume formatting, and interview preparation coaching.",
    iconName: "Compass",
    active: false
  }
];

export const INDUSTRIES: Industry[] = [
  { id: "construction", name: "Construction", iconName: "HardHat" },
  { id: "hospitality", name: "Hospitality", iconName: "Hotel" },
  { id: "healthcare", name: "Healthcare", iconName: "HeartPulse" },
  { id: "manufacturing", name: "Manufacturing", iconName: "Factory" },
  { id: "logistics", name: "Logistics", iconName: "Truck" },
  { id: "security", name: "Security", iconName: "ShieldAlert" },
  { id: "oil-gas", name: "Oil & Gas", iconName: "Flame" },
  { id: "retail", name: "Retail", iconName: "ShoppingBag" }
];

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: "Submit Your Details",
    description: "Fill out our quick lead form and upload your updated resume or share company manpower requests."
  },
  {
    number: 2,
    title: "Profile Screening",
    description: "Our recruiting specialists match your qualifications with open international job requisitions."
  },
  {
    number: 3,
    title: "Interview & Documentation",
    description: "Attend client interviews (virtual/face-to-face) and compile standard employment paperwork."
  },
  {
    number: 4,
    title: "Visa Support & Deployment",
    description: "We handle work visa filings, medical tests, emigration clearance, and organize pre-departure briefings."
  }
];

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Jobs Abroad", href: "/#jobs-abroad" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "For Employers", href: "/#employer" },
  { label: "Contact", href: "/#contact" }
];
