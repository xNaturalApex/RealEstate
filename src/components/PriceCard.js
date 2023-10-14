import React, { useState } from 'react';
import PriceCardItem from './PriceCardItem';
import './PriceCard.css';

const PriceCard = () => {
  const [priceIndex, setPriceIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);

  const allCardsInfo = [
    {
      title: 'STARTER',
      type: 'Best Price',
      applyGradient: 'greenGradient',
      prices: [
        ['$149/mo', '$899'],
        ['$299/mo', '$1699'],
      ],
      para1: 'Private Personal Training ',
      para2: 'Everything you need to get started',
      workout_protocol: '25 min Sessions + Workouts In-App',
      nutrition_protocol: 'Daily Diet Tracking In-App',
      sessions: 'Sessions per Week: ',
      sessionChoiceLeft: '1x',
      sessionChoiceRight: '2x',
      feature_1: '$99 Activation + 3 Month Commitment',
      feature_2: 'Monthly Assesment + Bi-Weekly Measurements',
      feature_3: 'Online Only - $99/mo',
    },

    {
      title: 'DUO',
      type: 'Per Person',
      applyGradient: 'blueGradient',
      prices: [
        ['$99/mo', '$599'],
        ['$199/mo', '$1099'],
      ],
      para1: 'Workouts with a partner',
      para2: 'Join with a friend or spouse and save!',
      workout_protocol: '55 min Sessions',
      nutrition_protocol: 'Individualized Diet Tracking In-App',
      sessions: 'Sessions per Week: ',
      sessionChoiceLeft: '1x',
      sessionChoiceRight: '2x',
      feature_1: '$99 Activation + 3 Month Commitment',
      feature_2: 'Monthly Assesment + Bi-Weekly Measurements',
      feature_3: 'In-person Only',
    },
    {
      title: 'PRO',
      type: 'Most Popular',
      applyGradient: 'orangeGradient',
      prices: [
        ['$249/mo', '$1399'],
        ['$349/mo', '$1999'],
        ['$599/mo', '$3299'],
      ],
      para1: 'Looking to take your fitness lifestyle to the next level? ',
      para2: 'Enhance your fitness routine from the gym to the kitchen.',
      workout_protocol: '55 min Sessions + Workouts In-App',
      nutrition_protocol: 'Itemized Meal Plan',
      sessions: 'Sessions per Week:',
      sessionChoiceLeft: '1x',
      sessionChoiceCenter: '2x',
      sessionChoiceRight: '3x',
      feature_1: '$99 Activation + 3 Month Commitment',
      feature_2: 'Monthly Assesment + Bi-Weekly Measurements',
      feature_3: 'Availble Online- $149/mo',
    },

    {
      title: 'APEX',
      type: 'Best Deal',
      applyGradient: 'purpleGradient',
      prices: [
        ['$399/mo', '$2250'],
        ['$499/mo', '$2999'],
        ['$720/mo', '$3999'],
      ],
      para1: 'An Intense Reesults-Driven Program',
      para2: 'Get into the best shape of your life',
      workout_protocol: '55 min Sessions + Workouts In-App',
      nutrition_protocol: 'Itemized Meal Plan',
      sessions: 'Sessions per Week: ',
      sessionChoiceLeft: '1x',
      sessionChoiceCenter: '2x',
      sessionChoiceRight: '3x',
      feature_1: '$99 Activation + 3 Month Commitment',
      feature_2: 'Monthly Assesment + Bi-Weekly Measurements',
      feature_3: 'Availble Online - $249/mo',
    },

    {
      title: 'NUTRITION',
      applyGradient: 'redGradient',
      prices: [
        ['$75/mo', '$449'],
        ['$149/mo', '$849'],
      ],
      para1: 'Diet is temporary lifestyle is forever.',
      para2: ' Sustainable nutritonal guidance for a healthier life.',
      workout_protocol: 'Pre-made Workouts In-App',
      nutrition_protocol: 'Calorie Tracking wih Trainerize',
      sessions: 'Program Style',
      sessionChoiceLeft: 'Macros Only',
      sessionChoiceRight: 'Meal Plan',
      feature_1: '$49 Initiation Fee + 16 week Commitment',
      feature_2: 'Monthly Assesment + Bi-Weekly Measurements',
      feature_3: 'Online Only',
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
