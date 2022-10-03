import React, { useState } from 'react';
import { Button, Modal, Input, Notification } from 'rsuite';
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import { baseUrl } from 'services/stationService';

import locale from 'react-json-editor-ajrm/locale/en';
function getNotification(status, header, message) {
  return (
    <Notification type={status} header={header}>
      {message}
    </Notification>
  );
}
const sampleScenario = {
  initial_conditions: {
    operator: 'and',
    conditionlist: [
      {
        type: 'more',
        measurement: 'water_level',
        field: 'C1',
        value: 5,
      },
      {
        type: 'less',
        measurement: 'water_level',
        field: 'C2',
        value: 5,
      },
    ],
  },
  description: 'Desc',
  tasks: [
    {
      action: 'is_on',
      target: 'P1',
      value: 1,
    },
    {
      action: 'is_on',
      target: 'P1',
      value: 0,
      ttl: 30,
      conditions: {
        operator: 'and',
        conditionlist: [
          {
            type: 'more',
            measurement: 'water_level',
            field: 'C2',
            value: 5,
          },
        ],
      },
    },
  ],
};
export const CreateScenarioModal = ({
  isModalOpen,
  setModalOpen,
  toaster,
  ...props
}) => {
  const [name, setName] = useState('');
  const addScenario = () => {
    if (!name) {
      return;
    }
    const scenario = ''; //TODO get scenario from editor
    axios
      .post(
        `${baseUrl}/addscenario/${name}`,
        { scenario },
        { withCredentials: true },
      )
      .then(res => {
        toaster.push(
          getNotification(
            'success',
            'Dodano nowy scenariusz',
            `Nazwa scenariusza: ${name}`,
          ),
          { placement: 'bottomEnd' },
        );
      })
      .catch(err => {
        console.log('error ', err);
        toaster.push(
          getNotification(
            'error',
            'Błąd podczas wykonywania dodawania scenariusza',
            err.response.data,
          ),
          { placement: 'bottomEnd' },
        );
      });
    setModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        setModalOpen(false);
        setName('');
      }}
      style={{ marginTop: '50px' }}
    >
      <Modal.Header>
        <Modal.Title>
          <h4>Dodaj nowy scenariusz</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          onChange={setName}
          value={name}
          style={{ width: '50%' }}
          placeholder="Nazwa Scenariusza"
        ></Input>
        <JSONInput
          id="a_unique_id"
          placeholder={sampleScenario}
          theme="light_mitsuketa_tribute"
          colors={{
            default: '#000000',
          }}
          locale={locale}
          height="550px"
          width="100%"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalOpen(false)}>Anuluj</Button>
        <Button appearance="primary" color="green" onClick={addScenario}>
          Dodaj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
