import React, { useState } from 'react';
import './Footer.css';
import axios from 'axios';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/.netlify/functions/submitForm',
        formData
      );
      if (response.status === 200) {
        setSubmissionMessage('Form submitted successfully!');
      } else {
        setSubmissionMessage('Form submission failed. Please try again.');
      }
    } catch (error) {
      setSubmissionMessage(
        'There was an error processing your request. Please try again later.'
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the APEX newsletter to receive our best deals on Training and
          Nutritional Coaching!
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time. Or you can just keep getting our
          kickass deals.
        </p>
        <div className='input-areas'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type='submit'>Subscribe</button>
          </form>
          <div className='submission-message'>{submissionMessage}</div>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <a
              href='/'
              className='social-logo'
            >
              Natural Apex LLC
            </a>
          </div>
          <small className='website-rights'>© 2023</small>
          <div className='social-icons'>
            <a
              className='social-icon-link'
              href='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a
              className='social-icon-link'
              href='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>
            <a
              className='social-icon-link'
              href='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </a>
            <a
              className='social-icon-link'
              href='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </a>
            <a
              className='social-icon-link'
              href='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
