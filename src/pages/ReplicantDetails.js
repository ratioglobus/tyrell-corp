// src/pages/ReplicantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ReplicantDetails = () => {
  const { id } = useParams();
  const [replicant, setReplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://tyrell-backend.onrender.com/api/replicants/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch replicant details');
        return res.json();
      })
      .then(data => {
        setReplicant(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading replicant details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!replicant) return <p>No replicant found.</p>;

  return (
    <div style={styles.container}>
      <h1>{replicant.name}</h1>
      <img src={replicant.image} alt={replicant.name} style={styles.image} />
      <p><strong>Description:</strong> {replicant.description}</p>
      <p><strong>Price:</strong> {replicant.price.toLocaleString()} ₡</p>

      {/* Здесь можно добавить больше расширенных характеристик, если они появятся */}

      <Link to="/" style={styles.backLink}>← Back to list</Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Orbitron, sans-serif',
    color: '#e0e0e0',
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(255,128,0,0.4)',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#ff8000',
    textDecoration: 'none',
  },
};

export default ReplicantDetails;
