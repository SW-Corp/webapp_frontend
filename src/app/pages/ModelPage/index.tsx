import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Model } from 'app/components/Model';

import { Button, Panel, Table, Whisper, Popover, Loader } from 'rsuite';
import { Icon } from '@rsuite/icons';

import { HiQuestionMarkCircle } from 'react-icons/hi';

import axios from 'axios';

import { baseUrl, workstation } from 'services/stationService';

const { Column, HeaderCell, Cell } = Table;

export const ModelPage = ({ currentScenario, ...props }) => {
  const [isTableLoading, setTableLoading] = useState(true);
  const [scenarios, setScenarios] = useState([
    { id: '1', name: 'Scenario #1' },
  ]);
  const [perm, setPerm] = useState(localStorage.getItem('permission'));

  const loadScenarios = () => {
    axios
      .get('http://10.8.0.9:8000/scenarios', { withCredentials: true })
      .then(res => {
        console.log(res);
        setScenarios(
          res.data.scenarios.map((el, idx, arr) => {
            return { id: idx, name: el.name, description: el.description };
          }),
        );
        setTableLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const playScenario = name => {
    axios
      .post(`${baseUrl}/scenario/${workstation}/${name}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log('post scenario: ', res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const PopoverCell = props => {
    const speaker = (
      <Popover title="Opis">
        <p>{props.rowData.description}</p>
      </Popover>
    );
    return (
      <Whisper placement="topStart" speaker={speaker}>
        <Cell {...props} dataKey={props.dataKey} className="link-group"></Cell>
      </Whisper>
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ContainerDiv>
          <StyledPanel
            header={
              <Whisper
                placement="topStart"
                speaker={
                  <Popover>
                    <p>
                      Stacja umożliwia odegranie wybranego <i>scenariusza</i>,
                      czyli sekwencji komend sterujących stacją w celu
                      osiągnięcia określonego stanu.
                    </p>
                  </Popover>
                }
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h5>Scenariusze</h5>
                  <Icon
                    fill="green"
                    width="30px"
                    height="30px"
                    as={HiQuestionMarkCircle}
                    style={{ fontSize: '25px' }}
                  />
                </div>
              </Whisper>
            }
            shaded
          >
            <Table
              data={scenarios}
              autoHeight={true}
              loading={isTableLoading}
              wordWrap="break-word"
            >
              <Column flexGrow={1}>
                <StyledHeaderCell>Nazwa</StyledHeaderCell>
                <PopoverCell dataKey="name" />
              </Column>
              <Column>
                <StyledHeaderCell>Akcje</StyledHeaderCell>
                <Cell dataKey="user">
                  {rowData => {
                    if (currentScenario == rowData.name) {
                      return (
                        <Loader speed="slow" vertical content="W trakcie..." />
                      );
                    } else {
                      return (
                        <Button
                          color="green"
                          appearance="primary"
                          disabled={
                            perm == 'read' || currentScenario.length > 0
                          }
                          onClick={() => {
                            playScenario(rowData.name);
                          }}
                        >
                          Rozpocznij
                        </Button>
                      );
                    }
                  }}
                </Cell>
              </Column>
            </Table>
          </StyledPanel>
        </ContainerDiv>
        <Model />
      </div>
    </>
  );
};

const StyledPanel = styled(Panel)`
  width: 100%;
`;

const ContainerDiv = styled.div`
  padding: 10px 10px 10px 20px;
  max-width: 350px;
  flex: 1;
`;

const StyledHeaderCell = styled(HeaderCell)`
  color: #000;
  font-size: 13px;
`;
