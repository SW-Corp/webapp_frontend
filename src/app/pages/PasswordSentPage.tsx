import { MainFooter } from 'app/components/MainFooter';
import { PasswordSentPanel } from 'app/components/PasswordSentPanel';
import * as React from 'react';

export const PasswordSentPage = () => {
  return (
    <>
      <div style={styles}>
        <PasswordSentPanel />
        <MainFooter />
      </div>
    </>
  );
};

const styles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-around',
};
