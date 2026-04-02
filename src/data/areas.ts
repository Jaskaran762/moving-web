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
  itemsWeTake: string[];
  faqs: FAQ[];
  nearby: string[];       // list of other area slugs
  mapUrl: string;         // Google Maps query URL
};

// helper
export const slugify = (name: string) =>
  name.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// shared content
const DEFAULT_SERVICES = [
  "Furniture Removal",
  "Appliance Pickup",
  "Construction Debris",
  "Electronics & E-waste",
  "Household Cleanouts",
  "Yard Waste",
  "Garage / Basement Cleanouts",
  "Mattress & Box Spring Removal",
];

const DEFAULT_ITEMS = [
  "Sofas, sectionals & recliners",
  "Bed frames & headboards",
  "Dressers, wardrobes & bookshelves",
  "Mattresses & box springs",
  "Dining & coffee tables",
  "Office chairs, desks & filing cabinets",
  "Washers, dryers & fridges",
  "TVs, computers & small electronics",
];

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "Do you offer same-day junk removal?",
    a: "Yes—call before noon and we’ll do our best to book you same-day, subject to availability.",
  },
  {
    q: "How do you price the job?",
    a: "Pricing is based on the load size and any special handling. Use the Price Calculator for a ballpark and we’ll confirm on site.",
  },
  {
    q: "Do you recycle and donate?",
    a: "Absolutely. We recycle metals, electronics and cardboard, and donate usable items whenever possible.",
  },
];

const names = [
  "Halifax",
  "Dartmouth",
  "Bedford",
  "Clayton Park",
  "Spryfield",
  "Cole Harbour",
  "Hammonds Plains",
  "Eastern Passage",
  "Timberlea",
  "Beaverbank",
  "Downtown Halifax",
  "Fall River",
  "Herring Cove",
];

// light custom blurbs per area
const BLURBS: Record<string, string> = {
  "Halifax": "Fast, insured junk removal across the Halifax Peninsula and beyond. Same-day pickup available.",
  "Downtown Halifax": "Condo-friendly hauling with building rules in mind—quick, careful and fully insured.",
  "Dartmouth": "From Woodside to Burnside, we clear apartments, homes and offices—recycle-first approach.",
  "Bedford": "Curbside or in-home pickups—transparent pricing and tidy crews your neighbours recommend.",
  "Clayton Park": "Apartment moves and bulky furniture removals handled efficiently with elevator savvy.",
  "Spryfield": "Yard waste, household items and renovation debris—book online in minutes.",
  "Cole Harbour": "Eco-friendly disposal and donation options for your gently-used items.",
  "Hammonds Plains": "Estate cleanouts, garage clear-outs and construction debris—no job too big.",
  "Eastern Passage": "Fisherman’s sheds to basements—we haul it away and leave it swept.",
  "Timberlea": "Renovation debris and household junk—reliable crew, on time and on budget.",
  "Beaverbank": "Basement, attic and shed cleanouts—local, friendly and efficient.",
  "Fall River": "Whole-home cleanouts and selective pickups—flexible time windows.",
  "Herring Cove": "Coastal community service with careful disposal and recycling.",
};

const NEIGHBOURHOODS: Record<string, string[]> = {
  "Halifax": ["North End", "South End", "West End", "Fairview", "Armdale"],
  "Downtown Halifax": ["Spring Garden", "Schmidtville", "Harbourfront"],
  "Dartmouth": ["Woodside", "Burnside", "Portland Hills", "Russell Lake"],
  "Bedford": ["Bedford West", "Shore Drive", "Bedford South"],
  "Clayton Park": ["Clayton Park West", "Rockingham"],
  "Spryfield": ["Thornhill", "Leiblin Park", "Herring Cove Rd"],
  "Cole Harbour": ["Forest Hills", "Colby Village"],
  "Hammonds Plains": ["Kingswood", "Highland Park", "Voyageur Lakes"],
  "Eastern Passage": ["Cow Bay", "Heritage Hills"],
  "Timberlea": ["Beechville", "Lakeside", "Timberlea Village"],
  "Beaverbank": ["Kinsac", "Monarch Estates"],
  "Fall River": ["Waverley", "Schwartzwald", "St. Andrews Village"],
  "Herring Cove": ["Purdy's Wharf? (kidding) — Herring Cove Village"],
};

const hero = "/dashboard/junknerds.jpg";

const buildArea = (name: string): Area => {
  const slug = slugify(name);
  const near = names
    .filter((n) => n !== name)
    .slice(0, 6) // a few to show
    .map(slugify);

  return {
    name,
    slug,
    seoTitle: `${name} Junk Removal | Same-Day Pickup | JunkNerds`,
    seoDescription:
      (BLURBS[name] || "Junk removal made easy in HRM.") +
      " Free quotes, insured crews, recycle-first disposal. Call (902) 412-8566.",
    blurb: BLURBS[name] || "Local junk removal you can trust—professional, insured and eco-friendly.",
    heroImage: hero,
    neighborhoods: NEIGHBOURHOODS[name] || undefined,
    services: DEFAULT_SERVICES,
    itemsWeTake: DEFAULT_ITEMS,
    faqs: DEFAULT_FAQS,
    nearby: near,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} NS junk removal`)}`,
  };
};

export const AREAS: Area[] = names.map(buildArea);

// convenience getters
export const getAreaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug);
export const getAllAreaLinks = () => AREAS.map(({ name, slug }) => ({ name, slug }));
