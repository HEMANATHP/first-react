import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>ADDINA</h2>
          <p>
            Premium furniture crafted with comfort, elegance, and quality in
            mind.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/shop")}>Shop</li>
            <li onClick={() => navigate("/wishlist")}>Wishlist</li>
            <li onClick={() => navigate("/cart")}>Cart</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li onClick={() => navigate("/contact")}>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <i className="fa-solid fa-phone"></i> +91 7708463548
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> support@addina.com
          </p>
          <div className="social-icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin-in"></i>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ADDINA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
