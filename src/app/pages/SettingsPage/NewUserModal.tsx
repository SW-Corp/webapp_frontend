import React, { useState } from 'react';
import { Form, Modal, Button, Placeholder } from 'rsuite';
import axios from 'axios';
import { baseUrl } from 'services/stationService';

export const NewUserModal = ({ isOpen, handleClose, ...props }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  // ugly workaround of typescript strict type-checking
  const proxyOnChange = e => {
    setFormValue(e);
  };

  const addUser = e => {
    axios
      .post(`${baseUrl}/signup`, formValue, {
        withCredentials: true,
      })
      .then(res => {
        console.log('res ', res);
        handleClose(true);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Dodaj nowego użytkownika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={proxyOnChange} formValue={formValue}>
          <Form.Group controlId="email">
            <Form.ControlLabel>Nazwa użytkownika</Form.ControlLabel>
            <Form.Control name="email" />
            <Form.HelpText>
              Podpowiedź: Musi mieć co najmniej trzy znaki.
            </Form.HelpText>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.ControlLabel>Hasło</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addUser} color="green" appearance="primary">
          Dodaj
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Anuluj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
