import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h1 className='footer-heading'>Get in Contact with an Agent Today!</h1>
        <div className='form-container'>
          <form
            name="contact-agent"
            method="POST"
            data-netlify="true"
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact-agent" />
            <input type="text" name="name" placeholder="Your Name" required className='footer-input' />
            <input type="email" name="email" placeholder="Your Email" required className='footer-input' />
            <input type="tel" name="phone" placeholder="Your Phone" required className='footer-input' />
            <select name="contact-method" className='footer-input'>
              <option value="" disabled selected>Preferred Contact Method</option>
              <option value="E-mail">E-mail</option>
              <option value="Text">Text Message</option>
              <option value="Whatsapp">WhatsApp Messenger</option>
            </select>
            <button type="submit" className='footer-button'>Submit</button>
          </form>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <a href='/' className='social-logo'>
              Belive in Realty
              <i className='fa-solid fa-explosion' />
            </a>
          </div>
          <small className='website-rights'>Felipe Franco © 2024</small>
          <div className='social-icons'>
            <a className='social-icon-link' href='/' target='_blank' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </a>
            <a className='social-icon-link' href='/' target='_blank' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </a>
            <a className='social-icon-link' href='/' target='_blank' aria-label='Youtube'>
              <i className='fab fa-youtube' />
            </a>
            <a className='social-icon-link' href='/' target='_blank' aria-label='Twitter'>
              <i className='fab fa-x-twitter' />
            </a>
            <a className='social-icon-link' href='/' target='_blank' aria-label='LinkedIn'>
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
      <small className='footer-banner'>
        "I can do all things through Christ who gives me strength" Philippians 4:13
      </small>
    </div>
  );
}

export default Footer;
