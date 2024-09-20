import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Footer from "../Footer.js";
import RentalCards from "../RentalCards.js";
import SearchForm from "../SearchForm.js";

function Rentals() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      town: params.get("town") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      zipCodes: params.getAll("zipCodes") || [],
    };
  });

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    // Update search params if the URL changes
    const params = new URLSearchParams(location.search);
    setSearchParams({
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
      <SearchForm
        formType="Advanced"
        onSearch={handleSearch}
        initialSearchParams={searchParams}
      />
      <RentalCards searchParams={searchParams} title="Search Results" />
      <Footer />
    </>
  );
}

export default Rentals;
