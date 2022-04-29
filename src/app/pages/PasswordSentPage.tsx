import { MainFooter } from 'app/components/MainFooter';
import { PassworsSentPanel } from 'app/components/PasswordSentPanel';
import * as React from 'react';

export const PasswordSentPage = () => {
  return (
    <>
      <div style={styles}>
        <PassworsSentPanel />
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
