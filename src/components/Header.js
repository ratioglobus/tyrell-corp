// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ cartCount }) => {
  return (
    <header>
      <Link to="/" className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Tyrell Corporation</h1>
      </Link>
      <nav>
        <Link to="/">Catalog</Link>
        <Link to="/cart">
          🛒 Shopping cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
