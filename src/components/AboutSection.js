import React, { useState } from "react";
import { Button } from "./Button";

function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="about-section">
      <div className="background-image">
        {/* Add your background image here */}
      </div>
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="image-border">
              <img
                src="images/007-Edited.jpg"
                alt="Felipe Franco"
                className="circle-image"
              />
            </div>
          </div>
          <div className="about-text">
            <h2>Felipe Franco</h2>
            <h3>Real Estate Agent & Investment Specialist</h3>
            <p>
              Hello! I'm Felipe, your dedicated real estate agent here in
              Greater Boston. With a passion for helping first-time homebuyers
              and those seeking rental properties, I'm committed to guiding you
              through every step of your real estate journey. Whether you're
              buying your first home or searching for the perfect rental, I'm
              here to turn your dreams into reality.
            </p>
            <p>
              Specializing in both local and international markets, I also help
              clients purchase investment properties in some of the most
              promising locations in Brazil. From Itapema to other prime areas,
              I can assist you in making savvy investments that yield excellent
              returns.
            </p>
            <p>
              My approach goes beyond traditional real estate services. I offer
              personalized advice, market insights, and a dedicated commitment
              to finding the right property for you. Whether you're navigating
              the competitive Boston market or exploring investment
              opportunities abroad, I’m here to provide you with expert guidance
              and support.
            </p>
          </div>
          <div></div>
        </div>

        <div className="colored-section">
          <div className="container">
            <div className="call-to-action">
              <h2>Ready to Find Your Dream Property?</h2>
              <p>Let's connect and start your real estate journey today!</p>
              <Button
                className="btn--gradient-primary"
                link="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>FAQs</h2>
          <div className="faq-toggle">
            {faqData.map((item, index) => (
              <div className="faq-question" key={index}>
                <h3 onClick={() => handleAccordionClick(index)}>
                  {item.question}
                </h3>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqData = [
  {
    question: "Why should I work with a real estate agent?",
    answer:
      "Partnering with a real estate agent can make all the difference. We provide expert market knowledge, negotiate on your behalf, and guide you through the buying or renting process to ensure you make informed decisions and get the best deal possible.",
  },
  {
    question: "How can you help me find my first home?",
    answer:
      "I specialize in working with first-time homebuyers, offering personalized support and advice. I'll help you navigate the market, understand your options, and find a home that meets your needs and budget. My goal is to make your first home purchase as smooth and stress-free as possible.",
  },
  {
    question: "What should I know about renting in Greater Boston?",
    answer:
      "Renting in Boston can be competitive, but with my local expertise, I'll help you find the right rental property and negotiate favorable terms. I’ll assist you with understanding lease agreements and navigating the rental market to ensure you find a home that fits your lifestyle.",
  },
  {
    question: "How can you assist with real estate investments in Brazil?",
    answer:
      "I offer specialized services for clients interested in investing in Brazilian real estate. With insights into the best markets and investment opportunities, I can guide you through the purchasing process, helping you make informed decisions and achieve your investment goals.",
  },
  {
    question: "What is the typical process for buying a property?",
    answer:
      "The buying process involves several steps: determining your budget, finding the right property, making an offer, securing financing, and completing the closing process. I’ll be with you every step of the way, ensuring that each phase is handled efficiently and effectively.",
  },
];

export default AboutSection;
