import React from "react";
import "./RentalCards.css";

function RentalCardItem({
  townName,
  title,
  listPrice,
  bedrooms,
  bathrooms,
  onClick,
  photos,
  parking,
  postType,
  tag,
}) {
  // Define a default image to use when no photos are available
  const defaultImage = "path_to_placeholder_image.jpg"; // Replace this with your actual placeholder image path

  // Safely access the first photo or use the default image if photos are undefined or empty
  const mainPhoto = photos && photos.length > 0 ? photos[0] : defaultImage;

  return (
    <li className="rental-cards__item" onClick={onClick}>
      <div className="rental-cards__item__link">
        <figure className="rental-cards__item__pic-wrap">
          <img
            className="rental-cards__item__img"
            alt="Property"
            src={mainPhoto}
          />
          {tag && <div className="rental-cards__item__label">{tag}</div>}
        </figure>
        <div className="rental-cards__item__info">
          <h3 className="rental-cards__item__list_price">{listPrice}</h3>
          <h5 className="rental-cards__item__title">{title}</h5>
          <p className="rental-cards__item__address">{townName}</p>
          <div className="rental-cards__item__details">
            <div className="rental-cards__item__bedrooms">
              <i className="fas fa-bed"></i> {bedrooms}
            </div>
            <div className="rental-cards__item__bathrooms">
              <i className="fas fa-bath"></i> {bathrooms}
            </div>
            <div className="rental-cards__item__parking">
              <i className="fas fa-car"></i> {parking}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default RentalCardItem;
