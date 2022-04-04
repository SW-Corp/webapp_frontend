import { LoginPanel } from 'app/components/LoginPanel';
import { MainFooter } from 'app/components/MainFooter';
import * as React from 'react';

export const LoginPage = () => {
  return (
    <>
      <div style={styles}>
        <LoginPanel />
        <MainFooter />
      </div>
    </>
  );
};

const styles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-around',
};
