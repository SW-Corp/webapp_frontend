import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'rsuite';
import { MainButton } from 'app/components/MainButton';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

export const ForgotPasswPanel = () => {
  const [mail, setMail] = useState('');

  function handleMail(event) {
    setMail(event);
  }

  const clearState = () => {
    setMail('');
  };

  function submit(event) {
    event.preventDefault();
    if (mail === '') {
      const error = document.getElementById('alert');
      alert('Niepełne dane');
    } else {
      // console.log('Pełne dane');
      clearState();
    }
  }

  return (
    <div style={styles.mainDiv}>
      <div style={styles.panel}>
        <img src={img} style={styles.icon} title={'logo'} />
        <div style={styles.name}>SW Corp.</div>
        <div style={styles.title}>Znajdź moje konto</div>
        <Form style={styles.form}>
          <Form.Group controlId="mail">
            <Form.ControlLabel style={styles.label}>
              Adres e-mail
            </Form.ControlLabel>
            <Form.Control
              type="email"
              name="mail"
              placeholder="E-mail"
              onChange={handleMail}
              value={mail}
              style={styles.input}
            />
          </Form.Group>
          <Form.Group>
            <MainButton onClick={submit}>PRZYPOMNIJ HASŁO</MainButton>
          </Form.Group>
        </Form>
        <div style={styles.linkDiv}>
          <Link to="/" style={styles.link}>
            Powrót do logowania
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainDiv: {
    height: '100%',
    paddingTop: '4em',
    paddingBottom: '4em',
  },

  panel: {
    backgroundColor: colorConstants.lightGrey,
    color: colorConstants.black,
    width: '40%',
    maxWidth: '28em',
    minWidth: '25em',
    height: '60%',
    minHeight: '32em',
    borderRadius: '20px',
    border: 'solid',
    borderColor: colorConstants.lightGrey,
    boxShadow: '0px 0px 10px rgba(58, 59, 60)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
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

  form: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  label: {
    font: 'Roboto !important',
    fontSize: '14px',
    paddingLeft: '15px',
  },

  input: {
    width: '157.5%',
    height: '60px',
    marginBottom: '5px',
    borderRadius: '20px',
    border: 'solid',
    borderColor: colorConstants.green,
    borderWidth: '2px',
    textIndent: '10px',
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
