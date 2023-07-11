import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="title-container">
        <div className="animate__animated animate__fadeInLeft animate__delay-1s">UNE BRILLANTE <span className='PinkImportantWords'>IDEE</span></div>
        <div className="animate__animated animate__fadeInLeft animate__delay-2s">PEUT VOUS <span className='PinkImportantWords'>CHANGER</span></div>
        <div className="animate__animated animate__fadeInLeft animate__delay-3s">LA <span className='PinkImportantWords'>VIE</span></div>
      </div>
    </div>
  );
};

export default Hero;
