import React from 'react';
import './PriceCard.css';
import TrainerCardItem from './TrainerCardItem';
import './Button.css';

const TrainerCardsInfo = [
  {
    role: 'Master Trainer', // this is the title in the garadient box
    name: 'Felipe Franco', // this is the name of the trainer
    position: 'Founder', // this is the position of the trainer it will be italicized and under the name and darkened
    description: '', // this is the description of the trainer
    qualification1: 'Certified Personal Trainer - NASM', // this is the first qualification of the trainer
    qualification2: 'Group Fitness Instructor', // this is the second qualification of the trainer
    qualification3: 'Behavior Change Specialist', // this is the third qualification of the trainer
    qualification4: 'Corrective Exercise Specialist', // this is the fourth qualification of the trainer can be left blank
    qualification5: 'AED/CPR Certified', // this is the fifth qualification of the trainer can be left blank
    qualification6: '', // this is the sixth qualification of the trainer can be left blank
    headshot: 'images/felipe.jpg', // this is the headshot of the trainer
    applyGradient: 'orangeGradient', // this is the gradient color of the title box
  },

  {
    role: 'Nutriton Coach', // this is the title in the garadient box
    name: 'Felipe Franco', // this is the name of the trainer
    position: 'Founder', // this is the position of the trainer it will be italicized and under the name and darkened
    description: '', // this is the description of the trainer
    qualification1: 'Certified Personal Trainer - NASM', // this is the first qualification of the trainer
    qualification2: 'Certified Group Fitness Instructor - NASM', // this is the second qualification of the trainer
    qualification3: 'Certified Nutrition Coach - NASM', // this is the third qualification of the trainer
    qualification4: 'Certified Behavior Change Specialist - NASM', // this is the fourth qualification of the trainer can be left blank
    qualification5: 'Certified Corrective Exercise Specialist - NASM', // this is the fifth qualification of the trainer can be left blank
    qualification6: 'AED/CPR Certified - Red Cross', // this is the sixth qualification of the trainer can be left blank
    headshot: 'images/felipe.jpg', // this is the headshot of the trainer
    applyGradient: 'purpleGradient', // this is the gradient color of the title box
  },
];

const PriceCard = () => {
  return (
    <div className='trainer__card__container'>
      {TrainerCardsInfo.map((singleCard) => {
        return (
          <TrainerCardItem
            objProp={singleCard}
            key={singleCard.title}
          />
        );
      })}
    </div>
  );
};

export default PriceCard;
