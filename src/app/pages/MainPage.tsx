import { MainFooter } from 'app/components/MainFooter';
import { MainNavbar } from 'app/components/MainNavbar';
import { MainSidebar } from 'app/components/MainSidebar';
import { colorConstants } from 'styles/colorConstants';
import { Model } from 'app/components/Model';
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Notification } from 'rsuite';
import { useToaster } from 'rsuite/toaster';

const websocketBaseAddress = 'ws://127.0.0.1:8000/';

function getNotification(status, header, message) {
  console.log('error');
  return (
    <Notification type={status} header={header}>
      {message}
    </Notification>
  );
}
export const MainPage = props => {
  const [activeTab, setActiveTab] = useState(true);
  const toaster = useToaster();

  const notificationsclient = new W3CWebSocket(
    websocketBaseAddress + 'subscribe/notifications',
  );
  const stateClient = new W3CWebSocket(
    websocketBaseAddress + 'subscribe/state',
  );

  stateClient.onerror = () => {
    toaster.push(
      getNotification('error', 'Error', 'Error connecting to state socket'),
    );
  };

  notificationsclient.onerror = () => {
    toaster.push(
      getNotification(
        'error',
        'Error',
        'Error connecting to notification socket',
      ),
    );
  };

  useEffect(() => {
    stateClient.onopen = () => {
      console.log('WebSocket Client Connected');
      // TODO include cookie
      stateClient.send(
        JSON.stringify({ cookie: '', workstation: 'testworkstation' }),
      );
    };

    stateClient.onmessage = message => {
      console.log('Otrzymano stan stacji');
      console.log(JSON.parse(JSON.parse(message.data)));
    };

    notificationsclient.onopen = () => {
      console.log('WebSocket Client Connected');
      // TODO include cookie
      notificationsclient.send(
        JSON.stringify({ cookie: '', workstation: 'testworkstation' }),
      );
    };

    notificationsclient.onmessage = message => {
      const messagejson = JSON.parse(JSON.parse(message.data));
      console.log(messagejson);
      if (message.type == 'connectionerror') {
        toaster.push(getNotification('error', 'Error', messagejson.data));
      }
      switch (messagejson.status) {
        case 'success':
          toaster.push(
            getNotification(
              'success',
              'Zadanie zostało wykonane',
              JSON.stringify(messagejson.task),
            ),
          );
          break;
        case 'conditions_not_met':
          toaster.push(
            getNotification(
              'error',
              'Warunki zadania nie zostały spełnione',
              JSON.stringify(messagejson.task),
            ),
          );
          break;
        case 'connector_error':
          console.log('sraka');
          toaster.push(
            getNotification(
              'error',
              'Błąd podczas wykonywania zadania',
              'Serwer nie mógł się połączyć ze stacją',
            ),
          );
          break;
      }
    };
  }, []);

  function handleClick(event) {
    if (activeTab == false && event.target.innerHTML == 'Wizualizacja')
      console.log('zmieniam');
    setActiveTab(!activeTab);

    if (activeTab == true && event.target.innerHTML == 'Dane szczegółowe')
      setActiveTab(!activeTab);
  }

  function ReturnContent(props) {
    const content = props.content;
    if (content) return <Model />;
    else
      return (
        <table id="myTable" style={tableStyles}>
          <tr style={rowStyle}>
            <th style={rowStyle}>Name</th>
            <th style={rowStyle}>Country</th>
          </tr>
          <tr style={moreStyle}>
            <td style={moreStyle}>Berglunds snabbkop</td>
            <td style={moreStyle}>Sweden</td>
          </tr>
          <tr style={rowStyle}>
            <td style={rowStyle}>North/South</td>
            <td style={rowStyle}>UK</td>
          </tr>
          <tr style={moreStyle}>
            <td style={moreStyle}>Alfreds Futterkiste</td>
            <td style={moreStyle}>Germany</td>
          </tr>
        </table>
      );
  }

  return (
    <>
      <div style={styles}>
        <MainSidebar />
        <MainNavbar
          activeTab={activeTab}
          handleClick={handleClick}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
        />
        <ReturnContent content={activeTab} />
        <MainFooter />
      </div>
    </>
  );
};

const styles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-around',
};

const tableStyles = {
  borderSpacing: '0',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '40px',
  border: '1px solid #ddd',
};

const rowStyle = {
  textAlign: 'left',
  padding: '16px',
} as React.CSSProperties;

const moreStyle = {
  textAlign: 'left',
  padding: '16px',
  backgroundColor: colorConstants.lightGrey,
} as React.CSSProperties;
