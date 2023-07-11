import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ type, text, link, onClick }) => {
  const renderButton = () => {
    if (type === 'link') {
      return (
        <Link to={link} className="button">
          {text}
        </Link>
      );
    } else if (type === 'submit') {
      return (
        <button type="submit" className="button" onClick={onClick}>
          {text}
        </button>
      );
    } else {
      return null;
    }
  };

  return renderButton();
};

export default Button;
