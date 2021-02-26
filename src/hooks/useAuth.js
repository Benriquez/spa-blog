import { useState, useEffect } from 'react';

export default () => {
  const authToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(authToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [authToken])

  return {
    isLoggedIn,
    setIsLoggedIn,
    authToken
  }
}
