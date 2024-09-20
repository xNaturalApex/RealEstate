// src/components/Navbar.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false); // State for dropdown menu

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    closeDropdown();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleDropdown = () => setDropdown(!dropdown);
  const closeDropdown = () => setDropdown(false);

  useEffect(() => {
    // Initial check
    showButton();

    // Add resize event listener
    window.addEventListener("resize", showButton);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          <img
            src={"images/BIR-Logo-simple.png"}
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
            <Link
              to="/"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              About Me
            </Link>
          </li>
          <li className="nav-item dropdown">
            <span
              className="nav-links"
              onClick={handleDropdown}
            >
              Listings
              <i className="fas fa-caret-down" />
            </span>
            {dropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/listings"
                    className="dropdown-link"
                    onClick={closeMobileMenu}
                  >
                    Residential Sales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rentals"
                    className="dropdown-link"
                    onClick={closeMobileMenu}
                  >
                    Leasing
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link
              to="/search"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Search
            </Link>
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
            className="nav-links-button"
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
