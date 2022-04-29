import React, { useState } from 'react';
import { LoginPage } from 'app/pages/LoginPage';
import { MainPage } from 'app/pages/MainPage';

export const HomePage = () => {
  const [data, setData] = useState(false);

  function ReturnPage(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) return <MainPage />;
    else return <LoginPage />;
  }

  return (
    <>
      <ReturnPage isLoggedIn={data} />
    </>
  );
};
