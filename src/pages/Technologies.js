// src/pages/Technologies.js

import React from 'react';

const Technologies = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tyrell Technologies</h1>
      <p style={styles.subtitle}>
        "More human than human" – this is not just a motto, but our mission.
      </p>

      <section style={styles.section}>
        <h2>Neocortical Engine™</h2>
        <p>
          Our proprietary synthetic neocortex allows replicants to learn, adapt, and evolve.
          Each neural pathway is designed to simulate genuine human cognition — indistinguishable from the original.
        </p>
      </section>

      <section style={styles.section}>
        <h2>BioFiber Skin</h2>
        <p>
          The next generation of bioengineered tissue. Grown cell-by-cell to replicate the elasticity, appearance, and regeneration of organic skin.
          Designed to pass any Voight-Kampff inspection.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Emotion Core v7.9</h2>
        <p>
          Emotions make us human. The Emotion Core simulates the entire spectrum: fear, love, ambition — and loyalty.
          Carefully regulated to ensure optimal obedience and empathy.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Orbitron, sans-serif',
    color: '#e0e0e0',
  },
  title: {
    fontSize: '2.5rem',
    color: '#ff8000',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '40px',
    opacity: 0.8,
  },
  section: {
    marginBottom: '30px',
    background: '#1c1c1c',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,128,0,0.2)',
  },
};

export default Technologies;
