// src/pages/OrderPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/OrderPage.css'; // Подключаем стили из отдельной папки

const OrderPage = ({ clearCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="order-wrapper">
      <h2 className="order-title">Placing an order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <label className="order-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="order-input"
          placeholder="Enter name"
        />

        <label className="order-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="order-input"
          placeholder="Enter email"
        />

        <button type="submit" className="order-button">
          Order
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thank you for your order, {name}!</h3>
            <p>You will be contacted at the specified email: {email}</p>
            <button onClick={handleCloseModal} className="close-button">
              Main page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
