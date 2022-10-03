import React, { useState } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { Button, Modal, Placeholder } from 'rsuite';

import { BaseInfoPanel } from './BaseInfoPanel';
import { CalibrationButton } from './CalibrationButton';
import { baseUrl, workstation } from 'services/stationService';

export const InfoPanel = ({ currentItem, ...props }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentContainer, setCurrentContainer] = useState('');
  const [isModalLoading, setModalLoading] = useState(false);

  const toggleModal = containerid => {
    setCurrentContainer(containerid);
    setModalOpen(!isModalOpen);
  };

  const sendCalibrationRequest = e => {
    setModalLoading(true);

    axios
      .post(
        `${baseUrl}/calibrate/${workstation}/${currentContainer}`,
        {},
        { withCredentials: true },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('error ', err);
      })
      .finally(() => {
        setModalLoading(false);
      });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        style={{ marginTop: '50px' }}
      >
        <Modal.Header>
          <Modal.Title>
            Kalibracja czujnika w zbiorniku {currentContainer}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Żeby skalibrować czujnik w zbiorniku {currentContainer}, wykonaj
            poniższe kroki:
          </p>
          <br />
          <ol>
            <li>
              Opróżnij zbiornik z użyciem{' '}
              {['C1', 'C5'].includes(currentContainer) ? 'pompy' : 'zaworu'}.
              <br />
              W zbiorniku powinna zostać woda zgromadzona do wysokości ok. 1cm
              ze względu na nakrętkę przy odpływie.
              <br />
              Możliwa jest sytuacja cofnięcia się wody z węży do zbiornika.
              Postaraj się opróżnić zbiornik tak bardzo jak to możliwe.
            </li>
            <li>
              Napełnij zbiornik wodą do wysokości <b>10cm</b>.
            </li>
            <li>
              Upewnij się, że woda jest na poziomie <b>10cm</b> zgodnie z miarką
              na zbiorniku i kliknij przycisk <i>Gotowe</i>.
              <br />
              <b>Uwaga!</b> Kliknięcie przycisku <i>Gotowe</i> oznacza wpisanie
              nowych ustawień do bazy danych. Jest to operacja nieodwracalna.
              Powrót do poprzednich ustawień nie jest możliwy.
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={sendCalibrationRequest}
            color="green"
            appearance="primary"
            loading={isModalLoading}
          >
            Gotowe
          </Button>
          <Button
            onClick={() => {
              toggleModal(currentContainer);
            }}
            appearance="primary"
            color="red"
          >
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
      {currentItem.length > 0 ? (
        {
          pumps: <BaseInfoPanel fromJson="infoPump" />,
          helpContainer: (
            <BaseInfoPanel fromJson="infoHelpContainer">
              <CalibrationButton container="C2" toggleModal={toggleModal} />{' '}
              <br />
              <CalibrationButton
                container="C3"
                toggleModal={toggleModal}
              />{' '}
              <br />
              <CalibrationButton container="C4" toggleModal={toggleModal} />
            </BaseInfoPanel>
          ),
          stop: <BaseInfoPanel fromJson="infoStop" />,
          C1: (
            <BaseInfoPanel fromJson="infoMainContainer">
              <CalibrationButton container="C1" toggleModal={toggleModal} />
            </BaseInfoPanel>
          ),
          C5: (
            <BaseInfoPanel fromJson="infoEndContainer">
              <CalibrationButton container="C5" toggleModal={toggleModal} />
            </BaseInfoPanel>
          ),
          valves: <BaseInfoPanel fromJson="infoValve" />,
          finalPump: <BaseInfoPanel fromJson="infoEndPump" />,
          engine: <BaseInfoPanel fromJson="infoEngine" />,
        }[currentItem]
      ) : (
        <></>
      )}{' '}
    </>
  );
};
