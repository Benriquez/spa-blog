import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button = ({
  modifier = '',
  label,
  disabled,
  onClick = () => {}
}) => {
  return (
    <>
      <button className={`button ${modifier}`} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    </>
  )
}

Button.propTypes = {
  modifier: PropTypes.any,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button;
