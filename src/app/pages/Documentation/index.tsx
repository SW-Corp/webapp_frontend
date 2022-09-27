import React from 'react';
import styled from 'styled-components';

import { Container, Panel } from 'rsuite';

import { Icon } from '@rsuite/icons';

import { ReactComponent as QRCode } from './github_qr_code.svg';

export const Documentation = () => {
  return (
    <StyledContainer>
      <StyledPanel header={<h4>Dokumentacja</h4>} shaded>
        <p>
          Dokumentacja do projektu została skompletowana w postaci publicznie
          dostępnych repozytoriów na github.com. Kliknij{' '}
          <b>
            <a href="https://github.com/WaterTreatmentLab/">tutaj</a>
          </b>{' '}
          lub zeskanuj poniższy kod QR żeby przejść do strony projektu.
        </p>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Icon as={QRCode} style={{ fontSize: '200px' }} />
        </div>
      </StyledPanel>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 20px;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  flex: 1;
  width: 50%;
  margin: auto;
`;
