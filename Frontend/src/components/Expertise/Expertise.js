import React from 'react';
import { FaCode, FaSearch, FaUsers } from 'react-icons/fa';
import './Expertise.css';

const Expertise = () => {
  return (
    <div className="expertise">
      <h1 className="expertise-title">EXPERTISE</h1>
      <p className="expertise-description">
        <span className='PinkImportantWordsNumber'>03</span> En tant que développeur et graphiste, je possède une expertise polyvalente dans la création 
      de solutions numériques innovantes. Grâce à mes compétences en développement, je suis capable 
      de concevoir et de développer des sites web et des applications fonctionnels, en utilisant les 
      dernières technologies et langages de programmation tels que JavaScript, HTML5 et CSS3. Parallèlement, 
      en tant que graphiste, j'ai une sensibilité artistique qui me permet de créer des designs attrayants, des 
      interfaces utilisateur intuitives et des éléments visuels percutants. Je suis passionné par l'alliance 
      entre la créativité et la technologie, et je m'efforce de combiner ces deux domaines pour offrir des expériences 
      numériques uniques et captivantes. Que ce soit pour le développement de sites web, la création d'identités 
      visuelles ou la conception d'interfaces utilisateur, mon savoir-faire en tant que développeur et graphiste 
      me permet de fournir des solutions esthétiques, fonctionnelles et efficaces à mes clients.
      </p>
      <div className="expertise-blocks">
        <div className="expertise-block">
          <FaCode className="expertise-icon" />
          <p className="expertise-text">Expertise</p>
        </div>
        <div className="expertise-block">
          <FaSearch className="expertise-icon" />
          <p className="expertise-text">SEO</p>
        </div>
        <div className="expertise-block">
          <FaUsers className="expertise-icon" />
          <p className="expertise-text">Service client</p>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
