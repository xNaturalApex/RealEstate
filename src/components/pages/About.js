import React from "react";
import "../../App.css";
import Footer from "../Footer";
import AboutSection from "../AboutSection";
import "../AboutSection.css";
import Testimonials from "../Testimonials";

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
