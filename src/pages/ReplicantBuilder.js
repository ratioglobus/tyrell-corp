// src/pages/ReplicantBuilder.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReplicantBuilder = ({ onCreateReplicant }) => {
  const [form, setForm] = useState({
    gender: 'neutral',
    strength: 5,
    intelligence: 5,
    emotion: 'controlled',
  });

  const navigate = useNavigate();

  const calculatePrice = ({ strength, intelligence, emotion }) => {
    let price = 5000;
    price += (strength - 1) * 1000;
    price += (intelligence - 1) * 1000;

    switch (emotion) {
      case 'adaptive':
        price += 2000;
        break;
      case 'wild':
        price += 5000;
        break;
      default:
        break;
    }

    return price;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    const newReplicant = {
      name: `Custom replicant`,
      description: `Number: ${Date.now()}, Strength: ${form.strength}/10, Intelligence: ${form.intelligence}/10, Emotion: ${form.emotion}`,
      price: calculatePrice(form),
      image: "https://i.pinimg.com/736x/77/a9/c1/77a9c146b15100efec364329df97ce27.jpg"
    };

    try {
      await onCreateReplicant(newReplicant);
      navigate('/');
    } catch (err) {
      alert('Не удалось создать репликанта');
      console.error(err);
    }
  };

  const price = calculatePrice(form);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Replicant Constructor</h1>

      <form style={styles.form}>
        <label>
          Gender:
          <select name="gender" value={form.gender} onChange={handleChange} style={styles.select}>
            <option value="neutral">Neutral</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>

        <label>
          Strength: {form.strength}
          <input
            type="range"
            name="strength"
            min="1"
            max="10"
            value={form.strength}
            onChange={handleChange}
            style={styles.range}
          />
        </label>

        <label>
          Intelligence: {form.intelligence}
          <input
            type="range"
            name="intelligence"
            min="1"
            max="10"
            value={form.intelligence}
            onChange={handleChange}
            style={styles.range}
          />
        </label>

        <label>
          Emotional Profile:
          <select name="emotion" value={form.emotion} onChange={handleChange} style={styles.select}>
            <option value="controlled">Controlled</option>
            <option value="adaptive">Adaptive</option>
            <option value="wild">Unpredictable</option>
          </select>
        </label>
      </form>

      <div style={styles.preview}>
        <h2>Genetic Blueprint</h2>
        <p><strong>Gender:</strong> {form.gender}</p>
        <p><strong>Strength:</strong> {form.strength}/10</p>
        <p><strong>Intelligence:</strong> {form.intelligence}/10</p>
        <p><strong>Emotion:</strong> {form.emotion}</p>
        <p><strong>Price:</strong> {price.toLocaleString()} ₡</p>
        <button style={styles.button} onClick={handleCreate}>Create Replicant</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'Orbitron, sans-serif',
    color: '#e0e0e0',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#ff8000',
    textAlign: 'center',
  },
  form: {
    display: 'grid',
    gap: '20px',
    background: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,128,0,0.2)',
  },
  preview: {
    marginTop: '30px',
    padding: '20px',
    background: '#111',
    borderRadius: '10px',
    border: '1px solid #333',
    textAlign: 'center',
  },
  select: {
    backgroundColor: '#222',
    color: '#e0e0e0',
    border: '1px solid #444',
    borderRadius: '6px',
    padding: '8px 10px',
    fontFamily: 'Orbitron, sans-serif',
    fontSize: '1rem',
    appearance: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  range: {
    width: '100%',
    cursor: 'pointer',
    accentColor: '#ff8000',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff8000',
    border: 'none',
    borderRadius: '6px',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ReplicantBuilder;
