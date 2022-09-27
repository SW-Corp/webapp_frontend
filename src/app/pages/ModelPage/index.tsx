import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Model } from 'app/components/Model';
import { IRLModel } from 'app/components/IRLModel';

import { Button, Panel, Table, Whisper, Popover, Loader, Toggle } from 'rsuite';
import { Icon } from '@rsuite/icons';

import { HiQuestionMarkCircle } from 'react-icons/hi';

import axios from 'axios';

import { baseUrl, workstation } from 'services/stationService';

const { Column, HeaderCell, Cell } = Table;

export const ModelPage = ({ currentScenario, ...props }) => {
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
      });
  };

  let data =
    typeof props.data.tanks != 'undefined'
      ? Object.values(props.data.tanks)
      : props.data.tanks;

  const loadMeasurements = () => {
    const mapMeasurements = [
      {
        name: 'Zbiornik reakcji',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny A',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny B',
        height: '0',
      },
      {
        name: 'Zbiornik filtracyjny C',
        height: '0',
      },
      {
        name: 'Zbiornik wody czystej',
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
    return mapMeasurements;
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
          width: '100%',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toggle
          checked={checkedToggle}
          checkedChildren="Na żywo"
          unCheckedChildren="Symulacja"
          onChange={() => setCheckedToggle(!checkedToggle)}
          size="lg"
        />
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
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
                <Column flexGrow={3}>
                  <StyledHeaderCell>Wysokość wody [cm]</StyledHeaderCell>
                  <Cell dataKey="height"></Cell>
                </Column>
              </Table>
            </StyledPanel>
          </ContainerDiv>
        </div>
        {checkedToggle === false ? <Model /> : <IRLModel data={props.data} />}
      </div>
    </>
  );
};

const StyledPanel = styled(Panel)`
  width: 26em;
`;

const ContainerDiv = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 10px 10px 20px;
  max-width: 350px;
  display: flex;
  row-direction: row;
  justify-content: space-around;
`;

const StyledHeaderCell = styled(HeaderCell)`
  color: #000;
  font-size: 13px;
  height: auto;
`;
