import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Hide the sign up button on the navbar when the screen size is less than 960px
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

  // Run showButton function when the window is resized
  window.addEventListener("resize", showButton);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            src={"images/BIR-logo-simple.png"}
            alt="BIR Logo"
            className="navbar-logo-img"
          />
          <div className="navbar-text">
            <span>Felipe M Franco</span>
            <span className="navbar-subtext">Be Live In Realty</span>
          </div>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About Me
            </Link>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-links" onClick={handleClick}>
              Listings
              <i className="fas fa-caret-down" />
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/residential-sales"
                  className="dropdown-link"
                  onClick={closeMobileMenu}
                >
                  Residential Sales
                </Link>
              </li>
              <li>
                <Link
                  to="/leasing"
                  className="dropdown-link"
                  onClick={closeMobileMenu}
                >
                  Leasing
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              to="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Book an Assessment
            </Link>
          </li>
        </ul>
        {button && (
          <Button
            className="nav-links-mobile"
            buttonStyle="btn--gradient-outline"
            buttonSize="btn--medium"
            link="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
          >
            Contact
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
