import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer.js";
import RentalCards from "../cards/RentalCards.js";
import SearchForm from "../SearchForm.js";

function Rentals() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      town: params.getAll("town") || [],
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
    };
  });

  const updateSearchParamsInURL = (newParams) => {
    const updatedParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => updatedParams.append(key, val));
      } else if (value) {
        updatedParams.set(key, value);
      }
    });
    navigate(`?${updatedParams.toString()}`);
  };

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
    updateSearchParamsInURL(newSearchParams);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams({
      town: params.getAll("town") || [],
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
    });
  }, [location.search]);

  return (
    <>
      <SearchForm onSearch={handleSearch} initialSearchParams={searchParams} />
      <RentalCards searchParams={searchParams} title="Search Results" />
      <Footer />
    </>
  );
}

export default Rentals;
