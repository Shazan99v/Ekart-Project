import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import "../styles/footer.css";
import "../styles/global.css"

export default function Footer() {
  return (
    <footer className="footer">

      {/* Glow Effect */}
      <div className="footer-glow"></div>

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">
          <h2>MyShop</h2>
          <p>
            Premium tech products built
            for modern creators and gamers.
          </p>
        </div>


        {/* LINKS */}

        <div className="footer-links">

          <div>
            <h4>Quick Links</h4>

            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/profile">Profile</a>
          </div>

          <div>
            <h4>Support</h4>

            <a href="/help">Help Center</a>
            <a href="/shipping">Shipping</a>
            <a href="/returns">Returns</a>
            <a href="/contact">Contact</a>
          </div>

        </div>


        {/* SOCIAL */}

        <div className="footer-social">

          <h4>Follow Us</h4>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>
        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MyShop.
          All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}
