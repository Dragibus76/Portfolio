import React from 'react';
import { FaFigma, FaGithub, FaJs, FaReact, FaHtml5, FaCss3, FaWindows, FaApple } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeindesign, SiAdobeillustrator } from 'react-icons/si';
import './MySkills.css';

const skillData = [
  { title: 'Photoshop', icon: SiAdobephotoshop, percentage: 80 },
  { title: 'Illustrator', icon: SiAdobeillustrator, percentage: 70 },
  { title: 'Indesign', icon: SiAdobeindesign, percentage: 65 },
  { title: 'Figma', icon: FaFigma, percentage: 90 },
  { title: 'Github', icon: FaGithub, percentage: 85 },
  { title: 'Javascript', icon: FaJs, percentage: 75 },
  { title: 'React Js', icon: FaReact, percentage: 80 },
  { title: 'HTML5', icon: FaHtml5, percentage: 55 },
  { title: 'CSS3', icon: FaCss3, percentage: 80 },
  { title: 'Windows', icon: FaWindows, percentage: 95 },
  { title: 'Mac', icon: FaApple, percentage: 90 },
];

const MySkills = () => {
  return (
    <div className="my-skills">
      <h1 className="my-skills-title">MY SKILLS</h1>
      <p className="my-skills-description">
        <span className="PinkImportantWordsNumber">02</span> En tant que développeur et graphiste, j'ai les compétences nécessaires pour créer des expériences numériques uniques et attrayantes.
        Voici mes compétences :
      </p>
      <div className="skills-container">
        <div className="skills-block">
          {skillData.map((skill, index) => (
            <div className="skill-category" key={index}>
              <div className="skill-content">
                <skill.icon className="skill-icon" />
                <div className="skill-progress">
                  <div className="progress-bar" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
              <h2 className='IconsText'>{skill.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySkills;
