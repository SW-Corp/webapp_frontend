import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import axios from 'axios';
import { baseUrl } from 'services/stationService';

export const ShutdownButton = ({ ...props }) => {
  const [isOpen, setOpen] = useState(false);

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
        setOpen(false);
      })
      .catch(err => {
        console.log('err', err);
        setOpen(false);
      });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setOpen(false)}
        style={{ marginTop: '50px' }}
      >
        <Modal.Header>
          <Modal.Title>Wyłączanie stanowiska</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy jesteś pewien, że chcesz wyłączyć stanowisko?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirm} color="red" appearance="primary">
            Tak
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Nie
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        color="red"
        appearance="primary"
        onClick={() => {
          setOpen(true);
        }}
        {...props}
      >
        Wyłącz stanowisko
      </Button>
    </>
  );
};
