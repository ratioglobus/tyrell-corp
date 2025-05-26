// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './style/ProductCard.css';

const DEFAULT_IMAGE =
  'https://i.pinimg.com/736x/77/a9/c1/77a9c146b15100efec364329df97ce27.jpg';

const ProductCard = ({ product, addToCart }) => {
  // Если product.image — относительный путь (начинается с '/'),
  // подставляем текущий хост и протокол, иначе оставляем как есть.
  const imageSrc = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `${window.location.origin}${product.image}`
    : DEFAULT_IMAGE;

  // Безопасно приводим цену к числу и форматируем
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
