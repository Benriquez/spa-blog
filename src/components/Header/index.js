import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import useAuth from '../../hooks/useAuth'

import './Header.scss';
import Form from '../Form';
import { IS_ACTIVE } from '../../utils/constants';
import logoBlog from '../../assets/images/logo-blog.png';

const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Login');
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = 'hidden';
      setButtonText('Close')
    } else {
      document.body.style.overflow = '';
      setButtonText('Login')
    }
    if(isLoggedIn) document.body.style.overflow = '';
  }, [isLoggedIn, isOpen])

  const handleClick = () => setIsOpen(!isOpen)
  const handleClose = () => setIsOpen(false);
  const handleLogout = () => {
    const removeToken = localStorage.removeItem('token');

    setIsOpen(false);
    setButtonText('Login');
    setIsLoggedIn(removeToken);
    history.push('/');
  }

  const logoLink = <Link to="/" onClick={() => handleClose()}>
    <img src={logoBlog} alt="Blog" />
  </Link>;

  let element;
  if(path === '/') {
    element = (
      <h1 className="header-logo">
        {logoLink}
      </h1>
    );
  } else {
    element = (
      <div className="header-logo">
        {logoLink}
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <div className="l-container header-container">
          {element}
          <div className="header-right">
            {isLoggedIn &&
            <button className="header-right-button" onClick={() => handleLogout()}>
              Logout
            </button>}
            {!isLoggedIn &&
            <button className="header-right-button" onClick={() => handleClick()}>
              {buttonText}
            </button>}
          </div>
        </div>
      </header>
      {!isLoggedIn && <Form className={`${(isOpen ? IS_ACTIVE : '')}`} />}
    </>
  );
}

export default Header;
