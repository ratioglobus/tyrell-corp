// src/pages/OrderPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPage = ({ clearCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setShowModal(true); // показать модалку
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Placing an order</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
          placeholder="Введите имя"
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          placeholder="Введите email"
        />

        <button type="submit" style={styles.button}>
          Order
        </button>
      </form>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Thank you for your order, {name}!</h3>
            <p>You will be contacted at the specified email: {email}</p>
            <button onClick={handleCloseModal} style={styles.closeButton}>
              Main page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#111',
    color: '#ff8000',
    borderRadius: '12px',
    boxShadow: '0 0 3px rgba(255, 128, 0)',
    fontFamily: 'Orbitron, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ff8000',
    backgroundColor: '#000',
    color: '#ff8000',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '14px',
  },
  button: {
    fontFamily: 'Orbitron, sans-serif',
    padding: '12px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#111',
    color: '#ff8000',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '400px',
    boxShadow: '0 0 6px #ff8000',
    animation: 'fadeIn 0.3s ease-out',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff8000',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default OrderPage;
