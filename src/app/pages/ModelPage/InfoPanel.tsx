import React, { useState } from 'react';

import styled from 'styled-components';
import { Button, Modal, Placeholder } from 'rsuite';

import { BaseInfoPanel } from './BaseInfoPanel';
import { CalibrationButton } from './CalibrationButton';

export const InfoPanel = ({ currentItem, ...props }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentContainer, setCurrentContainer] = useState('');

  const toggleModal = containerid => {
    setCurrentContainer(containerid);
    setModalOpen(!isModalOpen);
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
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal} appearance="primary">
            Ok
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
            }}
            appearance="subtle"
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
