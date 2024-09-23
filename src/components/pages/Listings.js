// src/components/Listings.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import Footer from "../Footer";
import ListingCards from "../ListingCards";
import SearchForm from "../SearchForm.js";

function Listings() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize searchParams with category included
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      category: params.get("category") || "SF", // Default to "SF" if not specified
      town: params.get("town") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      zipCodes: params.getAll("zipCodes") || [],
    };
  });

  // Handle search submissions
  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
    // Optionally update the URL to reflect search parameters
    const params = new URLSearchParams(newSearchParams);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    // Update searchParams when the URL changes
    const params = new URLSearchParams(location.search);
    setSearchParams({
      category: params.get("category") || "SF",
      town: params.get("town") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      zipCodes: params.getAll("zipCodes") || [],
    });
  }, [location.search]);

  return (
    <>
      <div className="top-container">
        <SearchForm
          formType="Advanced"
          onSearch={handleSearch}
          initialSearchParams={searchParams}
        />
      </div>
      <div>
        <ListingCards searchParams={searchParams} title="Search Results" />
      </div>
      <Footer />
    </>
  );
}

export default Listings;
