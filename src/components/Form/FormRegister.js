import React from 'react';

import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';

import { Link } from 'react-router-dom';
import Button from '../Button';

const FormRegister = ({ onClick }) => {
  const {register} = useSelector(state => state.auth);
  const {
    values,
    handleChange,
    handleSubmit,
    processing,
    message
  } = useForm({
    email: '',
    password: '',
    cpassword: '',
  });

  return (
    <div className="form-inner">
      <p className="form-heading">Register</p>

      {message !== '' ? <p className={`message ${register ? 'success' : 'error'}`}>{message}</p> : ''}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-field" type="text" name="email" id="email" value={values.email} onChange={(e) => handleChange('email', e.target.value)}/>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-field" type="password" name="password" id="password" value={values.password} onChange={(e) => handleChange('password', e.target.value)}/>
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input className="form-field" type="password" name="cpassword" id="cpassword" value={values.cpassword} onChange={(e) => handleChange('cpassword', e.target.value)}/>
        </div>

        <Button label="Register" disabled={processing} />
      </form>
      <p className="form-text">
        <Link to="/" className="form-text-link" onClick={onClick}>
          Already have an account? <span>Login Here</span>
        </Link>
      </p>
    </div>
  );
}

export default FormRegister;
