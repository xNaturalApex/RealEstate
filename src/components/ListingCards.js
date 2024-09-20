// src/components/ListingCards.js

import React, { useState, useEffect } from "react";
import "./ListingCards.css";
import ListingCardItem from "./ListingCardItem.js";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button.js";

// Importing data from three separate JSON files
import CCdata from "../data/CCdata.json";
import SFdata from "../data/SFdata.json";
import MFdata from "../data/MFdata.json";

// Import the utility function
import { filterAndSortListings } from "../utils/filterAndSortListings.js";

function ListingCards({
  title = "Listings",
  searchParams = {},
  itemsPerPage = 6,
  sortFunction,
  children,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredListings, setFilteredListings] = useState([]);
  const navigate = useNavigate();

  // Combine data from three files into a single array called 'listings'
  const listings = [...CCdata, ...SFdata, ...MFdata];

  useEffect(() => {
    // Use the utility function to filter and sort listings
    const sortedListings = filterAndSortListings(
      listings,
      searchParams,
      sortFunction
    );
    setFilteredListings(sortedListings);
    setCurrentPage(0); // Reset to the first page when searchParams change
  }, [searchParams, sortFunction, listings]);

  const handleClick = (listing) => {
    navigate(`/listings/${listing.units[0].LIST_NO}`, { state: { listing } });
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < filteredListings.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentListings = filteredListings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="listing-cards">
      <h1>{title}</h1>
      <div className="listing-cards__container">
        <div className="listing-cards__wrapper">
          {currentListings.length > 0 ? (
            currentListings.map((listing) => {
              const firstUnit = listing.units[0];

              // Convert LIST_PRICE to a number and format with commas
              const listPriceNumber = Number(firstUnit.LIST_PRICE);
              const formattedListPrice = isNaN(listPriceNumber)
                ? "N/A"
                : `$${listPriceNumber.toLocaleString()}`;

              return (
                <ListingCardItem
                  key={firstUnit.LIST_NO}
                  title={`${firstUnit.STREET_NO} ${firstUnit.STREET_NAME}`}
                  address={`${firstUnit.STREET_NO} ${firstUnit.STREET_NAME} ${
                    firstUnit.UNIT_NO ? `Unit ${firstUnit.UNIT_NO}` : ""
                  }`}
                  townName={`${firstUnit.TOWN_NAME} - MA - ${firstUnit.ZIP_CODE}`}
                  zipCode={firstUnit.ZIP_CODE}
                  bedrooms={firstUnit.NO_BEDROOMS}
                  bathrooms={firstUnit.NO_FULL_BATHS}
                  parking={firstUnit.PARKING_SPACES}
                  photos={firstUnit.PHOTO_URLS}
                  listPrice={formattedListPrice}
                  onClick={() => handleClick(listing)}
                  tag={
                    firstUnit.DATE_AVAILABLE
                      ? `Available: ${firstUnit.DATE_AVAILABLE}`
                      : "Available Now"
                  }
                />
              );
            })
          ) : (
            <p>No listings found</p>
          )}
        </div>
      </div>
      <div className="listing-cards__pagination">
        <Button
          className="listing-cards__button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          className="listing-cards__button"
          onClick={handleNext}
          disabled={(currentPage + 1) * itemsPerPage >= filteredListings.length}
        >
          Next
        </Button>
      </div>
      {children}
    </div>
  );
}

export default ListingCards;
