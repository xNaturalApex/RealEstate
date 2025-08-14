import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import Cards from "../cards/Cards";
import ListingCards from "../cards/ListingCards";

function Home() {
  return (
    <>
      <HeroSection />
      <ListingCards title={"Featured Listings"} itemsPerPage={6} />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
