import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import './Form.scss';

import { authError } from '../../redux/modules/auth/authActions'

const Form = ({ className = '' }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active)
    dispatch(authError())
  };

  return (
    <div className={`form ${className}`}>
      {!active ? <FormLogin onClick={() => handleClick()} /> : <FormRegister onClick={() => handleClick()} />}
    </div>
  );
}

export default Form;
