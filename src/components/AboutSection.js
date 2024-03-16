import React, { useState } from 'react';
import { Button } from './Button';

function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className='about-section'>
      <div className='background-image'>
        {/* Add your background image here */}
      </div>
      <div className='container'>
        <div className='about-content'>
          <div className='about-image'>
            <div className='image-border'>
              <img
                src='images/Felipe-Headshot.jpg'
                alt='Your Favorite Trainer'
                className='circle-image'
              />
            </div>
          </div>
          <div className='about-text'>
            <h2>Felipe Franco</h2>
            <h3>Master Trainer & Nutrition Coach</h3>
            <p>
              Hey there, it's Felipe – your certified personal trainer and
              nutrition coach, dedicated to helping men and women get shredded,
              lean, and perform at their peak! No matter where you're starting
              from, I'm here to turn your fitness aspirations into reality.
            </p>
            <p>
              My specialty? Assisting people achieve that shredded and lean
              physique while maximizing their performance. But that's not all –
              I'm also experienced in guiding those managing injuries, trauma,
              heart conditions, and more. At Natural Apex, we're all about
              adding some spice to your fitness adventure.
            </p>
            <p>
              Our programs are far from ordinary, and most include personalized
              nutritional guidance. We're all about achieving the perfect
              synergy between your mind, body, and spirit to help you conquer
              your 'Natural Apex' with style and excitement. Let's turn your
              fitness journey into an exhilarating ride!
            </p>
          </div>
          <div></div>
        </div>

        <div className='colored-section'>
          <div className='container'>
            <div className='call-to-action'>
              <h2>Let's Have a Chat! </h2>
              <p>Book a consultation today! </p>
              <Button
                className='btn--gradient-primary'
                link='https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start'
              >
                Book
              </Button>
            </div>
          </div>
        </div>

        <div className='faq-section'>
          <h2>FAQs</h2>
          <div className='faq-toggle'>
            {faqData.map((item, index) => (
              <div
                className='faq-question'
                key={index}
              >
                <h3 onClick={() => handleAccordionClick(index)}>
                  {item.question}
                </h3>
                {activeIndex === index && (
                  <div className='faq-answer'>
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
    question: 'Why consider a personal trainer, anyway?',
    answer:
      "Thinking about hiring a personal trainer? They're like your fitness partner in crime, crafting workouts, ensuring you're on the right track, and keeping you motivated. Plus, they're real people, not just fitness apps! 🏋️‍♂️💪",
  },
  {
    question: 'How often should I work out with a personal trainer?',
    answer:
      'So, how many times should you team up with your trainer? Most folks opt for 2-3 sessions per week. But your trainer will create a plan tailored to your needs.',
  },
  {
    question: "What's the deal with my first session with a personal trainer?",
    answer:
      "Your first session is like a fitness meet and greet. They'll learn about your fitness goals, vibe, and any workout preferences you have. You might even try out some new exercises and get a sense of their training style. 😉",
  },
  {
    question: 'When can I start seeing results from personal training?',
    answer:
      "Patience is key, my friend. Results vary, but in about 4-6 weeks, you could start noticing changes if you stay dedicated and follow your trainer's advice. Remember, it's a journey, not a sprint. 🏛️💪",
  },
  {
    question: 'Can personal training help me shed those extra pounds?',
    answer:
      "Absolutely! Personal trainers are like weight-loss wizards. They mix cardio, strength, and HIIT to torch calories. Plus, they'll share nutrition tips to support your fitness goals. 👋🏋️‍♂️",
  },
];

export default AboutSection;
