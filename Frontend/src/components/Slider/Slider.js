import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import './Slider.css';

const Slider = ({ recommendations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === recommendations.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? recommendations.length - 1 : prevSlide - 1));
  };

  return (
    <div>
      <div className="slider">
        {/* Afficher la recommandation courante */}
        <div className="avatar">
          <img src={recommendations[currentSlide].avatar} alt="Avatar" />
        </div>
        <div className="rating">
          {Array.from(Array(recommendations[currentSlide].rating), (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
        </div>
        <h3>{recommendations[currentSlide].title}</h3>
        <p>{recommendations[currentSlide].description}</p>
        <div className="slider-navigation">
          <button onClick={prevSlide}>&#8249;</button>
          <button onClick={nextSlide}>&#8250;</button>
        </div>
      </div>

      {/* Flèches pour passer à la recommandation suivante ou précédente */}
    </div>
  );
};

export default Slider;
