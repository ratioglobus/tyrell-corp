import React from 'react';
import ProductCard from './ProductCard';
import './style/ProductList.css'; // Подключим стили

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;