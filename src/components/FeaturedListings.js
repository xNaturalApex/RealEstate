// src/components/FeaturedListings/FeaturedListings.js
import React from "react";
import "./FeaturedListings.css";

const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      image: "https://via.placeholder.com/400x300",
      title: "Modern Family Home",
      price: "$500,000",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x300",
      title: "Luxury Condo",
      price: "$750,000",
      location: "New York, NY",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/400x300",
      title: "Cozy Cottage",
      price: "$300,000",
      location: "Austin, TX",
    },
  ];

  return (
    <div className="featured-listings">
      <h2>Featured Listings</h2>
      <div className="listings-container">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <img src={listing.image} alt={listing.title} />
            <div className="listing-info">
              <h3>{listing.title}</h3>
              <p className="price">{listing.price}</p>
              <p className="location">{listing.location}</p>
              <a href="#" className="btn">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
