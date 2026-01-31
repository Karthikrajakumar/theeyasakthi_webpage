import React from "react";
import logo from "../assets/theeyasakthi_logo.png";


const Footer = ({ year = new Date().getFullYear() }) => {
  return (
    
    <footer>
      <div className="footer-inner">

        {/* ==== TOP ROW ==== */}
        <div className="footer-top">

          {/* LEFT — Logo + Brand */}
          <div className="footer-brand">
            <img src={logo} alt="Theeyasakthi logo" className="footer-logo" />
            <span className="footer-name">THEEYASAKTHITN</span>
          </div>

          {/* RIGHT — Social Section */}
          <div className="footer-social">
            <h5>Connect With Us</h5>

            <div className="social-icons">

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@theeyasakthitn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.7 2.5 12 2.5 12 2.5s-4.7 0-8.2.4c-.6.1-1.6.1-2.4 1-.7.7-.9 2.3-.9 2.3S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.7 1 2 .2 8.2.4 8.2.4s4.7 0 8.2-.4c.6-.1 1.6-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V7.7l6.4 3.6-6.4 3.6z"/>
                </svg>
              </a>

              {/* Instagram */}
             <a
  href="https://www.instagram.com/theeyasakthitn/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
>
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 2C4.243 2 2 4.243 2 7V17C2 19.757 4.243 22 7 22H17C19.757 22 22 19.757 22 17V7C22 4.243 19.757 2 17 2H7ZM7 4H17C18.654 4 20 5.346 20 7V17C20 18.654 18.654 20 17 20H7C5.346 20 4 18.654 4 17V7C4 5.346 5.346 4 7 4ZM17.5 6C17.224 6 17 6.224 17 6.5C17 6.776 17.224 7 17.5 7C17.776 7 18 6.776 18 6.5C18 6.224 17.776 6 17.5 6ZM12 7C9.243 7 7 9.243 7 12C7 14.757 9.243 17 12 17C14.757 17 17 14.757 17 12C17 9.243 14.757 7 12 7ZM12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9Z" />
  </svg>
</a>


              {/* Facebook */}
              <a
                href="https://www.facebook.com/theeyasakthitn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.8-3.9c1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H16l-.5 3h-2.5v7A10 10 0 0 0 22 12z"/>
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com/theeyasakthitn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter X"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 2H21l-7.4 8.5L22 22h-6.9l-5.4-7-6.2 7H1.2l7.9-9L2 2h7l4.9 6.3L17.6 2z"/>
                </svg>
              </a>

            </div>
          </div>
        </div>

        {/* ==== COPYRIGHT ==== */}
        <p className="footer-copy">
          © {year} திமுக தீயசக்தி — Independent Political Analysis
        </p>

      </div>
    </footer>

  );
};

export default Footer;
