// src/pages/ReplicantDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style/ReplicantDetails.css';

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

  // Формируем полный URL к картинке:
  const imageSrc = replicant.image
    ? replicant.image.startsWith('http')
      ? replicant.image
      : `https://tyrell-backend.onrender.com${replicant.image}`
    : 'https://i.pinimg.com/736x/77/a9/c1/77a9c146b15100efec364329df97ce27.jpg';

  return (
    <div className="replicant-details-container">
      <h1>{replicant.name}</h1>
      <img src={imageSrc} alt={replicant.name} className="replicant-image" />
      <p><strong>Description:</strong> {replicant.description}</p>
      <p><strong>Price:</strong> {replicant.price.toLocaleString()} ₡</p>
      <Link to="/" className="back-link">← Back to list</Link>
    </div>
  );
};

export default ReplicantDetails;
