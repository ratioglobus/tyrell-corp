// src/components/ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard';
import './style/ProductList.css'; // Стили

const ProductList = ({ products, addToCart }) => {
  return (
    <>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
