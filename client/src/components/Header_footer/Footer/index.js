import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass, faPhone, faClock, faEnvelope} from '@fortawesome/free-solid-svg-icons';

const Footer = (props) => {
  return (
      <footer className="bck_b_dark">
        <div className="container">
          <div className="logo">
            Waves
          </div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Address</div>
                    <div>123 River Ave, Silverdale, CA 95055</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Phone</div>
                    <div>555-555-5555</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Working hours</div>
                    <div>Mon - Fri/ 9am - 8pm</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Email</div>
                    <div>info@waves.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left">
              <h2>Be the first to know</h2>
              <div>
                <div>
                  Get all the latest information on events, sales and offers. You can miss out.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;