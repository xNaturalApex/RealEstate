import React from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--outline-dark'];

const SIZES = ['btn--medium', 'btn--large'];

export function Button({ children, type, onClick, buttonStyle, buttonSize }) {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <a
      href='https://squareup.com/appointments/book/xzrl5nmb5yjqcc/LM8RSZVXGX44K/start'
      className='btn-mobile'
    >
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </a>
  );
}
