// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './style/ProductCard.css';

const DEFAULT_IMAGE =
  'https://i.pinimg.com/736x/77/a9/c1/77a9c146b15100efec364329df97ce27.jpg';

// Укажи здесь адрес своего бэкенда
const BACKEND_URL = 'https://tyrell-backend.onrender.com';

const ProductCard = ({ product, addToCart }) => {
  // Формируем полный путь к картинке
  const imageSrc = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `${BACKEND_URL}${product.image}`
    : DEFAULT_IMAGE;

  const price =
    product.price != null && !isNaN(Number(product.price))
      ? Number(product.price).toLocaleString()
      : 'N/A';

  return (
    <div className="product-card">
      <Link className="product-card-text" to={`/replicant/${product.id}`}>
        <img
          className="product-image"
          src={imageSrc}
          alt={product.name || 'Replicant'}
        />
        <h3 className="product-title">{product.name || 'Unnamed Replicant'}</h3>
      </Link>

      <p className="product-description">
        {product.description || 'No description available'}
      </p>
      <p className="price">{price} ₡</p>

      <button className="buy-button" onClick={() => addToCart(product)}>
        Buy
      </button>
    </div>
  );
};

export default ProductCard;
