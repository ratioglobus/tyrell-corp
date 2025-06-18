// src/pages/CartPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/CartPage.css'; // Подключаем стили из CSS-файла

const CartPage = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Shopping cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                {item.name} — {item.price} ₡ × {item.quantity}
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {total} ₡</h3>
          <button
            onClick={() => navigate('/order')}
            className="order-button"
          >
            Place an order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
