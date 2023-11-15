import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="triangles-container">
        <div className="black-triangle"></div>
        <div className="white-triangle"></div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5"> <FontAwesomeIcon icon={faEnvelope}/> Email</h2>
            <p className="lead">example@example.com</p>
          </div>
        </div>
        <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5"> <FontAwesomeIcon icon={faPhone}/> Phone</h2>
            <p className="lead">123-456-7890</p>
          </div>
        </div>
      </div>
      <div className="get-in-touch">
        <div className="get-in">Get in</div>
        <div className="touch">touch</div>
      </div>
      <div className="discover-more">
        <div className="discover">Discover</div>
        <div className="more">more</div>
      </div>
    </div>
  );
};

export default ContactUs;