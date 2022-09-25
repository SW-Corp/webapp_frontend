import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Button, Container, Content, SelectPicker, Stack, Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const roles = [
  { label: 'Administrator', value: 'manage_users' },
  { label: 'Student', value: 'read' },
  { label: 'Operator', value: 'write' },
];

export const SettingsPage = () => {
  const [data, setData] = useState([
    { id: 1, user: 'test', permissions: 'admin', gender: 'male' },
  ]);
  const [isLoading, setLoading] = useState(true);
  const [loggedUser, setUser] = useState(localStorage.getItem('current_user'));

  const changePermission = (user, permission) => {
    console.log(user, permission);
    axios
      .post(
        'http://localhost:8000/permission',
        { user, permission },
        { withCredentials: true },
      )
      .then(res => {
        console.log(res);
        loadUsers();
      })
      .catch(err => {
        console.log('error ', err);
      });
  };

  const loadUsers = async () => {
    axios
      .get('http://localhost:8000/users', { withCredentials: true })
      .then(data => {
        console.log(data);
        setData(
          data.data.users.map((el, idx, arr) => {
            return {
              id: idx,
              ...el,
            };
          }),
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <StyledContent>
        <h3
          style={{
            textAlign: 'center',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          Zarządzanie użytkownikami
        </h3>
        <Table
          data={data}
          bordered
          wordWrap="break-word"
          loading={isLoading}
          autoHeight={true}
        >
          <Column width={60} align="center" fixed>
            <StyledHeaderCell>ID</StyledHeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1}>
            <StyledHeaderCell>Użytkownik</StyledHeaderCell>
            <Cell dataKey="user" />
          </Column>

          <Column flexGrow={1}>
            <StyledHeaderCell>Uprawnienia</StyledHeaderCell>
            <Cell dataKey="permission">
              {rowData => (
                <SelectPicker
                  cleanable={false}
                  searchable={false}
                  value={rowData.permission}
                  defaultValue={'admin'}
                  onChange={e => {
                    changePermission(rowData.user, e);
                  }}
                  data={roles}
                />
              )}
            </Cell>
          </Column>

          <Column flexGrow={1}>
            <StyledHeaderCell>Akcje</StyledHeaderCell>
            <Cell dataKey="user">
              {rowData => (
                <Button
                  disabled={
                    rowData.user == loggedUser || rowData.user == 'connector'
                  }
                  color="red"
                  appearance="subtle"
                >
                  Usuń
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </StyledContent>
    </Container>
  );
};

const StyledContent = styled(Content)`
  margin: auto;
  width: 50%;
`;

const StyledHeaderCell = styled(HeaderCell)`
  color: #000;
`;
