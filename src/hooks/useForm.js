import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authRegister, authLogin } from '../redux/modules/auth/authActions'
import useAuth from '../hooks/useAuth'

export default (data = {}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {authToken} = useAuth();
  const {token, register, error} = useSelector(state => state.auth);
  const [processing, setProcessing] = useState(true);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState(data);

  useEffect(() => {
    if(register) {
      setMessage('Successfully registered!')
      setTimeout(() => {
        setMessage('')
        dispatch(authLogin(values))
      }, 500)
    }
  }, [values, register, dispatch])

  useEffect(() => {
    if(token === '') {
      setMessage('Email or password does not match in our database!')
    } else {
      (token === authToken && token !== null) && history.push('/')
    }
  }, [history, authToken, token])

  useEffect(() => {
    if(error !== null) {
      setMessage('Email is already taken!')
    }
  }, [error])

  const handleChange = (id, value) => {
    setValues({
      ...values,
      [id]: value.trim()
    });

    setProcessing('')
    setMessage('')
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(values.email.length !== 0 &&
      values.password.length !== 0 &&
      values.cpassword.length !== 0) {
      const mailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if(!values.email.match(mailFormat)) {
        setMessage('Not a valid email!')
      }
      else if(values.password !== values.cpassword) {
        setMessage('Confirm password does not match with password!')
      } else {
        setProcessing(false);
        setMessage('');
        dispatch(authRegister(values))
      }
    } else {
      //setMessage('Fields must not be blank!')
      setProcessing(true);
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();

    if(values.email.length !== 0 &&
      values.password.length !== 0) {
      setProcessing(true);
      setMessage('');
      dispatch(authLogin(values))
    } else {
      //setMessage('Fields must not be blank!')
      setProcessing(true);
    }
  }

  return {
    values,
    handleChange,
    handleSubmit,
    handleLoginSubmit,
    processing,
    message,
  }

}
