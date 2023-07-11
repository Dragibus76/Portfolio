import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Recommandation.css";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recommendations");
      const filteredRecommendations = response.data.filter(
        (recommendation) => recommendation.note >= 3 && recommendation.note <= 5
      );
      const sortedRecommendations = filteredRecommendations.slice(-6).reverse();
      setRecommendations(sortedRecommendations);
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de la récupération des recommandations.");
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div className="recommendation">
      <h1 className="recommendation-title">ILS ME RECOMMENDENT</h1>
      <p className="recommendation-description">
        <span className="PinkImportantWordsNumber">04</span> Il est essentiel de donner votre avis en tant qu'utilisateur à un développeur, car votre retour est précieux pour
        améliorer l'expérience utilisateur. Vos commentaires et suggestions permettent d'ajuster les fonctionnalités,
        d'optimiser l'ergonomie et de résoudre les problèmes potentiels. En partageant votre point de vue, vous
        contribuez à façonner un produit final plus adapté à vos besoins et à ceux des autres utilisateurs. Ne sous-estimez
        pas l'impact de votre avis, car il peut influencer directement l'évolution du projet et conduire à des améliorations
        significatives. Votre participation active est donc cruciale pour garantir un développement réussi et une satisfaction
        maximale des utilisateurs.
      </p>
      <div className="carousel-wrapper">
        <div className="carousel">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.id}
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
            >
              
              <div>
                {" "}
                {Array.from({ length: recommendation.note }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
              </div>
              <p><span className="MessageRecomendationSpan">"</span> {recommendation.message} <span className="MessageRecomendationSpan">"</span></p>
              <h3 className="CrarouselTitle">{recommendation.name}</h3>
            </div>
          ))}
        </div>
        <div className="carousel-arrow">
          <button
            className="arrow-button prev-button"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            <FaChevronLeft />
          </button>
          <button
            className="arrow-button next-button"
            onClick={handleNextSlide}
            disabled={currentSlide === recommendations.length - 1}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          {recommendations.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
      <Button type="link" text="Ajouter la vôtre" link="/recommandations" />
    </div>
  );
};

export default Recommendation;
