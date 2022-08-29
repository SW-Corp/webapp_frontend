import { LoginPanel } from 'app/components/LoginPanel';
import { MainFooter } from 'app/components/MainFooter';
import React, { useState } from 'react';
import styled from 'styled-components';

export const LoginPage = props => {
  return (
    <>
      <FlexedDiv>
        <LoginPanel
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
        />
        <MainFooter />
      </FlexedDiv>
    </>
  );
};

const FlexedDiv = styled.div`
  height: '100%',
  display: 'flex',
  flex-direction: 'column',
  justify-content: 'space-around',
`;
