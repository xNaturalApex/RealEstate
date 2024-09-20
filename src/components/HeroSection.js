import React from "react";
import "../App.css";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm.js";

function HeroSection() {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const searchQuery = new URLSearchParams(searchParams).toString();
    navigate(`/listings?${searchQuery}`);
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
          <SearchForm onSearch={handleSearch} formType="Advanced" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
