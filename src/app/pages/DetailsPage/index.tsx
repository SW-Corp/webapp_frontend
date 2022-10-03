import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { Container, Panel, Table, useToaster, Notification } from 'rsuite';
import { baseUrl } from 'services/stationService';
const { Column, HeaderCell, Cell } = Table;

function getNotification(status, header, message) {
  return (
    <Notification type={status} header={header}>
      {message}
    </Notification>
  );
}

export const DetailsPage = () => {
  const [isTableLoading, setTableLoading] = useState(true);
  const toaster = useToaster();
  const [logs, setLogs] = useState([]);

  const loadLogs = () => {
    axios
      .get(`${baseUrl}/logs`, { withCredentials: true })
      .then(res => {
        console.log(res);
        setLogs(
          res.data.map((el, idx, arr) => {
            return {
              timestamp: new Date(el.timestamp * 1000).toLocaleTimeString(),
              log: el.log,
            };
          }),
        );
        setTableLoading(false);
      })
      .catch(err => {
        console.error(err);
        toaster.push(
          getNotification(
            'error',
            'Błąd podczas wykonywania listowania logów',
            err.response.data,
          ),
          { placement: 'bottomEnd' },
        );
      });
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <StyledContainer>
      <StyledPanel header={<h4>Dane szczegółowe</h4>} shaded>
        <p>
          Tutaj zostaną wyświetlone dane tabelaryczne z wykresami pokazującymi
          zmianę mierzonych parametrów w czasie.
        </p>
      </StyledPanel>
      <StyledPanel header={<h4>Logi</h4>} shaded>
        <Table
          data={logs}
          autoHeight={false}
          height={300}
          loading={isTableLoading}
          wordWrap="break-word"
        >
          <Column flexGrow={0.2}>
            {/* <StyledHeaderCell>Nazwa</StyledHeaderCell> */}
            <HeaderCell>Timestamp</HeaderCell>
            <Cell dataKey="timestamp"></Cell>
          </Column>
          <Column flexGrow={0.8}>
            {/* <StyledHeaderCell>Nazwa</StyledHeaderCell> */}
            <HeaderCell>Log</HeaderCell>
            <Cell dataKey="log"></Cell>
          </Column>
        </Table>
      </StyledPanel>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 20px;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  flex: 1;
  width: 50%;
  margin: auto;
`;
