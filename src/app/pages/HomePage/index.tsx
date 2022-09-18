import React, { useState } from 'react';
import { LoginPage } from 'app/pages/LoginPage';
import { MainPage } from 'app/pages/MainPage';

export const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function ReturnPage(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn)
      return <MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
    else
      return (
        <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      );
  }

  return (
    <>
      <ReturnPage isLoggedIn={isLoggedIn} />
    </>
  );
};
