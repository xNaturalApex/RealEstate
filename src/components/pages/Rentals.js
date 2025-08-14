import React, { useEffect, useState } from "react";
import RentalCards from "../cards/RentalCards";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm";
import RentalData from "../../data/RentalData.json";
import neighborhoodData from "../../data/neighborhoodData.json";

const Rentals = () => {
  const location = useLocation();
  const [filteredRentals, setFilteredRentals] = useState([]);

  const zipToTown = {};
  const zipToNeighborhood = {};

  neighborhoodData.forEach(({ cityName, zipCodes }) => {
    zipCodes.forEach((zip) => {
      zipToNeighborhood[zip] = cityName;
      zipToTown[zip] = zipToTown[zip] || cityName;
    });
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedTowns = params
      .getAll("town")
      .map((t) => t.trim().toLowerCase());
    const bedrooms = params.get("bedrooms");
    const bathrooms = params.get("bathrooms");
    const priceMin = parseInt(params.get("priceMin"), 10);
    const priceMax = parseInt(params.get("priceMax"), 10);

    const listings = RentalData.filter((listing) => {
      const unit = listing.units?.[0];
      if (!unit) return false;

      const town = unit.TOWN_NAME?.trim().toLowerCase() || "";
      const neighborhood = unit.NEIGHBORHOOD?.trim().toLowerCase() || "";
      const zip = unit.ZIP_CODE?.toString();

      const inferredNeighborhood = zipToNeighborhood[zip]?.toLowerCase() || "";
      const inferredTown = zipToTown[zip]?.toLowerCase() || "";

      const townMatch =
        selectedTowns.length === 0 ||
        selectedTowns.some((sel) =>
          [town, neighborhood, inferredNeighborhood, inferredTown].includes(sel)
        );

      const bedroomsMatch = !bedrooms || unit.NO_BEDROOMS === bedrooms;
      const bathroomsMatch = !bathrooms || unit.NO_FULL_BATHS === bathrooms;

      const price = parseInt(unit.LIST_PRICE, 10);
      const priceMinMatch = isNaN(priceMin) || price >= priceMin;
      const priceMaxMatch = isNaN(priceMax) || price <= priceMax;

      return (
        townMatch &&
        bedroomsMatch &&
        bathroomsMatch &&
        priceMinMatch &&
        priceMaxMatch
      );
    });

    setFilteredRentals(listings);
  }, [location.search]);

  return (
    <div>
      <SearchForm fixedType="rental" />
      <RentalCards listings={filteredRentals} />
    </div>
  );
};

export default Rentals;
