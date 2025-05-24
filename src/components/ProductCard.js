import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <Link className="product-card-text" to={`/replicant/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>{product.description}</p>
      <p className="price">{product.price.toLocaleString()} ₡</p>
      <button onClick={() => addToCart(product)}>Buy</button>
    </div>
  );
};

export default ProductCard;
