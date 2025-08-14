import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Your Dream Home Starts Here</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/BIR-Logo-simple.png"
              text="Search Boston Listings"
              label="For Purchase And Lease"
              path="/"
            />
            <CardItem
              src="images/BIR-Logo-simple.png"
              text="Hard Money Lenders"
              label="Investment Opportunities"
              path="/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/BIR-Logo-simple.png"
              text="Credit Repair Services"
              label="Become Pre-aproval Ready"
              path="/"
            />
            <CardItem
              src="images/BIR-Logo-simple.png"
              text="Dowload our App!"
              label="Online"
              path="/"
            />
            <CardItem
              src="images/BIR-Logo-simple.png"
              text="Single MLS listing"
              label="Book Now"
              path="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
