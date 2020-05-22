import React from 'react'
import './footer-styles.scss'

const Footer = () => {
  return (
    <div>
      <footer class='footer'>
        <div class='container bottom_border'/>
        <div class='container'>
          <ul class='foote_bottom_ul_amrc'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='#m'>About</a>
            </li>
            <li>
              <a href='#'>Services</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
          <p class='text-center'>
            Copyright @2020 | Designed by SLIIT AF GROUP
          </p>
          <ul class='social_footer_ul'>
            <li>
              <a href='#'>
                <i class='fab fa-facebook-f'/>
              </a>
            </li>
            <li>
              <a href='#'>
                <i class='fab fa-twitter'/>
              </a>
            </li>
            <li>
              <a href='#'>
                <i class='fab fa-linkedin'/>
              </a>
            </li>
            <li>
              <a href='#'>
                <i class='fab fa-instagram'/>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
