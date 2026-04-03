import fs from "fs";
const base = "https:movingnerds.ca";
const today = new Date().toISOString().slice(0,10);

const serviceSlugs = [
  "furniture","appliances","electronics","construction","household","yard" // ← keep in sync with your SERVICES keys
];

const areaSlugs = [
  "halifax","dartmouth","bedford","sackville","cole-harbour","clayton-park"
];

const urls = [
  { loc: `${base}/`, changefreq: "daily", priority: "1.0" },
  { loc: `${base}/price-calculator`, changefreq: "monthly", priority: "0.7" },
  ...serviceSlugs.map(s => ({ loc: `${base}/services/${s}`, changefreq: "quarterly", priority: "0.8" })),
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
console.log("✅ sitemap.xml generated");
