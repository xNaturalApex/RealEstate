import React, { useState } from 'react';
import PriceCardItem from './PriceCardItem';
import './PriceCard.css';

const PriceCard = () => {
  const [priceIndex, setPriceIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);

  const allCardsInfo = [
    {
      title: 'STARTER',
      applyGradient: 'blueGradient',
      prices: [
        ['$149/mo', '$899'],
        ['$299/mo', '$1699'],
      ],
      para1:
        'For Anyone looking to get back to the gym or start a new fitness journey!',
      para2:
        "If you've never worked with a trainer before, this is a great place to start.",
      workout_protocol: 'Beginner Workout Program',
      nutrition_protocol: 'Entry level Nutrional Coaching',
      sessions: 'Sessions per month (30 min): ',
      sessionChoiceLeft: '4x',
      sessionChoiceRight: '8x',
      feature_1: '$99 Start Up Fee',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online - $199/mo',
    },

    {
      title: 'PREMIUM',
      applyGradient: 'orangeGradient',
      prices: [
        ['$249/mo', '$1399'],
        ['$349/mo', '$1999'],
        ['$599/mo', '$3299'],
      ],
      para1: 'Looking to take your fitness to the next level? ',
      para2: 'Enhance your workouts from the gym to the kitchen.',
      workout_protocol: 'Custom Made Workout',
      nutrition_protocol: 'Macro & Calorie Based Meal Plan',
      sessions: 'Sessions per Month (60 min):',
      sessionChoiceLeft: '4x',
      sessionChoiceCenter: '8x',
      sessionChoiceRight: '12x',
      feature_1: '$99 Initiation Fee + 3 Month Commitment',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online- $249/mo',
    },

    {
      title: 'ELITE',
      applyGradient: 'purpleGradient',
      prices: [
        ['$399/mo', '$2250'],
        ['$499/mo', '$2999'],
        ['$720/mo', '$3999'],
      ],
      para1:
        'Designed for the individual who wants to be pushed to their limit.',
      para2: 'Want to look like an athlete? This is the program for you.',

      workout_protocol: 'Fully Customized Workout Program',
      nutrition_protocol: 'Made to Measure Meal Plan',
      sessions: 'Sessions per month (60 min)',
      sessionChoiceLeft: '4x',
      sessionChoiceCenter: '8x',
      sessionChoiceRight: '12x',
      feature_1: '$99 Initiation Fee + 3 Month Commitment',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online - $399/mo',
    },

    {
      title: 'NUTRITION',
      applyGradient: 'blueGradient',
      prices: [
        ['$75/mo', '$449'],
        ['$149/mo', '$849'],
      ],
      para1: 'Give your body the fuel it needs to perform at its best.',
      para2:
        'A diet is temporary, a lifestyle is forever. Let us help you build a lifestyle around sustainable nutritonal guidance.',
      workout_protocol: 'Access to our Custom Workout App',
      nutrition_protocol: 'Calorie Tracking wih Trainerize',
      sessions: 'A Sustainable 16 Week Program',
      sessionChoiceLeft: 'Macros Only',
      sessionChoiceRight: 'Meal Plan',
      feature_1: '$49 Initiation Fee + 16 week Commitment',
      feature_2: 'Weekly Check-ins with your Nutrition Coach',
      feature_3: 'Availble Online & In Person',
    },
  ];

  const onPriceIndexChange = (index) => {
    setPriceIndex(index);
  };

  const handleOptionIndexChange = (index) => {
    if (optionIndex !== index) {
      setOptionIndex(index);
    }
  };

  return (
    <>
      <div className='price__card__toggle-container'>
        <p>Payment Style:</p>
        <div className='price__card__toggle-buttons'>
          <button
            className={`price__card__toggle-button ${
              optionIndex === 0 ? 'active' : ''
            }`}
            onClick={() => handleOptionIndexChange(0)}
          >
            Month to Month
          </button>
          <button
            className={`price__card__toggle-button ${
              optionIndex === 1 ? 'active' : ''
            }`}
            onClick={() => handleOptionIndexChange(1)}
          >
            6 Months - 10% off
          </button>
        </div>
      </div>
      <div className='price__card__container'>
        {allCardsInfo.map((singleCard, index) => (
          <PriceCardItem
            objProp={singleCard}
            key={singleCard.title}
            priceIndex={priceIndex}
            optionIndex={optionIndex}
            onPriceIndexChange={onPriceIndexChange}
            onOptionIndexChange={handleOptionIndexChange}
          />
        ))}
      </div>
    </>
  );
};

export default PriceCard;
