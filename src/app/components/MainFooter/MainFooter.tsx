import * as React from 'react';
import Footer from 'rsuite/Footer';
import { colorConstants } from 'styles/colorConstants';
import styled from 'styled-components';

export const MainFooter = () => {
  return (
    <StyledFooter>
      © Water Treatment Lab - Wydział Inżynierii Środowiska i Energetyki -
      Politechnika Poznańska 2022
    </StyledFooter>
  );
};

const StyledFooter = styled(Footer)`
  width: 100%;
  height: 50px;
  background-color: ${colorConstants.white};
  background-opacity: 0.3;
  color: ${colorConstants.darkGrey};
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  bottom: 0;
  user-select: none;
  transition: 0.8s ease;

  &:hover {
    color: #000;
    text-shadow: 2px 2px 8px #ccc;
  }
`;
