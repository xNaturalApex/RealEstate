import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Your Dream Body Starts Here.</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/weights.jpg'
              text='Private Personal Training'
              label='Custom Workouts'
              path='/plans'
            />
            <CardItem
              src='images/prep.jpg'
              text='Meal Plans & Diet Tracking'
              label='Online'
              path='/plans'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/planche.png'
              text='Calisthenics Bootcamp - Free Trial'
              label='Free 14 day Program'
              path='/plans'
            />
            <CardItem
              src='images/man-phone-food.jpg'
              text='Dowload our App!'
              label='Online'
              path='/plans'
            />
            <CardItem
              src='images/scale2.jpg'
              text='Get your Free Fitness Assessment Today!'
              label='Book Now'
              path='https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
