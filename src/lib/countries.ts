export type Country = {
  country_id: string;
  country_name: string;
  country_slug: string;
  country_code: string;
  region: string;
  is_active: string;
  is_featured?: string;
  map_x?: string | number;
  map_y?: string | number;
};

export type ApiResponse = {
  success: boolean;
  data?: Country[];
  error?: string;
};

const FALLBACK_COUNTRIES: Country[] = [
  { country_id: "fallback-uae", country_name: "UAE", country_slug: "uae", country_code: "AE", region: "Middle East", is_active: "YES", is_featured: "YES", map_x: "65.97", map_y: "45.83" },
  { country_id: "fallback-russia", country_name: "Russia", country_slug: "russia", country_code: "RU", region: "Russia & CIS", is_active: "YES", is_featured: "YES", map_x: "76.05", map_y: "22.50" },
  { country_id: "fallback-oman", country_name: "Oman", country_slug: "oman", country_code: "OM", region: "Middle East", is_active: "YES", is_featured: "YES", map_x: "66.81", map_y: "47.50" },
  { country_id: "fallback-bulgaria", country_name: "Bulgaria", country_slug: "bulgaria", country_code: "BG", region: "Europe", is_active: "YES", is_featured: "YES", map_x: "57.56", map_y: "32.50" },
  { country_id: "fallback-serbia", country_name: "Serbia", country_slug: "serbia", country_code: "RS", region: "Europe", is_active: "YES", is_featured: "YES", map_x: "56.30", map_y: "31.67" },
  { country_id: "fallback-uzbekistan", country_name: "Uzbekistan", country_slug: "uzbekistan", country_code: "UZ", region: "Russia & CIS", is_active: "YES", is_featured: "YES", map_x: "69.33", map_y: "33.33" },
  { country_id: "fallback-ukraine", country_name: "Ukraine", country_slug: "ukraine", country_code: "UA", region: "Europe", is_active: "YES", is_featured: "YES", map_x: "59.24", map_y: "27.50" },
  { country_id: "fallback-czech-republic", country_name: "Czech Republic", country_slug: "czech-republic", country_code: "CZ", region: "Europe", is_active: "YES", is_featured: "YES", map_x: "54.62", map_y: "26.67" },
  { country_id: "fallback-belarus", country_name: "Belarus", country_slug: "belarus", country_code: "BY", region: "Europe", is_active: "YES", is_featured: "YES", map_x: "58.40", map_y: "22.50" },
  { country_id: "fallback-malaysia", country_name: "Malaysia", country_slug: "malaysia", country_code: "MY", region: "Southeast Asia", is_active: "YES", is_featured: "YES", map_x: "80.25", map_y: "57.50" },
  { country_id: "fallback-mauritius", country_name: "Mauritius", country_slug: "mauritius", country_code: "MU", region: "International", is_active: "YES", is_featured: "YES", map_x: "67.23", map_y: "72.50" },
  { country_id: "fallback-fiji", country_name: "Fiji", country_slug: "fiji", country_code: "FJ", region: "Pacific Islands", is_active: "YES", is_featured: "YES", map_x: "102.94", map_y: "70.83" },
  { country_id: "fallback-vietnam", country_name: "Vietnam", country_slug: "vietnam", country_code: "VN", region: "Southeast Asia", is_active: "YES", is_featured: "YES", map_x: "82.35", map_y: "51.67" },
  { country_id: "fallback-saudi-arabia", country_name: "Saudi Arabia", country_slug: "saudi-arabia", country_code: "SA", region: "Middle East", is_active: "YES", is_featured: "YES", map_x: "63.45", map_y: "45.83" }
];

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("/api/countries");
    
    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error(`API failed with status ${response.status}`);
        console.log("Using fallback countries");
      }
      return FALLBACK_COUNTRIES;
    }
    
    const result: ApiResponse = await response.json();
    
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      if (process.env.NODE_ENV === "development") {
        console.log("Using API countries");
      }
      return result.data;
    }
    
    if (process.env.NODE_ENV === "development") {
      console.warn("API succeeded but returned empty or unsuccessful response:", result.error || "No data");
      console.log("Using fallback countries");
    }
    return FALLBACK_COUNTRIES;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch countries from API route:", error);
      console.log("Using fallback countries");
    }
    return FALLBACK_COUNTRIES;
  }
}

