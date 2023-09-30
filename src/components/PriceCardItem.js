import React, { useState } from 'react';
import './PriceCard.css';
import './Button.css';

const PriceCardItem = (props) => {
  const { objProp, optionIndex } = props;
  const {
    title,
    applyGradient,
    type,
    prices,
    para1,
    para2,
    workout_protocol,
    nutrition_protocol,
    sessions,
    sessionChoiceLeft,
    sessionChoiceCenter,
    sessionChoiceRight,
    feature_1,
    feature_2,
    feature_3,
  } = objProp;

  const [priceIndex, setPriceIndex] = useState(0); // Maintain the state locally

  const selectedPriceList = prices[priceIndex] || [];
  const price = selectedPriceList[optionIndex] || '';

  const handlePriceIndexChange = (e) => {
    setPriceIndex(parseInt(e.target.value));
  };

  return (
    <div className='price__card__item'>
      <div className={`price__card__item--title ${applyGradient}`}>
        <h2>{title}</h2>
      </div>

      <div className='price__card__item--pricing'>
        <div>
          <h1>{price}</h1>
          <div>
            <h3>{type} </h3>
          </div>
          <h2>{para1}</h2>
          <p>{para2}</p>
        </div>
      </div>
      <div className='price__card__item--btn-container'>
        <button
          className='btn btn--outline-dark btn--medium'
          buttonSize='btn--large, btn--medium'
          buttonStyle='btn--outline-dark'
        >
          Get Started
        </button>
      </div>
      <div className='price__card__item--features'>
        <ul>
          <li>
            <b>Includes:</b>
          </li>
          <li>
            <i
              className='fa-solid fa-dumbbell'
              style={{ color: 'black' }}
            />
            {workout_protocol}
          </li>
          <li>
            <i
              className='fa-solid fa-bowl-rice'
              style={{ color: 'black' }}
            />
            {nutrition_protocol}
          </li>
          <li>
            <i
              className='fa-solid fa-stopwatch'
              style={{ color: 'black' }}
            />
            {sessions}
          </li>
          <li>
            <input
              className='price__card__item--slider-sessions'
              type='range'
              min={0}
              max={prices.length - 1}
              value={priceIndex}
              onChange={handlePriceIndexChange}
            />
          </li>
          <li
            className='price__card__item--slider-labels'
            style={{ justifyContent: 'space-between' }}
          >
            <p>{sessionChoiceLeft}</p>
            <p>{sessionChoiceCenter}</p>
            <p>{sessionChoiceRight}</p>
          </li>
          <li>
            <i
              className='fa-solid fa-check'
              style={{ color: 'green' }}
            />
            {feature_1}
          </li>
          <li>
            <i
              className='fa-solid fa-check'
              style={{ color: 'green' }}
            />
            {feature_2}
          </li>
          <li>
            <i
              className='fa-solid fa-check'
              style={{ color: 'green' }}
            />
            {feature_3}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PriceCardItem;
