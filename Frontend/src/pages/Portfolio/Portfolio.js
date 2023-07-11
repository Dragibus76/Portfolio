import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import Menu from '../../components/Menu/Menu';
import Gallery from '../../components/Gallery/Gallery';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/portfolio");
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.log("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <div className="portfolio-container">
        <div className="portfolio-content">
          <h1 className="portfolio-title">MON PORTFOLIO</h1>
          <p className="portfolio-text">Bienvenue sur mon portfolio. Découvrez mes projets et réalisations.</p>
        </div>
      </div>
      <Gallery portfolioData={portfolioData} />
    </>
  );
};

export default Portfolio;
