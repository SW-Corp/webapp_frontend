import { constants } from 'buffer';
import * as React from 'react';
import { Panel, Form, Input } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { MainButton } from 'app/components/MainButton/MainButton';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export const LoginPanel = () => {
  return (
    <Panel style={styles}>
      <img src={img} style={istyles} />
      <div style={tstyles}>SW Corp.</div>
      <div style={dstyles}>Logowanie</div>
      <Form style={fstyles}>
        <Form.Group controlId="name">
          <Form.ControlLabel style={lstyles}>
            Nazwa użytkownika
          </Form.ControlLabel>
          <Form.Control name="name" style={cstyles} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel style={lstyles}>Hasło</Form.ControlLabel>
          <Form.Control
            name="password"
            type="password"
            autoComplete="off"
            style={cstyles}
          />
        </Form.Group>
        <Form.Group>
          <MainButton>ZALOGUJ SIĘ</MainButton>
        </Form.Group>
      </Form>
      <div style={divstyles}>
        Nie masz konta?
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          Zarejestruj się!
        </a>
      </div>
      <div style={divstyles}>
        <a href="https://www.youtube.com/">Zapomniałeś hasła?</a>
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
  marginTop: '5%',
};

const istyles = {
  width: '26%',
  height: '20%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '30px',
};

const tstyles = {
  font: 'Red Hat Text',
  color: colorConstants.black,
  fontSize: '30px',
  fontWeight: '400',
  display: 'flex',
  justifyContent: 'center',
};

const dstyles = {
  display: 'flex',
  justifyContent: 'center',
  font: 'Roboto',
  fontSize: '40px',
  fontWeight: '500',
  marginTop: '1%',
  marginBottom: '1%',
};

const fstyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'center',
};

const lstyles = {
  font: 'Roboto !important',
  fontSize: '14px',
  paddingLeft: '15px',
};

const cstyles = {
  width: '420px',
  height: '60px',
  borderRadius: '20px',
  border: 'solid',
  borderColor: colorConstants.green,
  borderWidth: '2px',
};

const divstyles = {
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '10px',
};
