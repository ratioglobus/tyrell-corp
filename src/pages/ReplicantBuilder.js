import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/ReplicantBuilder.css';

const DEFAULT_IMAGE = "https://i.pinimg.com/736x/77/a9/c1/77a9c146b15100efec364329df97ce27.jpg";

const ReplicantBuilder = ({ onCreateReplicant }) => {
  const [form, setForm] = useState({
    gender: 'neutral',
    strength: 5,
    intelligence: 5,
    emotion: 'controlled',
    image: null,
  });

  const navigate = useNavigate();

  const calculatePrice = ({ strength, intelligence, emotion }) => {
    const str = Number(strength) || 5;
    const intel = Number(intelligence) || 5;
    const emo = emotion || 'controlled';

    let price = 5000;
    price += (str - 1) * 1000;
    price += (intel - 1) * 1000;

    switch (emo) {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', `Custom replicant`);
    formData.append(
      'description',
      `Number: ${Date.now()}, Strength: ${form.strength}/10, Intelligence: ${form.intelligence}/10, Emotion: ${form.emotion}`
    );
    formData.append('price', calculatePrice(form));
    formData.append('gender', form.gender);
    formData.append('strength', form.strength);
    formData.append('intelligence', form.intelligence);
    formData.append('emotion', form.emotion);

    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await onCreateReplicant(formData);
      navigate('/');
    } catch (err) {
      alert('Не удалось создать репликанта');
      console.error(err);
    }
  };

  const price = calculatePrice(form);

  return (
    <div className="replicant-container">
      <h1 className="replicant-title">Replicant Constructor</h1>

      <form className="replicant-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Gender:
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="replicant-select"
          >
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
            className="replicant-range"
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
            className="replicant-range"
          />
        </label>

        <label>
          Emotional Profile:
          <select
            name="emotion"
            value={form.emotion}
            onChange={handleChange}
            className="replicant-select"
          >
            <option value="controlled">Controlled</option>
            <option value="adaptive">Adaptive</option>
            <option value="wild">Unpredictable</option>
          </select>
        </label>

        <div className="upload-row">
          <span>Uploading a photo with an example (optional):</span>
          <label className="upload-button">
            Choose File
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden-input"
            />
          </label>
        </div>

        {form.image && (
          <p className="image-selected-text">
            ✓ Image selected: {form.image.name}
          </p>
        )}
      </form>

      <div className="replicant-preview">
        <h2>Genetic Blueprint</h2>
        <p><strong>Gender:</strong> {form.gender}</p>
        <p><strong>Strength:</strong> {form.strength}/10</p>
        <p><strong>Intelligence:</strong> {form.intelligence}/10</p>
        <p><strong>Emotion:</strong> {form.emotion}</p>
        <p><strong>Price:</strong> {price != null ? price.toLocaleString() : 'N/A'} ₡</p>
        <p><strong>Image:</strong> {form.image ? form.image.name : "No image"}</p>
        <button className="replicant-button" onClick={handleCreate}>
          Create Replicant
        </button>
      </div>
    </div>
  );
};

export default ReplicantBuilder;
