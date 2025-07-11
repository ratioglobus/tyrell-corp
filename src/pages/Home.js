// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import './style/Home.css';

const Home = ({ products, addToCart }) => {
  const [sortOption, setSortOption] = useState('newest');
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let sorted = [...products];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
  }, [products, sortOption]);

  return (
    <div>

      <div className="marquee-container">
        <div className="marquee">
          ⚠️ Warning: Nexus 7 Replicants are now available. Maximum efficiency, minimum deviation. For Earth use only. Violation of protocol will result in recall of the model ⚠️
        </div>
      </div>

      <h2 className="home-title">Replicants in stock</h2>

      <div className="sort-container">
        <span className="sort-label">Sort by:</span>
        <div className="sort-options">
          <button
            className={`sort-button ${sortOption === 'price-asc' ? 'active' : ''}`}
            onClick={() => setSortOption('price-asc')}
          >
            Price ↑
          </button>
          <button
            className={`sort-button ${sortOption === 'price-desc' ? 'active' : ''}`}
            onClick={() => setSortOption('price-desc')}
          >
            Price ↓
          </button>
          <button
            className={`sort-button ${sortOption === 'name-asc' ? 'active' : ''}`}
            onClick={() => setSortOption('name-asc')}
          >
            A → Z
          </button>
          <button
            className={`sort-button ${sortOption === 'name-desc' ? 'active' : ''}`}
            onClick={() => setSortOption('name-desc')}
          >
            Z → A
          </button>
        </div>
      </div>

      <ProductList products={sortedProducts} addToCart={addToCart} />
    </div>
  );
};

export default Home;
