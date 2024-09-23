import React, { useState, useEffect } from "react";
import "./ListingCards.css";
import ListingCardItem from "./RentalCardItem.js"; // Consider renaming if necessary
import { useNavigate } from "react-router-dom";
import singleFamilyListings from "../data/SFdata.json";
import multiFamilyListings from "../data/MFdata.json";
import condoListings from "../data/CCdata.json";
import { Button } from "./Button.js";

function ListingCards({
  title = "Listings",
  searchParams = {},
  itemsPerPage = 6,
  sortFunction,
  children,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredListings, setFilteredListings] = useState([]);
  const [listingsData, setListingsData] = useState(singleFamilyListings);
  const navigate = useNavigate();

  useEffect(() => {
    // Filtering listings based on searchParams
    const filtered = listingsData.filter((listing) => {
      const firstUnit = listing.units[0];
      const listingBedrooms = parseInt(firstUnit.NO_BEDROOMS, 10);
      const listingBathrooms = parseInt(firstUnit.NO_FULL_BATHS, 10);

      const matchesTown =
        searchParams.town && firstUnit.TOWN_NAME
          ? firstUnit.TOWN_NAME.toLowerCase().includes(
              searchParams.town.toLowerCase()
            )
          : true;
      const matchesBedrooms =
        searchParams.bedrooms && !isNaN(listingBedrooms)
          ? listingBedrooms === parseInt(searchParams.bedrooms, 10)
          : true;
      const matchesBathrooms =
        searchParams.bathrooms && !isNaN(listingBathrooms)
          ? listingBathrooms === parseInt(searchParams.bathrooms, 10)
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
    const sortedListings = sortFunction
      ? [...filtered].sort(sortFunction)
      : filtered;

    setFilteredListings(sortedListings);
    setCurrentPage(0); // Reset to the first page when searchParams change
  }, [searchParams, sortFunction, listingsData]);

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

  const handleDataChange = (dataType) => {
    switch (dataType) {
      case "single":
        setListingsData(singleFamilyListings);
        break;
      case "multi":
        setListingsData(multiFamilyListings);
        break;
      case "condo":
        setListingsData(condoListings);
        break;
      default:
        setListingsData(singleFamilyListings);
    }
    setCurrentPage(0); // Reset to the first page when data changes
  };

  return (
    <div className="listing-cards">
      <h1>{title}</h1>
      <div className="listing-cards__data-selector">
        <Button
          onClick={() => handleDataChange("single")}
          className="data-selector__button"
        >
          Single Family
        </Button>
        <Button
          onClick={() => handleDataChange("multi")}
          className="data-selector__button"
        >
          Multi Family
        </Button>
        <Button
          onClick={() => handleDataChange("condo")}
          className="data-selector__button"
        >
          Condo
        </Button>
      </div>
      <div className="listing-cards__container">
        <div className="listing-cards__wrapper">
          {currentListings.length > 0 ? (
            currentListings.map((listing) => {
              const firstUnit = listing.units[0];

              // Format the price with commas
              let displayPrice;
              if (listing.postType === "multiple") {
                const minPrice = Math.min(
                  ...listing.units.map((unit) => parseFloat(unit.LIST_PRICE))
                );
                const unitCount = listing.units.length;
                displayPrice = `${unitCount} Units Starting at ${new Intl.NumberFormat(
                  "en-US",
                  { style: "currency", currency: "USD" }
                ).format(minPrice)}`;
              } else {
                displayPrice = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(parseFloat(firstUnit.LIST_PRICE));
              }

              const tag =
                listing.tags && listing.tags.length > 0
                  ? listing.tags.join(", ")
                  : firstUnit.DATE_AVAILABLE
                  ? `Available: ${firstUnit.DATE_AVAILABLE}`
                  : "Available Now";

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
                  listPrice={displayPrice}
                  onClick={() => handleClick(listing)}
                  postType={listing.postType}
                  tag={tag}
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
