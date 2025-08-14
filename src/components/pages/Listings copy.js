import React, { useEffect, useState } from "react";
import ListingCards from "../cards/ListingCards";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm";
import SFdata from "../../data/SFdata.json";
import MFdata from "../../data/MFdata.json";
import CCdata from "../../data/CCdata.json";
import RentalData from "../../data/RentalData.json";

const Listings = () => {
  const location = useLocation();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const towns = params.getAll("town");
    const bedrooms = params.get("bedrooms");
    const bathrooms = params.get("bathrooms");
    const priceMin = parseInt(params.get("priceMin"), 10);
    const priceMax = parseInt(params.get("priceMax"), 10);

    // Combine all data into a single list
    const allListings = [...SFdata, ...MFdata, ...CCdata, ...RentalData];

    // Filter listings based on query params
    const listings = allListings.filter((listing) => {
      const unit = listing.units?.[0];
      if (!unit) return false;

      const townMatch = towns.length === 0 || towns.includes(unit.TOWN_NAME);
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

    setFilteredListings(listings);
  }, [location.search]);

  return (
    <div>
      <SearchForm />
      <ListingCards listings={filteredListings} />
    </div>
  );
};

export default Listings;
