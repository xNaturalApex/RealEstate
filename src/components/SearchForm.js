// src/components/SearchForm.js

import React, { useState } from "react";
import townsData from "../data/cityData.json";
import "./SearchForm.css";

function SearchForm({ formType, onSearch, initialSearchParams = {} }) {
  const [category, setCategory] = useState(initialSearchParams.category || "SF"); // New state for category
  const [town, setTown] = useState(initialSearchParams.town || "");
  const [bedrooms, setBedrooms] = useState(initialSearchParams.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(
    initialSearchParams.bathrooms || ""
  );
  const [minPrice, setMinPrice] = useState(initialSearchParams.priceMin || 0);
  const [maxPrice, setMaxPrice] = useState(
    initialSearchParams.priceMax || 5000
  );
  const [suggestions, setSuggestions] = useState([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState(
    initialSearchParams.zipCodes || []
  );

  // Update town suggestions
  const handleTownChange = (e) => {
    setTown(e.target.value);
    const filteredTowns = townsData.filter((townItem) =>
      townItem.cityName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestions(filteredTowns);
  };

  const handleTownSelect = (selectedTown) => {
    setTown(selectedTown.cityName);
    setSelectedZipCodes(selectedTown.zipCodes);
    setSuggestions([]);
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100); // Ensure min is less than max
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100); // Ensure max is greater than min
    setMaxPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      category, // Include category in search parameters
      town,
      zipCodes: selectedZipCodes,
      bedrooms,
      bathrooms,
      priceMin: minPrice,
      priceMax: maxPrice,
    };
    onSearch(searchParams);
  };

  // Define categories
  const categories = ["SF", "MF", "CC", "Rentals"];

  return (
    <form
      className={`search-form ${formType === "Advanced" ? "advanced" : "basic"}`}
      onSubmit={handleSubmit}
    >
      {/* Tabs for category selection */}
      <div className="search-form__tabs">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`tab-button ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rest of the search inputs */}
      <input
        type="text"
        placeholder="City"
        value={town}
        onChange={handleTownChange}
        className="search-input"
        list="towns-list"
      />
      <datalist id="towns-list">
        {suggestions.map((suggestion, index) => (
          <option
            key={index}
            value={suggestion.cityName}
            onClick={() => handleTownSelect(suggestion)}
          />
        ))}
      </datalist>
      <input
        type="number"
        placeholder="Bedrooms"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="search-input"
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
        className="search-input"
      />

      {formType === "Advanced" && (
        <div className="price-range-slider">
          <label>
            Price Range: ${minPrice} - ${maxPrice}
          </label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="price-slider"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="price-slider"
            />
          </div>
          <div className="price-range-values">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      )}
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
