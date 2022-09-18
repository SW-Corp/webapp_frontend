import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'rsuite';
import { MainButton } from 'app/components/MainButton';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

import { signUp } from '../../../services/userService';

const initialState = {
  mail: '',
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

  function validateEmail(email: string) {
    const pattern = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return pattern.test(email);
  }

  function validatePassword(password: string) {
    const pattern = new RegExp(/(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/);

    return pattern.test(password);
  }

  function handleStatus(status: number) {
    switch (status) {
      case 200:
        window.alert('Konto zostało poprawnie utworzone');
        break;

      case 400:
        window.alert('Konto o takim adresie e-mail już istnieje');
        break;

      case 404:
        window.alert('Nie odnaleziono zasobu');
        break;

      default:
        window.alert('Nie odnaleziono zasobu');
        break;
    }
  }

  async function submit(event: any) {
    event.preventDefault();
    if (
      data.mail === '' ||
      data.password === '' ||
      data.repeatPassword === ''
    ) {
      window.alert('Uzupełnij wszystkie dane!');
    } else {
      if (data.password !== data.repeatPassword) {
        window.alert('Hasła różnią się!');
        return;
      }

      if (!validateEmail(data.mail)) {
        window.alert('Niepoprawny adres e-mail!');
        return;
      }

      if (!validatePassword(data.password)) {
        window.alert(
          'Hasło musi mieć co najmniej 8 znaków, jedną małą literę, jedną wielką literę i cyfrę.',
        );
        return;
      } else {
        const status = await signUp(data.mail, data.password);
        handleStatus(status);
      }
    }
  }

  return (
    <div style={styles.mainDiv}>
      <div style={styles.panel}>
        <img src={img} style={styles.icon} title={'logo'} />
        <div style={styles.name}>SW Corp.</div>
        <div style={styles.title}>Rejestracja</div>
        <Form style={styles.form}>
          <Form.Group controlId="email">
            <Form.ControlLabel style={styles.label}>
              Adres e-mail
            </Form.ControlLabel>
            <Form.Control
              type="email"
              placeholder="E-mail"
              name="email"
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
          <Form.Group controlId="repeatpassword">
            <Form.ControlLabel style={styles.label}>
              Powtórz hasło
            </Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              placeholder="Powtórz hasło"
              autoComplete="off"
              onChange={handleRepeatPassw}
              value={data.repeatPassword}
              style={styles.input}
            />
          </Form.Group>
          <Form.Group>
            <MainButton onClick={submit}>ZAREJESTRUJ SIĘ</MainButton>
          </Form.Group>
        </Form>
        <div style={styles.linkDiv}>
          <Link to="/" style={styles.link}>
            Masz już konto? Zaloguj się!
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainDiv: {
    height: '100%',
    paddingTop: '2%',
    paddingBottom: '4em',
  },

  panel: {
    backgroundColor: colorConstants.lightGrey,
    color: colorConstants.black,
    width: '40%',
    maxWidth: '28em',
    minWidth: '25em',
    height: '42em',
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
    marginBottom: '1%',
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
