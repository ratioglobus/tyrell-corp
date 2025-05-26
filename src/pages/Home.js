// src/pages/Home.js

import React from 'react';
import ProductList from '../components/ProductList';
import './style/Home.css'; // Подключаем стили из отдельной папки

const Home = ({ products, addToCart }) => {
  return (
    <div>
      <h2 className="home-title">Replicants in stock</h2>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Home;
