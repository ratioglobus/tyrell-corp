// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './style/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <Link className="product-card-text" to={`/replicant/${product.id}`}>
        <img className="product-image" src={product.image} alt={product.name} />
        <h3 className="product-title">{product.name}</h3>
      </Link>

      <p className="product-description">{product.description}</p>
      <p className="price">{product.price.toLocaleString()} ₡</p>

      <button className="buy-button" onClick={() => addToCart(product)}>Buy</button>
    </div>
  );
};

export default ProductCard;
