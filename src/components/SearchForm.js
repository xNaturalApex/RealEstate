import React, { useState, useEffect } from "react";
import Select from "react-select";
import ReactSlider from "react-slider";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingsData from "../data/ListingsData.json";
import RentalsData from "../data/RentalsData.json";
import cityData from "../data/cityData.json";
import tagOptions from "../data/inferredTags.json";
import "./SearchForm.css";

// ZIP → City map
const zipToCityMap = {};
cityData.forEach(({ cityName, zipCodes }) => {
  zipCodes.forEach((zip) => {
    zipToCityMap[zip] = cityName;
  });
});

const bostonNeighborhoodsList = [
  "Allston",
  "Back Bay",
  "Bay Village",
  "Beacon Hill",
  "Brighton",
  "Charlestown",
  "Chinatown–Leather District",
  "Dorchester",
  "East Boston",
  "Fenway–Kenmore",
  "Hyde Park",
  "Jamaica Plain",
  "Mattapan",
  "Mission Hill",
  "North End",
  "Roslindale",
  "Roxbury",
  "South Boston",
  "South End",
  "West End",
  "West Roxbury",
];

const extractLocation = (unit) => {
  const neighborhood = unit.NEIGHBORHOOD?.trim();
  if (neighborhood) return neighborhood;
  const zip = unit.ZIP_CODE || unit.zip_code;
  return zipToCityMap[zip] || null;
};

const countByLocation = (listings) => {
  const counts = {};
  listings.forEach((listing) => {
    const unit = listing.units?.[0] || listing;
    const location = extractLocation(unit);
    if (location) {
      counts[location] = (counts[location] || 0) + 1;
    }
  });
  return counts;
};

const listingsCountPerTown = {
  purchase: countByLocation(ListingsData),
  rental: countByLocation(RentalsData),
};

function SearchForm({ mode = "full" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const compact = mode === "compact";
  const forceAdvanced = mode === "advanced";

  const [formType, setFormType] = useState("purchase");
  const [advanced, setAdvanced] = useState(forceAdvanced);
  const [maxPriceTouched, setMaxPriceTouched] = useState(false);

  const [formValues, setFormValues] = useState({
    town: [],
    bedrooms: "",
    bathrooms: "",
    minBedrooms: 0,
    maxBedrooms: 5,
    minBathrooms: 0,
    maxBathrooms: 5,
    priceRange: formType === "rental" ? [500, 5000] : [0, 2000000],
    tags: [],
  });

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormValues({
      town: [],
      bedrooms: "",
      bathrooms: "",
      minBedrooms: 0,
      maxBedrooms: 5,
      minBathrooms: 0,
      maxBathrooms: 5,
      priceRange: formType === "rental" ? [500, 5000] : [0, 2000000],
      tags: [],
    });
    setMaxPriceTouched(false);
    navigate("/listings");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    formValues.town.forEach((town) => params.append("town", town.value));

    if (!advanced) {
      if (formValues.bedrooms) params.set("bedrooms", formValues.bedrooms);
      if (formValues.bathrooms) params.set("bathrooms", formValues.bathrooms);
    } else {
      params.set("minBedrooms", formValues.minBedrooms);
      params.set("maxBedrooms", formValues.maxBedrooms);
      params.set("minBathrooms", formValues.minBathrooms);
      params.set("maxBathrooms", formValues.maxBathrooms);
      formValues.tags.forEach((tag) => params.append("tags", tag.value));
    }

    params.set("priceMin", formValues.priceRange[0]);
    params.set("priceMax", formValues.priceRange[1]);
    navigate(`/listings?${params.toString()}`);
  };

  const generateTownOptions = () => {
    const counts = listingsCountPerTown[formType] || {};
    const bostonSet = new Set(
      bostonNeighborhoodsList.map((n) => n.toLowerCase())
    );

    const formatOption = (name) => ({ value: name, label: name });

    const bostonNeighborhoods = [];
    const otherTowns = [];

    Object.entries(counts).forEach(([name]) => {
      if (bostonSet.has(name.toLowerCase())) {
        bostonNeighborhoods.push(formatOption(name));
      } else {
        otherTowns.push(formatOption(name));
      }
    });

    return [
      { label: "Boston Neighborhoods", options: bostonNeighborhoods },
      { label: "Other Towns", options: otherTowns },
    ];
  };

  useEffect(() => {
    const towns = searchParams.getAll("town");
    const bedrooms = searchParams.get("bedrooms") || "";
    const bathrooms = searchParams.get("bathrooms") || "";
    const priceMin = parseInt(searchParams.get("priceMin")) || 0;
    const priceMax =
      parseInt(searchParams.get("priceMax")) ||
      (formType === "rental" ? 5000 : 2000000);

    const allOptions = generateTownOptions().flatMap((group) => group.options);
    const townOptions = towns
      .map((t) => allOptions.find((opt) => opt.value === t))
      .filter(Boolean);

    setFormValues((prev) => ({
      ...prev,
      town: townOptions,
      bedrooms,
      bathrooms,
      priceRange: [priceMin, priceMax],
    }));

    const touched =
      (formType === "rental" && priceMax < 5000) ||
      (formType === "purchase" && priceMax < 2000000);
    setMaxPriceTouched(touched);
  }, [searchParams, formType]);

  const toggleFormType = () => {
    const nextType = formType === "purchase" ? "rental" : "purchase";
    setFormType(nextType);
    setFormValues({
      town: [],
      bedrooms: "",
      bathrooms: "",
      minBedrooms: 0,
      maxBedrooms: 5,
      minBathrooms: 0,
      maxBathrooms: 5,
      priceRange: nextType === "rental" ? [500, 5000] : [0, 2000000],
      tags: [],
    });
    setMaxPriceTouched(false);
  };

  return (
    <form
      className={`search-form-container ${compact ? "compact" : "full"}`}
      onSubmit={handleSubmit}
    >
      <div className="form-toggle-row toggle-switch-wrapper">
        <label className="switch-label">Search For:</label>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="toggleType"
            checked={formType === "rental"}
            onChange={toggleFormType}
          />
          <label htmlFor="toggleType" className="switch" />
          <div className="labels">
            <span
              className={`label ${formType === "purchase" ? "active" : ""}`}
            >
              Buy
            </span>
            <span className={`label ${formType === "rental" ? "active" : ""}`}>
              Rent
            </span>
          </div>
        </div>
        {!forceAdvanced && (
          <button
            type="button"
            onClick={() => setAdvanced((prev) => !prev)}
            className="toggle-button advanced-toggle"
          >
            {advanced ? "Simple Search" : "Advanced Search"}
          </button>
        )}
      </div>

      <div className="search-form">
        <div className="form-group full-width">
          <label className="search-label">Location</label>
          <Select
            options={generateTownOptions()}
            value={formValues.town}
            onChange={(selected) => handleChange("town", selected)}
            isMulti
            placeholder="Select city or neighborhood"
            classNamePrefix="react-select"
          />
        </div>

        {!advanced && (
          <div className="form-row two-column">
            <div className="form-group">
              <label className="search-label">Bedrooms</label>
              <input
                type="number"
                min="0"
                value={formValues.bedrooms}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
                placeholder="Any"
              />
            </div>
            <div className="form-group">
              <label className="search-label">Bathrooms</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formValues.bathrooms}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
                placeholder="Any"
              />
            </div>
          </div>
        )}

        {advanced && (
          <>
            <div className="range-slider-container">
              <label className="range-slider-labels">
                Bedrooms: {formValues.minBedrooms} – {formValues.maxBedrooms}
              </label>
              <ReactSlider
                className="advanced-slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={5}
                step={1}
                value={[formValues.minBedrooms, formValues.maxBedrooms]}
                onChange={([min, max]) => {
                  handleChange("minBedrooms", min);
                  handleChange("maxBedrooms", max);
                }}
                pearling
                minDistance={1}
              />
            </div>

            <div className="range-slider-container">
              <label className="range-slider-labels">
                Bathrooms: {formValues.minBathrooms} – {formValues.maxBathrooms}
              </label>
              <ReactSlider
                className="advanced-slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={5}
                step={0.5}
                value={[formValues.minBathrooms, formValues.maxBathrooms]}
                onChange={([min, max]) => {
                  handleChange("minBathrooms", min);
                  handleChange("maxBathrooms", max);
                }}
                pearling
                minDistance={0.5}
              />
            </div>

            <div className="form-group">
              <label className="search-label">Tags</label>
              <Select
                options={tagOptions.map((tag) => ({ label: tag, value: tag }))}
                isMulti
                value={formValues.tags}
                onChange={(selected) => handleChange("tags", selected)}
                classNamePrefix="react-select"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="search-label">
            Price Range (${formValues.priceRange[0]} – $
            {formValues.priceRange[1]})
          </label>
          <ReactSlider
            className="price-slider"
            thumbClassName="price-thumb"
            trackClassName="price-track"
            value={formValues.priceRange}
            min={formType === "rental" ? 500 : 0}
            max={formType === "rental" ? 5000 : 2000000}
            step={formType === "rental" ? 50 : 10000}
            onChange={(value) => handleChange("priceRange", value)}
            pearling
            minDistance={formType === "rental" ? 200 : 20000}
          />
        </div>

        <div className="button-row">
          <button type="submit" className="search-button">
            Search
          </button>
          <button type="button" className="clear-button" onClick={handleReset}>
            Clear
          </button>
        </div>

        <div className="button-row">
          <button type="button" className="save-button">
            Save Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
