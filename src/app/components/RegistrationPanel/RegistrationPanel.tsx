import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Form } from 'rsuite';
import { MainButton } from 'app/components/MainButton';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

const initialState = {
  mail: '',
  login: '',
  password: '',
  repeatPassword: '',
};

export const RegistrationPanel = () => {
  const [data, setData] = useState(initialState);

  function handleMail(event) {
    setData(prevData => {
      return {
        ...prevData,
        mail: event,
      };
    });
  }

  function handleLogin(event) {
    setData(prevData => {
      return {
        ...prevData,
        login: event,
      };
    });
  }

  function handlePassw(event) {
    setData(prevData => {
      return {
        ...prevData,
        password: event,
      };
    });
  }

  function handleRepeatPassw(event) {
    setData(prevData => {
      return {
        ...prevData,
        repeatPassword: event,
      };
    });
  }

  const clearState = () => {
    setData({ ...initialState });
  };

  function submit(event) {
    event.preventDefault();
    if (
      data.mail === '' ||
      data.login === '' ||
      data.password === '' ||
      data.repeatPassword === ''
    ) {
      const error = document.getElementById('alert');
      console.log('Niepełne dane');
    } else {
      if (data.password === data.repeatPassword) {
        console.log('Pełne dane');
        // Check for errors
        // Send
        clearState();
      } else {
        //Helpblock or sth
        console.log('Passwords do not match');
      }
    }
  }

  return (
    <Panel style={styles}>
      <img src={img} style={istyles} />
      <div style={tstyles}>SW Corp.</div>
      <div style={dstyles}>Rejestracja</div>
      <Form style={fstyles}>
        <Form.Group controlId="email">
          <Form.ControlLabel style={lstyles}>Adres e-mail</Form.ControlLabel>
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={handleMail}
            value={data.mail}
            style={cstyles}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.ControlLabel style={lstyles}>
            Nazwa użytkownika
          </Form.ControlLabel>
          <Form.Control
            name="name"
            placeholder="Login"
            onChange={handleLogin}
            value={data.login}
            style={cstyles}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel style={lstyles}>Hasło</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            placeholder="Hasło"
            autoComplete="off"
            onChange={handlePassw}
            value={data.password}
            style={cstyles}
          />
        </Form.Group>
        <Form.Group controlId="repeatpassword">
          <Form.ControlLabel style={lstyles}>Powtórz hasło</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            placeholder="Powtórz hasło"
            autoComplete="off"
            onChange={handleRepeatPassw}
            value={data.repeatPassword}
            style={cstyles}
          />
        </Form.Group>
        <Form.Group>
          <MainButton onClick={submit}>ZAREJESTRUJ SIĘ</MainButton>
        </Form.Group>
      </Form>
      <div style={divstyles}>
        <Link to="/">Masz już konto? Zaloguj się!</Link>
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

const istyles = {
  width: '26%',
  height: '17%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '30px',
};

const tstyles = {
  font: 'Red Hat Text',
  color: colorConstants.black,
  fontSize: '25px',
  fontWeight: '400',
  display: 'flex',
  justifyContent: 'center',
};

const dstyles = {
  display: 'flex',
  justifyContent: 'center',
  font: 'Roboto',
  fontSize: '35px',
  fontWeight: '500',
  marginBottom: '1%',
};

const fstyles = {
  width: '80%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const lstyles = {
  font: 'Roboto !important',
  fontSize: '14px',
  paddingLeft: '15px',
  marginTop: '10px',
};

const cstyles = {
  width: '100%',
  height: '60px',
  borderRadius: '20px',
  border: 'solid',
  borderColor: colorConstants.green,
  borderWidth: '2px',
  textIndent: '10px',
};

const divstyles = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '5px',
};
