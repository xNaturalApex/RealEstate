import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Rentals from "./components/pages/Rentals";
import About from "./components/pages/About";
import ListingDetailPage from "./components/ListingDetailPage";
import RentalDetailPage from "./components/RentalDetailPage";
import Listings from "./components/pages/Listings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings/:listingNo" element={<ListingDetailPage />} /> {/* Fixed typo here */}
        <Route path="/rentals/:listingNo" element={<RentalDetailPage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/rentals" element={<Rentals />} />
      </Routes>
    </Router>
  );
}

export default App;
