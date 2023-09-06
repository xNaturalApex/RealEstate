import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Plans from './components/pages/Plans';
import About from './components/pages/About';
import Book from './components/pages/Book';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/plans'
            element={<Plans />}
          />
          <Route
            path='/book'
            element={<Book />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
