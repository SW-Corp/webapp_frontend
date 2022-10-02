import React, { useCallback, useEffect, useRef, useState } from 'react';
import { addTask } from 'services/stationService';
import { colorConstants } from 'styles/colorConstants';
import data from './data.json';

import styled from 'styled-components';

type Color = 'red' | 'green';
type askColor = '#298E33' | '#73C98E';

const maxHeight = 171;

export const Model = props => {
  //States
  const [startContainerHeight, setStartContainerHeight] = useState(maxHeight);
  const [innerContainerAHeight, setInnerContainerAHeight] = useState(0);
  const [innerContainerBHeight, setInnerContainerBHeight] = useState(0);
  const [innerContainerCHeight, setInnerContainerCHeight] = useState(0);
  const [endContainerHeight, setEndContainerHeight] = useState(0);

  useEffect(() => {
    const stopButton = document.getElementById('stopButton');
    stopButton?.addEventListener('click', () => addTask('stop', 'stop', 1));
  }, []);

  const mapPompNames = [
    {
      model: 'pompa1A',
      toBackend: 'P1',
    },
    {
      model: 'pompa1B',
      toBackend: 'P2',
    },
    {
      model: 'pompa1C',
      toBackend: 'P3',
    },
    {
      model: 'pompa2A',
      toBackend: 'V1',
    },
    {
      model: 'pompa2B',
      toBackend: 'V2',
    },
    {
      model: 'pompa2C',
      toBackend: 'V3',
    },
    {
      model: 'pompa3',
      toBackend: 'P4',
    },
  ];

  function handleStatus(status: number) {
    switch (status) {
      case 200:
        window.alert('git');
        break;

      case 201:
        window.alert('git');
        break;

      case 400:
        window.alert('Nieprawidłowe zadanie');
        break;

      case 403:
        window.alert('Odmowa zadania');
        break;

      case 404:
        window.alert('Nieprawidłowe zadanie');
        break;

      default:
        window.alert('Nieznany błąd');
        break;
    }
  }

  async function formTask(color: string, name: string) {
    const target = mapPompNames.filter(({ model, toBackend }) => {
      return model === name;
    });
    const isOpen = color === 'green' ? 1 : 0;
    const status = await addTask('is_open', target[0].toBackend, isOpen);
    // handleStatus(status);
  }

  //Water
  function useWater(height: number, waterName: string, containerY: number) {
    const water = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
      water.current = document.getElementById(
        waterName,
      ) as unknown as SVGSVGElement;
    }, []);

    useEffect(() => {
      const y = containerY + maxHeight - height;

      if (water.current) {
        water.current.setAttribute('y', y.toString());
        water.current.setAttribute('height', height.toString());
      }
    }, [height]);
  }

  function handle1(h: number, pipesName: Array<string>, name: any) {
    let totalOpen = 0;
    let fillUp = 0;

    if (h === 0) {
      let colorOn;

      if (name === 'pompa1A') colorOn = '#848484';

      if (name === 'pompa1B') colorOn = '#B8B8B8';

      if (name === 'pompa1C') colorOn = '#E1E1E1';

      for (let i = 0; i < 5; i++) {
        const pipe = document.getElementById(pipesName[i]);
        pipe?.setAttribute('fill', '#E1E1E1');
      }

      for (let i = 5; i < 8; i++) {
        const pipe = document.getElementById(pipesName[i]);
        pipe?.setAttribute('fill', colorOn);
      }
    } else {
      let colorAfter;

      if (name === 'pompa1A') colorAfter = '#0075FF';

      if (name === 'pompa1B') colorAfter = '#00A3FF';

      if (name === 'pompa1C') colorAfter = '#0AD3FF';

      for (let i = 0; i < 5; i++) {
        const pipe = document.getElementById(pipesName[i]);
        pipe?.setAttribute('fill', '#0AD3FF');
      }

      for (let i = 5; i < 8; i++) {
        const pipe = document.getElementById(pipesName[i]);
        pipe?.setAttribute('fill', colorAfter);
      }

      if (
        document.getElementById('pompa1A')?.getAttribute('fill') === 'green' &&
        h > 0
      ) {
        totalOpen++;

        if (
          document.getElementById('helpWaterA')?.getAttribute('height') ===
          '171'
        ) {
          fillUp++;
        }
      }

      if (
        document.getElementById('pompa1B')?.getAttribute('fill') === 'green' &&
        h > 0
      ) {
        totalOpen++;

        if (
          document.getElementById('helpWaterB')?.getAttribute('height') ===
          '171'
        ) {
          fillUp++;
        }
      }

      if (
        document.getElementById('pompa1C')?.getAttribute('fill') === 'green' &&
        h > 0
      ) {
        totalOpen++;

        if (
          document.getElementById('helpWaterC')?.getAttribute('height') ===
          '171'
        ) {
          fillUp++;
        }
      }

      const value = totalOpen - fillUp;

      if (
        document.getElementById('pompa1A')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterA')?.getAttribute('height') !==
          '171' &&
        h > 0
      )
        setInnerContainerAHeight(h => Math.min(h + 6 / totalOpen, maxHeight));

      if (
        document.getElementById('pompa1B')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterB')?.getAttribute('height') !==
          '171' &&
        h > 0
      )
        setInnerContainerBHeight(h => Math.min(h + 6 / totalOpen, maxHeight));

      if (
        document.getElementById('pompa1C')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterC')?.getAttribute('height') !==
          '171' &&
        h > 0
      )
        setInnerContainerCHeight(h => Math.min(h + 6 / totalOpen, maxHeight));
    }

    if (totalOpen - fillUp > 0) {
      return Math.max(h - 2, 0);
    }

    return h;
  }

  function useOutputButton1(
    height: number,
    setHeight: (updateHeight: (oldHeight: number) => number) => void,
    outputPumpName: string,
    pipesName: Array<string>,
  ) {
    const [color, setColor] = useState<Color>('red');
    const button = useRef<SVGSVGElement | null>(null);
    const timer = useRef<number | null>(null);

    const handleColorChange = useCallback(
      (event: MouseEvent) => {
        const newColor = color === 'green' ? 'red' : 'green';
        let countOn = 0;

        if (button.current) {
          button.current.setAttribute('fill', newColor);

          if (newColor === 'green' && height > 0) {
            let colorAfter;

            if (button.current.getAttribute('id') === 'pompa1A')
              colorAfter = '#0075FF';

            if (button.current.getAttribute('id') === 'pompa1B')
              colorAfter = '#00A3FF';

            if (button.current.getAttribute('id') === 'pompa1C')
              colorAfter = '#0AD3FF';

            for (let i = 0; i < 5; i++) {
              const pipe = document.getElementById(pipesName[i]);
              pipe?.setAttribute('fill', '#0AD3FF');
            }

            for (let i = 5; i < 8; i++) {
              const pipe = document.getElementById(pipesName[i]);
              pipe?.setAttribute('fill', colorAfter);
            }
          } else {
            if (
              document.getElementById('pompa1A')?.getAttribute('fill') ===
              'green'
            ) {
              countOn++;
            }

            if (
              document.getElementById('pompa1B')?.getAttribute('fill') ===
              'green'
            ) {
              countOn++;
            }

            if (
              document.getElementById('pompa1C')?.getAttribute('fill') ===
              'green'
            ) {
              countOn++;
            }

            let colorOn;

            if (button.current.getAttribute('id') === 'pompa1A')
              colorOn = '#848484';

            if (button.current.getAttribute('id') === 'pompa1B')
              colorOn = '#B8B8B8';

            if (button.current.getAttribute('id') === 'pompa1C')
              colorOn = '#E1E1E1';

            if (countOn === 0) {
              for (let i = 0; i < 5; i++) {
                const pipe = document.getElementById(pipesName[i]);
                pipe?.setAttribute('fill', '#E1E1E1');
              }
            }

            for (let i = 5; i < 8; i++) {
              const pipe = document.getElementById(pipesName[i]);
              pipe?.setAttribute('fill', colorOn);
            }
          }
        }

        if (newColor === 'green') {
          timer.current = window.setInterval(() => {
            setHeight(h =>
              handle1(h, pipesName, button.current?.getAttribute('id')),
            );
          }, 250);
        } else {
          if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
          }
        }
        setColor(newColor);
      },
      [color, setHeight],
    );

    useEffect(() => {
      const elem = document.getElementById(
        outputPumpName,
      ) as unknown as SVGSVGElement;
      button.current = elem;

      elem.addEventListener('click', handleColorChange);

      return () => {
        elem.removeEventListener('click', handleColorChange);
      };
    }, [handleColorChange]);
  }

  {
    useWater(startContainerHeight, 'startWater', 220.5);
    //   //Start container
    let pipesNameStartA: Array<string> = [];
    pipesNameStartA.push('pipe1_1');
    pipesNameStartA.push('pipe1_2');
    pipesNameStartA.push('pipe1_3A');
    pipesNameStartA.push('pipe1_3B');
    pipesNameStartA.push('pipe1_3C');
    pipesNameStartA.push('pipe1_4A');
    pipesNameStartA.push('pipe1_5A');
    pipesNameStartA.push('pipe1_6A');

    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1A',
      pipesNameStartA,
    );

    let pipesNameStartB: Array<string> = [];
    pipesNameStartB.push('pipe1_1');
    pipesNameStartB.push('pipe1_2');
    pipesNameStartB.push('pipe1_3A');
    pipesNameStartB.push('pipe1_3B');
    pipesNameStartB.push('pipe1_3C');
    pipesNameStartB.push('pipe1_4B');
    pipesNameStartB.push('pipe1_5B');
    pipesNameStartB.push('pipe1_6B');

    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1B',
      pipesNameStartB,
    );

    let pipesNameStartC: Array<string> = [];
    pipesNameStartC.push('pipe1_1');
    pipesNameStartC.push('pipe1_2');
    pipesNameStartC.push('pipe1_3A');
    pipesNameStartC.push('pipe1_3B');
    pipesNameStartC.push('pipe1_3C');
    pipesNameStartC.push('pipe1_4C');
    pipesNameStartC.push('pipe1_5C');
    pipesNameStartC.push('pipe1_6C');

    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1C',
      pipesNameStartC,
    );
  }

  function handleFinalWater(h: number, name: string) {
    let total = 1;

    if (
      document.getElementById('pompa2A')?.getAttribute('fill') === 'green' &&
      document.getElementById('helpWaterA')?.getAttribute('height') === '0' &&
      name !== 'helpWaterA'
    )
      total++;

    if (
      document.getElementById('pompa2B')?.getAttribute('fill') === 'green' &&
      document.getElementById('helpWaterB')?.getAttribute('height') === '0' &&
      name !== 'helpWaterB'
    )
      total++;

    if (
      document.getElementById('pompa2C')?.getAttribute('fill') === 'green' &&
      document.getElementById('helpWaterC')?.getAttribute('height') === '0' &&
      name !== 'helpWaterC'
    )
      total++;

    const value = 2 / total;

    return Math.min(h + value, maxHeight);
  }

  function handle2(h: number, pipesName: Array<string>, name: string) {
    if (h === 0) {
      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#E1E1E1');
      });

      return 0;
    } else {
      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#0AD3FF');
      });

      if (
        document.getElementById('finalWater')?.getAttribute('height') !== '171'
      ) {
        setEndContainerHeight(height => handleFinalWater(height, name));
        return Math.max(h - 6, 0);
      } else return h;
    }
  }

  function useOutputButton2(
    height: number,
    setHeight: (updateHeight: (oldHeight: number) => number) => void,
    outputPumpName: string,
    pipesName: Array<string>,
    containerName: string,
  ) {
    const [color, setColor] = useState<Color>('red');
    const button = useRef<SVGSVGElement | null>(null);
    const timer = useRef<number | null>(null);

    const handleColorChange = useCallback(
      (event: MouseEvent) => {
        const newColor = color === 'green' ? 'red' : 'green';

        if (button.current) {
          button.current.setAttribute('fill', newColor);

          if (newColor === 'green' && height > 0) {
            pipesName.forEach(pipeName => {
              const pipe = document.getElementById(pipeName);
              pipe?.setAttribute('fill', '#0AD3FF');
            });
          } else {
            pipesName.forEach(pipeName => {
              const pipe = document.getElementById(pipeName);
              pipe?.setAttribute('fill', '#E1E1E1');
            });
          }
        }

        if (newColor === 'green') {
          timer.current = window.setInterval(() => {
            setHeight(h => handle2(h, pipesName, containerName));
          }, 250);
        } else {
          if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
          }
        }
        setColor(newColor);
      },
      [color, setHeight],
    );

    useEffect(() => {
      const elem = document.getElementById(
        outputPumpName,
      ) as unknown as SVGSVGElement;
      button.current = elem;

      elem.addEventListener('click', handleColorChange);

      return () => {
        elem.removeEventListener('click', handleColorChange);
      };
    }, [handleColorChange]);
  }

  {
    //Help container A
    let pipesNameA: Array<string> = [];
    pipesNameA.push('pipe2A');

    useWater(innerContainerAHeight, 'helpWaterA', 98.5);
    useOutputButton2(
      innerContainerAHeight,
      num => setInnerContainerAHeight(num),
      'pompa2A',
      pipesNameA,
      'helpWaterA',
    );

    //Help container B
    let pipesNameB: Array<string> = [];
    pipesNameB.push('pipe2B');

    useWater(innerContainerBHeight, 'helpWaterB', 98.5);
    useOutputButton2(
      innerContainerBHeight,
      num => setInnerContainerBHeight(num),
      'pompa2B',
      pipesNameB,
      'helpWaterB',
    );

    //Help container C
    let pipesNameC: Array<string> = [];
    pipesNameC.push('pipe2C');

    useWater(innerContainerCHeight, 'helpWaterC', 98.5);
    useOutputButton2(
      innerContainerCHeight,
      num => setInnerContainerCHeight(num),
      'pompa2C',
      pipesNameC,
      'helpWaterC',
    );
  }

  function handle3(h: number, pipesName: Array<string>) {
    if (h === 0) {
      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#E1E1E1');
      });
    } else {
      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#0AD3FF');
      });

      if (
        document.getElementById('startWater')?.getAttribute('height') !== '171'
      )
        setStartContainerHeight(h => Math.min(h + 2, maxHeight));
    }

    if (document.getElementById('startWater')?.getAttribute('height') !== '171')
      return Math.max(h - 2, 0);

    return h;
  }

  //Button output
  function useOutputButton3(
    height: number,
    setHeight: (updateHeight: (oldHeight: number) => number) => void,
    outputPumpName: string,
    pipesName: Array<string>,
  ) {
    const [color, setColor] = useState<Color>('red');
    const button = useRef<SVGSVGElement | null>(null);
    const timer = useRef<number | null>(null);

    const handleColorChange = useCallback(
      (event: MouseEvent) => {
        const newColor = color === 'green' ? 'red' : 'green';

        if (button.current) {
          button.current.setAttribute('fill', newColor);

          if (newColor === 'green' && height > 0) {
            pipesName.forEach(pipeName => {
              const pipe = document.getElementById(pipeName);
              pipe?.setAttribute('fill', '#0AD3FF');
            });
          } else {
            pipesName.forEach(pipeName => {
              const pipe = document.getElementById(pipeName);
              pipe?.setAttribute('fill', '#E1E1E1');
            });
          }
        }

        if (newColor === 'green') {
          timer.current = window.setInterval(() => {
            setHeight(h => handle3(h, pipesName));
          }, 250);
        } else {
          if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
          }
        }
        setColor(newColor);
      },
      [color, setHeight],
    );

    useEffect(() => {
      const elem = document.getElementById(
        outputPumpName,
      ) as unknown as SVGSVGElement;
      button.current = elem;

      elem.addEventListener('click', handleColorChange);

      return () => {
        elem.removeEventListener('click', handleColorChange);
      };
    }, [handleColorChange]);
  }

  //Use button output
  {
    //End container
    let pipesNameEnd: Array<string> = [];
    pipesNameEnd.push('pipe3_1');
    pipesNameEnd.push('pipe3_2');
    pipesNameEnd.push('pipe3_3');
    pipesNameEnd.push('pipe3_4');
    pipesNameEnd.push('pipe3_5');

    useWater(endContainerHeight, 'finalWater', 355.5);
    useOutputButton3(
      endContainerHeight,
      num => setEndContainerHeight(num),
      'pompa3',
      pipesNameEnd,
    );
  }

  const [title, setTitle] = useState('Tytuł');
  const [text, setText] = useState('Tekst');

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  const [newActive, setNewActive] = useState('');

  useEffect(() => {
    Object.values(data).map(item => {
      if (item.id === active) {
        setTitle(item.title);
        setText(item.text);
        return;
      }
    });
  }, [active]);

  useEffect(() => {
    if (active !== newActive && active !== '') {
      const elem = document.getElementById(active);
      elem?.setAttribute('fill', '#298E33');
      setActive(newActive);
    } else {
      setActive(newActive);
    }

    if (newActive === '') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [newActive]);

  function useAskButton(askButtonName: string, askBackground: string) {
    const [color, setColor] = useState<askColor>('#298E33');
    const askButton = useRef<SVGSVGElement | null>(null);

    const handleColorChange = useCallback(
      (event: MouseEvent) => {
        const newColor = color === '#73C98E' ? '#298E33' : '#73C98E';

        setColor(newColor);

        if (askButton.current) {
          const ask = document.getElementById(askBackground);
          ask?.setAttribute('fill', newColor);
          if (newColor === '#73C98E') {
            setNewActive(askBackground);
          } else {
            setNewActive('');
          }
        }
      },
      [color],
    );

    useEffect(() => {
      const elem = document.getElementById(
        askButtonName,
      ) as unknown as SVGSVGElement;
      askButton.current = elem;

      elem.addEventListener('click', handleColorChange);

      return () => {
        elem.removeEventListener('click', handleColorChange);
      };
    }, [handleColorChange]);
  }

  useAskButton('askMain', 'EllipseAskMain');
  useAskButton('askPomp', 'EllipseAskPomp');
  useAskButton('askHelpContainer', 'EllipseAskHelpContainer');
  useAskButton('askValve', 'EllipseAskValve');
  useAskButton('askFinalContainer', 'EllipseAskFinalContainer');
  useAskButton('askEngine', 'EllipseAskEngine');
  useAskButton('askFinalPomp', 'EllipseAskFinalPomp');
  useAskButton('askStop', 'EllipseAskStop');

  return (
    <StyledMainDiv>
      <div style={styles.modelDiv}>
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Makieta">
            <rect
              id="pipe1_5C"
              x="490.121"
              y="58.1896"
              width="228.076"
              height="19.3966"
              fill="#E1E1E1"
            />
            <rect
              id="helpContainerC"
              x="692.5"
              y="98.5"
              width="75"
              height="171"
              fill="white"
              stroke="black"
            />
            <rect
              id="helpWaterC"
              x="692.25"
              y="269.25"
              width="75.5"
              height="0.5"
              fill="#0AD3FF"
              stroke="black"
            />
            <text
              style={{ userSelect: 'none' }}
              x="697"
              y="120"
              fontSize="20px"
              fill="black"
            >
              C4
            </text>
            <rect
              id="helpCointainerB"
              x="616.5"
              y="98.5"
              width="75"
              height="171"
              fill="white"
              stroke="black"
            />
            <rect
              id="helpWaterB"
              x="616.25"
              y="269.25"
              width="75.5"
              height="0.5"
              fill="#10C6EE"
              stroke="black"
            />
            <text
              style={{ userSelect: 'none' }}
              x="621"
              y="120"
              fontSize="20px"
              fill="black"
            >
              C3
            </text>
            <rect
              id="finalContainer"
              x="540.534"
              y="355.457"
              width="227"
              height="171"
              fill="white"
              stroke="black"
            />
            <rect
              id="finalWater"
              x="540.534"
              y="526.457"
              width="227"
              height="0.5"
              fill="#0AD3FF"
              stroke="black"
            />
            <text
              style={{ userSelect: 'none' }}
              x="545"
              y="377"
              fontSize="20px"
              fill="black"
            >
              C5
            </text>
            <rect
              id="pipe2A"
              x="564.189"
              y="270.898"
              width="28.0546"
              height="84.0719"
              fill="#E1E1E1"
            />
            <path
              id="pipe3_5"
              d="M166.118 141.557H168.414C182.222 141.557 193.414 152.75 193.414 166.557V219.88H166.118V141.557Z"
              fill="#E1E1E1"
            />
            <rect
              id="pipe1_1"
              x="163.843"
              y="392.335"
              width="27.2963"
              height="134.371"
              fill="#E1E1E1"
            />
            <rect
              id="pipe1_3A"
              x="330.676"
              y="484.914"
              width="27.7296"
              height="42.0259"
              fill="#E1E1E1"
            />
            <rect
              id="pipe1_3B"
              x="398.613"
              y="484.914"
              width="27.7296"
              height="42.0259"
              fill="#E1E1E1"
            />
            <rect
              id="pipe1_3C"
              x="465.856"
              y="484.914"
              width="27.7296"
              height="42.0259"
              fill="#E1E1E1"
            />
            <rect
              id="startContainer"
              x="60.4658"
              y="220.38"
              width="227"
              height="171"
              fill="white"
              stroke="black"
            />
            <rect
              id="startWater"
              x="60.4658"
              y="391.38"
              width="227"
              height="0.5"
              fill="#0AD3FF"
              stroke="black"
            />
            <text
              style={{ userSelect: 'none' }}
              x="65"
              y="242"
              fontSize="20px"
              fill="black"
            >
              C1
            </text>
            <rect
              id="helpContainerA"
              x="540.5"
              y="98.5"
              width="75"
              height="171"
              fill="white"
              stroke="black"
            />
            <rect
              id="helpWaterA"
              x="540.25"
              y="269.25"
              width="75.5"
              height="0.5"
              fill="#0AD3FF"
              stroke="black"
            />
            <text
              style={{ userSelect: 'none' }}
              x="545"
              y="120"
              fontSize="20px"
              fill="black"
            >
              C2
            </text>
            <path
              id="pipe3_2"
              d="M0 574.138H668.977V574.138C668.977 586.993 658.556 597.414 645.701 597.414H23.2759C10.421 597.414 0 586.993 0 574.138V574.138Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe1_2"
              d="M163.843 521.677H493.673V521.677C493.673 534.773 483.057 545.389 469.961 545.389H187.555C174.459 545.389 163.843 534.773 163.843 521.677V521.677Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe1_5B"
              d="M402.077 48.4914C402.077 37.779 410.761 29.0948 421.474 29.0948H643.325V48.4914H402.077V48.4914Z"
              fill="#B8B8B8"
            />
            <path
              id="pipe1_6B"
              d="M643.326 29.0948V29.0948C654.812 29.0948 664.123 38.4061 664.123 49.892V98.2759H643.326V29.0948Z"
              fill="#B8B8B8"
            />
            <path
              id="pipe1_6C"
              d="M718.195 58.1896V58.1896C729.681 58.1896 738.993 67.5009 738.993 78.9868V98.2758H718.195V58.1896Z"
              fill="#E1E1E1"
            />
            <g id="askMain" cursor={'pointer'}>
              <ellipse
                id="EllipseAskMain"
                cx="309.162"
                cy="231.104"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?"
                d="M309.962 233.732H307.628C307.634 233.14 307.683 232.632 307.774 232.209C307.872 231.786 308.031 231.405 308.253 231.066C308.474 230.721 308.774 230.37 309.151 230.012C309.451 229.732 309.718 229.468 309.952 229.221C310.193 228.967 310.382 228.703 310.518 228.43C310.655 228.15 310.723 227.834 310.723 227.482C310.723 227.085 310.658 226.753 310.528 226.486C310.404 226.219 310.219 226.018 309.972 225.881C309.731 225.738 309.428 225.666 309.063 225.666C308.764 225.666 308.481 225.728 308.214 225.852C307.947 225.975 307.732 226.167 307.569 226.428C307.406 226.682 307.319 227.014 307.306 227.424H304.718C304.737 226.571 304.939 225.861 305.323 225.295C305.707 224.722 306.225 224.296 306.876 224.016C307.527 223.729 308.256 223.586 309.063 223.586C309.955 223.586 310.717 223.736 311.348 224.035C311.987 224.328 312.472 224.758 312.804 225.324C313.142 225.891 313.311 226.574 313.311 227.375C313.311 227.948 313.201 228.462 312.979 228.918C312.758 229.367 312.465 229.787 312.1 230.178C311.736 230.568 311.342 230.962 310.919 231.359C310.548 231.691 310.297 232.046 310.167 232.424C310.037 232.801 309.968 233.238 309.962 233.732ZM307.384 236.77C307.384 236.379 307.514 236.053 307.774 235.793C308.041 235.533 308.399 235.402 308.848 235.402C309.298 235.402 309.653 235.533 309.913 235.793C310.18 236.053 310.313 236.379 310.313 236.77C310.313 237.147 310.18 237.466 309.913 237.727C309.653 237.987 309.298 238.117 308.848 238.117C308.399 238.117 308.041 237.987 307.774 237.727C307.514 237.466 307.384 237.147 307.384 236.77Z"
                fill="white"
              />
            </g>
            <g id="askValve" cursor={'pointer'}>
              <ellipse
                id="EllipseAskValve"
                cx="770.132"
                cy="293.315"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_4"
                d="M770.962 295.732H768.628C768.634 295.14 768.683 294.632 768.774 294.209C768.872 293.786 769.031 293.405 769.253 293.066C769.474 292.721 769.774 292.37 770.151 292.012C770.451 291.732 770.718 291.468 770.952 291.221C771.193 290.967 771.382 290.703 771.518 290.43C771.655 290.15 771.723 289.834 771.723 289.482C771.723 289.085 771.658 288.753 771.528 288.486C771.404 288.219 771.219 288.018 770.972 287.881C770.731 287.738 770.428 287.666 770.063 287.666C769.764 287.666 769.481 287.728 769.214 287.852C768.947 287.975 768.732 288.167 768.569 288.428C768.406 288.682 768.319 289.014 768.306 289.424H765.718C765.737 288.571 765.939 287.861 766.323 287.295C766.707 286.722 767.225 286.296 767.876 286.016C768.527 285.729 769.256 285.586 770.063 285.586C770.955 285.586 771.717 285.736 772.348 286.035C772.987 286.328 773.472 286.758 773.804 287.324C774.142 287.891 774.311 288.574 774.311 289.375C774.311 289.948 774.201 290.462 773.979 290.918C773.758 291.367 773.465 291.787 773.1 292.178C772.736 292.568 772.342 292.962 771.919 293.359C771.548 293.691 771.297 294.046 771.167 294.424C771.037 294.801 770.968 295.238 770.962 295.732ZM768.384 298.77C768.384 298.379 768.514 298.053 768.774 297.793C769.041 297.533 769.399 297.402 769.848 297.402C770.298 297.402 770.653 297.533 770.913 297.793C771.18 298.053 771.313 298.379 771.313 298.77C771.313 299.147 771.18 299.466 770.913 299.727C770.653 299.987 770.298 300.117 769.848 300.117C769.399 300.117 769.041 299.987 768.774 299.727C768.514 299.466 768.384 299.147 768.384 298.77Z"
                fill="white"
              />
            </g>
            <g id="askFinalPomp" cursor={'pointer'}>
              <ellipse
                id="EllipseAskFinalPomp"
                cx="696.881"
                cy="545.207"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_2"
                d="M697.711 547.625H695.377C695.383 547.032 695.432 546.524 695.523 546.101C695.621 545.678 695.78 545.297 696.002 544.959C696.223 544.614 696.523 544.262 696.9 543.904C697.2 543.624 697.467 543.36 697.701 543.113C697.942 542.859 698.131 542.595 698.267 542.322C698.404 542.042 698.473 541.726 698.473 541.375C698.473 540.978 698.407 540.646 698.277 540.379C698.154 540.112 697.968 539.91 697.721 539.773C697.48 539.63 697.177 539.558 696.812 539.558C696.513 539.558 696.23 539.62 695.963 539.744C695.696 539.868 695.481 540.06 695.318 540.32C695.155 540.574 695.068 540.906 695.055 541.316H692.467C692.486 540.463 692.688 539.754 693.072 539.187C693.456 538.614 693.974 538.188 694.625 537.908C695.276 537.622 696.005 537.478 696.812 537.478C697.704 537.478 698.466 537.628 699.098 537.927C699.736 538.22 700.221 538.65 700.553 539.217C700.891 539.783 701.06 540.467 701.06 541.267C701.06 541.84 700.95 542.355 700.728 542.81C700.507 543.26 700.214 543.679 699.849 544.07C699.485 544.461 699.091 544.855 698.668 545.252C698.297 545.584 698.046 545.939 697.916 546.316C697.786 546.694 697.717 547.13 697.711 547.625ZM695.133 550.662C695.133 550.271 695.263 549.946 695.523 549.685C695.79 549.425 696.148 549.295 696.598 549.295C697.047 549.295 697.402 549.425 697.662 549.685C697.929 549.946 698.062 550.271 698.062 550.662C698.062 551.039 697.929 551.358 697.662 551.619C697.402 551.879 697.047 552.01 696.598 552.01C696.148 552.01 695.79 551.879 695.523 551.619C695.263 551.358 695.133 551.039 695.133 550.662Z"
                fill="white"
              />
            </g>
            <g id="askFinalContainer" cursor={'pointer'}>
              <ellipse
                id="EllipseAskFinalContainer"
                cx="787.868"
                cy="366.271"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_3"
                d="M788.698 368.689H786.364C786.371 368.097 786.419 367.589 786.511 367.166C786.608 366.743 786.768 366.362 786.989 366.023C787.21 365.678 787.51 365.327 787.888 364.969C788.187 364.689 788.454 364.425 788.688 364.177C788.929 363.924 789.118 363.66 789.255 363.386C789.391 363.107 789.46 362.791 789.46 362.439C789.46 362.042 789.395 361.71 789.265 361.443C789.141 361.176 788.955 360.974 788.708 360.838C788.467 360.694 788.164 360.623 787.8 360.623C787.5 360.623 787.217 360.685 786.95 360.808C786.683 360.932 786.468 361.124 786.306 361.385C786.143 361.638 786.055 361.97 786.042 362.381H783.454C783.473 361.528 783.675 360.818 784.059 360.252C784.444 359.679 784.961 359.252 785.612 358.972C786.263 358.686 786.992 358.543 787.8 358.543C788.692 358.543 789.453 358.692 790.085 358.992C790.723 359.285 791.208 359.715 791.54 360.281C791.878 360.847 792.048 361.531 792.048 362.332C792.048 362.905 791.937 363.419 791.716 363.875C791.494 364.324 791.201 364.744 790.837 365.135C790.472 365.525 790.078 365.919 789.655 366.316C789.284 366.648 789.033 367.003 788.903 367.381C788.773 367.758 788.705 368.194 788.698 368.689ZM786.12 371.726C786.12 371.336 786.25 371.01 786.511 370.75C786.778 370.489 787.136 370.359 787.585 370.359C788.034 370.359 788.389 370.489 788.649 370.75C788.916 371.01 789.05 371.336 789.05 371.726C789.05 372.104 788.916 372.423 788.649 372.683C788.389 372.944 788.034 373.074 787.585 373.074C787.136 373.074 786.778 372.944 786.511 372.683C786.25 372.423 786.12 372.104 786.12 371.726Z"
                fill="white"
              />
            </g>
            <path
              id="pipe1_6A"
              d="M567.764 0V0C579.25 0 588.561 9.31122 588.561 20.7972V98.2759H567.764V0Z"
              fill="#848484"
            />
            <path
              id="pipe1_4A"
              d="M334.141 19.3965H354.938V454.526H334.141V19.3965Z"
              fill="#848484"
            />
            <rect
              id="pipe1_4B"
              x="402.077"
              y="48.4913"
              width="20.7972"
              height="415.086"
              fill="#B8B8B8"
            />
            <path
              id="pipe1_4C"
              d="M469.324 78.9868C469.324 67.5009 478.635 58.1896 490.121 58.1896V58.1896V459.052H469.324V78.9868Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe3_3"
              d="M0.0644531 166.557C0.0644531 152.75 11.2573 141.557 25.0644 141.557H28.119V574.132H0.0644531V166.557Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe3_1"
              d="M641.247 526.94H668.977V574.138H641.247V526.94Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe2B"
              d="M639.254 270.898H666.55V354.97H639.254V270.898Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe2C"
              d="M715.078 270.898H743.133V354.97H715.078V270.898Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe3_4"
              d="M28.1201 141.557H97.1191H166.118V164.551H28.1201V141.557Z"
              fill="#E1E1E1"
            />
            <path
              id="pipe1_5A"
              d="M334.141 19.3966C334.141 8.68414 342.825 0 353.537 0H567.762V19.3966H334.141V19.3966Z"
              fill="#848484"
            />
            <path
              id="pompa2A"
              d="M598.589 283.504C598.589 293.738 589.837 302.078 578.985 302.078C568.133 302.078 559.381 293.738 559.381 283.504C559.381 273.271 568.133 264.931 578.985 264.931C589.837 264.931 598.589 273.271 598.589 283.504Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <path
              id="pompa2C"
              d="M748.719 283.504C748.719 293.738 739.967 302.078 729.115 302.078C718.263 302.078 709.511 293.738 709.511 283.504C709.511 273.271 718.263 264.931 729.115 264.931C739.967 264.931 748.719 273.271 748.719 283.504Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <g id="askEngine" cursor={'pointer'}>
              <ellipse
                id="EllipseAskEngine"
                cx="295.731"
                cy="41.3502"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_4"
                d="M296.962 43.7324H294.628C294.634 43.14 294.683 42.6322 294.774 42.209C294.872 41.7858 295.031 41.4049 295.253 41.0664C295.474 40.7214 295.774 40.3698 296.151 40.0117C296.451 39.7318 296.718 39.4681 296.952 39.2207C297.193 38.9668 297.382 38.7031 297.518 38.4297C297.655 38.1497 297.723 37.834 297.723 37.4824C297.723 37.0853 297.658 36.7533 297.528 36.4863C297.404 36.2194 297.219 36.0176 296.972 35.8809C296.731 35.7376 296.428 35.666 296.063 35.666C295.764 35.666 295.481 35.7279 295.214 35.8516C294.947 35.9753 294.732 36.1673 294.569 36.4277C294.406 36.6816 294.319 37.0137 294.306 37.4238H291.718C291.737 36.571 291.939 35.8613 292.323 35.2949C292.707 34.722 293.225 34.2956 293.876 34.0156C294.527 33.7292 295.256 33.5859 296.063 33.5859C296.955 33.5859 297.717 33.7357 298.348 34.0352C298.987 34.3281 299.472 34.7578 299.804 35.3242C300.142 35.8906 300.311 36.5742 300.311 37.375C300.311 37.9479 300.201 38.4622 299.979 38.918C299.758 39.3672 299.465 39.7871 299.1 40.1777C298.736 40.5684 298.342 40.9622 297.919 41.3594C297.548 41.6914 297.297 42.0462 297.167 42.4238C297.037 42.8014 296.968 43.2376 296.962 43.7324ZM294.384 46.7695C294.384 46.3789 294.514 46.0534 294.774 45.793C295.041 45.5326 295.399 45.4023 295.848 45.4023C296.298 45.4023 296.653 45.5326 296.913 45.793C297.18 46.0534 297.313 46.3789 297.313 46.7695C297.313 47.1471 297.18 47.4661 296.913 47.7266C296.653 47.987 296.298 48.1172 295.848 48.1172C295.399 48.1172 295.041 47.987 294.774 47.7266C294.514 47.4661 294.384 47.1471 294.384 46.7695Z"
                fill="white"
              />
            </g>
            <g id="askStop" cursor={'pointer'}>
              <ellipse
                id="EllipseAskStop"
                cx="84.2938"
                cy="41.3504"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_5"
                d="M84.9618 44.7324H82.6278C82.6343 44.14 82.6831 43.6322 82.7743 43.209C82.8719 42.7858 83.0314 42.4049 83.2528 42.0664C83.4741 41.7214 83.7736 41.3698 84.1512 41.0117C84.4507 40.7318 84.7176 40.4681 84.952 40.2207C85.1929 39.9668 85.3817 39.7031 85.5184 39.4297C85.6551 39.1497 85.7235 38.834 85.7235 38.4824C85.7235 38.0853 85.6584 37.7533 85.5282 37.4863C85.4045 37.2194 85.2189 37.0176 84.9715 36.8809C84.7307 36.7376 84.4279 36.666 84.0633 36.666C83.7639 36.666 83.4807 36.7279 83.2137 36.8516C82.9468 36.9753 82.732 37.1673 82.5692 37.4277C82.4064 37.6816 82.3185 38.0137 82.3055 38.4238H79.7176C79.7372 37.571 79.939 36.8613 80.3231 36.2949C80.7072 35.722 81.2248 35.2956 81.8758 35.0156C82.5269 34.7292 83.256 34.5859 84.0633 34.5859C84.9553 34.5859 85.717 34.7357 86.3485 35.0352C86.9865 35.3281 87.4715 35.7578 87.8036 36.3242C88.1421 36.8906 88.3114 37.5742 88.3114 38.375C88.3114 38.9479 88.2007 39.4622 87.9794 39.918C87.758 40.3672 87.465 40.7871 87.1004 41.1777C86.7359 41.5684 86.342 41.9622 85.9188 42.3594C85.5477 42.6914 85.2971 43.0462 85.1669 43.4238C85.0366 43.8014 84.9683 44.2376 84.9618 44.7324ZM82.3837 47.7695C82.3837 47.3789 82.5139 47.0534 82.7743 46.793C83.0412 46.5326 83.3993 46.4023 83.8485 46.4023C84.2977 46.4023 84.6525 46.5326 84.9129 46.793C85.1799 47.0534 85.3133 47.3789 85.3133 47.7695C85.3133 48.1471 85.1799 48.4661 84.9129 48.7266C84.6525 48.987 84.2977 49.1172 83.8485 49.1172C83.3993 49.1172 83.0412 48.987 82.7743 48.7266C82.5139 48.4661 82.3837 48.1471 82.3837 47.7695Z"
                fill="white"
              />
            </g>
            <g id="askHelpContainer" cursor={'pointer'}>
              <ellipse
                id="EllipseAskHelpContainer"
                cx="787.868"
                cy="109.591"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
              />
              <path
                id="?_6"
                d="M788.698 112.008H786.364C786.371 111.416 786.419 110.908 786.511 110.485C786.608 110.062 786.768 109.681 786.989 109.342C787.21 108.997 787.51 108.646 787.888 108.288C788.187 108.008 788.454 107.744 788.688 107.497C788.929 107.243 789.118 106.979 789.255 106.706C789.391 106.426 789.46 106.11 789.46 105.758C789.46 105.361 789.395 105.029 789.265 104.762C789.141 104.495 788.955 104.293 788.708 104.157C788.467 104.014 788.164 103.942 787.8 103.942C787.5 103.942 787.217 104.004 786.95 104.127C786.683 104.251 786.468 104.443 786.306 104.704C786.143 104.958 786.055 105.29 786.042 105.7H783.454C783.473 104.847 783.675 104.137 784.059 103.571C784.444 102.998 784.961 102.571 785.612 102.292C786.263 102.005 786.992 101.862 787.8 101.862C788.692 101.862 789.453 102.012 790.085 102.311C790.723 102.604 791.208 103.034 791.54 103.6C791.878 104.167 792.048 104.85 792.048 105.651C792.048 106.224 791.937 106.738 791.716 107.194C791.494 107.643 791.201 108.063 790.837 108.454C790.472 108.844 790.078 109.238 789.655 109.635C789.284 109.967 789.033 110.322 788.903 110.7C788.773 111.077 788.705 111.514 788.698 112.008ZM786.12 115.045C786.12 114.655 786.25 114.329 786.511 114.069C786.778 113.808 787.136 113.678 787.585 113.678C788.034 113.678 788.389 113.808 788.649 114.069C788.916 114.329 789.05 114.655 789.05 115.045C789.05 115.423 788.916 115.742 788.649 116.002C788.389 116.263 788.034 116.393 787.585 116.393C787.136 116.393 786.778 116.263 786.511 116.002C786.25 115.742 786.12 115.423 786.12 115.045Z"
                fill="white"
              />
            </g>
            <g id="askPomp" cursor={'pointer'}>
              <ellipse
                id="EllipseAskPomp"
                cx="378.163"
                cy="440.625"
                rx="12.1317"
                ry="11.3147"
                fill="#298E33"
                onClick={() => {
                  window.alert('siema');
                }}
              />
              <path
                id="?_7"
                d="M378.993 443.043H376.659C376.666 442.451 376.714 441.943 376.806 441.52C376.903 441.096 377.063 440.715 377.284 440.377C377.505 440.032 377.805 439.68 378.182 439.322C378.482 439.042 378.749 438.779 378.983 438.531C379.224 438.277 379.413 438.014 379.55 437.74C379.686 437.46 379.755 437.145 379.755 436.793C379.755 436.396 379.69 436.064 379.559 435.797C379.436 435.53 379.25 435.328 379.003 435.191C378.762 435.048 378.459 434.977 378.095 434.977C377.795 434.977 377.512 435.038 377.245 435.162C376.978 435.286 376.763 435.478 376.6 435.738C376.438 435.992 376.35 436.324 376.337 436.734H373.749C373.768 435.882 373.97 435.172 374.354 434.605C374.738 434.033 375.256 433.606 375.907 433.326C376.558 433.04 377.287 432.896 378.095 432.896C378.987 432.896 379.748 433.046 380.38 433.346C381.018 433.639 381.503 434.068 381.835 434.635C382.173 435.201 382.343 435.885 382.343 436.686C382.343 437.258 382.232 437.773 382.011 438.229C381.789 438.678 381.496 439.098 381.132 439.488C380.767 439.879 380.373 440.273 379.95 440.67C379.579 441.002 379.328 441.357 379.198 441.734C379.068 442.112 379 442.548 378.993 443.043ZM376.415 446.08C376.415 445.689 376.545 445.364 376.806 445.104C377.072 444.843 377.431 444.713 377.88 444.713C378.329 444.713 378.684 444.843 378.944 445.104C379.211 445.364 379.345 445.689 379.345 446.08C379.345 446.458 379.211 446.777 378.944 447.037C378.684 447.298 378.329 447.428 377.88 447.428C377.431 447.428 377.072 447.298 376.806 447.037C376.545 446.777 376.415 446.458 376.415 446.08Z"
                fill="white"
              />
            </g>
            <path
              id="pompa3"
              d="M674.413 540.75C674.413 550.983 665.661 559.323 654.809 559.323C643.957 559.323 635.205 550.983 635.205 540.75C635.205 530.517 643.957 522.177 654.809 522.177C665.661 522.177 674.413 530.517 674.413 540.75Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <path
              id="pompa1A"
              d="M364.144 471.013C364.144 481.246 355.393 489.586 344.54 489.586C333.688 489.586 324.937 481.246 324.937 471.013C324.937 460.78 333.688 452.44 344.54 452.44C355.393 452.44 364.144 460.78 364.144 471.013Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <path
              id="pompa1B"
              d="M432.081 472.306C432.081 482.539 423.329 490.879 412.477 490.879C401.625 490.879 392.873 482.539 392.873 472.306C392.873 462.073 401.625 453.733 412.477 453.733C423.329 453.733 432.081 462.073 432.081 472.306Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <path
              id="pompa1C"
              d="M499.325 471.013C499.325 481.246 490.573 489.586 479.721 489.586C468.869 489.586 460.117 481.246 460.117 471.013C460.117 460.78 468.869 452.44 479.721 452.44C490.573 452.44 499.325 460.78 499.325 471.013Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
            <g id="STOP" cursor={'pointer'}>
              <rect
                id="stopBox"
                x="0.564453"
                y="29.2425"
                width="62.0848"
                height="58.4828"
                rx="9.5"
                fill="#F9E000"
                stroke="black"
              />
              <path
                id="stopButton"
                d="M51.5575 65.9193C51.5575 76.1526 42.8057 84.4926 31.9536 84.4926C21.1015 84.4926 12.3496 76.1526 12.3496 65.9193C12.3496 55.686 21.1015 47.346 31.9536 47.346C42.8057 47.346 51.5575 55.686 51.5575 65.9193Z"
                fill="#AE1D2E"
                stroke="black"
              />
              <path
                id="STOP_2"
                d="M14.9002 42.4882C14.9002 42.2148 14.8579 41.9706 14.7732 41.7558C14.6951 41.5344 14.5486 41.3359 14.3338 41.1601C14.1254 40.9778 13.8292 40.802 13.4451 40.6328C13.0675 40.457 12.5792 40.2747 11.9803 40.0859C11.3162 39.8775 10.6977 39.6432 10.1248 39.3828C9.55188 39.1223 9.04732 38.8196 8.61113 38.4745C8.18144 38.1295 7.84615 37.7324 7.60527 37.2831C7.36438 36.8274 7.24394 36.3001 7.24394 35.7011C7.24394 35.1152 7.36764 34.5813 7.61503 34.0995C7.86894 33.6178 8.22701 33.2044 8.68925 32.8593C9.15149 32.5078 9.69511 32.2376 10.3201 32.0488C10.9516 31.86 11.6482 31.7656 12.41 31.7656C13.4646 31.7656 14.3761 31.9576 15.1443 32.3417C15.9191 32.7259 16.518 33.2467 16.9412 33.9042C17.3644 34.5618 17.576 35.3007 17.576 36.121H14.9002C14.9002 35.6783 14.8058 35.2877 14.617 34.9492C14.4347 34.6106 14.1547 34.3437 13.7771 34.1484C13.406 33.9531 12.9373 33.8554 12.3709 33.8554C11.824 33.8554 11.3683 33.9368 11.0037 34.0995C10.6456 34.2623 10.3754 34.4837 10.1932 34.7636C10.0174 35.0436 9.92949 35.3561 9.92949 35.7011C9.92949 35.9615 9.99133 36.1959 10.115 36.4042C10.2387 36.6061 10.4243 36.7981 10.6717 36.9804C10.9191 37.1562 11.2251 37.3222 11.5896 37.4785C11.9607 37.6282 12.3904 37.7779 12.8787 37.9277C13.66 38.162 14.3435 38.4225 14.9295 38.7089C15.5219 38.9954 16.0135 39.3209 16.4041 39.6855C16.8012 40.0501 17.0975 40.4602 17.2928 40.916C17.4946 41.3717 17.5955 41.8893 17.5955 42.4687C17.5955 43.0807 17.4751 43.6275 17.2342 44.1093C16.9933 44.5911 16.6482 45.0012 16.199 45.3398C15.7498 45.6783 15.2094 45.9355 14.5779 46.1113C13.9529 46.287 13.2531 46.3749 12.4783 46.3749C11.7882 46.3749 11.1046 46.2838 10.4275 46.1015C9.75696 45.9127 9.14824 45.6328 8.60136 45.2617C8.05449 44.8841 7.61829 44.4088 7.29277 43.8359C6.96725 43.2564 6.80449 42.5794 6.80449 41.8046H9.4998C9.4998 42.2538 9.57141 42.638 9.71464 42.957C9.86438 43.2695 10.0727 43.5266 10.3396 43.7285C10.6131 43.9238 10.9321 44.067 11.2967 44.1581C11.6613 44.2493 12.0551 44.2949 12.4783 44.2949C13.0252 44.2949 13.4744 44.22 13.826 44.0703C14.184 43.914 14.451 43.6992 14.6268 43.4257C14.809 43.1523 14.9002 42.8398 14.9002 42.4882ZM25.7693 31.9609V46.1796H23.0935V31.9609H25.7693ZM30.1834 31.9609V34.08H18.7283V31.9609H30.1834ZM43.2107 38.7089V39.4413C43.2107 40.5156 43.0675 41.4824 42.781 42.3417C42.4946 43.1946 42.0877 43.9205 41.5603 44.5195C41.033 45.1184 40.4047 45.5774 39.6756 45.8964C38.9464 46.2154 38.1359 46.3749 37.2439 46.3749C36.365 46.3749 35.5577 46.2154 34.8221 45.8964C34.0929 45.5774 33.4614 45.1184 32.9275 44.5195C32.3937 43.9205 31.9803 43.1946 31.6873 42.3417C31.3943 41.4824 31.2478 40.5156 31.2478 39.4413V38.7089C31.2478 37.6282 31.3943 36.6614 31.6873 35.8085C31.9803 34.9557 32.3904 34.2298 32.9178 33.6308C33.4451 33.0253 34.0734 32.5631 34.8025 32.2441C35.5382 31.9251 36.3455 31.7656 37.2244 31.7656C38.1163 31.7656 38.9269 31.9251 39.656 32.2441C40.3852 32.5631 41.0135 33.0253 41.5408 33.6308C42.0747 34.2298 42.4848 34.9557 42.7713 35.8085C43.0643 36.6614 43.2107 37.6282 43.2107 38.7089ZM40.4959 39.4413V38.6894C40.4959 37.9147 40.4243 37.2343 40.281 36.6484C40.1378 36.0559 39.9262 35.5579 39.6463 35.1542C39.3663 34.7506 39.0213 34.4479 38.6111 34.246C38.201 34.0377 37.7387 33.9335 37.2244 33.9335C36.7036 33.9335 36.2413 34.0377 35.8377 34.246C35.4406 34.4479 35.102 34.7506 34.8221 35.1542C34.5421 35.5579 34.3273 36.0559 34.1775 36.6484C34.0343 37.2343 33.9627 37.9147 33.9627 38.6894V39.4413C33.9627 40.2096 34.0343 40.8899 34.1775 41.4824C34.3273 42.0748 34.5421 42.5761 34.8221 42.9863C35.1085 43.3899 35.4536 43.6959 35.8572 43.9042C36.2609 44.1126 36.7231 44.2167 37.2439 44.2167C37.7648 44.2167 38.227 44.1126 38.6307 43.9042C39.0343 43.6959 39.3728 43.3899 39.6463 42.9863C39.9262 42.5761 40.1378 42.0748 40.281 41.4824C40.4243 40.8899 40.4959 40.2096 40.4959 39.4413ZM50.9549 40.9941H47.2928V38.8847H50.9549C51.5538 38.8847 52.0389 38.787 52.41 38.5917C52.7876 38.3899 53.0643 38.1165 53.24 37.7714C53.4158 37.4199 53.5037 37.0195 53.5037 36.5703C53.5037 36.1341 53.4158 35.7272 53.24 35.3495C53.0643 34.9719 52.7876 34.666 52.41 34.4316C52.0389 34.1972 51.5538 34.08 50.9549 34.08H48.1717V46.1796H45.4861V31.9609H50.9549C52.0616 31.9609 53.0057 32.1594 53.7869 32.5566C54.5747 32.9472 55.1736 33.4908 55.5838 34.1874C56.0004 34.8775 56.2088 35.6653 56.2088 36.5507C56.2088 37.4687 56.0004 38.2597 55.5838 38.9238C55.1736 39.5878 54.5747 40.0989 53.7869 40.457C53.0057 40.815 52.0616 40.9941 50.9549 40.9941Z"
                fill="black"
              />
            </g>
            <g id="Engine">
              <rect
                id="engine"
                x="127.429"
                y="29.8891"
                width="143.887"
                height="58.4828"
                rx="9.5"
                fill="#A76D16"
                stroke="black"
              />
              <rect
                id="switch7"
                x="135.031"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch6"
                x="152.471"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch5"
                x="169.91"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch4"
                x="187.35"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch3"
                x="214.646"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch2"
                x="232.085"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
              <rect
                id="switch1"
                x="249.524"
                y="43.1138"
                width="14.4064"
                height="30.8982"
                rx="5"
                fill="#D9D9D9"
              />
            </g>
            <path
              id="pompa2B"
              d="M674.413 283.504C674.413 293.738 665.661 302.078 654.809 302.078C643.957 302.078 635.205 293.738 635.205 283.504C635.205 273.271 643.957 264.931 654.809 264.931C665.661 264.931 674.413 273.271 674.413 283.504Z"
              fill="#FF0000"
              stroke="black"
              cursor={'pointer'}
            />
          </g>
        </svg>
      </div>

      <div style={visible ? styles.infoDiv : styles.hiddenInfoDiv}>
        <div style={styles.title}>{title}</div>
        <div style={styles.text}>{text}</div>
      </div>
    </StyledMainDiv>
  );
};

const StyledMainDiv = styled.div`
  background-color: ${colorConstants.white};
  width: 65%;
  height: 80vh;
  margin-top: 2%;
  padding-bottom: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const styles = {
  modelDiv: {
    padding: '10px',
    borderRadius: '20px',
    border: 'solid',
    borderColor: colorConstants.lightGrey,
  },

  hiddenInfoDiv: {
    width: '25%',
    height: '50vh',
    backgroundColor: colorConstants.lightGrey,
    padding: '20px',
    borderRadius: '20px',
    visibility: 'hidden',
    marginLeft: '10px',
  } as React.CSSProperties,

  infoDiv: {
    width: '25%',
    height: '50vh',
    backgroundColor: colorConstants.lightGrey,
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10px',
    userSelect: 'none',
  } as React.CSSProperties,

  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  } as React.CSSProperties,

  text: {
    textAlign: 'justify',
  } as React.CSSProperties,
};
