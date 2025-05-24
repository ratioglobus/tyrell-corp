// src/components/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <Link to="/" className="logo-section" onClick={closeMenu}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Tyrell Corporation</h1>
      </Link>

      <button className="burger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link className="cart-link" to="/info" onClick={closeMenu}>Info</Link>
        <Link className="cart-link" to="/technologies" onClick={closeMenu}>Technologies</Link>
        <Link className="cart-link" to="/builder" onClick={closeMenu}>Constructor</Link>
        <Link className="cart-link" to="/" onClick={closeMenu}>Catalog</Link>
        <Link className="cart-link" to="/cart" onClick={closeMenu}>
          🛒 ({cartCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
