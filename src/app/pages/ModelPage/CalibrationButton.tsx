import React, { useState } from 'react';

import { Button } from 'rsuite';

export const CalibrationButton = ({ container, ...props }) => {
  return (
    <div>
      <Button
        disabled={localStorage.getItem('permission') == 'read'}
        color="green"
        appearance="primary"
        onClick={() => {
          props.toggleModal(container);
        }}
      >
        Kalibruj czujnik w zbiorniku {container}
      </Button>
    </div>
  );
};
