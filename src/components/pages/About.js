import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import AboutSection from '../AboutSection';
import '../TrainerCard.css';
import '../AboutSection.css';
import Testimonials from '../Testimonial';

function About() {
  return (
    <>
      <AboutSection />
      <Testimonials />
      <Footer />
    </>
  );
}

export default About;
