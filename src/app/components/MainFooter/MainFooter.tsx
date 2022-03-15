import * as React from 'react';
import Footer from 'rsuite/Footer';
import { colorConstants } from 'styles/colorConstants';

export const MainFooter = () => {
  return <Footer style={styles}>Very Important Footer</Footer>;
};

const styles = {
  width: '100%',
  height: '50px',
  backgroundColor: colorConstants.white,
  backgroundOpacity: '0.3',
  color: colorConstants.darkGrey,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};
