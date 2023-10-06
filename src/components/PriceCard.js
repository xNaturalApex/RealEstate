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
        'If you have never worked out with a trainer, this is a great place to start',
      para2: 'A',
      workout_protocol: '30 min Sessions',
      nutrition_protocol: 'Diet Tracking',
      sessions: 'Sessions per Week: ',
      sessionChoiceLeft: '1x',
      sessionChoiceRight: '2x',
      feature_1: '$99 Start Up Fee',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online - $99/mo',
    },
    {
      title: 'STARTER + 1',
      applyGradient: 'greenGradient',
      prices: [
        ['$75/mo', '$499'],
        ['$149/mo', '$899'],
      ],
      para1: 'For 2 people who want to Share a personal training class.',
      para2: 'Sign up together save big!',
      workout_protocol: '60 min Sessions',
      nutrition_protocol: 'Diet Tracking',
      sessions: 'Sessions per Week: ',
      sessionChoiceLeft: '1x',
      sessionChoiceRight: '2x',
      feature_1: '$99 Start Up Fee',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online - $99/mo',
    },
    {
      title: 'PREMIUM',
      applyGradient: 'orangeGradient',
      prices: [
        ['$149/mo', '$1399'],
        ['$249/mo', '$1999'],
        ['399/mo', '$3299'],
      ],
      para1: 'Looking to take your fitness to the next level? ',
      para2: 'Enhance your workouts from the gym to the kitchen.',
      workout_protocol: '1 Hour Workouts',
      nutrition_protocol: 'Full Nutrional Coaching',
      sessions: 'Sessions per Week:',
      sessionChoiceLeft: '1x',
      sessionChoiceCenter: '2x',
      sessionChoiceRight: '3x',
      feature_1: '$99 Initiation Fee + 3 Month Commitment',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online- $149/mo',
    },

    {
      title: 'ELITE',
      type: 'Best Deal',
      applyGradient: 'purpleGradient',
      prices: [
        ['$399/mo', '$2250'],
        ['$499/mo', '$2999'],
        ['$720/mo', '$3999'],
      ],
      para1: 'Designed for the individual focued on thier Dream Phisique.',
      para2: 'Want to look like an athlete? This is the program for you.',
      workout_protocol: 'Fully Customized Workout Program',
      nutrition_protocol: 'Made to Measure Meal Plan',
      sessions: 'Sessions per Week (60 min)',
      sessionChoiceLeft: '1x',
      sessionChoiceCenter: '2x',
      sessionChoiceRight: '3x',
      feature_1: '$99 Initiation Fee + 3 Month Commitment',
      feature_2: '3 Month Commitment then Month to Month',
      feature_3: 'Availble Online - $250/mo',
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
      sessions: 'Program Style',
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
