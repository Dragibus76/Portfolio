import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BiCodeAlt } from 'react-icons/bi';
import Logo from '../../assets/images/logo/CodeDragi.png';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="menu-header">
      <div className="menu-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            <li>
              <NavLink exact to="/" activeClassName="active" onClick={closeMenu}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" activeClassName="active" onClick={closeMenu}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/cv" activeClassName="active" onClick={closeMenu}>
                CV
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active" onClick={closeMenu}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          {menuOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Menu;
