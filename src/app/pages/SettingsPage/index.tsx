import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PlusIcon from '@rsuite/icons/Plus';
import { useToaster } from 'rsuite/toaster';
import { baseUrl } from 'services/stationService';
import { NewUserModal } from './NewUserModal';
import { ShutdownModal } from './ShutdownModal';

import {
  IconButton,
  Button,
  Container,
  Content,
  SelectPicker,
  Stack,
  Table,
  Notification,
} from 'rsuite';

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShutdownModalOpen, setShutdownModalOpen] = useState(false);
  const toaster = useToaster();

  const changePermission = (user, permission) => {
    console.log(user, permission);
    axios
      .post(
        `${baseUrl}/permission`,
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
    axios.get(`${baseUrl}/users`, { withCredentials: true }).then(data => {
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

  const deleteUser = userToDelete => {
    axios
      .delete(`${baseUrl}:8000/user`, {
        data: { email: userToDelete },
        withCredentials: true,
      })
      .then(res => {
        console.log('res', res);
        toaster.push(
          <Notification type="success" header="Sukces!">
            Użytkownik usunięty pomyślnie
          </Notification>,
          { placement: 'bottomEnd' },
        )!;
        loadUsers();
      })
      .catch(err => {
        console.error(err);
        toaster.push(
          <Notification type="error" header="Błąd">
            Wystąpił błąd podczas usuwania użytkownika.
          </Notification>,
          { placement: 'bottomEnd' },
        )!;
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
                  onClick={() => {
                    deleteUser(rowData.user);
                  }}
                >
                  Usuń
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
        <IconButton
          icon={<PlusIcon />}
          color="green"
          appearance="primary"
          style={{ marginTop: '20px' }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Dodaj nowego użytkownika
        </IconButton>
        <h3
          style={{
            textAlign: 'center',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          Zarządzanie stanowiskiem
        </h3>
        <div style={{ textAlign: 'center' }}>
          <Button
            color="red"
            appearance="primary"
            onClick={() => {
              setShutdownModalOpen(true);
            }}
          >
            Wyłącz stanowisko
          </Button>
        </div>
      </StyledContent>
      <ShutdownModal
        isOpen={isShutdownModalOpen}
        handleClose={() => {
          setShutdownModalOpen(false);
        }}
      />
      <NewUserModal
        isOpen={isModalOpen}
        handleClose={(isAdded: boolean = false) => {
          setModalOpen(false);
          if (isAdded) {
            loadUsers();
            toaster.push(
              <Notification type="success" header="Sukces!">
                Użytkownik utworzony pomyślnie.
              </Notification>,
              { placement: 'bottomEnd' },
            );
          }
        }}
      />
    </Container>
  );
};

const StyledContent = styled(Content)`
  margin: auto;
  width: 50%;
`;

const StyledHeaderCell = styled(HeaderCell)`
  color: #000;
  font-size: 14px;
`;
