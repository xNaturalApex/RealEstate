import React, { useState, useEffect } from "react";
import "./RentalCards.css";
import RentalCardItem from "./RentalCardItem.js";
import { useNavigate } from "react-router-dom";
import rentalListings from "../data/RentalData.json";
import { Button } from "./Button.js";

function RentalCards({
  title = "Listings",
  searchParams = {},
  itemsPerPage = 6,
  sortFunction,
  children,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredListings, setFilteredListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filtering listings based on searchParams
    const filtered = rentalListings.filter((rentalListings) => {
      const firstUnit = rentalListings.units[0];
      const rentalBedrooms = parseInt(firstUnit.NO_BEDROOMS, 10);
      const rentalBathrooms = parseInt(firstUnit.NO_FULL_BATHS, 10);

      const matchesTown =
        searchParams.town && firstUnit.TOWN_NAME
          ? firstUnit.TOWN_NAME.toLowerCase().includes(
              searchParams.town.toLowerCase()
            )
          : true;
      const matchesBedrooms =
        searchParams.bedrooms && !isNaN(rentalBedrooms)
          ? listingBedrooms === parseInt(searchParams.bedrooms, 10)
          : true;
      const matchesBathrooms =
        searchParams.bathrooms && !isNaN(rentalBathrooms)
          ? rentalBathrooms === parseInt(searchParams.bathrooms, 10)
          : true;
      const matchesZipCode =
        searchParams.zipCode && firstUnit.ZIP_CODE
          ? firstUnit.ZIP_CODE === searchParams.zipCode
          : true;

      return (
        matchesTown && matchesBedrooms && matchesBathrooms && matchesZipCode
      );
    });

    // Sort listings if a sortFunction is provided
    const sortedRentals = sortFunction
      ? [...filtered].sort(sortFunction)
      : filtered;

    setFilteredListings(sortedRentals);
    setCurrentPage(0); // Reset to the first page when searchParams change
  }, [searchParams, sortFunction]);

  const handleClick = (listing) => {
    navigate(`/rentals/${listing.units[0].LIST_NO}`, { state: { listing } });
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
    <div className="rental-cards">
      <h1>{title}</h1>
      <div className="rental-cards__container">
        <div className="rental-cards__wrapper">
          {currentRentals.length > 0 ? (
            currentRentals.map((listing) => {
              const firstUnit = listing.units[0];

              let displayPrice;
              if (listing.postType === "multiple") {
                const minPrice = Math.min(
                  ...rental.units.map((unit) => parseFloat(unit.LIST_PRICE))
                );
                const unitCount = listing.units.length;
                displayPrice = `${unitCount} Units Starting at $${minPrice}`;
              } else {
                displayPrice = `$${parseFloat(firstUnit.LIST_PRICE)}`;
              }

              // Determine the tag value
              const tag =
                rentalListing.tags && listing.tags.length > 0
                  ? rentalListing.tags
                  : firstUnit.DATE_AVAILABLE
                    ? `Available: ${firstUnit.DATE_AVAILABLE}`
                    : "Available Now";

              return (
                <RentalCardItem
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
                  listPrice={displayPrice}
                  onClick={() => handleClick(rentalListings)}
                  postType={rentalListings.postType}
                  tag={tag}
                />
              );
            })
          ) : (
            <p>No listings found</p>
          )}
        </div>
      </div>
      <div className="rental-cards__pagination">
        <Button
          className="rental-cards__button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          className="rental-cards__button"
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

export default RentalCards;
