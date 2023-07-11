import React, { useEffect } from "react";
import './PortfolioList.css';
import { useNavigate } from "react-router-dom";
import Tableau from "../../../components/Tableau/Tableau";

const PortfolioList = ({ portfolioData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="portfolio-list-container">
      <h1 className="PortfolioListTitle">LISTE DES PORTFOLIOS</h1>
      <div className="table-container">
        <Tableau
          data={portfolioData.map((portfolio) => ({
            id: portfolio.id,
            title: portfolio.title,
            category: Array.isArray(portfolio.category)
              ? portfolio.category.join(", ")
              : "N/A",
            date: formatDate(portfolio.date),
          }))}
          useStyle1={false}
          categoryHeaderText="Tags"
          showDateHeader={true}
          portfolioData={portfolioData}
          pageActive="portfolio"
        />
      </div>
    </div>
  );
};

export default PortfolioList;
