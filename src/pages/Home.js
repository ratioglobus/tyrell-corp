// src/pages/Home.js

import React from 'react';
import ProductList from '../components/ProductList';
import products from '../data/products';

const Home = ({ addToCart }) => {
  return (
    <div>
      <h2 style={styles.title}>Replicants in stock</h2>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    marginTop: '20px'
  }
};

export default Home;
