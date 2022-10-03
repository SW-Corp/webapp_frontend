import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { careas, Model } from 'app/components/Model';
import { InfoPanel } from './InfoPanel';

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

import { useStore } from 'store/configureStore';
import { Mode } from 'utils/types';

const { Column, HeaderCell, Cell } = Table;
function getNotification(status, header, message) {
  return (
    <Notification type={status} header={header}>
      {message}
    </Notification>
  );
}

export const ModelPage = ({ currentScenario, toaster, ...props }) => {
  const [isTableLoading, setTableLoading] = useState(true);
  const [currentInfoItem, setInfoItem] = useState('');

  const {
    simulationState: { volumes },
    currentMode,
    switchMode,
    realState,
  } = useStore();

  const [measurements, setMeasurements] =
    useState<{ name: string; height: string }[]>();

  const handleInfoItemChange = elem => {
    elem != currentInfoItem ? setInfoItem(elem) : setInfoItem('');
  };

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
    mapMeasurements[0].height = (
      currentMode == Mode.real
        ? realState.tanks.C1.water_level
        : (volumes[`C${1}`] * 1000) / careas[`C${1}`]
    ).toFixed(1);
    mapMeasurements[1].height = (
      currentMode == Mode.real
        ? realState.tanks.C2.water_level
        : (volumes[`C${2}`] * 1000) / careas[`C${2}`]
    ).toFixed(1);
    mapMeasurements[2].height = (
      currentMode == Mode.real
        ? realState.tanks.C3.water_level
        : (volumes[`C${3}`] * 1000) / careas[`C${3}`]
    ).toFixed(1);
    mapMeasurements[3].height = (
      currentMode == Mode.real
        ? realState.tanks.C4.water_level
        : (volumes[`C${4}`] * 1000) / careas[`C${4}`]
    ).toFixed(1);
    mapMeasurements[4].height = (
      currentMode == Mode.real
        ? realState.tanks.C5.water_level
        : (volumes[`C${5}`] * 1000) / careas[`C${5}`]
    ).toFixed(1);

    setMeasurements(mapMeasurements);
  };

  useEffect(() => {
    loadScenarios();
    loadMeasurements();
  }, []);

  useEffect(() => {
    loadMeasurements();
  }, [currentMode, realState, volumes]);

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
                checked={currentMode == Mode.real}
                onChange={switchMode}
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
                autoHeight={false}
                loading={isTableLoading}
                wordWrap="break-word"
              >
                <Column flexGrow={0.55}>
                  <StyledHeaderCell>Nazwa</StyledHeaderCell>
                  <PopoverCell dataKey="name" />
                </Column>
                <Column flexGrow={0.45}>
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
                    <h5>
                      Pomiary {currentMode == Mode.simulation && '- symulacja'}
                    </h5>
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
                data={measurements}
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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            maxHeight: '90vh',
          }}
        >
          <Model
            currentInfoItem={currentInfoItem}
            setInfoItem={handleInfoItemChange}
          />

          <div
            style={{
              flex: '0.5',
            }}
          >
            <InfoPanel currentItem={currentInfoItem} />
          </div>
        </div>
      </div>
    </>
  );
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
