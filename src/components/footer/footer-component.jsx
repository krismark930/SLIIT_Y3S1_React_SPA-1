import React from "react";
import "./footer-styles.scss";
const Footer = (p) => {
  return (
    <div>
      <footer class="footer">
        <div class="container bottom_border"></div>

        <div class="container">
          <ul class="foote_bottom_ul_amrc">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#m">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>

            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>

          <p class="text-center">
            Copyright @2020 | Designed With by <a href="#">SLIIT AF GRP</a>
          </p>

          <ul class="social_footer_ul">
            <li>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
