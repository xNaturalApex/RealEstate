import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import Testimonials from "../Testimonial";
import Cards from "../Cards";
import ListingCards from "../ListingCards";

function Home() {
  return (
    <>
      <HeroSection />
       <div className='container-1200'>
        <ListingCards />
      </div>
      <Cards />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
