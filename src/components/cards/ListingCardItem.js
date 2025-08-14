import React from "react";
import "./ListingCards.css";

function ListingCardItem({
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
  sqft,
  tags = [],
}) {
  const defaultImage = "path_to_placeholder_image.jpg"; // Replace with your actual placeholder image path
  const mainPhoto = photos && photos.length > 0 ? photos[0] : defaultImage;

  return (
    <li className="listing-cards__item" onClick={onClick}>
      <div className="listing-cards__item__link">
        <figure className="listing-cards__item__pic-wrap">
          <img
            className="listing-cards__item__img"
            alt="Property"
            src={mainPhoto}
          />

          {tags && tags.length > 0 ? (
            <div className="listing-cards__item__tags">
              {tags.map((t, i) => (
                <div key={i} className="listing-cards__item__label">
                  {t}
                </div>
              ))}
            </div>
          ) : (
            tag && <div className="listing-cards__item__label">{tag}</div>
          )}
        </figure>

        <div className="listing-cards__item__info">
          <h3 className="listing-cards__item__list_price">{listPrice}</h3>
          <h5 className="listing-cards__item__title">{title}</h5>
          <p className="listing-cards__item__address">{townName}</p>
          <div className="listing-cards__item__details">
            <div className="listing-cards__item__bedrooms">
              <i className="fas fa-bed"></i> {bedrooms}
            </div>
            <div className="listing-cards__item__bathrooms">
              <i className="fas fa-bath"></i> {bathrooms}
            </div>
            <div className="listing-cards__item__parking">
              <i className="fas fa-car"></i> {parking}
            </div>
            {sqft && (
              <div className="listing-cards__item__sqft">
                <i className="fas fa-ruler-combined"></i>{" "}
                {Number(sqft).toLocaleString()} sqft
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default ListingCardItem;
