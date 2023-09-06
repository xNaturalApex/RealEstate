import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Testimonials from '../Testimonial';
import PriceCard from '../PriceCard';

function Home() {
  return (
    <>
      <HeroSection />
      <PriceCard />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
