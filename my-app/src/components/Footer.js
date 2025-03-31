//creating footer for some pages
//importing react icons
import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";


const Footer = () => {
    return (
      <footer className="footer-container">
        <div className="footer-top">
          {/* Contact Details */}
          <div className="footer-section">
            <p>
              <FaMapMarkerAlt className="icon" /> 18 Abbey Street, Ennis, Ireland.
            </p>
            <p>
              <FaEnvelope className="icon" /> <a href="mailto:info@jaycuisine.ie">info@jaycuisine.ie</a>
            </p>
            <p>
              <FaPhone className="icon" /> +353 (61) 762562
            </p>
          </div>
  
          {/* Useful Links */}
          <div className="footer-section">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="/Menu">Menu</a></li>
              <li><a href="/Reservation">Reservations</a></li>
              <li><a href="/About">About</a></li>
            </ul>
          </div>
  
          {/* Opening Hours */}
          <div className="footer-section">
            <h3>Opening Hours</h3>
            <p><strong>Monday - Friday:</strong> 4pm - 10pm</p>
            <p><strong>Saturday:</strong> 1pm - 10pm</p>
            <p><strong>Sunday:</strong> 1pm - 9pm</p>
            <p><strong>Bank Holidays:</strong>Closed</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;