import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Form } from 'rsuite';
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
      console.log('Niepełne dane');
    } else {
      console.log('Pełne dane');
      // Check for errors
      // Send
      clearState();
    }
  }

  return (
    <Panel style={styles}>
      <img src={img} style={iconStyles} />
      <div style={nameStyles}>SW Corp.</div>
      <div style={titleStyles}>Znajdź moje konto</div>
      <Form style={formStyles}>
        <Form.Group controlId="mail">
          <Form.ControlLabel style={labelStyles}>
            Adres e-mail
          </Form.ControlLabel>
          <Form.Control
            type="email"
            name="mail"
            placeholder="E-mail"
            onChange={handleMail}
            value={mail}
            style={controlStyles}
          />
        </Form.Group>
        <Form.Group>
          <MainButton onClick={submit}>PRZYPOMNIJ HASŁO</MainButton>
        </Form.Group>
      </Form>
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
  height: '20%',
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

const formStyles = {
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const labelStyles = {
  font: 'Roboto !important',
  fontSize: '14px',
  paddingLeft: '15px',
};

const controlStyles = {
  width: '100%',
  height: '60px',
  borderRadius: '20px',
  border: 'solid',
  borderColor: colorConstants.green,
  borderWidth: '2px',
  textIndent: '10px',
};

const divStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '15px',
};
