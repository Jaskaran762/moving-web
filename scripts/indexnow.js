// Node 18+ has global fetch
const payload = {
  host: "www.junknerds.ca",
  key: "9f9105b9dfd34704a1fcbf5fddd024b5",
  keyLocation: "https://www.junknerds.ca/9f9105b9dfd34704a1fcbf5fddd024b5.txt",
  urlList: [
    "https://www.junknerds.ca/",
    "https://www.junknerds.ca/price-calculator",
    "https://www.junknerds.ca/services",
    "https://www.junknerds.ca/services/furniture-removal",
    "https://www.junknerds.ca/services/appliance-pickup",
    "https://www.junknerds.ca/services/electronic-waste",
    "https://www.junknerds.ca/services/construction-debris",
    "https://www.junknerds.ca/services/household-items",
    "https://www.junknerds.ca/services/yard-waste",
    "https://www.junknerds.ca/areas/halifax",
    "https://www.junknerds.ca/areas/downtown-halifax",
    "https://www.junknerds.ca/areas/dartmouth",
    "https://www.junknerds.ca/areas/bedford",
    "https://www.junknerds.ca/areas/clayton-park",
    "https://www.junknerds.ca/areas/spryfield",
    "https://www.junknerds.ca/areas/cole-harbour",
    "https://www.junknerds.ca/areas/hammonds-plains",
    "https://www.junknerds.ca/areas/eastern-passage",
    "https://www.junknerds.ca/areas/timberlea",
    "https://www.junknerds.ca/areas/beaverbank",
    "https://www.junknerds.ca/areas/fall-river",
    "https://www.junknerds.ca/areas/herring-cove",
    "https://www.junknerds.ca/appointment"
  ],
};

(async () => {
  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log("Status:", res.status, res.statusText);
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.error("IndexNow submission failed:", err);
    process.exitCode = 1;
  }
})();
