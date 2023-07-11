import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPortfolio from "./NewPortfolio/NewPortfolio";
import RecommendationsList from "./RecommendationsList/RecommendationsList";
import PortfolioList from "./PortfolioList/PortfolioList";
import Menu from "../../components/Menu/Menu";
import "./Admin.css";

const Admin = ({ portfolioData, recommendationsData }) => {
  const [selectedButton, setSelectedButton] = useState("Portfolios");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (via le stockage local)
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Supprimer l'état de connexion du stockage local
    navigate("/admin"); // Rediriger vers la page d'accueil
  };

  const handleClickPortfoliosList = () => {
    setSelectedButton("Portfolios");
  };

  const handleClickRecommendations = () => {
    setSelectedButton("Recommendations");
  };

  const handleClickNewPortfolio = () => {
    setSelectedButton("Ajouter un Portfolio");
  };

  const handleDeleteEntry = (id) => {
    // Implémenter la logique de suppression de l'entrée avec l'ID spécifié dans le backend
    // Une fois la suppression réussie, vous pouvez mettre à jour les données du portfolio
    console.log("Suppression de l'entrée avec l'ID :", id);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const totalPortfolios = portfolioData.length;
  const totalRecommendations = recommendationsData.length;

  return (
    <>
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-left">
           
          </div>
        </div>
        <div className="admin-content">
          <div className="block-1">
            <div className="PortfoliosBlock">
              <p>{totalPortfolios} Portfolios</p>
              </div>
            <div className="PortfoliosBlock">
              <p>{totalRecommendations} Recommandations</p>
            </div>
          </div>
          <div className="block-2">
            <div className="DateBlock">
              <p>Bonjour, Nous sommes le <span className="SpanDate">{formatDate(new Date())}</span>, il est <span className="SpanDate">{currentDateTime.toLocaleTimeString()}</span></p>

            </div>
          </div>
          <div className="block-3">
            <div className="subblock subblock-ful">
            {loggedIn && (
              <div className="name-logout-container">
                <p className="NameLogin">Bonjour<span className="NameLoginSpan"> CodeDragi</span></p>
                <button className="logout-button" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
        <div className="admin-buttons">
          <button
            onClick={handleClickPortfoliosList}
            className={selectedButton === "Portfolios" ? "active" : ""}
          >
            Portfolios
          </button>
          <button
            onClick={handleClickRecommendations}
            className={selectedButton === "Recommendations" ? "active" : ""}
          >
            Recommendations
          </button>
          <button
            onClick={handleClickNewPortfolio}
            className={
              selectedButton === "Ajouter un Portfolio" ? "active" : ""
            }
          >
            Ajouter un Portfolio
          </button>
        </div>
        {selectedButton === "Portfolios" && (
          <PortfolioList
            portfolioData={portfolioData}
            onDeleteEntry={handleDeleteEntry}
          />
        )}
        {selectedButton === "Recommendations" && (
          <RecommendationsList recommendationsData={recommendationsData} />
        )}
        {selectedButton === "Ajouter un Portfolio" && (
          <NewPortfolio portfolioData={portfolioData} />
        )}
      </div>
    </>
  );
};

export default Admin;
