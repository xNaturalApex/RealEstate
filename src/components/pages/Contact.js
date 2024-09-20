import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Cards from '../Cards'

function Contact() {
  return (
    <>
      <div className='container-1200'>
        <Cards />
      </div>

      <Cards/>
      <Footer/>
    </>
  );
}

export default Contact;
