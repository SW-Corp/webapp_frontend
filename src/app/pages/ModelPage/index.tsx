import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Model } from 'app/components/Model';
import { IRLModel } from 'app/components/IRLModel';

import {
  Button,
  Panel,
  Table,
  Whisper,
  Popover,
  Loader,
  Toggle,
  Notification,
} from 'rsuite';
import { Icon } from '@rsuite/icons';

import Switch from 'react-switch';

import { HiQuestionMarkCircle } from 'react-icons/hi';

import axios from 'axios';

import { baseUrl, workstation } from 'services/stationService';
import { colorConstants } from 'styles/colorConstants';

const { Column, HeaderCell, Cell } = Table;
function getNotification(status, header, message) {
  return (
    <Notification type={status} header={header}>
      {message}
    </Notification>
  );
}

export const ModelPage = ({ currentScenario, toaster, ...props }) => {
  const [checkedToggle, setCheckedToggle] = useState(false);
  const [isTableLoading, setTableLoading] = useState(true);
  const [scenarios, setScenarios] = useState([
    { id: '1', name: 'Scenario #1' },
  ]);
  const [perm, setPerm] = useState(localStorage.getItem('permission'));

  const loadScenarios = () => {
    axios
      .get(`${baseUrl}/scenarios`, { withCredentials: true })
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
        toaster.push(
          getNotification(
            'error',
            'Błąd podczas wykonywania listowania scenariuszy',
            err.response.data,
          ),
          { placement: 'bottomEnd' },
        );
      });
  };

  let data =
    typeof props.data.tanks != 'undefined'
      ? Object.values(props.data.tanks)
      : props.data.tanks;

  const loadMeasurements = () => {
    const mapMeasurements = [
      {
        name: 'Zbiornik reakcji - C1',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny C2',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny C3',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny C4',
        height: '0',
      },
      {
        name: 'Zbiornik wody czystej - C5',
        height: '0',
      },
    ];
    if (typeof props.data.tanks != 'undefined') {
      mapMeasurements[0].height = props.data.tanks.C1.water_level.toString();
      mapMeasurements[1].height = props.data.tanks.C2.water_level.toString();
      mapMeasurements[2].height = props.data.tanks.C3.water_level.toString();
      mapMeasurements[3].height = props.data.tanks.C4.water_level.toString();
      mapMeasurements[4].height = props.data.tanks.C5.water_level.toString();
    }

    for (let i = 0; i < 5; i++) {
      mapMeasurements[i].height = parseFloat(mapMeasurements[i].height)
        .toFixed(1)
        .toString();
    }
    return mapMeasurements;
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const playScenario = name => {
    axios
      .post(
        `${baseUrl}/scenario/${workstation}/${name}`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log('post scenario: ', res);
      })
      .catch(err => {
        console.error(err);
        if (err.response.status == 400) {
          toaster.push(
            getNotification(
              'error',
              'Błąd podczas wykonywania scenariusza',
              'Warunki początkowe scenariusza nie zostały spełnione',
            ),
            { placement: 'bottomEnd' },
          );
        } else {
          toaster.push(
            getNotification(
              'error',
              'Błąd podczas wykonywania scenariusza',
              err.response.data,
            ),
            { placement: 'bottomEnd' },
          );
        }
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
          flexDirection: 'row',
          /*alignItems: 'center',*/
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '350px',
          }}
        >
          <ContainerDiv>
            <label htmlFor="small-radius-switch" style={{ paddingTop: '10px' }}>
              <Switch
                className="react-switch"
                id="small-radius-switch"
                checked={checkedToggle}
                onChange={() => setCheckedToggle(!checkedToggle)}
                height={40}
                width={145}
                onColor={colorConstants.green}
                uncheckedIcon={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                      fontSize: 20,
                      paddingRight: '10px',
                      color: '#eee',
                    }}
                  >
                    Symulacja
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '140px',
                      fontSize: 20,
                      paddingRight: '20px',
                      color: 'white',
                    }}
                  >
                    Na żywo
                  </div>
                }
              />
            </label>
          </ContainerDiv>
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
                      style={{ fontSize: '25px', cursor: 'pointer' }}
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
                          <Loader
                            speed="slow"
                            vertical
                            content="W trakcie..."
                          />
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
                            style={{ cursor: 'pointer' }}
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
          <ContainerDiv>
            <StyledPanel
              header={
                <Whisper
                  placement="topStart"
                  speaker={
                    <Popover>
                      <p>
                        Tabela przedstawiająca aktualną wysokość wody w
                        poszczególnych zbiornikach.
                      </p>
                    </Popover>
                  }
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <h5>Pomiary</h5>
                    <Icon
                      fill="green"
                      width="30px"
                      height="30px"
                      as={HiQuestionMarkCircle}
                      style={{ fontSize: '25px', cursor: 'pointer' }}
                    />
                  </div>
                </Whisper>
              }
              shaded
            >
              <Table
                data={loadMeasurements()}
                autoHeight={true}
                wordWrap="break-word"
              >
                <Column flexGrow={2}>
                  <StyledHeaderCell>Nazwa</StyledHeaderCell>
                  <Cell dataKey="name" />
                </Column>
                <Column flexGrow={3} align="center">
                  <StyledHeaderCell>Wysokość wody [cm]</StyledHeaderCell>
                  <Cell dataKey="height"></Cell>
                </Column>
              </Table>
            </StyledPanel>
          </ContainerDiv>
        </div>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {checkedToggle === false ? <Model /> : <IRLModel data={props.data} />}
          <div style={{ flex: '0.5' }}>
            <StyledPanel header={<p>Test</p>} shaded></StyledPanel>
          </div>
        </div>
      </div>
    </>
  );
};

const StyledPanel = styled(Panel)`
  flex: 1;
`;

const ContainerDiv = styled.div`
  padding: 10px 10px 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeaderCell = styled(HeaderCell)`
  color: #000;
  font-size: 13px;
  height: auto;
`;

const StyledToggle = styled(Toggle)`
  z-index: 0;
  padding-top: 10px;
`;
