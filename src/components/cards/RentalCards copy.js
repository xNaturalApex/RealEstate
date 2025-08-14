import React, { useState, useEffect } from "react";
import "./RentalCards.css";
import RentalCardItem from "./RentalCardItem.js";
import { useNavigate } from "react-router-dom";
import rentalListings from "../../data/RentalData.json";
import { Button } from "../Button.js";

function RentalCards({
  title = "Rentals",
  searchParams = {},
  itemsPerPage = 6,
  sortFunction,
  children,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filtering rentals based on searchParams
    const filtered = rentalListings.filter((rental) => {
      const firstUnit = rental.units[0];
      const rentalBedrooms = parseInt(firstUnit.NO_BEDROOMS, 10);
      const rentalBathrooms = parseInt(firstUnit.NO_FULL_BATHS, 10);

      // Check if searchParams.town exists and is not empty
      const matchesTown =
        searchParams.town && searchParams.town.length > 0
          ? searchParams.town.some((town) => town.value === firstUnit.TOWN_NAME)
          : true;

      const matchesBedrooms =
        searchParams.bedrooms && !isNaN(rentalBedrooms)
          ? rentalBedrooms === parseInt(searchParams.bedrooms, 10)
          : true;

      const matchesBathrooms =
        searchParams.bathrooms && !isNaN(rentalBathrooms)
          ? rentalBathrooms === parseInt(searchParams.bathrooms, 10)
          : true;

      return matchesTown && matchesBedrooms && matchesBathrooms;
    });

    // Sort rentals if a sortFunction is provided
    const sortedRentals = sortFunction
      ? [...filtered].sort(sortFunction)
      : filtered;

    setFilteredRentals(sortedRentals);
    setCurrentPage(0); // Reset to the first page when searchParams change
  }, [searchParams, sortFunction]);

  const handleClick = (rental) => {
    navigate(`/rentals/${rental.units[0].LIST_NO}`, { state: { rental } });
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < filteredRentals.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRentals = filteredRentals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="rental-cards">
      <h1>{title}</h1>
      <div className="rental-cards__container">
        <div className="rental-cards__wrapper">
          {currentRentals.length > 0 ? (
            currentRentals.map((rental) => {
              const firstUnit = rental.units[0];

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
                  parking={firstUnit.NO_PARKING}
                  sqft={firstUnit.GROSS_SQFT}
                  price={firstUnit.ASKING_PRICE}
                  photos={firstUnit.PHOTO_URLS}
                  OnClick={() => handleClick(rental)}
                />
              );
            })
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>
      </div>

      <div className="pagination">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          buttonStyle="btn--primary--solid"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={(currentPage + 1) * itemsPerPage >= filteredRentals.length}
          buttonStyle="btn--primary--solid"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default RentalCards;
