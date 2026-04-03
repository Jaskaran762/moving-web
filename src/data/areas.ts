// src/data/areas.ts
export type FAQ = { q: string; a: string };

export type Area = {
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  blurb: string;
  heroImage?: string;
  neighborhoods?: string[];
  services: string[];
  itemsWeMove: string[]; // Changed from itemsWeTake
  faqs: FAQ[];
  nearby: string[];       // list of other area slugs
  mapUrl: string;         // Google Maps query URL
};

// helper
export const slugify = (name: string) =>
  name.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// shared content
const DEFAULT_SERVICES = [
  "Local Moving",
  "Long-Distance Moving",
  "Residential & Apartment Moves",
  "Commercial & Office Relocation",
  "Professional Packing & Unpacking",
  "Furniture Assembly & Disassembly",
  "Loading & Unloading Labor",
  "Specialty Item Moving (Pianos, Safes)",
];

const DEFAULT_ITEMS_MOVED = [
  "Sofas, sectionals & recliners",
  "Bed frames, mattresses & headboards",
  "Dining tables, chairs & hutches",
  "Office desks & filing cabinets",
  "Fragile items, mirrors & artwork",
  "Washers, dryers & large appliances",
  "Pianos, pool tables & heavy items",
  "Boxes, bins & packed household goods",
];

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "Do you offer same-day or last-minute moving?",
    a: "Yes—we do our best to accommodate short-notice and emergency moves based on our daily schedule. Call us to check availability.",
  },
  {
    q: "How do you price a moving job?",
    a: "Pricing is typically based on an hourly rate, crew size, and travel distance. We also offer flat rates for long-distance moves. Contact us for a free, accurate estimate.",
  },
  {
    q: "Do you provide packing materials and services?",
    a: "Absolutely! We can supply moving boxes, bubble wrap, packing paper, and tape. We also offer full and partial packing services if you'd like us to handle it all.",
  },
];

const names = [
  "Halifax",
  "Downtown Halifax",
  "Dartmouth",
  "Bedford",
  "Lower Sackville",
  "Middle Sackville",
  "Upper Sackville",
  "Clayton Park",
  "Spryfield",
  "Cole Harbour",
  "Hammonds Plains",
  "Eastern Passage",
  "Timberlea",
  "Beaverbank",
  "Fall River",
  "Herring Cove",
  "Upper Tantallon",
  "Lake Echo",
  "Porter's Lake",
  "North Preston",
  "East Preston",
];

// Custom moving-focused blurbs per area
const BLURBS: Record<string, string> = {
  "Halifax": "Fast, fully insured moving services across the Halifax Peninsula and beyond. Local and long-distance experts.",
  "Downtown Halifax": "Condo and apartment moving specialists. We navigate elevator rules, tight spaces, and busy streets with care.",
  "Dartmouth": "Expert residential and commercial moving from Woodside to Burnside. We make crossing the bridge stress-free.",
  "Bedford": "Premium moving services with transparent pricing. Professional, uniformed crews that treat your belongings like their own.",
  "Lower Sackville": "Efficient and affordable moving services for families and businesses throughout Sackville and surrounding areas.",
  "Middle Sackville": "Professional moving services for residential homes and estates in Middle Sackville.",
  "Upper Sackville": "Efficient estate moves and full-home relocations for the Upper Sackville community.",
  "Clayton Park": "Apartment and house moves handled efficiently. We specialize in safe furniture handling and stairway navigation.",
  "Spryfield": "Your trusted local movers for Spryfield. Top-notch service, careful packing, and affordable rates.",
  "Cole Harbour": "Stress-free relocations in Cole Harbour. We provide full-service packing, moving, and unpacking.",
  "Hammonds Plains": "Handling large estate moves, multi-level homes, and delicate items with expert care and precision.",
  "Eastern Passage": "Friendly, local movers dedicated to making your transition to or from Eastern Passage an absolute breeze.",
  "Timberlea": "On-time and on-budget moving services. Whether you're moving down the street or across the province.",
  "Beaverbank": "Dependable family-home moving. We pad and shrink-wrap your furniture for maximum protection during transit.",
  "Fall River": "Whole-home moves with flexible scheduling. Experienced crews equipped for large properties and long driveways.",
  "Herring Cove": "Careful coastal community moving. We handle narrow roads and tricky access with professional ease.",
  "Upper Tantallon": "Serving the St. Margarets Bay area with fast, careful, and fully insured moving services.",
  "Lake Echo": "Quick and easy local moving for Lake Echo and surrounding rural communities.",
  "Porter's Lake": "From single-item transport to full household moves, we provide reliable moving across Porter's Lake and Highway 7.",
  "North Preston": "Local, community-focused moving services offering transparent pricing and careful handling.",
  "East Preston": "Efficient moving services for the East Preston area—professional, insured, and reliable.",
};

const NEIGHBOURHOODS: Record<string, string[]> = {
  "Halifax": ["North End", "South End", "West End", "Fairview", "Armdale"],
  "Downtown Halifax": ["Spring Garden", "Schmidtville", "Harbourfront"],
  "Dartmouth": ["Woodside", "Burnside", "Portland Hills", "Russell Lake"],
  "Bedford": ["Bedford West", "Shore Drive", "Bedford South"],
  "Lower Sackville": ["First Lake", "Glendale", "Millwood", "Sackville Estates"],
  "Middle Sackville": ["Millwood", "Twin Brooks", "Indigo Shores"],
  "Upper Sackville": ["Sackville Estates", "Lisgar Drive"],
  "Clayton Park": ["Clayton Park West", "Rockingham"],
  "Spryfield": ["Thornhill", "Leiblin Park", "Herring Cove Rd"],
  "Cole Harbour": ["Forest Hills", "Colby Village"],
  "Hammonds Plains": ["Kingswood", "Highland Park", "Voyageur Lakes"],
  "Eastern Passage": ["Cow Bay", "Heritage Hills"],
  "Timberlea": ["Beechville", "Lakeside", "Timberlea Village"],
  "Beaverbank": ["Kinsac", "Monarch Estates"],
  "Fall River": ["Waverley", "Schwartzwald", "St. Andrews Village"],
  "Herring Cove": ["Purdy's Wharf? (kidding) - Herring Cove Village"],
  "Upper Tantallon": ["Westwood Hills", "Hubley"],
  "Lake Echo": ["Ponderosa Estate", "Mineville", "Echo Forest"],
  "Porter's Lake": ["Lakeview Estate", "Alpine Drive", "Seven Lakes"],
  "North Preston": ["Simmonds Road", "Johnson Road"],
  "East Preston": ["Cherry Brook", "Lake Major"],
};

const hero = "/dashboard/movingnerds.jpg";

const buildArea = (name: string): Area => {
  const slug = slugify(name);
  const near = names
    .filter((n) => n !== name)
    .slice(0, 6) // a few to show
    .map(slugify);

  return {
    name,
    slug,
    seoTitle: `${name} Movers | Local & Long-Distance | Moving Nerds`,
    seoDescription:
      (BLURBS[name] || "Expert moving services in HRM.") +
      " Free quotes, fully insured crews, and professional packing. Call (902) 412-8566.",
    blurb: BLURBS[name] || "Local moving service you can trust—professional, insured, and careful with your belongings.",
    heroImage: hero,
    neighborhoods: NEIGHBOURHOODS[name] || undefined,
    services: DEFAULT_SERVICES,
    itemsWeMove: DEFAULT_ITEMS_MOVED,
    faqs: DEFAULT_FAQS,
    nearby: near,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} NS moving company`)}`,
  };
};

export const AREAS: Area[] = names.map(buildArea);

// convenience getters
export const getAreaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug);
export const getAllAreaLinks = () => AREAS.map(({ name, slug }) => ({ name, slug }));