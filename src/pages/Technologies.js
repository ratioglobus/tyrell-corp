import React from 'react';
import './style/Technologies.css';

const Technologies = () => {
  return (
    <div className="container">
      <h1 className="title-techno">Tyrell Technologies</h1>
      <p className="subtitle">
        "More human than human" – this is not just a motto, but our mission.
      </p>

      <section className="techSection">
        <img
          src="neocortical-engine.jpg"
          alt="Neocortical Engine™"
          className="techImage"
        />
        <div>
          <h2>Neocortical Engine™</h2>
          <p>
            Our proprietary synthetic neocortex allows replicants to learn, adapt, and evolve.
            Each neural pathway is designed to simulate genuine human cognition — indistinguishable from the original.
          </p>
        </div>
      </section>

      <section className="techSection">
        <img
          src="BioFiber.jpg"
          alt="BioFiber Skin"
          className="techImage"
        />
        <div>
          <h2>BioFiber Skin</h2>
          <p>
            The next generation of bioengineered tissue. Grown cell-by-cell to replicate the elasticity, appearance, and regeneration of organic skin.
            Designed to pass any Voight-Kampff inspection.
          </p>
        </div>
      </section>

      <section className="techSection">
        <img
          src="EmotionCore.png"
          alt="Emotion Core v7.9"
          className="techImage"
        />
        <div>
          <h2>Emotion Core v7.9</h2>
          <p>
            Emotions make us human. The Emotion Core simulates the entire spectrum: fear, love, ambition — and loyalty.
            Carefully regulated to ensure optimal obedience and empathy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
