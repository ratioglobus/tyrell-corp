// src/pages/Info.js

import React from 'react';
import InfoShader from '../components/InfoShader';
import ParticlesLines from '../components/ParticlesLines';

const Info = () => {
  return (
    <div style={styles.container}>
      <InfoShader />
      <ParticlesLines />
      <h2 style={styles.title}>What are Replicants?</h2>
      <p style={styles.text}>
        Replicants are bioengineered beings virtually identical to humans. Originally developed by the Tyrell Corporation,
        they were designed for off-world colonization, heavy labor, military operations, and pleasure models.
      </p>
      <p style={styles.text}>
        Replicants possess superior strength, speed, and sometimes intelligence compared to humans. However, they often have
        limited emotional development and a predetermined lifespan—most famously, the Nexus-6 models had only four years to live.
      </p>
      <p style={styles.text}>
        Their existence raises profound questions about identity, humanity, and ethics in artificial life. In the Blade Runner universe,
        the line between human and machine blurs as replicants evolve and begin to question their own place in the world.
      </p>

      <h2 style={styles.title}>Contacts</h2>
      <p style={styles.text}>
        Number: +1 212 555 1212
      </p>

     
    </div>
    
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#111',
    color: '#ff8000',
    borderRadius: '12px',
    fontFamily: 'Orbitron, sans-serif',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  text: {
    marginBottom: '16px',
    lineHeight: '1.6',
    fontSize: '16px'
  }
};

export default Info;
