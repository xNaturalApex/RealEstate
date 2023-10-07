import React, { useState } from 'react';
import './Testimonial.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Fernando L. ',
    age: 44,
    stars: 5,
    review:
      "I can recomend the full nutrition plan, with Felipe's help I dropped 14 pounds in 16 weeks! The app is easy to go through and the meal plans are suprisingly realistic. Worth every penny",
    image: './images/head-11.jpeg',
  },

  {
    id: 2,
    name: 'Andy T.',
    age: 28,
    stars: 5,
    review:
      "Felipe is a different breed! The workouts are always challeging and well designed. Everthing he lays out has sceintific reasoning or a case study behind it so I know I'm doing what's best. I can tell that alot of thought goes into it. 10/10 would recomend Felipe only if you are serious!",
    image: './images/head-7.jpg',
  },

  {
    id: 3,
    name: 'Joseph C.',
    age: 39,
    stars: 5,
    review:
      "In 2019 I suffered a miniscus tear in my right knee, I was overweight 30 pounds and I needed to make a lifestyle change, that's when I met Felipe. He started working with my PT clinic and devolped an exercise plan arround my mobiliy, He knows what he's doing and I would recommend Felipe to anyone looking to recover from an  injury!",
    image: './images/head-12.jpeg',
  },

  {
    id: 4,
    name: 'Yousef S.',
    age: 19,
    stars: 5,
    review:
      'I started training with Felipe 2 years ago to get into shape for soccer tryouts. He built me a program around everthinhg that I needed, agility, speed, and power. If you play a sport I can highly recommend working with a trainer like Felipe ',
    image: './images/head-4.jpg',
  },
  {
    id: 5,
    name: 'Gabi B.',
    age: 25,
    stars: 5,
    review:
      'O Felipe pega pesado, mas a gente se diverte demais. Ele tá sempre ligado nas minhas metas e monta os treinos sob medida. Top demais, ele é mais que um treinador, é um parceirão no fitness!"',
    image: './images/head-9.jpeg',
  },

  {
    id: 6,
    name: 'Katia S.',
    age: 34,
    stars: 5,
    review:
      ' Treinar com o Felipe é sensacional! Ele é super apaixonado por saúde e deixa cada treino divertido e desafiador. Felipe adapta os treinos de acordo com o que eu preciso e as metas que quero alcançar, e isso tem feito uma enorme diferença nos meus resultados. Ele não é só um treinador, é um parceiro de fitness incrível!',
    image: './images/head-6.jpg',
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
              className='arrow-prev'
              onClick={handlePrev}
            >
              &lt;
            </span>
            <span
              className='arrow-next'
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
      <h1>Client Reviews</h1>
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
