// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import OrderPage from './pages/OrderPage';
import Info from './pages/Info';
import Technologies from './pages/Technologies';
import ReplicantBuilder from './pages/ReplicantBuilder';
import ReplicantDetails from './pages/ReplicantDetails';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Функция загрузки продуктов с сервера
  const fetchProducts = async () => {
    try {
      const res = await fetch('https://tyrell-backend.onrender.com/api/replicants');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const fixedData = data.map(item => ({
        ...item,
        id: item._id,
      }));
      setProducts(fixedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => setCart([]);

  // Добавление нового репликанта с обновлением списка из сервера
  const addCustomProduct = async (newProduct) => {
    try {
      const response = await fetch('https://tyrell-backend.onrender.com/api/replicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Ошибка при добавлении репликанта');

      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Ошибка при добавлении репликанта');
    }
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div style={styles.appWrapper}>
        <Header cartCount={getCartCount()} />
        <main style={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  addToCart={addToCart}
                />
              }
            />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/order" element={<OrderPage clearCart={clearCart} />} />
            <Route path="/info" element={<Info />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/replicant/:id" element={<ReplicantDetails />} />
            <Route
              path="/builder"
              element={<ReplicantBuilder onCreateReplicant={addCustomProduct} />}
            />
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
    minHeight: '100vh',
  },
  main: {
    flex: 1,
  },
};

export default App;
