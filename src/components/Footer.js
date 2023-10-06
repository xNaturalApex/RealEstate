import React from 'react';
import './Footer.css';
import { Button } from './Button'; // Fixed import path

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h1 className='footer-heading'>
          Get access to our Training App and a 14-day free trial!
        </h1>
        <div className='input-areas'>
          <form
            name='contact'
            method='POST'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            action='https://www.naturalapex.com/'
          >
            <input
              type='hidden'
              name='form-name'
              value='contact'
            />
            <input
              className='footer-input'
              type='text'
              name='name'
              placeholder='Name'
              required
            />
            <input
              className='footer-input'
              type='email'
              name='email'
              placeholder='Your Email'
              required
            />
            <Button
              type='submit'
              buttonStyle='btn--gradient-primary'
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <a
              href='/'
              className='social-logo'
            >
              Natural
              <i className='fa-solid fa-explosion' />
              Apex
            </a>
          </div>
          <small className='website-rights'>Natural Apex LLC © 2023</small>
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
              <i className='fab fa-x-twitter' />
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
      <small className='footer-banner'>
        "I can do all things through Christ who gives me strength" Philippians
        4:13
      </small>
    </div>
  );
}

export default Footer;
