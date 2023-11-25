import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="text-container-contact">
        <h1>Get in Touch</h1>
        <p style={{marginTop:'30px'}}>
          Discover more ...
          Get ready to make the difference in the organization.
        </p>
        <div className="contact-info" style={{marginTop:'40px'}}>
          <p>
            <FontAwesomeIcon icon={faBuilding} /> Athens, Tauros, Omirou 9
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> mycrm.hua@gmail.com
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +30 123-456-7890
          </p>
        </div>
        
      </div>
      <div className="image-container">
        <img src="/contact.png" alt="Contact" />
      </div>
    </div>
  );
};

export default ContactUs;