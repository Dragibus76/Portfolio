import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Portfolio from './pages/Portfolio/Portfolio';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import Cv from './pages/CV/Cv';
import Contact from './pages/Contact/Contact';
import AddRecommandation from './pages/AddRecommandation/AddRecommandation';
import ConnectAdminDashboard from './pages/ConnectAdminDashboard/ConnectAdminDashboard';
import Admin from './pages/Admin/Admin';
import PortfolioListId from './pages/Admin/PortfolioListId/PortfolioListId';


const App = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState([]);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("http://localhost:3001/portfolio");
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.log("Error fetching portfolio data:", error);
      }
    };

    const fetchRecommendationsData = async () => {
      try {
        const response = await fetch("http://localhost:3001/recommendations");
        const data = await response.json();
        setRecommendationsData(data);
      } catch (error) {
        console.log("Error fetching recommendations data:", error);
      }
    };

    fetchPortfolioData();
    fetchRecommendationsData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/portfolio' element={<Portfolio portfolioData={portfolioData} recommendationsData={recommendationsData} />} />
        <Route path='/portfolio/:id' element={<PortfolioPage portfolioData={portfolioData} />} />
        <Route path='/cv' element={<Cv />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/recommandations' element={<AddRecommandation />} />
        
        <Route path='/admin' element={<ConnectAdminDashboard />} />
        <Route path='/admin/dashboard' element={<Admin portfolioData={portfolioData} recommendationsData={recommendationsData} />} />
        <Route path='/admin/dashboard/portfoliolist/:id' portfolioData={portfolioData} element={<PortfolioListId/>}/>
      </Routes>
    </div>
  );
}

export default App;
