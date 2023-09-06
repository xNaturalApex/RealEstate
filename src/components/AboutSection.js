import React from 'react';
import { Button } from './Button';

function AboutSection() {
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
              I'm Felipe, a certified personal trainer and nutrition coach. I
              take on clients of all ages and fitness levels, from professional
              athletes to those just getting started.
            </p>
            <p>
              I work with clients who have special needs, such as those with
              diabetes or heart disease and even clients recovering from injury
              or surgery.
            </p>
            <p>
              At Natural Apex, I am dedicated to helping you uncover the
              incredible potential within YOU by embracing a holistic approach
              to wellness. All of our programs are designed to help you achieve
              your goals wherever you are in your fitness journey. Most plans
              offer some sort of nutrional protocol to follow. This symbiois of
              mind body and spirit is the key to unlocking your 'Natural Apex.'
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
            <div className='faq-question'>
              <h3>Question 1?</h3>
              <div className='faq-answer'>
                <p>Answer 1.</p>
              </div>
            </div>
            <div className='faq-question'>
              <h3>Question 2?</h3>
              <div className='faq-answer'>
                <p>Answer 2.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
