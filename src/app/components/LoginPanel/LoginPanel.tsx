import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'rsuite';
import { MainButton } from 'app/components/MainButton';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';
import { logIn } from 'services/userService';

const initialState = {
  mail: '',
  password: '',
};

export const LoginPanel = props => {
  const [data, setData] = useState(initialState);

  function handleMail(event) {
    setData(prevData => {
      return {
        ...prevData,
        mail: event,
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

  const clearState = () => {
    setData({ ...initialState });
  };

  function validateEmail(email: string) {
    const pattern = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return pattern.test(email);
  }

  function handleStatus(status: number) {
    switch (status) {
      case 200:
        localStorage.setItem('islogged', '1');
        props.setIsLoggedIn(true);
        break;

      case 400:
        window.alert('Nieprawidłowy adres email lub hasło');
        break;

      case 403:
        window.alert('Musisz zaktywować swoje konto przez maila');
        break;

      case 404:
        window.alert('Nieprawidłowy adres email lub hasło');
        break;

      default:
        window.alert('Nieznany błąd');
        break;
    }
  }

  async function submit(event: any) {
    event.preventDefault();
    if (data.mail === '' || data.password === '') {
      window.alert('Uzupełnij wszystkie dane!');
    } else {
      const status = await logIn(data.mail, data.password);
      handleStatus(status);
    }
  }

  return (
    <div style={styles.mainDiv}>
      <div style={styles.panel}>
        <img src={img} style={styles.icon} title={'logo'} />
        <div style={styles.name}>SW Corp.</div>
        <div style={styles.title}>Logowanie</div>
        <Form style={styles.form}>
          <Form.Group controlId="name">
            <Form.ControlLabel style={styles.label}>
              Nazwa użytkownika
            </Form.ControlLabel>
            <Form.Control
              type="text"
              name="mail"
              placeholder="E-mail"
              onChange={handleMail}
              value={data.mail}
              style={styles.input}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.ControlLabel style={styles.label}>Hasło</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              placeholder="Hasło"
              autoComplete="off"
              onChange={handlePassw}
              value={data.password}
              style={styles.input}
            />
          </Form.Group>
          <Form.Group>
            <MainButton onClick={submit}>ZALOGUJ SIĘ</MainButton>
          </Form.Group>
        </Form>
        <div style={styles.linkDiv}>
          <Link to="/registration" style={styles.link}>
            Nie masz konta? Zarejestruj się!
          </Link>
        </div>
        <div style={styles.linkDiv}>
          <Link to="/forgotPassword" style={styles.link}>
            Zapomniałeś hasła?
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainDiv: {
    height: '100%',
    paddingTop: '2em',
    paddingBottom: '4em',
  },

  panel: {
    backgroundColor: colorConstants.lightGrey,
    color: colorConstants.black,
    width: '40%',
    maxWidth: '28em',
    minWidth: '25em',
    height: '40em',
    minHeight: '38em',
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
    padding: 0,
  },

  icon: {
    width: '7em',
    height: '7em',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
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
    width: '100%',
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
