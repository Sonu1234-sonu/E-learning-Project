import React from "react";
import "./footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="footer-containt">
        <p>
          &copy;2026 Your E-learning Platform.All right reserved. <br />
          Made By ❤️ <a href="">Sonu Lovewanshi</a>
        </p>
        <div className="social-links">
          <a href="">
            <FaFacebookSquare />
          </a>
          <a href="">
            <FaInstagramSquare />
          </a>
          <a href="">
            <FaGithub />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
