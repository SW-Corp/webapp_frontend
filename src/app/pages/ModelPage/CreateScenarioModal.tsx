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

export const CreateScenarioModal = ({
  isModalOpen,
  setModalOpen,
  toaster,
  name,
  setName,
  jsonContent,
  setJsonContent,
  editMode,
  loadScenarios,
  ...props
}) => {
  const [formattedJson, setFormattedJson] = useState(jsonContent);

  const jsonOnChange = editor_payload => {
    setFormattedJson(editor_payload.jsObject);
  };

  const editScenario = () => {
    console.log(formattedJson);
    axios
      .post(`${baseUrl}/editscenario/${name}`, formattedJson, {
        withCredentials: true,
      })
      .then(res => {
        toaster.push(
          getNotification('success', 'Edytowano scenariusz scenariusz', ''),
          { placement: 'bottomEnd' },
        );
      })
      .catch(err => {
        console.log('error ', err);
        toaster.push(
          getNotification(
            'error',
            'Błąd podczas edytowania scenariusza',
            err.response.data,
          ),
          { placement: 'bottomEnd' },
        );
      });
    setModalOpen(false);
  };

  const addScenario = () => {
    if (!name) {
      toaster.push(
        getNotification(
          'error',
          'Błąd podczas dodawania scenariusza',
          'Musisz podać nazwę',
        ),
        { placement: 'bottomEnd' },
      );
      return;
    }
    console.log(formattedJson);
    axios
      .post(`${baseUrl}/addscenario/${name}`, formattedJson, {
        withCredentials: true,
      })
      .then(res => {
        loadScenarios();
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
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>
          {editMode ? (
            <h4>Edytuj scenariusz: {name}</h4>
          ) : (
            <h4>Dodaj nowy scenariusz</h4>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editMode ? (
          ''
        ) : (
          <Input
            onChange={setName}
            value={name}
            style={{ width: '50%' }}
            placeholder="Nazwa Scenariusza"
          ></Input>
        )}
        <JSONInput
          id="a_unique_id"
          onChange={jsonOnChange}
          placeholder={jsonContent}
          theme="light_mitsuketa_tribute"
          colors={{
            default: '#000000',
            error: '#FF0000',
          }}
          locale={locale}
          height="550px"
          width="100%"
          waitAfterKeyPress={0.25}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalOpen(false)}>Anuluj</Button>
        {editMode ? (
          <Button appearance="primary" color="green" onClick={editScenario}>
            Edytuj
          </Button>
        ) : (
          <Button appearance="primary" color="green" onClick={addScenario}>
            Dodaj
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
