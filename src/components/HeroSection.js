import React from "react";
import "../App.css";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm.js";

function HeroSection() {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const query = new URLSearchParams();

    if (searchParams.town && Array.isArray(searchParams.town)) {
      searchParams.town.forEach((t) => query.append("town", t.value));
    }

    if (searchParams.bedrooms) query.set("bedrooms", searchParams.bedrooms);
    if (searchParams.bathrooms) query.set("bathrooms", searchParams.bathrooms);
    if (searchParams.priceMin) query.set("priceMin", searchParams.priceMin);
    if (searchParams.priceMax) query.set("priceMax", searchParams.priceMax);

    navigate(`/listings?${query.toString()}`);
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find Your Perfect Boston Rental</h1>
          <p>Explore the best rental properties Boston has to offer.</p>
          <button className="cta-button" onClick={() => navigate("/rentals")}>
            Start Your Search
          </button>
        </div>
        <div className="hero-search">
          <SearchForm mode="compact" onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
