import React, { useState } from 'react';
import './Testimonial.css';

const testimonialsData = [
  {
    id: 1,
    name: 'John Doe',
    age: 32,
    stars: 5,
    review:
      'Loved it! I just signed up for a 3 month plan and I am already seeing results! The app is easy to go through and the meal plans are delicious!',
    image: './images/profile-image-1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 28,
    stars: 5,
    review:
      'Just finished my 3 month plan and I am very happy with the results! I have lost 15 pounds and I am feeling great! I will definitely be signing up for another plan!',
    image: './images/profile-image-2.jpg',
  },
  {
    id: 3,
    name: 'mike smith',
    age: 28,
    stars: 3,
    review:
      'Just finished my 3 month plan and I am very happy with the results! I have lost 15 pounds and I am feeling great! I will definitely be signing up for another plan!',
    image: './images/profile-image-2.jpg',
  },
  {
    id: 4,
    name: 'Jane Smith',
    age: 28,
    stars: 4,
    review:
      'Just finished my 3 month plan and I am very happy with the results! I have lost 15 pounds and I am feeling great! I will definitely be signing up for another plan!',
    image: './images/profile-image-2.jpg',
  },
];

const TestimonialCarousel = ({ activeIndex, handlePrev, handleNext }) => {
  return (
    <div className='testimonial-background'>
      <div className='testimonial-carousel'>
        <div className='carousel-container'>
          <div className='carousel-image'>
            <img
              className='profile-image'
              src={testimonialsData[activeIndex].image}
              alt='Profile'
            />
          </div>
          <div className='testimonial-info'>
            <h3>{testimonialsData[activeIndex].name}</h3>
            <p>{testimonialsData[activeIndex].age} years old</p>
          </div>
          <div className='carousel-arrows'>
            <span
              className='arrow prev'
              onClick={handlePrev}
            >
              &lt;
            </span>
            <span
              className='arrow next'
              onClick={handleNext}
            >
              &gt;
            </span>
          </div>
          <div className='testimonial-stars'>
            {Array.from(
              { length: testimonialsData[activeIndex].stars },
              (_, index) => (
                <span
                  key={index}
                  className='star'
                >
                  &#9733;
                </span>
              )
            )}
          </div>
          <p>{testimonialsData[activeIndex].review}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='testimonial-page'>
      <h1>Testimonials</h1>
      <div className='testimonial-container'>
        <TestimonialCarousel
          activeIndex={activeIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Testimonials;
