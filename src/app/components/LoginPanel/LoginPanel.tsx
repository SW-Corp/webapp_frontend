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
      const response = await logIn(data.mail, data.password);
      if (response.status === 200) {
        console.log('Logged in.', response);
        localStorage.setItem('islogged', '1');
        localStorage.setItem('current_user', response.data.email);
        localStorage.setItem('permission', response.data.permission);
        props.setIsLoggedIn(true);
      } else {
        handleStatus(response.status);
      }
    }
  }

  return (
    <div style={styles.mainDiv}>
      <div style={styles.panel}>
        <img src={img} style={styles.icon} title={'logo'} />
        <div style={styles.name}>Water Treatment Lab</div>
        <div style={styles.title}>Logowanie</div>
        <Form style={styles.form}>
          <Form.Group controlId="name" style={styles.group}>
            <Form.ControlLabel style={styles.label}>
              Adres e-mail
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
          <Form.Group controlId="password" style={styles.group}>
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
            <MainButton type="submit" onClick={submit}>
              ZALOGUJ SIĘ
            </MainButton>
          </Form.Group>
        </Form>
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
    height: '42em',
    minHeight: '42em',
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
    paddingBottom: '10px',
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

  group: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  } as React.CSSProperties,

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
