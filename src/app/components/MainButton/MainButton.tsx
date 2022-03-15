import * as React from 'react';
import Button from 'rsuite/Button';
import { colorConstants } from 'styles/colorConstants';

export const MainButton = props => {
  return <Button style={styles}>{props.children}</Button>;
};

const styles = {
  backgroundColor: colorConstants.green,
  color: colorConstants.black,
  width: '420px',
  height: '60px',
  borderRadius: '20px',
  border: 'none',
  font: 'Roboto',
  fontSize: '20px',
  fontWeight: '400',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '40px',
  marginBottom: '20px',
};
