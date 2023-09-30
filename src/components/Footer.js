import React, { useState } from 'react';
import './Footer.css';
import { Button } from './Button';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <form
            name='subscription'
            method='POST'
            data-netlify='true'
            onSubmit={handleSubmit}
          >
            <input
              type='hidden'
              name='form-name'
              value='subscription'
            />

            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              buttonStyle='btn--outline'
              type='submit'
            >
              Subscribe
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
              <i
                className='fa-solid fa-explosion'
                style={{
                  background: 'linear-gradient(#9c47fc, #356ad2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              {'   '}Apex <sub>LLC</sub>
            </a>
          </div>
          <small className='website-rights'>Natural Apex LLC © 2023</small>
          <div className='social-icons'>
            <a
              className='social-icon-link facebook'
              href='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a
              className='social-icon-link instagram'
              href='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>
            <a
              className='social-icon-link youtube'
              href='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </a>
            <a
              className='social-icon-link twitter'
              href='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </a>
            <a
              className='social-icon-link twitter'
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
