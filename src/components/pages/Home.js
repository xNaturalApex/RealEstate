import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Testimonials from '../Testimonial';
import Cards from '../Cards';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
