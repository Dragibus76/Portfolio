import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./PortfolioPage.css";
import Menu from "../../components/Menu/Menu";
import Tableau from "../../components/Tableau/Tableau";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const PortfolioPage = ({ portfolioData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = portfolioData.find((item) => item.id === parseInt(id));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const goBack = () => {
    navigate(-1);
  };

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPreviousImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const goToNextImage = () => {
    if (activeImageIndex < item.image.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const openExternalLink = (url) => {
    window.open(url.startsWith("http") ? url : `http://${url}`, "_blank");
  };

  return (
    <>
      
      <div className="portfolio-page">
        <div className="portfolio-page-info">
          <h1 className="PortfolioPageTile">{item.title}</h1>
        <Tableau
            data={[
              ["Projet n°", item.id],
              ["Titre:", item.title],
              ["Catégorie:", Array.isArray(item.category) ? item.category.map((tag, index) => (
                <p key={index} className="portfolio-page-category-tag">
                  {tag}
                </p>
              )) : (
                <p className="portfolio-page-category-tag">{item.category}</p>
              )],
              ["Date:", formatDate(item.date)],
              ["Auteur:", item.author],
              ["Description:", item.description],
            ]}
            useStyle1={true}
          />
          <button onClick={() => openExternalLink(item.link)} className="link-tag">
            Voir la version en ligne
          </button>
        </div>
        <div className="portfolio-page-images">
          <h1 className="TitleGalery">Galerie</h1>
          {item.image.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3001/uploads/portfolioImage/${image}`}
              alt={item.title}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
        {lightboxOpen && (
          
          <Lightbox
            mainSrc={`http://localhost:3001/uploads/portfolioImage/${item.image[activeImageIndex]}`}
            nextSrc={`http://localhost:3001/uploads/portfolioImage/${
              item.image[(activeImageIndex + 1) % item.image.length]
            }`}
            prevSrc={`http://localhost:3001/uploads/portfolioImage/${
              item.image[(activeImageIndex + item.image.length - 1) % item.image.length]
            }`}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={goToPreviousImage}
            onMoveNextRequest={goToNextImage}
          />
        )}
      </div>
      <div className="portfolio-page-container hide-scrollbar"></div>
    </>
  );
};

export default PortfolioPage;
