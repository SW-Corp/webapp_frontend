import { MainFooter } from 'app/components/MainFooter';
import { MainNavbar } from 'app/components/MainNavbar';
import { MainSidebar } from 'app/components/MainSidebar';
import React, { useState } from 'react';

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState('1');

  function handleClick(event) {
    setActiveTab(event.target.id);
  }

  return (
    <>
      <div style={styles}>
        <MainSidebar />
        <MainNavbar activeTab={activeTab} handleClick={handleClick} />
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
