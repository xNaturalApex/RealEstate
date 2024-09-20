import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Footer from "../Footer";
import ListingCards from "../ListingCards";
import Testimonials from "../Testimonial";
import SearchForm from "../SearchForm.js";

function Listings() {
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
      <div className="container-1200">
        <SearchForm
          formType="Advanced"
          onSearch={handleSearch}
          initialSearchParams={searchParams}
        />
        <ListingCards searchParams={searchParams} title="Search Results" />
      </div>
      <Testimonials />
      <Footer />
    </>
  );
}

export default Listings;
