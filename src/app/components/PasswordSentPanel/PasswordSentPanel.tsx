import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'rsuite';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

export const PasswordSentPanel = () => {
  return (
    <Panel style={styles.panel}>
      <img src={img} style={styles.icon} title={'logo'} />
      <div style={styles.name}>SW Corp.</div>
      <div style={styles.title}>Hasło wysłane</div>
      <div style={styles.info}>
        E-mail z hasłem został wysłany na Twoją skrzynkę pocztową. <br />
        Jeżeli nie otrzymałeś żadnej wiadomości, sprawdź czy nie ma jej w
        folderze Spam.
      </div>
      <div style={styles.linkDiv}>
        <Link to="/" style={styles.link}>
          Powrót do logowania
        </Link>
      </div>
    </Panel>
  );
};

const styles = {
  panel: {
    backgroundColor: colorConstants.lightGrey,
    color: colorConstants.black,
    width: '40%',
    maxWidth: '28em',
    minWidth: '25em',
    height: '60%',
    minHeight: '26em',
    borderRadius: '20px',
    border: 'solid',
    borderColor: colorConstants.lightGrey,
    boxShadow: '0px 0px 10px rgba(58, 59, 60)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '6em',
    marginBottom: '4em',
  },

  icon: {
    width: '7em',
    height: '7em',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  name: {
    font: 'Red Hat Text',
    color: colorConstants.black,
    fontSize: '30px',
    fontWeight: '400',
    display: 'flex',
    justifyContent: 'center',
  },

  title: {
    display: 'flex',
    justifyContent: 'center',
    font: 'Roboto',
    fontSize: '40px',
    fontWeight: '500',
    marginTop: '1%',
    marginBottom: '2%',
  },

  info: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2em',
    marginTop: '1em',
    textAlign: 'justify' as const,
  },

  linkDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '5px',
    marginLeft: '10px',
    marginRight: '10px',
  },

  link: {
    textDecoration: 'none',
    textAlign: 'center',
    color: colorConstants.green,
    fontWeight: 500,
  } as React.CSSProperties,
};
