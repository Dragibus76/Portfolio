import React, { useEffect, useRef, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import './Home.css';
import MySkills from '../../components/My Skills/MySkills';
import Expertise from '../../components/Expertise/Expertise';
import Recommendation from '../../components/Recommandation/Recommandation';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const sectionsRef = useRef([]);

  useEffect(() => {
    ScrollReveal().reveal(sectionsRef.current, {
      delay: 600,
      duration: 1000,
      distance: 'auto',
      reset: true,
      interval: 200,
      origin: (index) => (index % 2 === 0 ? 'right' : 'left'),
    });

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Calculez la position de défilement de la moitié de la page
      const halfPagePosition = (scrollHeight - clientHeight) / 2;

      // Afficher l'icône de défilement vers le haut lorsque vous êtes dans la deuxième moitié de la page
      setShowScrollTop(scrollTop > halfPagePosition);

      // Afficher l'icône de défilement vers le bas lorsque vous êtes dans la première moitié de la page
      setShowScrollDown(scrollTop < halfPagePosition);
    };

    // Ajoutez un écouteur d'événement de défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyez l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <section className="section hero-banner">
        <Hero />
      </section>

      <section className="section first-block" ref={(ref) => (sectionsRef.current[0] = ref)}>
        <About />
      </section>

      <section className="section second-block" ref={(ref) => (sectionsRef.current[1] = ref)}>
        <MySkills />
      </section>

      <section className="section third-block" ref={(ref) => (sectionsRef.current[2] = ref)}>
        <Expertise />
      </section>

      <section className="section fourth-block" ref={(ref) => (sectionsRef.current[3] = ref)}>
        <Recommendation />
      </section>

      {showScrollTop && (
        <button className="scroll-button scroll-top-button" onClick={scrollToTop}>
          <FaArrowUp className="scroll-icon" />
        </button>
      )}

      {showScrollDown && (
        <button className="scroll-button scroll-down-button" onClick={scrollToBottom}>
          <FaArrowDown className="scroll-icon" />
        </button>
      )}
    </div>
  );
};

export default Home;
