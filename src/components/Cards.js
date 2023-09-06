import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Get in the best shape of your life with our 1-on-1 training (Los Angeles, CA)'
              label='Meet Your Trainer'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Earn your dream body with our 1-on-1 nutrition coaching'
              label='Meal Plans Available'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Consult with our fitness experts to learn what the best plan is for you!'
              label='Fitness Education'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Expose '
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Get your free personal fitness assessment today!'
              label='Book Now'
              path='/book'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
