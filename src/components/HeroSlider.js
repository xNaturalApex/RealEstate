// src/components/HeroSlider/HeroSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSlider.css";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      image: "https://via.placeholder.com/1200x500",
      title: "Find Your Dream Home",
      buttonText: "Explore Now",
      buttonLink: "#",
    },
    {
      image: "https://via.placeholder.com/1200x500",
      title: "Luxury Apartments",
      buttonText: "View Listings",
      buttonLink: "#",
    },
    {
      image: "https://via.placeholder.com/1200x500",
      title: "Affordable Housing",
      buttonText: "Get Started",
      buttonLink: "#",
    },
  ];

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <a href={slide.buttonLink} className="btn">
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
