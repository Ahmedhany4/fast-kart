import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandsIcons from '@fortawesome/free-brands-svg-icons';
import Logo from './Logo';
import './css/footer.css';

function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className='row'>
          <div className='col-8'>
            <Logo />
            <p className='w-25 mt-3 text-muted'>
              We are a friendly bar serving a variety of cocktails, wines and beers. Our bar is a perfect place for a couple.
            </p>
          </div>
          <div className='col-4 contact'>
            <h3>Contact Us</h3>
            <div className='text-muted'>
              <p><FontAwesomeIcon icon={solidIcons.faPhone} /> Phone Number</p>
              <p>+201125500181</p>
            </div>
            <div className='text-muted'>
              <p><FontAwesomeIcon icon={solidIcons.faEnvelope} /> Phone Number</p>
              <p>ahmed9103hany@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className='copy-right'>
        <p> 
          {/* Display the current year */}
          Copyright {' '}<FontAwesomeIcon icon={regularIcons.faCopyright} />{`${currentYear}` }  
          <span> Eng.Ahmed Hany</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
