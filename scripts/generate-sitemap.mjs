import fs from "fs";
const base = "https://movingnerds.ca";
const today = new Date().toISOString().slice(0, 10);

const serviceSlugs = [
  "residential-moving",
  "commercial-moves",
  "long-distance-moving",
  "specialty-items"
];

const areaSlugs = [
  "halifax",
  "downtown-halifax",
  "dartmouth",
  "bedford",
  "lower-sackville",
  "clayton-park",
  "spryfield",
  "cole-harbour",
  "hammonds-plains",
  "eastern-passage",
  "timberlea",
  "beaverbank",
  "fall-river",
  "herring-cove"
];

const urls = [
  { loc: `${base}/`, changefreq: "daily", priority: "1.0" },
  { loc: `${base}/appointment`, changefreq: "daily", priority: "0.8" },
  { loc: `${base}/services`, changefreq: "daily", priority: "0.8" },
  { loc: `${base}/price-calculator`, changefreq: "monthly", priority: "0.7" },
  ...serviceSlugs.map(s => ({ loc: `${base}/services/${s}`, changefreq: "monthly", priority: "0.8" })),
  ...areaSlugs.map(a => ({ loc: `${base}/areas/${a}`, changefreq: "monthly", priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log("✅ sitemap.xml generated with Moving Nerds routes");