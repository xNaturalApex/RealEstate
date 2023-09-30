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
            <h2>Meet Felipe</h2>
            <h3>Master Trainer, Nutrition Coach, Founder</h3>

            <p>
              Hey there, it's Felipe – your certified personal trainer and
              nutrition coach, dedicated to helping men and women get shredded,
              lean, and perform at their peak! No matter where you're starting
              from, I'm here to turn your fitness aspirations into reality.
            </p>
            <p>
              My specialty? Assisting folks in their journey to achieve that
              shredded and lean physique while maximizing their performance. But
              that's not all – I'm also experienced in guiding those managing
              injuries, trauma, diabetes, heart conditions, and more. At Natural
              Apex, we're all about adding some spice to your fitness adventure.
            </p>
            <p>
              Our programs are far from ordinary, and most include personalized
              nutritional guidance. We're all about achieving the perfect
              synergy between your mind, body, and spirit to help you conquer
              your 'Natural Apex' with style and excitement. Let's turn your
              fitness journey into an exhilarating ride!
            </p>
          </div>
        </div>

        <div className='colored-section'>
          <div className='container'>
            <div className='call-to-action'>
              <h2>Let's Have a Chat! </h2>
              <p>Book a consultation today! </p>
              <Button>Book</Button>
            </div>
          </div>
        </div>

        <div className='faq-section'>
          <h2>FAQ</h2>
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
    question: 'Q: What are the benefits of hiring a personal trainer?',
    answer:
      'A: Hiring a personal trainer can provide numerous benefits. They offer personalized workout programs tailored to your specific goals and fitness level. A personal trainer ensures proper form and technique, reducing the risk of injuries. They provide motivation, support, and accountability to help you stay on track. With their expertise and guidance, you can maximize your results and make consistent progress.',
  },
  {
    question: 'Q: How often should I work out with a personal trainer?',
    answer:
      'A: The frequency of training sessions with a personal trainer depends on your individual goals, availability, and budget. Generally, most clients find success with 2-3 sessions per week. This allows for a balanced approach to training and recovery. However, your trainer will work with you to create a schedule that fits your needs and lifestyle.',
  },
  {
    question:
      'Q: What can I expect during my first session with a personal trainer?',
    answer:
      'A: Your first session with a personal trainer is typically an assessment session. They will evaluate your current fitness level, discuss your goals, and any specific concerns or limitations you may have. This assessment helps the trainer design a customized program tailored to your needs. Additionally, you may be introduced to basic exercises and get a sense of their training style.',
  },
  {
    question: 'Q: How long will it take to see results from personal training?',
    answer:
      "A: The time it takes to see results from personal training varies from person to person. Factors such as your starting point, commitment, consistency, and adherence to the program all play a role. Typically, noticeable improvements can be seen within 4-6 weeks if you stay dedicated to your workouts and follow the trainer's recommendations.",
  },
  {
    question: 'Q: Can personal training help with weight loss?',
    answer:
      'A: Yes, personal training can be extremely effective for weight loss. A personal trainer will design a workout program that includes a combination of cardiovascular exercises, strength training, and high-intensity interval training (HIIT) to maximize calorie burn and fat loss. They will also provide guidance on nutrition and lifestyle modifications to support your weight loss journey.',
  },
  {
    question: 'Q: What qualifications should I look for in a personal trainer?',
    answer:
      "A: When selecting a personal trainer, it's important to consider their qualifications and expertise. Look for trainers who are certified by reputable organizations such as the National Academy of Sports Medicine (NASM), American Council on Exercise (ACE), or the International Sports Sciences Association (ISSA). Additionally, a trainer with experience, positive client testimonials, and ongoing professional development shows a commitment to their craft.",
  },
  {
    question:
      'Q: Can personal training benefit individuals with specific health conditions?',
    answer:
      "A: Yes, personal training can be beneficial for individuals with specific health conditions. Many personal trainers have experience working with clients who have conditions such as diabetes, hypertension, arthritis, or back pain. They can design safe and effective exercise programs that consider your specific needs, limitations, and medical history. However, it's important to consult with your healthcare provider before starting any exercise program.",
  },
  {
    question: 'Q: What is the cost of personal training sessions?',
    answer:
      "A: The cost of personal training sessions can vary depending on factors such as location, trainer's experience, session duration, and package deals. Typically, personal training rates range from $50 to $150 per session. Some trainers offer discounted rates for purchasing multiple sessions upfront. It's best to inquire directly with the trainer about their pricing structure.",
  },
  // Add more FAQ entries following the same structure
];

export default AboutSection;
