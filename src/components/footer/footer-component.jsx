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
              <a href='#about_us'>About Us</a>
            </li>
            <li>
              <a href='#services'>Services</a>
            </li>
            <li>
              <a href='#blog'>Blog</a>
            </li>
            <li>
              <a href='#contact_us'>Contact Us</a>
            </li>
          </ul>
          <ul class='social_footer_ul'>
            <li>
              <a href='#facebook'>
                <i class='fab fa-facebook-f'/>
              </a>
            </li>
            <li>
              <a href='#twitter'>
                <i class='fab fa-twitter'/>
              </a>
            </li>
            <li>
              <a href='#linkedin'>
                <i class='fab fa-linkedin'/>
              </a>
            </li>
            <li>
              <a href='#instagram'>
                <i class='fab fa-instagram'/>
              </a>
            </li>
          </ul>
          <p className='text-center' style={{marginBottom: '-14px'}}>
            Copyright @2020 | Designed by SLIIT AF GROUP
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
