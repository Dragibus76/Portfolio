import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import LogoFooter from '../../assets/images/logo/CodeDragi.png';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, link: 'https://www.facebook.com/votre-page-facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/votre-compte-instagram' },
    { icon: FaTwitter, link: 'https://twitter.com/votre-compte-twitter' },
    { icon: FaGithub, link: 'https://github.com/votre-compte-github' },
    { icon: FaLinkedin, link: 'https://www.linkedin.com/in/votre-profil-linkedin' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="icons-left">
        
          {socialLinks.map((social, index) => (
            <Link key={index} to={social.link} target="_blank" rel="noopener noreferrer">
              <social.icon className="social-icon" />
            </Link>
          ))}
        </div>
        <div className="center-content">
          <div className="logo">
            <img src={LogoFooter} alt="Logo Footer" />
            <p className="copy-right">©CodeDragi - 2023</p>
          </div>
        </div>
        <div className="version-right">
          <p className="version">Version beta</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
