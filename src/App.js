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

function App() {
  const [cart, setCart] = useState([]);

  const initialProducts = [
    {
      id: 1,
      name: "Roy Batty",
      model: "Nexus-6",
      description: "Combat replicant, may be the leader of the organization",
      price: 17000,
      image: "https://static.kinoafisha.info/k/movie_shots/1920x1080/upload/person/photos/8099219/e1d7b4b9d407d3e2c0bacebd8cbc4d9d.jpg"
    },
    {
      id: 2,
      name: "Rachael Tyrell",
      model: "Nexus-7",
      description: "A prototype with implanted memories",
      price: 18000,
      image: "https://i.pinimg.com/originals/d3/9d/ee/d39dee67228fd6ac55703a3a80a8f1b3.jpg"
    },
    {
      id: 3,
      name: "Zhora Salome",
      model: "Nexus-6",
      description: "Dancer. Can provide services of an intimate nature",
      price: 14000,
      image: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/0316cad8-5047-43ba-a7af-d564955aa33a/1920x"
    },
    {
      id: 4,
      name: "Leon Kowalski",
      model: "Nexus-6",
      description: "He has an A physical level, which means he has superhuman strength and endurance",
      price: 12000,
      image: "https://typesetinthefuture.com/wp-content/uploads/2016/06/bladerunner_0_06_34_leon_red_eye_full.jpg"
    },
    {
      id: 5,
      name: "Pris Stratton",
      model: "Nexus-6",
      description: "Is a basic pleasure model incepted on Valentine's Day, 2016",
      price: 14000,
      image: "https://www.episodi.fi/wp-content/uploads/2023/12/bladerunner-052pyxurz1.jpg"
    },
    {
      id: 6,
      name: "J.F. Sebastian",
      model: "Nexus-7",
      description: "Replicant engineer. Able to create genetic creatures. Special sample",
      price: 10000,
      image: "https://s3.us-west-1.wasabisys.com/cap-that.com/movies/blade-runner/images/bladerunner(finalcut)_1712.jpg"
    },
  ];
  
  const [products] = useState(initialProducts);

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

  const [customProducts, setCustomProducts] = useState(() => {
    const stored = localStorage.getItem('customReplicants');
    return stored ? JSON.parse(stored) : [];
  });

  const addCustomProduct = (newProduct) => {
    setCustomProducts(prev => [...prev, newProduct]);
  };

  useEffect(() => {
    localStorage.setItem('customReplicants', JSON.stringify(customProducts));
  }, [customProducts]);

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
                  products={[...products, ...customProducts]}
                  addToCart={addToCart}
                />
              }
            />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/order" element={<OrderPage clearCart={clearCart} />} />
            <Route path="/info" element={<Info />} /> 
            <Route path="/technologies" element={<Technologies />} />
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
    minHeight: '100vh'
  },
  main: {
    flex: 1
  }
};

export default App;
