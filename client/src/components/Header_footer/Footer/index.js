import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';

const Footer = ({ data }) => {
  return (
    data.siteData ?
      <footer className="bck_b_dark pb-5">
        <Container>
          <Row>
            <Col className="logo">
              Waves
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <h2>Contact information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Address</div>
                    <div>{data.siteData[0].address}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Phone</div>
                    <div>{data.siteData[0].phone}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Working hours</div>
                    <div>{data.siteData[0].hours}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="icon"
                  />
                  <div className="nfo">
                    <div>Email</div>
                    <div>{data.siteData[0].email}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <h2>Be the first to know</h2>
              <div>
                Get all the latest information on events, sales and offers. You can miss out.
                </div>
              <div className="mt-2">
                <a className="mr-1 btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                <a className="mr-1 btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                <a className="mr-1 btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                <a className="mr-1 btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                <a className="mr-1 btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                <a className="mr-1 btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      : null
  );
};

export default Footer;