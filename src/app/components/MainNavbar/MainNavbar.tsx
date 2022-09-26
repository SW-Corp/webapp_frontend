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
    <Navbar {...props} style={styles.nav}>
      <Navbar.Brand style={styles.title}>Water Treatment Lab</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item
          eventKey="model"
          style={activeKey === 'model' ? styles.navItemActive : styles.navItem}
        >
          Wizualizacja
        </Nav.Item>
        <Nav.Item
          eventKey="details"
          style={
            activeKey === 'details' ? styles.navItemActive : styles.navItem
          }
        >
          Dane szczegółowe
        </Nav.Item>
        <Nav.Item
          eventKey="docs"
          style={activeKey === 'docs' ? styles.navItemActive : styles.navItem}
        >
          Dokumentacja
        </Nav.Item>
      </Nav>
      <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item icon={<UserIcon />} disabled style={styles.navItem}>
          {localStorage.getItem('current_user')}
        </Nav.Item>
        {localStorage.getItem('permission') === 'manage_users' && (
          <Nav.Item
            icon={<CogIcon />}
            eventKey="settings"
            style={
              activeKey === 'settings' ? styles.navItemActive : styles.navItem
            }
          >
            Ustawienia
          </Nav.Item>
        )}

        <Nav.Item
          icon={<OffRound />}
          onClick={handleLogOut}
          style={styles.navItem}
        >
          Wyloguj się
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const styles = {
  nav: {
    height: '75px',
    width: '100%',
    backgroundColor: colorConstants.green,
    boxShadow: '0 2px 2px 2px rgba(9, 9, 9, 0.23)',
    justifyContent: 'space-between',
    userSelect: 'none' /* Standard */,
    margin: 0,
  } as React.CSSProperties,

  title: {
    height: '75px',
    fontSize: '35px',
    lineHeight: '35px',
    color: colorConstants.white,
    fontWeight: 'bold',
  },

  navItem: {
    height: '75px',
    fontSize: '25px',
    lineHeight: '25px',
    color: colorConstants.white,
    fontWeight: '500',
  },

  navItemActive: {
    height: '75px',
    fontSize: '25px',
    lineHeight: '25px',
    color: colorConstants.white,
    fontWeight: '600',
    borderBottom: '5px solid',
    borderBottomColor: colorConstants.accentGreen,
  },
};
