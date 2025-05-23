// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Replicants Store. All rights reserved.</p>
      <p style={styles.credit}>More human than human 🛸</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#111',
    color: '#ccc',
    textAlign: 'center'
  },
  credit: {
    fontSize: '0.9em',
    opacity: 0.7
  }
};

export default Footer;
