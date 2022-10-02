import React, { useState } from 'react';
import { Form, Modal, Button, Placeholder } from 'rsuite';
import axios from 'axios';
import { baseUrl } from 'services/stationService';

export const ShutdownModal = ({ isOpen, handleClose, ...props }) => {
  const confirm = e => {
    axios
      .post(
        `${baseUrl}/shutdown`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log('res ', res);
        handleClose(true);
      })
      .catch(err => {
        console.log('err', err);
        handleClose(false);
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose(false)}
      style={{ marginTop: '50px' }}
    >
      <Modal.Header>
        <Modal.Title>Wyłączanie stanowiska</Modal.Title>
      </Modal.Header>
      <Modal.Body>Czy jesteś pewien, że chcesz wyłączyć stanowisko?</Modal.Body>
      <Modal.Footer>
        <Button onClick={confirm} color="red" appearance="primary">
          Tak
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Nie
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
