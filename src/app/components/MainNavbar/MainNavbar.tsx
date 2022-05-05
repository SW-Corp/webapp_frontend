import React, { useState } from 'react';
import { colorConstants } from 'styles/colorConstants';

export const MainNavbar = props => {
  return (
    <nav>
      <div style={navigation}>
        <div
          style={props.activeTab === '1' ? itemStylesActive : itemStyles}
          id="1"
          onClick={props.handleClick}
        >
          <a
            href="/"
            style={props.activeTab === '1' ? linkStylesActive : linkStyles}
          >
            Wizualizacja
          </a>
        </div>
        <div
          style={props.activeTab === '2' ? itemStylesActive : itemStyles}
          id="2"
          onClick={props.handleClick}
        >
          <a
            href="/"
            style={props.activeTab === '2' ? linkStylesActive : linkStyles}
          >
            Dane szczegółowe
          </a>
        </div>
        <div
          style={props.activeTab === '3' ? itemStylesActive : itemStyles}
          id="3"
          onClick={props.handleClick}
        >
          <a
            href="/"
            style={props.activeTab === '3' ? linkStylesActive : linkStyles}
          >
            Dokumentacja
          </a>
        </div>
      </div>
    </nav>
  );
};

const navigation = {
  height: '75px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: colorConstants.green,
  boxShadow: '0 2px 2px 2px rgba(9, 9, 9, 0.23)',
  paddingLeft: '80px',
} as React.CSSProperties;

const itemStyles = {
  float: 'left',
  width: '33%',
} as React.CSSProperties;

const itemStylesActive = {
  float: 'left',
  width: '33%',
  boxShadow: `inset 0 -5px ${colorConstants.accentGreen}`,
} as React.CSSProperties;

const linkStyles = {
  display: 'block',
  color: colorConstants.grey,
  fontSize: '30px',
  textAlign: 'center',
  paddingTop: '12px',
  textDecoration: 'none',
} as React.CSSProperties;

const linkStylesActive = {
  display: 'block',
  color: colorConstants.white,
  fontSize: '30px',
  textAlign: 'center',
  paddingTop: '12px',
  textDecoration: 'none',
} as React.CSSProperties;
