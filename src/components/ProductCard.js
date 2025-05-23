// src/components/ProductCard.js

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">{product.price} ₡</p>
      <button onClick={() => addToCart(product)}>Buy</button>
    </div>
  );
};

export default ProductCard;
