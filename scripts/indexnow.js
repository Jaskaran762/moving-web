// Node 18+ has global fetch
const payload = {
  host: "www.movingnerds.ca",
  key: "9f9105b9dfd34704a1fcbf5fddd024b5",
  keyLocation: "https://www.movingnerds.ca/9f9105b9dfd34704a1fcbf5fddd024b5.txt",
  urlList: [
    "https://www.movingnerds.ca/",
    "https://www.movingnerds.ca/price-calculator",
    "https://www.movingnerds.ca/services",
    "https://www.movingnerds.ca/services/furniture-removal",
    "https://www.movingnerds.ca/services/appliance-pickup",
    "https://www.movingnerds.ca/services/electronic-waste",
    "https://www.movingnerds.ca/services/construction-debris",
    "https://www.movingnerds.ca/services/household-items",
    "https://www.movingnerds.ca/services/yard-waste",
    "https://www.movingnerds.ca/areas/halifax",
    "https://www.movingnerds.ca/areas/downtown-halifax",
    "https://www.movingnerds.ca/areas/dartmouth",
    "https://www.movingnerds.ca/areas/bedford",
    "https://www.movingnerds.ca/areas/clayton-park",
    "https://www.movingnerds.ca/areas/spryfield",
    "https://www.movingnerds.ca/areas/cole-harbour",
    "https://www.movingnerds.ca/areas/hammonds-plains",
    "https://www.movingnerds.ca/areas/eastern-passage",
    "https://www.movingnerds.ca/areas/timberlea",
    "https://www.movingnerds.ca/areas/beaverbank",
    "https://www.movingnerds.ca/areas/fall-river",
    "https://www.movingnerds.ca/areas/herring-cove",
    "https://www.movingnerds.ca/appointment"
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
