import { constants } from 'buffer';
import * as React from 'react';
import Panel from 'rsuite/Panel';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logo.png';

export const LoginPanel = () => {
  return (
    <Panel style={styles}>
      <img src={img} style={istyles} />
      <div style={tstyles}>SW Corp.</div>
      <div style={dstyles}>Logowanie</div>
    </Panel>
  );
};

const styles = {
  backgroundColor: colorConstants.lightGrey,
  color: colorConstants.black,
  width: '520px',
  height: '730px',
  borderRadius: '20px',
  border: 'solid',
  borderColor: colorConstants.lightGrey,
  boxShadow: '0px 0px 10px rgba(58, 59, 60)',
};

const istyles = {
  width: '150px',
  height: '150px',
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
  marginTop: '5px',
};
