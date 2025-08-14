// parser/combinedParser.js

const fs = require("fs");
const path = require("path");
const { proximityGroups } = require("../data/proximityGroups");

const inputDir = path.join(__dirname, "..", "data");
const neighborhoodDataPath = path.join(inputDir, "neighborhoodData.json");
const zipCodesFilePath = path.join(inputDir, "ZipCodesMA.txt");

const salesOutputPath = path.join(inputDir, "ListingsData.json");
const rentalsOutputPath = path.join(inputDir, "RentalsData.json");
const incompletePath = path.join(inputDir, "incompleteListingsData.json");
const inferredTagsOutputPath = path.join(inputDir, "inferredTags.json");

const neighborhoodData = JSON.parse(
  fs.readFileSync(neighborhoodDataPath, "utf8")
);
const zipCodeLines = fs.readFileSync(zipCodesFilePath, "utf8").split("\n");

const listingTypes = [
  { type: "SF", inputFile: "SFdata.txt" },
  { type: "MF", inputFile: "MFdata.txt" },
  { type: "CC", inputFile: "CCdata.txt" },
];
const rentalInputFile = "RentalData.txt";

const zipToNeighborhood = new Map();
neighborhoodData.forEach(({ cityName, zipCodes }) => {
  zipCodes.forEach((zip) => zipToNeighborhood.set(zip, cityName));
});
const zipToTown = new Map();
zipCodeLines.forEach((line) => {
  const [zip, town] = line.split(",");
  if (zip && town) zipToTown.set(zip.trim(), town.trim());
});

const clean = (val) => val?.replace(/^"|"$/g, "").trim();
const cleanStreet = (street) =>
  street.length <= 3
    ? street
    : street.replace(/[,\s]*(?:[A-Z]{2}\d{3})$/, "").trim();
const generatePhotoUrls = (mls, count) =>
  Array.from(
    { length: count },
    (_, i) =>
      `https://media.mlspin.com/photo.aspx?mls=${mls}&n=${i}&w=1024&h=768`
  );

const allTagsSet = new Set();

const extractTagsFromRemarks = (remarks = "", listPrice = 0) => {
  const tags = new Set();
  const inferred = {};
  const lower = remarks.toLowerCase();

  const tagKeywords = {
    Studio: ["studio"],
    Waterfront: ["waterfront", "ocean", "river", "bay", "harbor"],
    "Flipper Opportunity": [
      "contractor special",
      "needs work",
      "fixer",
      "as-is",
      "handyman",
      "rehab",
      "tlc",
      "great bones",
      "investor",
    ],
    "In-Law Suite": ["in-law", "separate entrance"],
    "Mixed Use": ["mixed-use", "commercial and residential"],
    Suite: ["suite", "demi-suite"],
    Split: ["split-level", "split entry"],
    "Parking Spot Only": [
      "parking only",
      "deeded parking",
      "garage spot",
      "parking spot",
    ],
  };

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some((k) => lower.includes(k))) {
      if (tag === "Studio" && parseInt(listPrice) > 800000) continue;
      tags.add(tag);
      allTagsSet.add(tag);
    }
  }

  const bedMatch = lower.match(/(\d+)\s+(bed|br|bedroom)/);
  if (bedMatch) inferred.NO_BEDROOMS = bedMatch[1];
  const bathMatch = lower.match(/(\d+(\.\d+)?)\s+(bath|ba|bathroom)/);
  if (bathMatch) inferred.NO_FULL_BATHS = bathMatch[1];
  const parkMatch = lower.match(/(\d+)\s+(parking|garage|spaces|spots)/);
  if (parkMatch) inferred.PARKING_SPACES = parkMatch[1];
  const storyMatch = lower.match(/(\d+)[- ]?(story|floor|level)/);
  if (storyMatch) inferred.STORIES = storyMatch[1];
  const unitMatch = lower.match(/(\d+)\s+(unit|family|apartments)/);
  if (unitMatch) inferred.UNITS = unitMatch[1];

  return { inferredTags: Array.from(tags), inferredFields: inferred };
};

let existingListingsMap = new Map();
if (fs.existsSync(salesOutputPath)) {
  const previousListings = JSON.parse(fs.readFileSync(salesOutputPath, "utf8"));
  previousListings.forEach((p) => {
    const u = p.units[0];
    if (u?.LIST_NO) existingListingsMap.set(u.LIST_NO, p);
  });
}

const parseListings = (fileName, isRental = false, listingType = "") => {
  const filePath = path.join(inputDir, fileName);
  if (!fs.existsSync(filePath)) return { listings: [], incomplete: [] };

  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const headers = lines[0].split("|");
  const propertyMap = new Map();
  const incomplete = [];

  lines.slice(1).forEach((line) => {
    if (!line.trim()) return;

    const values = line.split("|");
    const listing = {};
    const fields = [
      "STREET_NO",
      "STREET_NAME",
      "UNIT_NO",
      "ZIP_CODE",
      "STATE",
      "LIST_PRICE",
      "NO_ROOMS",
      "NO_BEDROOMS",
      "NO_FULL_BATHS",
      "NO_HALF_BATHS",
      "PARKING_SPACES",
      "SQUARE_FEET",
      "LOT_SIZE",
      "LIST_NO",
      "PHOTO_COUNT",
      "DATE_AVAILABLE",
      "REMARKS",
      "MASTER_BATH_PRESENT",
    ];

    fields.forEach((f) => {
      const i = headers.indexOf(f);
      if (i !== -1) listing[f] = clean(values[i] || "");
    });

    listing.LISTING_TYPE = isRental ? "RENTAL" : listingType;
    listing.STREET_NAME = cleanStreet(listing.STREET_NAME || "");
    listing.TOWN_NAME = zipToTown.get(listing.ZIP_CODE) || "Unknown";
    listing.NEIGHBORHOOD = zipToNeighborhood.get(listing.ZIP_CODE) || "";

    const full = parseFloat(listing.NO_FULL_BATHS) || 0;
    const half = parseFloat(listing.NO_HALF_BATHS) || 0;
    listing.TOTAL_BATHROOMS = full + half * 0.5;

    if (listing.MASTER_BATH_PRESENT)
      listing.MASTER_BATH_PRESENT =
        listing.MASTER_BATH_PRESENT.toLowerCase() === "yes";

    const { inferredTags, inferredFields } = extractTagsFromRemarks(
      listing.REMARKS,
      listing.LIST_PRICE
    );
    Object.assign(listing, inferredFields);
    listing.TAGS = inferredTags;

    if (listing.LIST_NO && listing.PHOTO_COUNT) {
      const count = parseInt(listing.PHOTO_COUNT);
      if (!isNaN(count)) {
        listing.PHOTO_URLS = generatePhotoUrls(listing.LIST_NO, count);
      }
    }

    const key = `${listing.STREET_NO} ${listing.STREET_NAME} ${listing.ZIP_CODE}`;
    const required = [
      "LIST_NO",
      "LIST_PRICE",
      "STREET_NO",
      "STREET_NAME",
      "ZIP_CODE",
    ];
    if (!isRental) required.push("NO_BEDROOMS", "NO_FULL_BATHS");

    const missing = required.filter(
      (f) => !listing[f] || listing[f].trim() === ""
    );
    if (missing.length > 0) {
      listing.reason = `Missing required fields: ${missing.join(", ")}`;
      incomplete.push(listing);
      return;
    }

    if (propertyMap.has(key)) {
      propertyMap.get(key).units.push(listing);
    } else {
      propertyMap.set(key, {
        postType: "single",
        units: [listing],
        propertyKey: key,
      });
    }
  });

  const listings = [];
  propertyMap.forEach((p) => {
    if (p.units.length > 1) p.postType = "multiple";
    listings.push(p);
  });

  return { listings, incomplete };
};

const sortListingsByProximity = (listings) => {
  const priority = ["Back Bay", "South End", "Beacon Hill", "Cambridge"];
  const lowDemand = ["Mattapan", "Dorchester", "Hyde Park", "Roxbury"];

  return listings.sort((a, b) => {
    const zipA = a.units[0].ZIP_CODE;
    const zipB = b.units[0].ZIP_CODE;
    const groupA =
      Object.keys(proximityGroups).find((g) =>
        proximityGroups[g].includes(zipA)
      ) || "Z";
    const groupB =
      Object.keys(proximityGroups).find((g) =>
        proximityGroups[g].includes(zipB)
      ) || "Z";
    if (groupA !== groupB) return groupA.localeCompare(groupB);

    const getPriority = (n) =>
      priority.includes(n) ? 0 : lowDemand.includes(n) ? 2 : 1;
    return (
      getPriority(a.units[0].NEIGHBORHOOD) -
      getPriority(b.units[0].NEIGHBORHOOD)
    );
  });
};

// === RUN PARSER ===
let allListings = [],
  allIncomplete = [];

listingTypes.forEach(({ inputFile, type }) => {
  const { listings, incomplete } = parseListings(inputFile, false, type);
  allListings.push(...listings);
  allIncomplete.push(...incomplete);
});

const { listings: rentals, incomplete: rentalIncomplete } = parseListings(
  rentalInputFile,
  true,
  "RENTAL"
);

allListings.forEach((property) => {
  const unit = property.units[0];
  const previous = existingListingsMap.get(unit.LIST_NO);
  property.tags = [...unit.TAGS];

  if (!previous) {
    property.tags.push("New Listing");
  } else {
    const prev = previous.units[0];
    if (+unit.LIST_PRICE < +prev.LIST_PRICE)
      property.tags.push("Price Dropped");
    if (+unit.PHOTO_COUNT > +prev.PHOTO_COUNT)
      property.tags.push("Photos Added");
    if (unit.REMARKS !== prev.REMARKS) property.tags.push("Remarks Changed");
    if (unit.DATE_AVAILABLE !== prev.DATE_AVAILABLE)
      property.tags.push("Available Now");
    if (property.tags.length > 0) property.tags.push("Recently Updated");
  }
});

fs.writeFileSync(
  salesOutputPath,
  JSON.stringify(sortListingsByProximity(allListings), null, 2)
);
fs.writeFileSync(
  rentalsOutputPath,
  JSON.stringify(sortListingsByProximity(rentals), null, 2)
);
fs.writeFileSync(
  incompletePath,
  JSON.stringify([...allIncomplete, ...rentalIncomplete], null, 2)
);
fs.writeFileSync(
  inferredTagsOutputPath,
  JSON.stringify(Array.from(allTagsSet).sort(), null, 2)
);

console.log(
  "✅ ListingsData.json, RentalsData.json, and inferredTags.json created."
);
