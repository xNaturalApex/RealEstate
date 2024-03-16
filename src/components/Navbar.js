//A Navbar component that will be used to navigate between pages
//The Navbar component should be rendered in the App component
//The Navbar component should have a link to the Home page
//The Navbar component should have a link to the About page
//The Navbar component should have a link to the Contact page
//The Navbar component should have a link to the square booking site represented by the Book button

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  //this hides the sign up button on the navbar when the screen size is less than 960px
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  //this is a hook that runs the showButton function when the window is resized
  window.addEventListener('resize', showButton);

  //this is a hook that runs the showButton function when the page is loaded
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link
            to='/'
            className='navbar-logo'
            onClick={closeMobileMenu}
          >
            Nail
            <i className='fa-solid fa-explosion' />
            Me
          </Link>
          <div
            className='menu-icon'
            onClick={handleClick}
          >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Me
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/plans'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Plans
              </Link>
            </li>

            <li>
              <Link
                to='https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Book an Assesment
              </Link>
            </li>
          </ul>
          {button && (
            <Button
              className='nav-links-mobile'
              buttonStyle='btn--gradient-outline'
              buttonSize='btn--medium'
              link='https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start'
            >
              Book
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
