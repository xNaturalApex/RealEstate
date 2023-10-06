import React from 'react';
import './Button.css';

const STYLES = [
  'btn--primary',
  'btn--outline',
  'btn--outline-dark',
  'btn--gradient-primary',
];

const SIZES = ['btn--medium', 'btn--large'];

export function Button({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  link,
}) {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <a
      href={link}
      className='btn-mobile'
    >
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        <span>{children}</span>
      </button>
    </a>
  );
}
