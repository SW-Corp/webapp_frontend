import { MainFooter } from 'app/components/MainFooter';
import { MainSidebar } from 'app/components/MainSidebar';
import * as React from 'react';

export const MainPage = () => {
  return (
    <>
      <div style={styles}>
        <MainSidebar />
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
