// src/components/Header.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import logo from '../assets/logo.png';

const Header = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <Link to="/" className="logo-section" onClick={closeMenu}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Tyrell Corporation</h1>
      </Link>

      <div className="right-actions">
        <Link className="cart-link" to="/info" onClick={closeMenu}>Ask Replicant</Link>
        <Link className="cart-link" to="/cart" onClick={closeMenu}>
          🛒Cart ({cartCount})
        </Link>

        <div className="menu-wrapper" ref={dropdownRef}>
          <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
            ☰ More
          </button>
          {menuOpen && (
            <div className="dropdown">
              <Link to="/technologies" onClick={closeMenu}>Technologies</Link>
              <Link to="/builder" onClick={closeMenu}>Constructor</Link>
              <Link to="/" onClick={closeMenu}>Catalog</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
