// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
  return (
    <header style={styles.header}>
      <h1>
        <Link to="/" style={styles.logo}>Tyrell Corporation</Link>
      </h1>
      <nav>
        <Link to="/" style={styles.navItem}>Catalog</Link>
        <Link to="/cart" style={styles.navItem}>
          🛒 Shopping cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: '#111',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: '#0ff',
    textDecoration: 'none'
  },
  navItem: {
    marginLeft: '20px',
    color: '#fff',
    textDecoration: 'none'
  }
};

export default Header;
