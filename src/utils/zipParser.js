const fs = require("fs");
const path = require("path");

// Define the zip code categories
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

// Define the path to your .txt file
const filePath = path.join(__dirname, "/../data/ZipCodesMA.txt"); // Ensure ZipCodesMA.txt is in the correct directory

// Read the .txt file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Split the file content by line
  const lines = data.split("\n");

  // Initialize an object to store city data with zip codes
  const cityData = {};

  // Process each line
  lines.forEach((line) => {
    const [zipCode, cityName] = line.split(",");
    if (!zipCode || !cityName) return; // Skip invalid lines

    const trimmedZipCode = zipCode.trim();
    const trimmedCityName = cityName.trim();

    // Check if the city name already exists in the object
    if (!cityData[trimmedCityName]) {
      // If not, create a new array for this city
      cityData[trimmedCityName] = [];
    }

    // Add the zip code to the city's array if it's not already included
    if (!cityData[trimmedCityName].includes(trimmedZipCode)) {
      cityData[trimmedCityName].push(trimmedZipCode);
    }
  });

  // Function to determine the category of a zip code
  const getCategoryForZipCode = (zipCode) => {
    for (const [category, zipCodes] of Object.entries(zipCodeCategories)) {
      if (zipCodes.includes(zipCode)) {
        return category;
      }
    }
    return "Uncategorized"; // If no category is found
  };

  // Organize city data into categories
  const categorizedData = {
    "Close to Boston (0-15 miles)": [],
    "Near Boston (15-30 miles)": [],
    "Farther Out (30-50 miles)": [],
    Uncategorized: [],
  };

  Object.entries(cityData).forEach(([cityName, zipCodes]) => {
    // Find the first matching category for any zip code in the city
    let category = "Uncategorized";
    for (const zipCode of zipCodes) {
      category = getCategoryForZipCode(zipCode);
      if (category !== "Uncategorized") break; // Stop at the first valid category
    }

    categorizedData[category].push({ cityName, zipCodes });
  });

  // Output the result to the console
  console.log(categorizedData);

  // Optionally, write the categorized data to a new file
  const outputFilePath = path.join(
    __dirname,
    "./src/data/categorizedCityData.json"
  );
  fs.writeFile(
    outputFilePath,
    JSON.stringify(categorizedData, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("Data successfully written to categorizedCityData.json");
    }
  );
});
