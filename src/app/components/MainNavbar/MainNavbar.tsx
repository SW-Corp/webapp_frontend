import React, { useState } from 'react';
import { logOut } from 'services/userService';
import { colorConstants } from 'styles/colorConstants';
import img from '../../../icons/logout.png';

import { Nav, Navbar } from 'rsuite';

import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import UserIcon from '@rsuite/icons/legacy/User';
import OffRound from '@rsuite/icons/OffRound';

export const MainNavbar = ({ onSelect, activeKey, ...props }) => {
  function handleStatus(status: number) {
    switch (status) {
      case 200:
        props.setIsLoggedIn(false);
        break;

      case 400:
        window.alert('Nieznany błąd');
        break;

      case 401:
        window.alert('Nieautoryzowany dostęp');
        break;

      case 403:
        window.alert('Nieautoryzowany dostęp');
        break;

      case 404:
        window.alert('Nie odnaleziono zasobu');
        break;

      default:
        window.alert('Nieznany błąd');
        break;
    }
  }

  async function handleLogOut() {
    const status = await logOut();
    console.log(status);
    handleStatus(status);
  }

  function download() {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(':)'),
    );
    element.setAttribute('download', 'aa.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <Navbar {...props}>
      <Navbar.Brand>Water Treatment Lab</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="model">Wizualizacja</Nav.Item>
        <Nav.Item eventKey="details">Dane szczegółowe</Nav.Item>
        <Nav.Item eventKey="docs">Dokumentacja</Nav.Item>
      </Nav>
      <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item icon={<UserIcon />}>email@student.put.poznan.pl</Nav.Item>
        <Nav.Item icon={<CogIcon />} eventKey="settings">
          Ustawienia
        </Nav.Item>
        <Nav.Item icon={<OffRound />} onClick={handleLogOut}>
          Wyloguj się
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const nav = {
  height: '75px',
  width: '100%',
  backgroundColor: colorConstants.green,
  boxShadow: '0 2px 2px 2px rgba(9, 9, 9, 0.23)',
  display: 'flex',
  justifyContent: 'flex-end',
  userSelect: 'none' /* Standard */,
} as React.CSSProperties;

const navigation = {
  height: '75px',
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  paddingLeft: '75px',
  paddingRight: '0px',
} as React.CSSProperties;

const itemStyles = {
  float: 'left',
  width: '34%',
} as React.CSSProperties;

const itemStylesActive = {
  float: 'left',
  width: '34%',
  boxShadow: `inset 0 -5px ${colorConstants.accentGreen}`,
} as React.CSSProperties;

const linkStyles = {
  display: 'block',
  color: colorConstants.grey,
  fontSize: '33px',
  textAlign: 'center',
  paddingTop: '12px',
  textDecoration: 'none',
} as React.CSSProperties;

const linkDocsStyles = {
  display: 'block',
  color: colorConstants.white,
  fontSize: '33px',
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

const iconStyles = {
  color: colorConstants.white,
  width: '35px',
  height: '35px',
  marginTop: '20px',
  marginRight: '20px',
} as React.CSSProperties;
