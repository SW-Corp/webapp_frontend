import { RegistrationPanel } from 'app/components/RegistrationPanel';
import { MainFooter } from 'app/components/MainFooter';
import * as React from 'react';

export const RegistrationPage = () => {
  return (
    <>
      <div style={styles}>
        <RegistrationPanel />
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
