import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import theeyasakthi_logo from "../assets/theeyasakthi_logo.png";

const Header = () => {
  const logoName = theeyasakthi_logo
    .split("/")
    .pop()
    .replace(/\..+$/, "");

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isCategoriesActive =
    location.pathname.startsWith("/songs") ||
    location.pathname.startsWith("/videos") ||
    location.pathname.startsWith("/podcasts");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="header-inner">

        {/* LOGO + TITLE */}
        <div className="brand">
          <Link to="/" className="logo-link">
            <img
              src={theeyasakthi_logo}
              alt={logoName}
              title={logoName}
              className="logo"
            />
          </Link>

          <Link to="/" className="title-link">
            theeyasakthi
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="nav-right">
          <ul>
            <li>
              <NavLink to="/" className="nav-btn" end>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="nav-btn">
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink to="/blog" className="nav-btn">
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink to="/posts" className="nav-btn">
                Posts
              </NavLink>
            </li>

            {/* Categories Dropdown */}
            <li className="dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-btn dropdown-btn ${
                  isCategoriesActive ? "active" : ""
                }`}
                onClick={() => setOpen((o) => !o)}
              >
                Categories ▾
              </button>

              <div
                className="dropdown-menu"
                style={{ display: open ? "block" : "none" }}
              >
                <NavLink
                  to="/songs"
                  className="dropdown-link"
                  onClick={() => setOpen(false)}
                >
                  <b>Songs</b>
                </NavLink>

                <NavLink
                  to="/videos"
                  className="dropdown-link"
                  onClick={() => setOpen(false)}
                >
                  <b>Videos</b>
                </NavLink>

                <NavLink
                  to="/podcasts"
                  className="dropdown-link"
                  onClick={() => setOpen(false)}
                >
                  <b>Podcasts</b>
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
