// src/components/Navbar.js

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false); // State for dropdown menu

  const dropdownRef = useRef(null);

  const handleClick = () => setClick((prev) => !prev);

  const closeMobileMenu = () => {
    setClick(false);
    closeDropdown();
  };

  const showButton = useCallback(() => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
      setClick(false); // Ensure menu is closed when resizing to desktop
    }
  }, []);

  const handleDropdown = () => setDropdown((prev) => !prev);

  const closeDropdown = () => setDropdown(false);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    // Initial check
    showButton();

    // Add resize event listener with debounce
    const debounceResize = () => {
      // Debounce logic can be added here if necessary
      showButton();
    };

    window.addEventListener("resize", debounceResize);

    // Add click event listener for closing dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", debounceResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showButton, handleClickOutside]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
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
        <div
          className="menu-icon"
          onClick={handleClick}
          aria-label="Menu Toggle"
          aria-expanded={click}
        >
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={`nav-menu ${click ? "active" : ""}`}>
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
          <li className="nav-item dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="nav-links dropdown-toggle"
              aria-haspopup="true"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={handleDropdown}
            >
              Listings <i className="fas fa-caret-down" />
            </button>
            <ul className={`dropdown-menu ${dropdown ? "active" : ""}`}>
              <li>
                <Link
                  to="/listings"
                  className="dropdown-link"
                  onClick={() => {
                    closeMobileMenu();
                    closeDropdown();
                  }}
                >
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  to="/rentals"
                  className="dropdown-link"
                  onClick={() => {
                    closeMobileMenu();
                    closeDropdown();
                  }}
                >
                  Rent
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-links" onClick={closeMobileMenu}>
              Search
            </Link>
          </li>
          <li className="nav-item">
            {/* Changed Link to anchor tag for external URL */}
            <Link
              href="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
          </li>
        </ul>
        {button && (
          <Button
            className="nav-links-button"
            buttonStyle="btn--gradient-outline"
            buttonSize="btn--medium"
            href="https://squareup.com/appointments/book/g071068uw0fljq/L84SN4AG0R5YH/start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
