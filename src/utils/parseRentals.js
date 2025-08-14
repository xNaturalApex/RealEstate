const fs = require("fs");
const path = require("path");

// File paths
const dataFilePath = path.join(__dirname, "src/data/RentalData.txt"); // Path to your data file
const zipCodesFilePath = path.join(__dirname, "src/data/ZipCodesMA.txt"); // Path to your zip codes file
const outputFilePath = path.join(__dirname, "src/data/RentalData.json"); // Path to output JSON file
const incompleteListingsPath = path.join(
  __dirname,
  "src/data/incompleteListings.txt"
); // Path to incomplete listings file

let existingListingsMap = new Map();
if (fs.existsSync(outputFilePath)) {
  const existingData = JSON.parse(fs.readFileSync(outputFilePath, "utf8"));
  existingData.forEach((property) => {
    const firstUnit = property.units[0];
    existingListingsMap.set(firstUnit["LIST_NO"], property);
  });
}

// Zip code categories based on proximity to Boston
const zipCodeCategories = {
  "Close to Boston (0-15 miles)": [
    "02108",
    "02109",
    "02110",
    "02111",
    "02112",
    "02113",
    "02114",
    "02115",
    "02116",
    "02117",
    "02118",
    "02119",
    "02120",
    "02121",
    "02122",
    "02123",
    "02124",
    "02125",
    "02126",
    "02127",
    "02128",
    "02129",
    "02130",
    "02131",
    "02132",
    "02134",
    "02135",
    "02136",
    "02137",
    "02138",
    "02139",
    "02140",
    "02141",
    "02142",
    "02143",
    "02144",
    "02145",
    "02148",
    "02149",
    "02150",
    "02151",
    "02152",
    "02153",
    "02155",
    "02156",
  ],
  "Near Boston (15-30 miles)": [
    "02420",
    "02421",
    "02445",
    "02446",
    "02447",
    "02451",
    "02452",
    "02453",
    "02454",
    "02455",
    "02456",
    "02457",
    "02458",
    "02459",
    "02460",
    "02461",
    "02462",
    "02464",
    "02465",
    "02466",
    "02471",
    "02472",
    "02474",
    "02475",
    "02476",
    "02477",
    "02478",
    "02479",
    "02481",
    "02482",
    "02532",
    "02534",
    "02535",
    "02536",
    "02537",
    "02538",
    "02539",
    "02540",
    "02541",
    "02542",
    "02543",
    "02544",
    "02546",
    "02547",
    "02548",
    "02549",
    "02550",
    "02551",
    "02552",
    "02553",
    "02554",
    "02556",
    "02557",
    "02558",
    "02559",
    "02561",
    "02562",
    "02563",
    "02564",
    "02565",
    "02568",
    "02571",
    "02573",
    "02574",
    "02575",
    "02576",
    "02584",
  ],
  "Farther Out (30-50 miles)": [
    "01003",
    "01004",
    "01005",
    "01007",
    "01008",
    "01009",
    "01010",
    "01011",
    "01012",
    "01013",
    "01014",
    "01020",
    "01021",
    "01022",
    "01026",
    "01027",
    "01028",
    "01029",
    "01030",
    "01031",
    "01032",
    "01033",
    "01034",
    "01035",
    "01036",
    "01037",
    "01038",
    "01039",
    "01040",
    "01041",
    "01042",
    "01043",
    "01044",
    "01045",
    "01046",
    "01050",
    "01053",
    "01054",
    "01056",
    "01057",
    "01059",
    "01060",
    "01061",
    "01062",
    "01063",
    "01066",
    "01068",
    "01069",
    "01070",
    "01071",
    "01072",
    "01073",
    "01074",
    "01075",
    "01077",
    "01079",
    "01080",
    "01081",
    "01082",
    "01083",
    "01084",
    "01085",
    "01086",
    "01088",
    "01089",
    "01092",
    "01093",
    "01094",
    "01095",
    "01096",
    "01097",
    "01098",
    "01101",
    "01102",
    "01103",
    "01104",
    "01105",
    "01106",
    "01107",
    "01108",
    "01109",
    "01111",
    "01115",
    "01116",
    "01118",
    "01119",
    "01128",
    "01129",
    "01133",
    "01138",
    "01139",
    "01144",
    "01151",
    "01152",
    "01195",
    "01199",
    "01201",
    "01202",
    "01203",
    "01220",
    "01222",
    "01223",
    "01224",
    "01225",
    "01226",
    "01227",
    "01229",
    "01230",
    "01235",
    "01236",
    "01237",
    "01238",
    "01240",
    "01242",
    "01243",
    "01244",
    "01245",
    "01247",
    "01252",
    "01253",
    "01254",
    "01255",
    "01257",
    "01258",
    "01259",
    "01260",
    "01262",
    "01263",
    "01264",
    "01266",
    "01267",
    "01270",
    "01301",
    "01302",
    "01330",
    "01331",
    "01337",
    "01338",
    "01339",
    "01340",
    "01341",
    "01342",
    "01343",
    "01344",
    "01346",
    "01347",
    "01348",
    "01349",
    "01350",
    "01351",
    "01354",
    "01355",
    "01360",
    "01364",
    "01366",
    "01367",
    "01368",
    "01370",
    "01371",
    "01373",
    "01375",
  ],
};

// Read the zip codes file
const zipCodesContent = fs.readFileSync(zipCodesFilePath, "utf8");
const zipCodeMap = new Map();

zipCodesContent.split("\n").forEach((line) => {
  const [zipCode, townName] = line.split(",");
  if (zipCode && townName) {
    zipCodeMap.set(zipCode.trim(), townName.trim());
  }
});

// Read the listings file
const fileContent = fs.readFileSync(dataFilePath, "utf8");
const lines = fileContent.split("\n");

// Extract headers
const headers = lines[0].split("|");

// Define relevant headers
const relevantHeaders = [
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
];

// Function to generate photo URLs
const generatePhotoUrls = (mlsNumber, photoCount) => {
  const baseUrl = "https://media.mlspin.com/photo.aspx";
  const photoUrls = [];

  for (let i = 0; i < photoCount; i++) {
    const photoUrl = `${baseUrl}?mls=${mlsNumber}&n=${i}&w=1024&h=768`;
    photoUrls.push(photoUrl);
  }

  return photoUrls;
};

// Helper function to clean up extra quotes
const cleanValue = (value) => {
  return value.replace(/^"|"$/g, "").trim();
};

// Function to clean street names
const cleanStreetName = (streetName) => {
  // Adjust the function to handle short street names appropriately
  if (streetName.length <= 3) {
    return streetName; // Keep short names as they are
  }

  const unwantedCodePattern = /[,\s]*(?:[A-Z]{2}\d{3})$/;
  let cleanedStreetName = streetName.replace(unwantedCodePattern, "").trim();
  const lastValidMatch = cleanedStreetName.match(
    /.*(?=[,\s]*(?:[A-Z]{2}\d{3})?$)/
  );

  if (lastValidMatch) {
    cleanedStreetName = lastValidMatch[0].trim();
  }

  return cleanedStreetName;
};

// Map the data
let propertyMap = new Map();
let incompleteListings = []; // To store incomplete listings

lines.slice(1).forEach((line) => {
  const values = line.split("|");
  let listing = {};

  relevantHeaders.forEach((header) => {
    const headerIndex = headers.indexOf(header);
    if (headerIndex !== -1) {
      listing[header] = cleanValue(values[headerIndex] || "");
    }
  });

  if (listing["STREET_NAME"]) {
    listing["STREET_NAME"] = cleanStreetName(listing["STREET_NAME"]);
  }

  if (listing["LIST_NO"] && listing["PHOTO_COUNT"]) {
    listing["PHOTO_URLS"] = generatePhotoUrls(
      listing["LIST_NO"],
      parseInt(listing["PHOTO_COUNT"])
    );
  }

  if (listing["ZIP_CODE"]) {
    const townName = zipCodeMap.get(listing["ZIP_CODE"]);
    listing["TOWN_NAME"] = townName || "Unknown";
  }

  const propertyKey = `${listing["STREET_NO"]} ${listing["STREET_NAME"]} ${listing["ZIP_CODE"]}`;

  // Check if the listing is incomplete (you can adjust the condition as needed)
  const emptyFieldsCount = Object.values(listing).filter(
    (val) => val === ""
  ).length;
  if (emptyFieldsCount > 5) {
    // Adjust this threshold as needed
    incompleteListings.push(listing);
    return; // Skip adding this listing to the main property map
  }

  if (propertyMap.has(propertyKey)) {
    propertyMap.get(propertyKey).units.push(listing);
  } else {
    propertyMap.set(propertyKey, {
      postType: "single", // Default to single
      units: [listing],
      propertyKey,
    });
  }
});

// Determine post type and sort listings
let sortedListings = [];

propertyMap.forEach((property) => {
  if (property.units.length > 1) {
    property.postType = "multiple";
  }
  sortedListings.push(property);
});

// Sort listings by proximity categories and other
let categorizedListings = [];

Object.keys(zipCodeCategories).forEach((category) => {
  const categoryZipCodes = zipCodeCategories[category];
  const categoryListings = sortedListings.filter((property) =>
    categoryZipCodes.includes(property.units[0]["ZIP_CODE"])
  );
  categoryListings.forEach((listing) => (listing["CATEGORY"] = category));
  categorizedListings = categorizedListings.concat(categoryListings);
});

// Include other listings that don't fall into specified categories
const otherListings = sortedListings.filter(
  (property) =>
    !Object.values(zipCodeCategories)
      .flat()
      .includes(property.units[0]["ZIP_CODE"])
);
otherListings.forEach((listing) => (listing["CATEGORY"] = "Other"));

categorizedListings = categorizedListings.concat(otherListings);

sortedListings.forEach((newProperty) => {
  const firstUnit = newProperty.units[0];
  const existingProperty = existingListingsMap.get(firstUnit["LIST_NO"]);

  // Initialize tags
  newProperty.tags = [];

  if (existingProperty) {
    // Check for price drop
    const existingPrice = parseFloat(existingProperty.units[0]["LIST_PRICE"]);
    const newPrice = parseFloat(firstUnit["LIST_PRICE"]);
    if (newPrice < existingPrice) {
      newProperty.tags.push("Price Dropped");
    }

    // Check for new photos
    const existingPhotoCount = parseInt(
      existingProperty.units[0]["PHOTO_COUNT"],
      10
    );
    const newPhotoCount = parseInt(firstUnit["PHOTO_COUNT"], 10);
    if (newPhotoCount > existingPhotoCount) {
      newProperty.tags.push("Photos Added");
    }

    // Check for changes in remarks
    const existingRemarks = existingProperty.units[0]["REMARKS"];
    const newRemarks = firstUnit["REMARKS"];
    if (existingRemarks !== newRemarks) {
      newProperty.tags.push("Remarks Changed");
    }

    // Check for changes in available date
    const existingAvailableDate = existingProperty.units[0]["DATE_AVAILABLE"];
    const newAvailableDate = firstUnit["DATE_AVAILABLE"];
    if (existingAvailableDate !== newAvailableDate) {
      newProperty.tags.push("Available Now");
    }
  } else {
    // New listing
    newProperty.tags.push("New Listing");
  }
});

// Write to JSON file
fs.writeFileSync(
  outputFilePath,
  JSON.stringify(categorizedListings, null, 2),
  "utf8"
);

// Write incomplete listings to file
fs.writeFileSync(
  incompleteListingsPath,
  incompleteListings.map((listing) => JSON.stringify(listing)).join("\n"),
  "utf8"
);

console.log(`Data parsed and saved to ${outputFilePath}`);
console.log(`Incomplete listings saved to ${incompleteListingsPath}`);
