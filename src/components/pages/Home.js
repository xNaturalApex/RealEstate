import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import Cards from "../Cards";
import ListingCards from "../ListingCards";

function Home() {
  return (
    <>
      <HeroSection />
      <ListingCards title={"Featured Listings"} itemsPerPage={9}/>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
