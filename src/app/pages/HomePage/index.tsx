import { LoginPanel } from 'app/components/LoginPanel/LoginPanel';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainButton } from 'app/components/MainButton/MainButton';
import { MainFooter } from 'app/components/MainFooter/MainFooter';

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <LoginPanel />
    </>
  );
};
