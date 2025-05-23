// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <Link to="/" className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Tyrell Corporation</h1>
      </Link>
      <nav>
        <Link className="cart-link" to="/info">Info</Link>
        <Link className="cart-link" to="/technologies">Technologies</Link>
        <Link className="cart-link" to="/builder">Constructor</Link>
        <Link className="cart-link" to="/">Catalog</Link>
        <Link className="cart-link" to="/cart">
        🛒 ({cartCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
