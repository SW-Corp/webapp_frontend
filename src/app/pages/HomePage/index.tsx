import React, { useEffect, useState } from 'react';
import { LoginPage } from 'app/pages/LoginPage';
import { MainPage } from 'app/pages/MainPage';

export const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('islogged')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};
