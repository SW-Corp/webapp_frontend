import React, { useEffect } from 'react';

import styled from 'styled-components';
import { Panel } from 'rsuite';

import * as data from 'app/components/Model/data.json';

export const BaseInfoPanel = props => {
  return (
    <StyledPanel
      header={
        <h5>
          {props.fromJson ? data[props.fromJson].title : props.title || ''}
        </h5>
      }
      shaded
    >
      {props.fromJson && (
        <>
          <p>{data[props.fromJson].text}</p>
          <br />
        </>
      )}
      {props.children}
    </StyledPanel>
  );
};

const StyledPanel = styled(Panel)`
  flex: 1;
`;
