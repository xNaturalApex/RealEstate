import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./RentalDetail.css";
import RentalCards from "./cards/RentalCards"; // Adjust the path as needed
import rentalListings from "../data/RentalData.json"; // Adjust the path as needed

function RentalDetail() {
  const location = useLocation();
  const { listingNo } = useParams(); // Extract listingNo from URL
  const rentalFromState = location.state?.rental;

  // Find rental either from state or based on listingNo
  const listing =
    rentalFromState ||
    rentalListings.find((rental) => rental.units[0].LIST_NO === listingNo);

  const [openLightbox, setOpenLightbox] = useState({
    open: false,
    unitIndex: 0,
    photoIndex: 0,
  });

  if (!listing) {
    return <h2>Listing not found</h2>;
  }

  const isMultiple = listing.postType === "multiple";
  const units = listing.units;

  const handleOpenLightbox = (unitIndex, photoIndex) => {
    setOpenLightbox({ open: true, unitIndex, photoIndex });
  };

  const handleCloseLightbox = () => {
    setOpenLightbox({ ...openLightbox, open: false });
  };

  const handleMovePrev = () => {
    setOpenLightbox((prev) => ({
      ...prev,
      photoIndex:
        (prev.photoIndex + openLightbox.images.length - 1) %
        openLightbox.images.length,
    }));
  };

  const handleMoveNext = () => {
    setOpenLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % openLightbox.images.length,
    }));
  };

  const extraImagesCount = units[0].PHOTO_URLS.length - 7;
  const currentTown = units[0].TOWN_NAME; // Get the current town name

  return (
    <div className="listing-detail-page">
      <div className="listing-detail-page__header">
        <h1>
          {isMultiple
            ? listing.propertyKey
            : `${units[0].STREET_NO} ${units[0].STREET_NAME}${
                units[0].UNIT_NO ? `, Unit ${units[0].UNIT_NO}` : ""
              }`}
        </h1>
        <p className="listing-detail-page__address">
          {`${units[0].TOWN_NAME}, MA ${units[0].ZIP_CODE}`}
        </p>
      </div>
      <div className="listing-detail-page__content">
        <div className="listing-detail-page__main-img-wrap">
          <img
            className="listing-detail-page__main-img"
            src={units[0].PHOTO_URLS[0]}
            alt={`Primary of ${units[0].STREET_NAME}`}
            onClick={() => handleOpenLightbox(0, 0)}
          />
        </div>
        <div className="listing-detail-page__gallery">
          {units[0].PHOTO_URLS.slice(1, 8).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className="listing-detail-page__gallery-img"
              onClick={() => handleOpenLightbox(0, index + 1)}
            />
          ))}
          {extraImagesCount > 0 && (
            <div
              className="listing-detail-page__gallery-img listing-detail-page__extra-img"
              onClick={() => handleOpenLightbox(0, 7)}
            >
              <span>+{extraImagesCount}</span>
            </div>
          )}
        </div>
      </div>
      <div className="listing-detail-page__details">
        {isMultiple ? (
          units.map((unit, index) => (
            <div key={index} className="listing-detail-page__unit">
              <h2>{`Unit ${unit.UNIT_NO} - $${unit.LIST_PRICE}`}</h2>
              <p className="listing-detail-page__description">
                Description {unit.REMARKS}
              </p>
              <div className="listing-detail-page__features">
                <div>
                  <i className="fas fa-door-open"></i> {unit.NO_ROOMS} Rooms
                </div>
                <div>
                  <i className="fas fa-bed"></i> {unit.NO_BEDROOMS} Beds
                </div>
                <div>
                  <i className="fas fa-bath"></i> {unit.NO_FULL_BATHS} Full
                  Baths
                </div>
                <div>
                  <i className="fas fa-toilet"></i> {unit.NO_HALF_BATHS} Half
                  Baths
                </div>
                <div>
                  <i className="fas fa-ruler-combined"></i> {unit.SQUARE_FEET}{" "}
                  Sq Ft
                </div>
                <div>
                  <i className="fas fa-car"></i> {unit.PARKING_SPACES} Parking
                  Spaces
                </div>
                <div>
                  <i className="fas fa-calendar-alt"></i> Available:{" "}
                  {unit.DATE_AVAILABLE}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="listing-detail-page__unit">
            <div className="listing-detail-page__description">
              <h2>Summary</h2>
              <p>{units[0].REMARKS}</p>
            </div>
            <div className="listing-detail-page__features">
              <div>
                <i className="fas fa-door-open"></i> {units[0].NO_ROOMS} Rooms
              </div>
              <div>
                <i className="fas fa-bed"></i> {units[0].NO_BEDROOMS} Beds
              </div>
              <div>
                <i className="fas fa-bath"></i> {units[0].NO_FULL_BATHS} Full
                Baths
              </div>
              <div>
                <i className="fas fa-toilet"></i> {units[0].NO_HALF_BATHS} Half
                Baths
              </div>
              <div>
                <i className="fas fa-ruler-combined"></i> {units[0].SQUARE_FEET}{" "}
                Sq Ft
              </div>
              <div>
                <i className="fas fa-car"></i> {units[0].PARKING_SPACES} Parking
                Spaces
              </div>
              <div>
                <i className="fas fa-calendar-alt"></i> Available:{" "}
                {units[0].DATE_AVAILABLE}
              </div>
            </div>
          </div>
        )}
      </div>
      {openLightbox.open && (
        <Lightbox
          images={units[openLightbox.unitIndex].PHOTO_URLS}
          currentIndex={openLightbox.photoIndex}
          onClose={handleCloseLightbox}
          onMovePrev={handleMovePrev}
          onMoveNext={handleMoveNext}
        />
      )}
      <div>
        {/* Pass the current town to RentalCards to filter listings */}
        <RentalCards
          title={`${currentTown} Listings`}
          searchParams={{ town: currentTown }} // Filter by town
        />
      </div>
    </div>
  );
}

export default RentalDetail;
