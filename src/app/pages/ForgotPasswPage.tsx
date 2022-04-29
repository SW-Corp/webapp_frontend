import { ForgotPasswPanel } from 'app/components/ForgotPasswPanel';
import { MainFooter } from 'app/components/MainFooter';
import * as React from 'react';
import styled from 'styled-components';

export const ForgotPasswPage = () => {
  return (
    <>
      <FlexedDiv>
        <ForgotPasswPanel />
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
