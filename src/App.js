// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import OrderPage from './pages/OrderPage';
import Info from './pages/Info';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => setCart([]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div style={styles.appWrapper}>
        <Header cartCount={getCartCount()} />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/order" element={<OrderPage clearCart={clearCart} />} />
            <Route path="/info" element={<Info />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: 1
  }
};

export default App;
