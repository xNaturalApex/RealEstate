import React from 'react';
import './Footer.css';

function Footer() {
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
            <button
              className='footer-subscription'
              type='submit'
            >
              Subscribe
            </button>
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
