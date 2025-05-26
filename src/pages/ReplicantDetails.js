// src/pages/ReplicantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style/ReplicantDetails.css';  // Подключаем стили

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

  if (loading) return <p className="loading">Loading replicant details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!replicant) return <p className="no-data">No replicant found.</p>;

  return (
    <div className="replicant-details-container">
      <h1>{replicant.name}</h1>
      <img src={replicant.image} alt={replicant.name} className="replicant-image" />
      <p><strong>Description:</strong> {replicant.description}</p>
      <p><strong>Price:</strong> {replicant.price.toLocaleString()} ₡</p>

      {/* Можно добавить дополнительные характеристики */}

      <Link to="/" className="back-link">← Back to list</Link>
    </div>
  );
};

export default ReplicantDetails;
