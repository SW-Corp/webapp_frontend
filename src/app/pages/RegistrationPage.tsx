import { RegistrationPanel } from 'app/components/RegistrationPanel';
import { MainFooter } from 'app/components/MainFooter';
import * as React from 'react';
import styled from 'styled-components';

export const RegistrationPage = () => {
  return (
    <>
      <FlexedDiv>
        <RegistrationPanel />
        <MainFooter />
      </FlexedDiv>
    </>
  );
};

const FlexedDiv = styled.div`
  display: 'flex',
  flex-direction: 'column',
  justify-content: 'space-around'
`;
