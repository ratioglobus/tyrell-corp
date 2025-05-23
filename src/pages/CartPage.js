// src/pages/CartPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Shopping cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id} style={styles.item}>
                {item.name} — {item.price} ₡ × {item.quantity}
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  −
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {total} ₡</h3>
          <button
            onClick={() => navigate('/order')}
            style={styles.orderButton}
          >
            Place an order
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
  },
  item: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  removeButton: {
    marginLeft: '10px',
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  orderButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  }
};

export default CartPage;
