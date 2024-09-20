import React, { useState, useEffect } from "react";
import townsData from "../data/cityData.json";
import "./SearchForm.css";

function SearchForm({
  formType,
  onSearch,
  initialSearchParams = {},
  availableTowns = [],
}) {
  const [town, setTown] = useState(initialSearchParams.town || "");
  const [bedrooms, setBedrooms] = useState(initialSearchParams.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(
    initialSearchParams.bathrooms || ""
  );
  const [priceMin, setPriceMin] = useState(initialSearchParams.priceMin || "");
  const [priceMax, setPriceMax] = useState(initialSearchParams.priceMax || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState(
    initialSearchParams.zipCodes || []
  );

  // Filter towns that have listings from availableTowns
  useEffect(() => {
    const filteredTowns = townsData.filter(
      (townItem) =>
        availableTowns.includes(townItem.cityName.toLowerCase()) &&
        townItem.cityName.toLowerCase().includes(town.toLowerCase())
    );
    setSuggestions(filteredTowns);
  }, [town, availableTowns]);

  const handleTownChange = (e) => {
    setTown(e.target.value);
  };

  const handleTownSelect = (selectedTown) => {
    setTown(selectedTown.cityName);
    setSelectedZipCodes(selectedTown.zipCodes);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      town,
      zipCodes: selectedZipCodes,
      bedrooms,
      bathrooms,
      ...(formType === "Advanced" && { priceMin, priceMax }),
    };
    onSearch(searchParams); // Trigger search and pass the selected parameters
  };

  return (
    <form
      className={`search-form ${formType === "Advanced" ? "advanced" : "basic"}`}
      onSubmit={handleSubmit}
    >
      <select
        value={town}
        onChange={(e) =>
          handleTownSelect(
            suggestions.find((s) => s.cityName === e.target.value)
          )
        }
        className="search-input"
      >
        <option value="" disabled>
          {town || "Select City"}
        </option>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.cityName}>
            {suggestion.cityName}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder={bedrooms || "Bedrooms"}
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="search-input"
      />
      <input
        type="number"
        placeholder={bathrooms || "Bathrooms"}
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
        className="search-input"
      />
      {formType === "Advanced" && (
        <>
          <input
            type="number"
            placeholder={priceMin || "Min Price"}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="search-input"
          />
          <input
            type="number"
            placeholder={priceMax || "Max Price"}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="search-input"
          />
        </>
      )}
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
