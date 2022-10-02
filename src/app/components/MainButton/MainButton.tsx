import * as React from 'react';
import Button from 'rsuite/Button';
import { colorConstants } from 'styles/colorConstants';
import styled from 'styled-components';

export const MainButton = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

const StyledButton = styled(Button)`
  background-color: ${colorConstants.green};
  color: ${colorConstants.white};
  width: 100%;
  height: 60px;
  border-radius: 20px;
  border: none;
  font: Roboto;
  font-size: 20px;
  font-weight: 400;
  display: block;
  margin-top: 30px;
  margin-bottom: 15px;

  &:hover {
    background-color: #49c470;
    color: ${colorConstants.white};
  }
`;
