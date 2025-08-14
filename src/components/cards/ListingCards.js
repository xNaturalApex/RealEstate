import React, { useState, useEffect } from "react";
import "./ListingCards.css";
import ListingCardItem from "./ListingCardItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

function ListingCards({ title = "Listings", listings = [], itemsPerPage = 6 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const totalPages = Math.ceil(listings.length / itemsPerPage);

  // Reset to first page when listings change
  useEffect(() => {
    setCurrentPage(0);
  }, [listings]);

  const handleCardClick = (listing) => {
    navigate(`/listings/${listing.units[0].LIST_NO}`, { state: { listing } });
  };

  const paginatedListings = listings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="listing-cards">
      <h1>
        {title}
        <span className="results-count">
          {listings.length > 0 &&
            ` – ${listings.length} result${listings.length !== 1 ? "s" : ""}`}
        </span>
      </h1>

      <div className="listing-cards__container">
        <div className="listing-cards__wrapper">
          {paginatedListings.length > 0 ? (
            paginatedListings.map((listing) => {
              const unit = listing.units[0];
              const town = unit.TOWN_NAME?.trim() || "";
              const neighborhood = unit.NEIGHBORHOOD?.trim() || "";
              const zip = unit.ZIP_CODE || "";

              const isBoston = town.toLowerCase() === "boston";
              const hasValidNeighborhood =
                neighborhood && neighborhood.toLowerCase() !== "unknown";

              const formattedLocation =
                isBoston && hasValidNeighborhood
                  ? `${neighborhood} – Boston, MA`
                  : `${town}, MA${zip ? ` – ${zip}` : ""}`;

              return (
                <ListingCardItem
                  key={unit.LIST_NO}
                  title={`${unit.STREET_NO} ${unit.STREET_NAME}`}
                  address={`${unit.STREET_NO} ${unit.STREET_NAME}${
                    unit.UNIT_NO ? ` Unit ${unit.UNIT_NO}` : ""
                  }`}
                  townName={formattedLocation}
                  zipCode={zip}
                  bedrooms={unit.NO_BEDROOMS}
                  bathrooms={unit.NO_FULL_BATHS}
                  parking={unit.PARKING_SPACES}
                  sqft={unit.GROSS_SQFT || unit.SQUARE_FEET}
                  price={unit.LIST_PRICE}
                  photos={unit.PHOTO_URLS}
                  tag={listing.tag}
                  tags={unit.TAGS || listing.tags || []}
                  onClick={() => handleCardClick(listing)}
                />
              );
            })
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            buttonStyle="btn--primary--solid"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage >= totalPages - 1}
            buttonStyle="btn--primary--solid"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListingCards;
