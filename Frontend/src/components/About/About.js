import React from 'react';
import Button from '../Button/Button';
import './About.css';


const About = () => {
  return (
    <div className="about">
      <h1 className="about-title">A PROPOS DE MOI</h1>
      <div className="about-content">
        <div className="photo-frame"></div>
        <div className="text-block">
          <p><span className="PinkImportantWordsNumber">01</span> Je suis un développeur frontend, développeur web et graphiste passionné par l'informatique, le design et le web. Sous le pseudonyme "Code Dragi", mon vrai nom est Jérémie Daubeuf. Mon parcours professionnel se concentre sur la création d'expériences utilisateur attrayantes et fonctionnelles, en combinant mes compétences en développement et en design graphique. J'aime relever les défis techniques et artistiques, et je suis constamment à l'affût des dernières tendances et technologies du secteur. Mon objectif est de donner vie à des projets web uniques et impactants, en utilisant mon expertise dans la programmation frontend et ma sensibilité esthétique pour créer des interfaces intuitives et esthétiquement agréables.</p>
          <Button type="link" text="Contact" link="/contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
