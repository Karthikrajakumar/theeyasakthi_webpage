import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import theeyasakthi_logo from "../assets/theeyasakthi_logo.png";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Check if any category route is active
  const isCategoryActive = () => {
    return ['/videos', '/songs', '/podcasts'].includes(location.pathname);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand">
          <Link to="/" className="logo-link">
            <img
              src={theeyasakthi_logo}
              alt="Theeyasakthi Logo"
              title="Theeyasakthi"
              className="logo"
            />
          </Link>
          <Link to="/" className="title-link">
            TheeyasakthiTN
          </Link>
        </div>

        {/* Desktop Nav (UNCHANGED) */}
        <ul className="desktop-nav">
          <li>
            <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/about">About Us</NavLink>
          </li>

         

          <li>
            <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/blog">Blogs</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/posts">Post</NavLink>
          </li>
           {/* Desktop Categories dropdown stays exactly the same */}
          <li className="dropdown">
            <button className={`nav-btn dropdown-btn ${isCategoryActive() ? "active" : ""}`}> <span style={{fontWeight:"700"}}>Categories  ▼</span></button>
            <ul className="dropdown-menu">
              <li><NavLink className={({ isActive }) => `dropdown-link ${isActive ? "active" : ""}`} to="/videos">Videos</NavLink></li>
              <li><NavLink className={({ isActive }) => `dropdown-link ${isActive ? "active" : ""}`} to="/songs">Songs</NavLink></li>
              <li><NavLink className={({ isActive }) => `dropdown-link ${isActive ? "active" : ""}`} to="/podcasts">Podcasts</NavLink></li>
            </ul>
          </li>
        </ul>



        {/* Mobile Menu Toggle */}
        <button
          ref={toggleRef}
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE NAV (UPDATED ORDER, NO CATEGORIES) ================= */}
      <ul ref={menuRef} className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/videos" onClick={() => setMenuOpen(false)}>
            Videos
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/songs" onClick={() => setMenuOpen(false)}>
            Songs
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/podcasts" onClick={() => setMenuOpen(false)}>
            Podcasts
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/blog" onClick={() => setMenuOpen(false)}>
            Blogs
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} to="/posts" onClick={() => setMenuOpen(false)}>
            Posts
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
