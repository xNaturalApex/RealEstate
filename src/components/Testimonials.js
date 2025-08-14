import React, { useState } from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Gabriela R.",
    age: 35,
    stars: 5,
    review:
      "Felipe is incredibly knowledgeable and diligent. He guided me through the entire home buying process, ensuring I understood every detail. His patience and expertise made buying my first home in Boston a smooth experience. Highly recommend!",
    image: "./images/head-1.jpeg",
  },
  {
    id: 2,
    name: "Carlos M.",
    age: 48,
    stars: 5,
    review:
      "As an investor, I was looking for someone with a vision, and Felipe exceeded all expectations. His insights on property development and return on investment were invaluable. He truly understands the market and knows how to spot opportunities.",
    image: "./images/head-2.jpg",
  },
  {
    id: 3,
    name: "Amanda P.",
    age: 32,
    stars: 5,
    review:
      "I was hesitant about buying luxury real estate in Brazil while living in Boston, but Felipe made the process seamless. His knowledge of the Santa Catarina market and ability to communicate clearly across borders was exactly what I needed. He’s a true expert!",
    image: "./images/head-3.jpeg",
  },
  {
    id: 4,
    name: "Ricardo S.",
    age: 42,
    stars: 5,
    review:
      "Felipe not only helped me find the perfect property in Itapema, but he also gave me a long-term investment strategy. His attention to detail and ability to think ahead are unmatched. He is the best choice if you’re looking for sound real estate advice.",
    image: "./images/head-4.jpg",
  },
  {
    id: 5,
    name: "Laura G.",
    age: 29,
    stars: 5,
    review:
      "As a Brazilian living in Boston, I wanted to invest in my home country. Felipe provided expert advice on luxury real estate in Santa Catarina, and his guidance gave me the confidence to make a significant investment. He is truly a professional!",
    image: "./images/head-5.jpeg",
  },
  {
    id: 6,
    name: "Marcos D.",
    age: 37,
    stars: 5,
    review:
      "I worked with Felipe to buy a rental property in Boston, and his experience in the market was crucial. He found me a place in a prime location and helped maximize my rental income. Couldn't ask for more from an agent!",
    image: "./images/head-6.jpeg",
  },
  {
    id: 7,
    name: "Tatiana S.",
    age: 45,
    stars: 5,
    review:
      "O Felipe foi fundamental para que eu pudesse realizar o sonho de comprar um apartamento na praia em Santa Catarina. Ele me ajudou com todos os detalhes, desde a escolha da propriedade até a parte burocrática. Recomendo de olhos fechados!",
    image: "./images/head-7.jpeg",
  },
  {
    id: 8,
    name: "Lucas F.",
    age: 33,
    stars: 5,
    review:
      "Eu estava em dúvida sobre onde investir no Brasil, e o Felipe foi essencial para me guiar. Com a experiência dele, consegui adquirir um imóvel de luxo em Itapema com uma ótima projeção de valorização.",
    image: "./images/head-8.jpeg",
  },
  {
    id: 9,
    name: "Natalia M.",
    age: 40,
    stars: 5,
    review:
      "Felipe's attention to detail made all the difference when buying my home. He was always available to answer questions, provide expert advice, and ensure that I felt comfortable every step of the way. Truly a professional.",
    image: "./images/head-9.jpeg",
  },
  {
    id: 10,
    name: "Gustavo P.",
    age: 31,
    stars: 5,
    review:
      "Tivemos uma experiência incrível com o Felipe na compra da nossa casa de veraneio em Santa Catarina. Ele nos mostrou várias opções, sempre alinhadas ao nosso perfil, e cuidou de toda a parte burocrática com uma eficiência fora de série.",
    image: "./images/head-10.jpeg",
  },
  {
    id: 11,
    name: "Patrícia L.",
    age: 28,
    stars: 5,
    review:
      "Felipe me ajudou a comprar meu primeiro imóvel em Boston e não poderia estar mais feliz com o resultado. Ele explicou cada passo do processo com paciência e me deu confiança para seguir em frente com a compra.",
    image: "./images/head-11.jpeg",
  },
  {
    id: 12,
    name: "Eduardo T.",
    age: 50,
    stars: 5,
    review:
      "Como investidor, sempre busco pessoas competentes para trabalhar, e o Felipe superou todas as expectativas. Sua visão sobre o mercado e suas recomendações de investimento foram excepcionais.",
    image: "./images/head-12.jpeg",
  },
  {
    id: 13,
    name: "Ana Paula V.",
    age: 36,
    stars: 5,
    review:
      "Procurava por um corretor que pudesse me ajudar a encontrar um imóvel em Itapema, e o Felipe foi a melhor escolha. Sua experiência no mercado brasileiro e sua dedicação fazem toda a diferença.",
    image: "./images/head-13.jpeg",
  },
  {
    id: 14,
    name: "Roberto C.",
    age: 47,
    stars: 5,
    review:
      "Felipe realmente conhece o mercado imobiliário de Boston e foi extremamente atencioso ao encontrar o imóvel certo para o meu investimento. Ele conseguiu superar minhas expectativas em cada etapa do processo.",
    image: "./images/head-14.jpeg",
  },
  {
    id: 15,
    name: "Isabela D.",
    age: 41,
    stars: 5,
    review:
      "Graças ao Felipe, consegui fazer um excelente investimento imobiliário em Santa Catarina. Ele conhece muito bem a região e foi fundamental para que tudo corresse bem.",
    image: "./images/head-15.jpeg",
  },
];

const TestimonialCarousel = ({ activeIndex, handlePrev, handleNext }) => {
  return (
    <div className="testimonial-background">
      <div className="testimonial-carousel">
        <div className="carousel-container">
          <div className="carousel-image">
            <img
              className="profile-image"
              src={testimonialsData[activeIndex].image}
              alt="Profile"
            />
          </div>
          <div className="testimonial-info">
            <h3>{testimonialsData[activeIndex].name}</h3>
            <p>{testimonialsData[activeIndex].age} years old</p>
          </div>
          <div className="carousel-arrows">
            <span className="arrow-prev" onClick={handlePrev}>
              &lt;
            </span>
            <span className="arrow-next" onClick={handleNext}>
              &gt;
            </span>
          </div>
          <div className="testimonial-stars">
            {Array.from(
              { length: testimonialsData[activeIndex].stars },
              (_, index) => (
                <span key={index} className="star">
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

function Testimonials() {
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
    <div className="testimonial-page">
      <h1>Client Reviews</h1>
      <div className="testimonial-container">
        <TestimonialCarousel
          activeIndex={activeIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}

export default Testimonials;
