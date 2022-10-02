import React, { useEffect } from 'react';

import styled from 'styled-components';
import { Panel } from 'rsuite';

import { BaseInfoPanel } from './BaseInfoPanel';
import { CalibrationButton } from './CalibrationButton';

export const InfoPanel = ({ currentItem, ...props }) => {
  return currentItem.length > 0 ? (
    {
      pumps: <BaseInfoPanel fromJson="infoPump" />,
      helpContainer: (
        <BaseInfoPanel fromJson="infoHelpContainer">
          <CalibrationButton container="C2" /> <br />
          <CalibrationButton container="C3" /> <br />
          <CalibrationButton container="C4" />
        </BaseInfoPanel>
      ),
      stop: <BaseInfoPanel fromJson="infoStop" />,
      C1: (
        <BaseInfoPanel fromJson="infoMainContainer">
          <CalibrationButton container="C1" />
        </BaseInfoPanel>
      ),
      C5: (
        <BaseInfoPanel fromJson="infoEndContainer">
          <CalibrationButton container="C5" />
        </BaseInfoPanel>
      ),
      valves: <BaseInfoPanel fromJson="infoValve" />,
      finalPump: <BaseInfoPanel fromJson="infoEndPump" />,
      engine: <BaseInfoPanel fromJson="infoEngine" />,
    }[currentItem]
  ) : (
    <></>
  );
};
