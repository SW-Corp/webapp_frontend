import { LoginPanel } from 'app/components/LoginPanel';
import { MainFooter } from 'app/components/MainFooter';
import * as React from 'react';
import styled from 'styled-components';

export const LoginPage = () => {
  return (
    <>
      <FlexedDiv>
        <LoginPanel />
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
