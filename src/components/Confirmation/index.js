import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Confirmation.scss'

const Confirmation = ({ modifier, link = "/", text, onClick = () => {} }) => {
  return (
    <div className={`confirmation${modifier}`}>
      <span className="close" onClick={onClick}>X</span>
      <div>
        <p>{text}</p>
        <div className="confirmation-button">
          <Link to={link}>YES</Link>
        </div>
      </div>
    </div>
  )
}

Confirmation.propTypes = {
  modifier: PropTypes.any,
  link: PropTypes.any,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Confirmation;
