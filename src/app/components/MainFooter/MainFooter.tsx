import * as React from 'react';
import Footer from 'rsuite/Footer';
import { colorConstants } from 'styles/colorConstants';

export const MainFooter = () => {
  return (
    <Footer style={styles.footer}>
      © 2022 Politechnika Poznańska - Water Treatment Lab
    </Footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    height: '50px',
    backgroundColor: colorConstants.white,
    backgroundOpacity: '0.3',
    color: colorConstants.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'fixed' as 'fixed',
    bottom: '0',
    userSelect: 'none' /* Standard */,
  } as React.CSSProperties,
};
