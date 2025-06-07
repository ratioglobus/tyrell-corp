// src/pages/Info.js

import React from 'react';
import InfoShader from '../components/InfoShader';
import ParticlesLines from '../components/ParticlesLines';
import AIHelper from './AIHelper';
import './style/Info.css'; // Подключаем стили из отдельной папки

const Info = () => {
  return (
    <div className="info-container">
      <InfoShader />
      <ParticlesLines />

      <h2 className="info-title">Ask the Replicant</h2>

      <div className="ai-helper-wrapper">
        <AIHelper />
      </div>

      <h2 className="info-title">What are Replicants?</h2>
      <p className="info-text">
        Replicants are bioengineered beings virtually identical to humans. Originally developed by the Tyrell Corporation,
        they were designed for off-world colonization, heavy labor, military operations, and pleasure models.
      </p>
      <p className="info-text">
        Replicants possess superior strength, speed, and sometimes intelligence compared to humans. However, they often have
        limited emotional development and a predetermined lifespan—most famously, the Nexus-6 models had only four years to live.
      </p>
      <p className="info-text">
        Their existence raises profound questions about identity, humanity, and ethics in artificial life. In the Blade Runner universe,
        the line between human and machine blurs as replicants evolve and begin to question their own place in the world.
      </p>


    </div>
  );
};

export default Info;
