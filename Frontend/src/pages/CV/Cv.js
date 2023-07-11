import React from 'react';
import './Cv.css';
import resume from '../../assets/Resume.pdf';
import data from '../../data/DataCv.json';
import Button from '../../components/Button/Button';

const Cv = () => {
  const { experiencesProfessionnelles, etudes } = data;

  const handleDownload = () => {
    // Lien vers le fichier PDF de votre CV
    const cvFile = resume;

    // Créez un lien temporaire
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Mon_CV.pdf';

    // Cliquez sur le lien pour déclencher le téléchargement
    link.click();
  };

  return (
    <div className="cv-container">
      <h1 className="cvTitle">Mon CV</h1>
      <p className="CvDescription">
      Graphiste passionné avec une expertise en design graphique et une expérience confirmée dans la création visuelle. Compétences en conception de logos, identités visuelles et supports de communication percutants. Créativité, rigueur et capacité à travailler en équipe sont mes atouts clés. Disponible pour des projets créatifs stimulants.
      </p>
      <div className="cv-block">
        <div className="cv-section">
          <h2>Expériences Professionnelles</h2>
          {experiencesProfessionnelles.map((experience, index) => (
            <div className="cv-item" key={index}>
              <div className="cv-year">{experience.year}</div>
              <div className="cv-details">
                <div className="cvjobtitle">{experience.title}</div>
                <div className="cv-company">{experience.company}</div>
                <div className="cv-city">{experience.city}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cv-section">
          <h2>Études</h2>
          {etudes.map((etude, index) => (
            <div className="cv-item" key={index}>
              <div className="cv-year">{etude.year}</div>
              <div className="cv-details">
                <div className="cvjobtitle">{etude.title}</div>
                <div className="cv-company">{etude.company}</div>
                <div className="cv-city">{etude.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" text="Télécharger" onClick={handleDownload} />
    </div>
  );
};
// onClick={handleDownload}
export default Cv;
