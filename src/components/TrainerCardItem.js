import React from 'react';
import './TrainerCard.css';
import { Button } from './Button';
import './Button.css';

const TrainerCardItem = (props) => {
  const { objProp } = props;
  const {
    role,
    name,
    position,
    description,
    qualification1,
    qualification2,
    qualification3,
    qualification4,
    qualification5,
    cpr,
    headshot,
    applyGradient,
  } = objProp;
  return (
    <div className='trainer__card__item'>
      <div className={`trainer__card__item--title ${applyGradient}`}>
        <h2>{role}</h2>
      </div>
      <div className='trainer__card__item--image'>
        <img
          src={headshot}
          alt={name}
        />
      </div>
      <div className='trainer__card__item--pricing'>
        <h2>
          {name}
          <i>{position}</i>
        </h2>
        <p>{description}</p>
      </div>
      <div className='trainer__card__item--btn-container'>
        <Button
          className='trainer__card__item--btn'
          buttonSize='btn--large, btn--medium'
          buttonStyle='btn--outline-dark'
          href='https://squareup.com/appointments/book/xzrl5nmb5yjqcc/LM8RSZVXGX44K/start'
        >
          Book
        </Button>
        <ul>
          <li>
            {' '}
            <i
              className='fa-solid fa-check'
              k
              style={{ color: 'green' }}
            />
            {qualification1}
          </li>
          <li>
            {' '}
            <i
              className='fa-classic fa-check'
              style={{ color: 'green' }}
            />
            {qualification2}
          </li>
          <li>
            {' '}
            <i
              className='fa-classic fa-check'
              style={{ color: 'green' }}
            />
            {qualification3}
          </li>
          <li>
            {' '}
            <i
              className='fa-classic fa-check'
              style={{ color: 'green' }}
            />
            {qualification4}
          </li>
          <li>
            {' '}
            <i
              className='fa-classic fa-check'
              style={{ color: 'green' }}
            />
            {qualification5}
          </li>
          <li>
            {' '}
            <i
              className='fa-classic fa-check'
              style={{ color: 'green' }}
            />
            {cpr}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrainerCardItem;
