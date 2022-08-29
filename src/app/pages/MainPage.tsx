import { MainFooter } from 'app/components/MainFooter';
import { MainNavbar } from 'app/components/MainNavbar';
import { MainSidebar } from 'app/components/MainSidebar';
import { colorConstants } from 'styles/colorConstants';
import { Model } from 'app/components/Model';
import React, { useState } from 'react';

export const MainPage = props => {
  const [activeTab, setActiveTab] = useState(true);

  function handleClick(event) {
    if (activeTab == false && event.target.innerHTML == 'Wizualizacja')
      setActiveTab(!activeTab);

    if (activeTab == true && event.target.innerHTML == 'Dane szczegółowe')
      setActiveTab(!activeTab);
  }

  function ReturnContent(props) {
    const content = props.content;
    if (content) return <Model />;
    else
      return (
        <table id="myTable" style={tableStyles}>
          <tr style={rowStyle}>
            <th style={rowStyle}>Name</th>
            <th style={rowStyle}>Country</th>
          </tr>
          <tr style={moreStyle}>
            <td style={moreStyle}>Berglunds snabbkop</td>
            <td style={moreStyle}>Sweden</td>
          </tr>
          <tr style={rowStyle}>
            <td style={rowStyle}>North/South</td>
            <td style={rowStyle}>UK</td>
          </tr>
          <tr style={moreStyle}>
            <td style={moreStyle}>Alfreds Futterkiste</td>
            <td style={moreStyle}>Germany</td>
          </tr>
        </table>
      );
  }

  return (
    <>
      <div style={styles}>
        <MainSidebar />
        <MainNavbar
          activeTab={activeTab}
          handleClick={handleClick}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
        />
        <ReturnContent content={activeTab} />
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

const tableStyles = {
  borderSpacing: '0',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '40px',
  border: '1px solid #ddd',
};

const rowStyle = {
  textAlign: 'left',
  padding: '16px',
} as React.CSSProperties;

const moreStyle = {
  textAlign: 'left',
  padding: '16px',
  backgroundColor: colorConstants.lightGrey,
} as React.CSSProperties;
