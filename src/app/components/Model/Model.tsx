import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colorConstants } from 'styles/colorConstants';
import data from './data.json';

type Color = 'red' | 'green';
type askColor = '#298E33' | '#73C98E';

const maxHeight = 260;

export const Model = () => {
  //States
  const [startContainerHeight, setStartContainerHeight] = useState(0);
  const [innerContainerAHeight, setInnerContainerAHeight] = useState(0);
  const [innerContainerBHeight, setInnerContainerBHeight] = useState(0);
  const [innerContainerCHeight, setInnerContainerCHeight] = useState(0);
  const [endContainerHeight, setEndContainerHeight] = useState(maxHeight);

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

  function handle1(h: number, pipesName: Array<string>) {
    let totalOpen = 0;
    let fillUp = 0;

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
        document.getElementById('pompa1A')?.getAttribute('fill') === 'green' &&
        h > 0
      ) {
        totalOpen++;

        if (
          document.getElementById('helpWaterA')?.getAttribute('height') ===
          '260'
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
          '260'
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
          '260'
        ) {
          fillUp++;
        }
      }

      let fraction = 1 / (totalOpen - fillUp);

      if (
        document.getElementById('pompa1A')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterA')?.getAttribute('height') !==
          '260' &&
        h > 0
      )
        setInnerContainerAHeight(h => Math.min(h + 6 * fraction, maxHeight));

      if (
        document.getElementById('pompa1B')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterB')?.getAttribute('height') !==
          '260' &&
        h > 0
      )
        setInnerContainerBHeight(h => Math.min(h + 6 * fraction, maxHeight));

      if (
        document.getElementById('pompa1C')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterC')?.getAttribute('height') !==
          '260' &&
        h > 0
      )
        setInnerContainerCHeight(h => Math.min(h + 6 * fraction, maxHeight));
    }

    if (totalOpen - fillUp > 0) return Math.max(h - 6, 0);

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

        if (button.current) {
          button.current.setAttribute('fill', newColor);

          if (newColor === 'green' && height > 0) {
            pipesName.forEach(pipeName => {
              const pipe = document.getElementById(pipeName);
              pipe?.setAttribute('fill', '#0AD3FF');
            });
          } else {
            if (
              button.current.getAttribute('id') === 'pompa1A' &&
              document.getElementById('pompa1B')?.getAttribute('fill') ===
                'red' &&
              document.getElementById('pompa1C')?.getAttribute('fill') === 'red'
            ) {
              pipesName.forEach(pipeName => {
                const pipe = document.getElementById(pipeName);
                pipe?.setAttribute('fill', '#E1E1E1');
              });
            } else {
              if (
                button.current.getAttribute('id') === 'pompa1B' &&
                document.getElementById('pompa1A')?.getAttribute('fill') ===
                  'red' &&
                document.getElementById('pompa1C')?.getAttribute('fill') ===
                  'red'
              ) {
                pipesName.forEach(pipeName => {
                  const pipe = document.getElementById(pipeName);
                  pipe?.setAttribute('fill', '#E1E1E1');
                });
              } else {
                if (
                  button.current.getAttribute('id') === 'pompa1B' &&
                  document.getElementById('pompa1A')?.getAttribute('fill') ===
                    'green' &&
                  document.getElementById('pompa1C')?.getAttribute('fill') ===
                    'red'
                ) {
                  const pipe = document.getElementById('pipe1_5');
                  pipe?.setAttribute('fill', '#E1E1E1');
                } else {
                  if (
                    button.current.getAttribute('id') === 'pompa1C' &&
                    document.getElementById('pompa1A')?.getAttribute('fill') ===
                      'red' &&
                    document.getElementById('pompa1B')?.getAttribute('fill') ===
                      'red'
                  ) {
                    pipesName.forEach(pipeName => {
                      const pipe = document.getElementById(pipeName);
                      pipe?.setAttribute('fill', '#E1E1E1');
                    });
                  } else {
                    if (
                      button.current.getAttribute('id') === 'pompa1C' &&
                      document
                        .getElementById('pompa1B')
                        ?.getAttribute('fill') === 'green'
                    ) {
                      const pipe = document.getElementById('pipe1_6');
                      pipe?.setAttribute('fill', '#E1E1E1');
                    } else {
                      if (
                        button.current.getAttribute('id') === 'pompa1C' &&
                        document
                          .getElementById('pompa1A')
                          ?.getAttribute('fill') === 'green' &&
                        document
                          .getElementById('pompa1B')
                          ?.getAttribute('fill') === 'red'
                      ) {
                        let pipe = document.getElementById('pipe1_5');
                        pipe?.setAttribute('fill', '#E1E1E1');
                        pipe = document.getElementById('pipe1_6');
                        pipe?.setAttribute('fill', '#E1E1E1');
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (newColor === 'green') {
          //add if output
          timer.current = window.setInterval(() => {
            setHeight(h => handle1(h, pipesName));
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
    //Start container
    let pipesNameStartA: Array<string> = [];
    pipesNameStartA.push('pipe1_1');
    pipesNameStartA.push('pipe1_2');
    pipesNameStartA.push('pipe1_3');
    pipesNameStartA.push('pipe1_4');

    useWater(startContainerHeight, 'startWater', 68.5);
    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1A',
      pipesNameStartA,
    );

    let pipesNameStartB: Array<string> = [];
    pipesNameStartB.push('pipe1_1');
    pipesNameStartB.push('pipe1_2');
    pipesNameStartB.push('pipe1_3');
    pipesNameStartB.push('pipe1_4');
    pipesNameStartB.push('pipe1_5');

    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1B',
      pipesNameStartB,
    );

    let pipesNameStartC: Array<string> = [];
    pipesNameStartC.push('pipe1_1');
    pipesNameStartC.push('pipe1_2');
    pipesNameStartC.push('pipe1_3');
    pipesNameStartC.push('pipe1_4');
    pipesNameStartC.push('pipe1_5');
    pipesNameStartC.push('pipe1_6');

    useOutputButton1(
      startContainerHeight,
      num => setStartContainerHeight(num),
      'pompa1C',
      pipesNameStartC,
    );
  }

  function handle2(h: number, pipesName: Array<string>) {
    if (h === 0) {
      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#E1E1E1');
      });
    } else {
      let total = 0;

      pipesName.forEach(pipeName => {
        const pipe = document.getElementById(pipeName);
        pipe?.setAttribute('fill', '#0AD3FF');
      });

      if (
        document.getElementById('pompa2A')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterA')?.getAttribute('height') !== '0'
      )
        total++;

      if (
        document.getElementById('pompa2B')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterB')?.getAttribute('height') !== '0'
      )
        total++;

      if (
        document.getElementById('pompa2C')?.getAttribute('fill') === 'green' &&
        document.getElementById('helpWaterC')?.getAttribute('height') !== '0'
      )
        total++;

      if (
        document.getElementById('finalWater')?.getAttribute('height') !== '260'
      )
        setEndContainerHeight(h => Math.min(h + 6 * total, maxHeight));
    }

    if (document.getElementById('finalWater')?.getAttribute('height') !== '260')
      return Math.max(h - 6, 0);

    return h;
  }

  function useOutputButton2(
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
          //add if output
          timer.current = window.setInterval(() => {
            setHeight(h => handle2(h, pipesName));
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
    pipesNameA.push('pipe2_1a');

    useWater(innerContainerAHeight, 'helpWaterA', 68.5);
    useOutputButton2(
      innerContainerAHeight,
      num => setInnerContainerAHeight(num),
      'pompa2A',
      pipesNameA,
    );

    //Help container B
    let pipesNameB: Array<string> = [];
    pipesNameB.push('pipe2_1b');
    pipesNameB.push('pipe2_3');

    useWater(innerContainerBHeight, 'helpWaterB', 68.5);
    useOutputButton2(
      innerContainerBHeight,
      num => setInnerContainerBHeight(num),
      'pompa2B',
      pipesNameB,
    );

    //Help container C
    let pipesNameC: Array<string> = [];
    pipesNameC.push('pipe2_1c');

    useWater(innerContainerCHeight, 'helpWaterC', 68.5);
    useOutputButton2(
      innerContainerCHeight,
      num => setInnerContainerCHeight(num),
      'pompa2C',
      pipesNameC,
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
        document.getElementById('startWater')?.getAttribute('height') !== '260'
      )
        setStartContainerHeight(h => Math.min(h + 6, maxHeight));
    }

    if (document.getElementById('startWater')?.getAttribute('height') !== '260')
      return Math.max(h - 6, 0);

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
          //add if output
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

    useWater(endContainerHeight, 'finalWater', 523.5);
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

  useAskButton('askMain', 'EllipseaskMain');
  useAskButton('askPomp', 'EllipseaskPomp');
  useAskButton('askHelpContainer', 'EllipseaskHelpContainer');
  useAskButton('askFinalContainer', 'EllipseaskFinalContainer');
  useAskButton('askEngine3', 'EllipseaskEngine3');
  useAskButton('askPomp3', 'EllipseaskPomp3');

  return (
    <div style={styles.mainDiv}>
      <svg
        width="743"
        height="598"
        viewBox="0 0 1043 898"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Makieta">
          <rect
            id="helpContainerC"
            x="879.5"
            y="68.5"
            width="108"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="helpCointainerB"
            x="770.5"
            y="68.5"
            width="108"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="finalContainer"
            x="661.5"
            y="523.5"
            width="326"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="engine"
            x="117.5"
            y="523.5"
            width="422"
            height="265"
            fill="#A76D16"
            stroke="black"
          />
          <rect
            id="finalWater"
            x="661.5"
            y="631.5"
            width="326"
            height="157"
            fill="#10C6EE"
            stroke="black"
          />
          <rect
            id="pipe2_1a"
            x="696"
            y="329"
            width="40"
            height="194"
            fill="#E1E1E1"
          />
          <rect id="pipe3_5" x="243" width="40" height="68" fill="#E1E1E1" />
          <rect
            id="pipe1_1"
            x="243"
            y="329"
            width="40"
            height="71"
            fill="#E1E1E1"
          />
          <rect id="pipe1_3" x="520" width="40" height="433" fill="#E1E1E1" />
          <path id="pipe2_1b" d="M805 329H845V402H805V329Z" fill="#E1E1E1" />
          <path id="pipe3_1" d="M804 785H844V863H804V785Z" fill="#E1E1E1" />
          <path id="pipe3_3" d="M0 0H40V862H0V0Z" fill="#E1E1E1" />
          <path id="pipe2_3" d="M805 402H845V523H805V402Z" fill="#E1E1E1" />
          <rect
            id="pipe2_1c"
            x="914"
            y="329"
            width="40"
            height="194"
            fill="#E1E1E1"
          />
          <rect
            id="startContainer"
            x="106.5"
            y="68.5"
            width="312"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="startWater"
            x="106.5"
            y="182.5"
            width="312"
            height="146"
            fill="#0AD3FF"
            stroke="black"
          />
          <rect
            id="helpContainerA"
            x="661.5"
            y="68.5"
            width="108"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="helpWaterA"
            x="661.5"
            y="171.5"
            width="108"
            height="157"
            fill="#0AD3FF"
            stroke="black"
          />
          <rect
            id="helpWaterB"
            x="770.5"
            y="171.5"
            width="108"
            height="157"
            fill="#10C6EE"
            stroke="black"
          />
          <rect
            id="helpWaterC"
            x="879.5"
            y="171.5"
            width="108"
            height="157"
            fill="#0AD3FF"
            stroke="black"
          />
          <rect
            id="Rectangle 42"
            y="862"
            width="824"
            height="36"
            fill="#C4C4C4"
          />
          <rect id="pipe3_2" y="862" width="845" height="36" fill="#E1E1E1" />
          <rect
            id="pipe1_2"
            x="243"
            y="396"
            width="277"
            height="36"
            fill="#E1E1E1"
          />
          <rect id="pipe3_4" x="36" width="207" height="36" fill="#E1E1E1" />
          <rect id="pipe1_4" x="560" width="176" height="36" fill="#E1E1E1" />
          <rect id="pipe1_5" x="736" width="109" height="36" fill="#E1E1E1" />
          <rect id="pipe1_6" x="845" width="109" height="36" fill="#E1E1E1" />
          <path
            id="pompa3"
            d="M291.5 47.5C291.5 63.5243 278.732 76.5 263 76.5C247.268 76.5 234.5 63.5243 234.5 47.5C234.5 31.4756 247.268 18.5 263 18.5C278.732 18.5 291.5 31.4756 291.5 47.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa2A"
            d="M744.5 503.5C744.5 519.524 731.732 532.5 716 532.5C700.268 532.5 687.5 519.524 687.5 503.5C687.5 487.476 700.268 474.5 716 474.5C731.732 474.5 744.5 487.476 744.5 503.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa2B"
            d="M852.5 503.5C852.5 519.524 839.732 532.5 824 532.5C808.268 532.5 795.5 519.524 795.5 503.5C795.5 487.476 808.268 474.5 824 474.5C839.732 474.5 852.5 487.476 852.5 503.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa2C"
            d="M962.5 503.5C962.5 519.524 949.732 532.5 934 532.5C918.268 532.5 905.5 519.524 905.5 503.5C905.5 487.476 918.268 474.5 934 474.5C949.732 474.5 962.5 487.476 962.5 503.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1C"
            d="M962.5 47.5C962.5 63.5243 949.732 76.5 934 76.5C918.268 76.5 905.5 63.5243 905.5 47.5C905.5 31.4756 918.268 18.5 934 18.5C949.732 18.5 962.5 31.4756 962.5 47.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1A"
            d="M744.5 47.5C744.5 63.5243 731.732 76.5 716 76.5C700.268 76.5 687.5 63.5243 687.5 47.5C687.5 31.4756 700.268 18.5 716 18.5C731.732 18.5 744.5 31.4756 744.5 47.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1B"
            d="M853.5 47.5C853.5 63.5243 840.732 76.5 825 76.5C809.268 76.5 796.5 63.5243 796.5 47.5C796.5 31.4756 809.268 18.5 825 18.5C840.732 18.5 853.5 31.4756 853.5 47.5Z"
            fill="red"
            stroke="black"
          />
          <g id="askMain">
            <circle
              id="Ellipse 1"
              cx="451.5"
              cy="86.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?"
              d="M452.496 89.8789H449.695C449.703 89.168 449.762 88.5586 449.871 88.0508C449.988 87.543 450.18 87.0859 450.445 86.6797C450.711 86.2656 451.07 85.8438 451.523 85.4141C451.883 85.0781 452.203 84.7617 452.484 84.4648C452.773 84.1602 453 83.8438 453.164 83.5156C453.328 83.1797 453.41 82.8008 453.41 82.3789C453.41 81.9023 453.332 81.5039 453.176 81.1836C453.027 80.8633 452.805 80.6211 452.508 80.457C452.219 80.2852 451.855 80.1992 451.418 80.1992C451.059 80.1992 450.719 80.2734 450.398 80.4219C450.078 80.5703 449.82 80.8008 449.625 81.1133C449.43 81.418 449.324 81.8164 449.309 82.3086H446.203C446.227 81.2852 446.469 80.4336 446.93 79.7539C447.391 79.0664 448.012 78.5547 448.793 78.2188C449.574 77.875 450.449 77.7031 451.418 77.7031C452.488 77.7031 453.402 77.8828 454.16 78.2422C454.926 78.5938 455.508 79.1094 455.906 79.7891C456.312 80.4688 456.516 81.2891 456.516 82.25C456.516 82.9375 456.383 83.5547 456.117 84.1016C455.852 84.6406 455.5 85.1445 455.062 85.6133C454.625 86.082 454.152 86.5547 453.645 87.0312C453.199 87.4297 452.898 87.8555 452.742 88.3086C452.586 88.7617 452.504 89.2852 452.496 89.8789ZM449.402 93.5234C449.402 93.0547 449.559 92.6641 449.871 92.3516C450.191 92.0391 450.621 91.8828 451.16 91.8828C451.699 91.8828 452.125 92.0391 452.438 92.3516C452.758 92.6641 452.918 93.0547 452.918 93.5234C452.918 93.9766 452.758 94.3594 452.438 94.6719C452.125 94.9844 451.699 95.1406 451.16 95.1406C450.621 95.1406 450.191 94.9844 449.871 94.6719C449.559 94.3594 449.402 93.9766 449.402 93.5234Z"
              fill="white"
            />
          </g>
          <g id="askPomp3">
            <circle
              id="Ellipse 1_2"
              cx="881.5"
              cy="866.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_2"
              d="M882.496 869.879H879.695C879.703 869.168 879.762 868.559 879.871 868.051C879.988 867.543 880.18 867.086 880.445 866.68C880.711 866.266 881.07 865.844 881.523 865.414C881.883 865.078 882.203 864.762 882.484 864.465C882.773 864.16 883 863.844 883.164 863.516C883.328 863.18 883.41 862.801 883.41 862.379C883.41 861.902 883.332 861.504 883.176 861.184C883.027 860.863 882.805 860.621 882.508 860.457C882.219 860.285 881.855 860.199 881.418 860.199C881.059 860.199 880.719 860.273 880.398 860.422C880.078 860.57 879.82 860.801 879.625 861.113C879.43 861.418 879.324 861.816 879.309 862.309H876.203C876.227 861.285 876.469 860.434 876.93 859.754C877.391 859.066 878.012 858.555 878.793 858.219C879.574 857.875 880.449 857.703 881.418 857.703C882.488 857.703 883.402 857.883 884.16 858.242C884.926 858.594 885.508 859.109 885.906 859.789C886.312 860.469 886.516 861.289 886.516 862.25C886.516 862.938 886.383 863.555 886.117 864.102C885.852 864.641 885.5 865.145 885.062 865.613C884.625 866.082 884.152 866.555 883.645 867.031C883.199 867.43 882.898 867.855 882.742 868.309C882.586 868.762 882.504 869.285 882.496 869.879ZM879.402 873.523C879.402 873.055 879.559 872.664 879.871 872.352C880.191 872.039 880.621 871.883 881.16 871.883C881.699 871.883 882.125 872.039 882.438 872.352C882.758 872.664 882.918 873.055 882.918 873.523C882.918 873.977 882.758 874.359 882.438 874.672C882.125 874.984 881.699 875.141 881.16 875.141C880.621 875.141 880.191 874.984 879.871 874.672C879.559 874.359 879.402 873.977 879.402 873.523Z"
              fill="white"
            />
          </g>
          <g id="askEngine3">
            <circle
              id="Ellipse 1_3"
              cx="577.5"
              cy="540.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_3"
              d="M578.496 543.879H575.695C575.703 543.168 575.762 542.559 575.871 542.051C575.988 541.543 576.18 541.086 576.445 540.68C576.711 540.266 577.07 539.844 577.523 539.414C577.883 539.078 578.203 538.762 578.484 538.465C578.773 538.16 579 537.844 579.164 537.516C579.328 537.18 579.41 536.801 579.41 536.379C579.41 535.902 579.332 535.504 579.176 535.184C579.027 534.863 578.805 534.621 578.508 534.457C578.219 534.285 577.855 534.199 577.418 534.199C577.059 534.199 576.719 534.273 576.398 534.422C576.078 534.57 575.82 534.801 575.625 535.113C575.43 535.418 575.324 535.816 575.309 536.309H572.203C572.227 535.285 572.469 534.434 572.93 533.754C573.391 533.066 574.012 532.555 574.793 532.219C575.574 531.875 576.449 531.703 577.418 531.703C578.488 531.703 579.402 531.883 580.16 532.242C580.926 532.594 581.508 533.109 581.906 533.789C582.312 534.469 582.516 535.289 582.516 536.25C582.516 536.938 582.383 537.555 582.117 538.102C581.852 538.641 581.5 539.145 581.062 539.613C580.625 540.082 580.152 540.555 579.645 541.031C579.199 541.43 578.898 541.855 578.742 542.309C578.586 542.762 578.504 543.285 578.496 543.879ZM575.402 547.523C575.402 547.055 575.559 546.664 575.871 546.352C576.191 546.039 576.621 545.883 577.16 545.883C577.699 545.883 578.125 546.039 578.438 546.352C578.758 546.664 578.918 547.055 578.918 547.523C578.918 547.977 578.758 548.359 578.438 548.672C578.125 548.984 577.699 549.141 577.16 549.141C576.621 549.141 576.191 548.984 575.871 548.672C575.559 548.359 575.402 547.977 575.402 547.523Z"
              fill="white"
            />
          </g>
          <g id="askFinalContainer">
            <circle
              id="Ellipse 1_4"
              cx="1025.5"
              cy="540.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_4"
              d="M1026.5 543.879H1023.7C1023.7 543.168 1023.76 542.559 1023.87 542.051C1023.99 541.543 1024.18 541.086 1024.45 540.68C1024.71 540.266 1025.07 539.844 1025.52 539.414C1025.88 539.078 1026.2 538.762 1026.48 538.465C1026.77 538.16 1027 537.844 1027.16 537.516C1027.33 537.18 1027.41 536.801 1027.41 536.379C1027.41 535.902 1027.33 535.504 1027.18 535.184C1027.03 534.863 1026.8 534.621 1026.51 534.457C1026.22 534.285 1025.86 534.199 1025.42 534.199C1025.06 534.199 1024.72 534.273 1024.4 534.422C1024.08 534.57 1023.82 534.801 1023.62 535.113C1023.43 535.418 1023.32 535.816 1023.31 536.309H1020.2C1020.23 535.285 1020.47 534.434 1020.93 533.754C1021.39 533.066 1022.01 532.555 1022.79 532.219C1023.57 531.875 1024.45 531.703 1025.42 531.703C1026.49 531.703 1027.4 531.883 1028.16 532.242C1028.93 532.594 1029.51 533.109 1029.91 533.789C1030.31 534.469 1030.52 535.289 1030.52 536.25C1030.52 536.938 1030.38 537.555 1030.12 538.102C1029.85 538.641 1029.5 539.145 1029.06 539.613C1028.62 540.082 1028.15 540.555 1027.64 541.031C1027.2 541.43 1026.9 541.855 1026.74 542.309C1026.59 542.762 1026.5 543.285 1026.5 543.879ZM1023.4 547.523C1023.4 547.055 1023.56 546.664 1023.87 546.352C1024.19 546.039 1024.62 545.883 1025.16 545.883C1025.7 545.883 1026.12 546.039 1026.44 546.352C1026.76 546.664 1026.92 547.055 1026.92 547.523C1026.92 547.977 1026.76 548.359 1026.44 548.672C1026.12 548.984 1025.7 549.141 1025.16 549.141C1024.62 549.141 1024.19 548.984 1023.87 548.672C1023.56 548.359 1023.4 547.977 1023.4 547.523Z"
              fill="white"
            />
          </g>
          <g id="askHelpContainer">
            <circle
              id="Ellipse 1_5"
              cx="1025.5"
              cy="101.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_5"
              d="M1026.5 104.879H1023.7C1023.7 104.168 1023.76 103.559 1023.87 103.051C1023.99 102.543 1024.18 102.086 1024.45 101.68C1024.71 101.266 1025.07 100.844 1025.52 100.414C1025.88 100.078 1026.2 99.7617 1026.48 99.4648C1026.77 99.1602 1027 98.8438 1027.16 98.5156C1027.33 98.1797 1027.41 97.8008 1027.41 97.3789C1027.41 96.9023 1027.33 96.5039 1027.18 96.1836C1027.03 95.8633 1026.8 95.6211 1026.51 95.457C1026.22 95.2852 1025.86 95.1992 1025.42 95.1992C1025.06 95.1992 1024.72 95.2734 1024.4 95.4219C1024.08 95.5703 1023.82 95.8008 1023.62 96.1133C1023.43 96.418 1023.32 96.8164 1023.31 97.3086H1020.2C1020.23 96.2852 1020.47 95.4336 1020.93 94.7539C1021.39 94.0664 1022.01 93.5547 1022.79 93.2188C1023.57 92.875 1024.45 92.7031 1025.42 92.7031C1026.49 92.7031 1027.4 92.8828 1028.16 93.2422C1028.93 93.5938 1029.51 94.1094 1029.91 94.7891C1030.31 95.4688 1030.52 96.2891 1030.52 97.25C1030.52 97.9375 1030.38 98.5547 1030.12 99.1016C1029.85 99.6406 1029.5 100.145 1029.06 100.613C1028.62 101.082 1028.15 101.555 1027.64 102.031C1027.2 102.43 1026.9 102.855 1026.74 103.309C1026.59 103.762 1026.5 104.285 1026.5 104.879ZM1023.4 108.523C1023.4 108.055 1023.56 107.664 1023.87 107.352C1024.19 107.039 1024.62 106.883 1025.16 106.883C1025.7 106.883 1026.12 107.039 1026.44 107.352C1026.76 107.664 1026.92 108.055 1026.92 108.523C1026.92 108.977 1026.76 109.359 1026.44 109.672C1026.12 109.984 1025.7 110.141 1025.16 110.141C1024.62 110.141 1024.19 109.984 1023.87 109.672C1023.56 109.359 1023.4 108.977 1023.4 108.523Z"
              fill="white"
            />
          </g>
          <g id="askPomp">
            <circle
              id="Ellipse 1_6"
              cx="995.5"
              cy="17.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_6"
              d="M996.496 20.8789H993.695C993.703 20.168 993.762 19.5586 993.871 19.0508C993.988 18.543 994.18 18.0859 994.445 17.6797C994.711 17.2656 995.07 16.8438 995.523 16.4141C995.883 16.0781 996.203 15.7617 996.484 15.4648C996.773 15.1602 997 14.8438 997.164 14.5156C997.328 14.1797 997.41 13.8008 997.41 13.3789C997.41 12.9023 997.332 12.5039 997.176 12.1836C997.027 11.8633 996.805 11.6211 996.508 11.457C996.219 11.2852 995.855 11.1992 995.418 11.1992C995.059 11.1992 994.719 11.2734 994.398 11.4219C994.078 11.5703 993.82 11.8008 993.625 12.1133C993.43 12.418 993.324 12.8164 993.309 13.3086H990.203C990.227 12.2852 990.469 11.4336 990.93 10.7539C991.391 10.0664 992.012 9.55469 992.793 9.21875C993.574 8.875 994.449 8.70312 995.418 8.70312C996.488 8.70312 997.402 8.88281 998.16 9.24219C998.926 9.59375 999.508 10.1094 999.906 10.7891C1000.31 11.4688 1000.52 12.2891 1000.52 13.25C1000.52 13.9375 1000.38 14.5547 1000.12 15.1016C999.852 15.6406 999.5 16.1445 999.062 16.6133C998.625 17.082 998.152 17.5547 997.645 18.0312C997.199 18.4297 996.898 18.8555 996.742 19.3086C996.586 19.7617 996.504 20.2852 996.496 20.8789ZM993.402 24.5234C993.402 24.0547 993.559 23.6641 993.871 23.3516C994.191 23.0391 994.621 22.8828 995.16 22.8828C995.699 22.8828 996.125 23.0391 996.438 23.3516C996.758 23.6641 996.918 24.0547 996.918 24.5234C996.918 24.9766 996.758 25.3594 996.438 25.6719C996.125 25.9844 995.699 26.1406 995.16 26.1406C994.621 26.1406 994.191 25.9844 993.871 25.6719C993.559 25.3594 993.402 24.9766 993.402 24.5234Z"
              fill="white"
            />
          </g>
        </g>
      </svg>

      <div style={visible ? styles.infoDiv : styles.hiddenInfoDiv}>
        <div style={styles.title}>{title}</div>
        <div style={styles.text}>{text}</div>
      </div>
    </div>
  );
};

const styles = {
  mainDiv: {
    backgroundColor: colorConstants.white,
    width: '70%',
    height: '80vh',
    marginLeft: '45vh',
    marginRight: 'auto',
    marginTop: '50px',
    paddingBottom: '1%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  hiddenInfoDiv: {
    width: '25%',
    height: '50vh',
    backgroundColor: colorConstants.lightGrey,
    padding: '20px',
    borderRadius: '20px',
    display: 'none',
    marginLeft: '10px',
  },

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
  } as React.CSSProperties,

  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },

  text: {
    textAlign: 'justify',
  } as React.CSSProperties,
};
