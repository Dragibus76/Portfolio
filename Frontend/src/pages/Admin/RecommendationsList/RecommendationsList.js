import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tableau from "../../../components/Tableau/Tableau";
import "./RecommendationsList.css";

const RecommendationsList = ({ recommendationsData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'état de connexion lors du chargement du composant
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="recommendations-list-container">
      <div className="recommendations-list-header">
        <h1>LISTE DES RECOMMENDATIONS</h1>
      </div>
      <div className="table-container">
        <Tableau
          data={recommendationsData.map((recommendation) => ({
            id: recommendation.id,
            title: recommendation.name,
            note: recommendation.note,
          }))}
          useStyle1={false} // Utilisation du style 2 dans le tableau
          categoryHeaderText="Note" // Définir le texte de l'en-tête de la colonne "Catégorie"
          showDateHeader={false}
          pageActive="recommendations"
        />
      </div>
    </div>
  );
};

export default RecommendationsList;
