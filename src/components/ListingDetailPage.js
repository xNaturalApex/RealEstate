// src/components/ListingDetailPage.js

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import "./ListingDetailPage.css";
import ListingCards from "../components/ListingCards";

// Importing data from three separate JSON files
import CCdata from "../data/CCdata.json";
import SFdata from "../data/SFdata.json";
import MFdata from "../data/MFdata.json";

function ListingDetailPage() {
  const location = useLocation();
  const { listingNo } = useParams(); // Extract listingNo from URL

  // Combine data from three files into a single array called 'listings'
  const listings = [...CCdata, ...SFdata, ...MFdata];

  // Attempt to retrieve listing from navigation state
  const listingFromState = location.state?.listing;

  // Find listing either from state or based on listingNo
  const listing =
    listingFromState ||
    listings.find((listingItem) => listingItem.units[0].LIST_NO === listingNo);

  const [openLightbox, setOpenLightbox] = useState({
    open: false,
    unitIndex: 0,
    photoIndex: 0,
  });

  // If listing is not found, display a message
  if (!listing) {
    return <h2>Listing not found</h2>;
  }

  const isMultiple = listing.postType === "multiple";
  const units = listing.units;

  // Handler to open the Lightbox
  const handleOpenLightbox = (unitIndex, photoIndex) => {
    setOpenLightbox({ open: true, unitIndex, photoIndex });
  };

  // Handler to close the Lightbox
  const handleCloseLightbox = () => {
    setOpenLightbox({ ...openLightbox, open: false });
  };

  // Handler to move to the previous image in the Lightbox
  const handleMovePrev = () => {
    const currentUnit = units[openLightbox.unitIndex];
    const totalPhotos = currentUnit.PHOTO_URLS.length;
    setOpenLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + totalPhotos - 1) % totalPhotos,
    }));
  };

  // Handler to move to the next image in the Lightbox
  const handleMoveNext = () => {
    const currentUnit = units[openLightbox.unitIndex];
    const totalPhotos = currentUnit.PHOTO_URLS.length;
    setOpenLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % totalPhotos,
    }));
  };

  // Calculate the number of extra images beyond the first 7 in the gallery
  const extraImagesCount =
    units[0].PHOTO_URLS.length > 7 ? units[0].PHOTO_URLS.length - 7 : 0;

  // Get the current town name to filter related listings
  const currentTown = units[0].TOWN_NAME;

  return (
    <div className="listing-detail-page">
      {/* Header Section */}
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

      {/* Main Image and Gallery */}
      <div className="listing-detail-page__content">
        {/* Main Image */}
        <div className="listing-detail-page__main-img-wrap">
          <img
            className="listing-detail-page__main-img"
            src={units[0].PHOTO_URLS[0]}
            alt={`Primary of ${units[0].STREET_NAME}`}
            onClick={() => handleOpenLightbox(0, 0)}
          />
        </div>

        {/* Gallery of Additional Images */}
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
          {/* Display an overlay if there are more than 7 images */}
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

      {/* Listing Details */}
      <div className="listing-detail-page__details">
        {isMultiple ? (
          // If the listing has multiple units, display each unit's details
          units.map((unit, index) => (
            <div key={index} className="listing-detail-page__unit">
              <h2>{`Unit ${unit.UNIT_NO} - $${unit.LIST_PRICE}`}</h2>
              <p className="listing-detail-page__description">{unit.REMARKS}</p>
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
          // If the listing has a single unit, display its summary
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

      {/* Lightbox Component */}
      {openLightbox.open && (
        <Lightbox
          images={units[openLightbox.unitIndex].PHOTO_URLS}
          currentIndex={openLightbox.photoIndex}
          onClose={handleCloseLightbox}
          onMovePrev={handleMovePrev}
          onMoveNext={handleMoveNext}
        />
      )}

      {/* Related Listings */}
      <div>
        <ListingCards
          title={`${currentTown} Listings`}
          searchParams={{ town: currentTown }} // Filter by town
        />
      </div>
    </div>
  );
}

export default ListingDetailPage;
