import React from 'react';
import styled from 'styled-components';

import { Container, Panel } from 'rsuite';

export const DetailsPage = () => {
  return (
    <StyledContainer>
      <StyledPanel header={<h4>Dane szczegółowe</h4>} shaded>
        <p>
          Tutaj zostaną wyświetlone dane tabelaryczne z wykresami pokazującymi
          zmianę mierzonych parametrów w czasie.
        </p>
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
