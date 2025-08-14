import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Rentals from "./components/pages/Rentals";
import About from "./components/pages/About";
import ListingDetail from "./components/ListingDetail";
import RentalDetail from "./components/RentalDetail";
import Listings from "./components/pages/Listings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings/:listingNo" element={<ListingDetail />} />
          <Route path="/rentals/:listingNo" element={<RentalDetail />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
