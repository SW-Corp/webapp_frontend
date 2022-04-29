import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'rsuite';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

export const PassworsSentPanel = () => {
  return (
    <Panel style={styles}>
      <img src={img} style={iconStyles} />
      <div style={nameStyles}>SW Corp.</div>
      <div style={titleStyles}>Hasło wysłane</div>
      <div style={infoStyles}>
        E-mail z hasłem został wysłany na Twoją skrzynkę pocztową. <br />
        Jeżeli nie otrzymałeś żadnej wiadomości, sprawdź czy nie ma jej w
        folderze Spam.
      </div>
      <div style={divStyles}>
        <Link to="/">Powrót do logowania</Link>
      </div>
    </Panel>
  );
};

const styles = {
  backgroundColor: colorConstants.lightGrey,
  color: colorConstants.black,
  width: '35%',
  height: '60%',
  borderRadius: '20px',
  border: 'solid',
  borderColor: colorConstants.lightGrey,
  boxShadow: '0px 0px 10px rgba(58, 59, 60)',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  paddingBottom: '1%',
};

const iconStyles = {
  width: '26%',
  height: '26%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '30px',
};

const nameStyles = {
  font: 'Red Hat Text',
  color: colorConstants.black,
  fontSize: '30px',
  fontWeight: '400',
  display: 'flex',
  justifyContent: 'center',
};

const titleStyles = {
  display: 'flex',
  justifyContent: 'center',
  font: 'Roboto',
  fontSize: '40px',
  fontWeight: '500',
  marginTop: '1%',
  marginBottom: '3%',
};

const infoStyles = {
  fontSize: '14px',
  textAlign: 'justify',
  whiteSpace: 'pre-line',
  marginLeft: '8%',
  marginRight: '8%',
} as React.CSSProperties;

const divStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};
