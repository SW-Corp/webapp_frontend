import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colorConstants } from 'styles/colorConstants';
import data from './data.json';

type Color = 'red' | 'green';
type askColor = '#298E33' | '#73C98E';

const maxHeight = 260;

export const Model = () => {
  //States
  const [startContainerHeight, setStartContainerHeight] = useState(50);
  const [innerContainerAHeight, setInnerContainerAHeight] = useState(10);
  const [innerContainerBHeight, setInnerContainerBHeight] = useState(0);
  const [innerContainerCHeight, setInnerContainerCHeight] = useState(0);
  const [endContainerHeight, setEndContainerHeight] = useState(100);

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
          //add if output
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
    //Start container
    let pipesNameStartA: Array<string> = [];
    pipesNameStartA.push('pipe1_1');
    pipesNameStartA.push('pipe1_2');
    pipesNameStartA.push('pipe1_3A');
    pipesNameStartA.push('pipe1_3B');
    pipesNameStartA.push('pipe1_3C');
    pipesNameStartA.push('pipe1_4A');
    pipesNameStartA.push('pipe1_5A');
    pipesNameStartA.push('pipe1_6A');

    useWater(startContainerHeight, 'startWater', 456.0);
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
    pipesNameA.push('pipe2A');

    useWater(innerContainerAHeight, 'helpWaterA', 101.5);
    useOutputButton2(
      innerContainerAHeight,
      num => setInnerContainerAHeight(num),
      'pompa2A',
      pipesNameA,
    );

    //Help container B
    let pipesNameB: Array<string> = [];
    pipesNameB.push('pipe2B');

    useWater(innerContainerBHeight, 'helpWaterB', 101.5);
    useOutputButton2(
      innerContainerBHeight,
      num => setInnerContainerBHeight(num),
      'pompa2B',
      pipesNameB,
    );

    //Help container C
    let pipesNameC: Array<string> = [];
    pipesNameC.push('pipe2C');

    useWater(innerContainerCHeight, 'helpWaterC', 101.5);
    useOutputButton2(
      innerContainerCHeight,
      num => setInnerContainerCHeight(num),
      'pompa2C',
      pipesNameC,
    );
  }

  function handle3(h: number, pipesName: Array<string>) {
    if (h === 0) {
      console.log(h);
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

    useWater(endContainerHeight, 'finalWater', 554.5);
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
  useAskButton('askFinalContainer', 'EllipseAskFinalContainer');
  useAskButton('askEngine', 'EllipseAskEngine');
  useAskButton('askFinalPomp', 'EllipseAskFinalPomp');
  useAskButton('askStop', 'EllipseAskStop');

  return (
    <div style={styles.mainDiv}>
      <svg
        width="800"
        height="600"
        viewBox="0 0 1155 928"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Makieta">
          <rect
            id="pipe1_5C"
            x="708"
            y="90"
            width="329"
            height="30"
            fill="#E1E1E1"
          />
          <rect
            id="helpContainerC"
            x="997.5"
            y="152.5"
            width="108"
            height="209"
            fill="white"
            stroke="black"
          />
          <rect
            id="helpCointainerB"
            x="888.5"
            y="152.5"
            width="108"
            height="209"
            fill="white"
            stroke="black"
          />
          <rect
            id="finalContainer"
            x="780.5"
            y="549.5"
            width="326"
            height="265"
            fill="white"
            stroke="black"
          />
          <rect
            id="pipe2A"
            x="815"
            y="362"
            width="40"
            height="194"
            fill="#E1E1E1"
          />
          <path
            id="pipe3_5"
            d="M239 331H254C267.807 331 279 342.193 279 356V416H239V331Z"
            fill="#E1E1E1"
          />
          <rect
            id="pipe1_1"
            x="239"
            y="713"
            width="40"
            height="94"
            fill="#E1E1E1"
          />
          <rect
            id="pipe1_3A"
            x="478"
            y="750"
            width="40"
            height="65"
            fill="#E1E1E1"
          />
          <rect
            id="pipe1_3B"
            x="576"
            y="750"
            width="40"
            height="65"
            fill="#E1E1E1"
          />
          <rect
            id="pipe1_3C"
            x="673"
            y="750"
            width="40"
            height="65"
            fill="#E1E1E1"
          />
          <rect
            id="startContainer"
            x="98.5"
            y="452.5"
            width="312"
            height="260"
            fill="white"
            stroke="black"
          />
          <rect
            id="helpContainerA"
            x="780.5"
            y="152.5"
            width="108"
            height="209"
            fill="white"
            stroke="black"
          />
          <rect
            id="helpWaterA"
            x="780.5"
            y="273.5"
            width="108"
            height="88"
            fill="#0AD3FF"
            stroke="black"
          />
          <path
            id="pipe3_2"
            d="M1 888H966V899C966 912.807 954.807 924 941 924H26C12.1929 924 1 912.807 1 899V888Z"
            fill="#E1E1E1"
          />
          <path
            id="pipe1_2"
            d="M239 807H713V818C713 831.807 701.807 843 688 843H264C250.193 843 239 831.807 239 818V807Z"
            fill="#E1E1E1"
          />
          <path
            id="pipe1_5B"
            d="M581 70C581 56.1929 592.193 45 606 45H929V75H581V70Z"
            fill="#B8B8B8"
          />
          <path
            id="pipe1_6B"
            d="M929 45H934C947.807 45 959 56.1929 959 70V152H929V45Z"
            fill="#B8B8B8"
          />
          <path
            id="pipe1_6C"
            d="M1037 90H1042C1055.81 90 1067 101.193 1067 115V152H1037V90Z"
            fill="#E1E1E1"
          />
          <g id="askMain">
            <circle
              id="EllipseAskMain"
              cx="441.5"
              cy="469.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?"
              d="M442.496 472.879H439.695C439.703 472.168 439.762 471.559 439.871 471.051C439.988 470.543 440.18 470.086 440.445 469.68C440.711 469.266 441.07 468.844 441.523 468.414C441.883 468.078 442.203 467.762 442.484 467.465C442.773 467.16 443 466.844 443.164 466.516C443.328 466.18 443.41 465.801 443.41 465.379C443.41 464.902 443.332 464.504 443.176 464.184C443.027 463.863 442.805 463.621 442.508 463.457C442.219 463.285 441.855 463.199 441.418 463.199C441.059 463.199 440.719 463.273 440.398 463.422C440.078 463.57 439.82 463.801 439.625 464.113C439.43 464.418 439.324 464.816 439.309 465.309H436.203C436.227 464.285 436.469 463.434 436.93 462.754C437.391 462.066 438.012 461.555 438.793 461.219C439.574 460.875 440.449 460.703 441.418 460.703C442.488 460.703 443.402 460.883 444.16 461.242C444.926 461.594 445.508 462.109 445.906 462.789C446.312 463.469 446.516 464.289 446.516 465.25C446.516 465.938 446.383 466.555 446.117 467.102C445.852 467.641 445.5 468.145 445.062 468.613C444.625 469.082 444.152 469.555 443.645 470.031C443.199 470.43 442.898 470.855 442.742 471.309C442.586 471.762 442.504 472.285 442.496 472.879ZM439.402 476.523C439.402 476.055 439.559 475.664 439.871 475.352C440.191 475.039 440.621 474.883 441.16 474.883C441.699 474.883 442.125 475.039 442.438 475.352C442.758 475.664 442.918 476.055 442.918 476.523C442.918 476.977 442.758 477.359 442.438 477.672C442.125 477.984 441.699 478.141 441.16 478.141C440.621 478.141 440.191 477.984 439.871 477.672C439.559 477.359 439.402 476.977 439.402 476.523Z"
              fill="white"
            />
          </g>
          <g id="askFinalPomp">
            <circle
              id="EllipseAskFinalPomp"
              cx="313.5"
              cy="398.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_2"
              d="M314.496 401.879H311.695C311.703 401.168 311.762 400.559 311.871 400.051C311.988 399.543 312.18 399.086 312.445 398.68C312.711 398.266 313.07 397.844 313.523 397.414C313.883 397.078 314.203 396.762 314.484 396.465C314.773 396.16 315 395.844 315.164 395.516C315.328 395.18 315.41 394.801 315.41 394.379C315.41 393.902 315.332 393.504 315.176 393.184C315.027 392.863 314.805 392.621 314.508 392.457C314.219 392.285 313.855 392.199 313.418 392.199C313.059 392.199 312.719 392.273 312.398 392.422C312.078 392.57 311.82 392.801 311.625 393.113C311.43 393.418 311.324 393.816 311.309 394.309H308.203C308.227 393.285 308.469 392.434 308.93 391.754C309.391 391.066 310.012 390.555 310.793 390.219C311.574 389.875 312.449 389.703 313.418 389.703C314.488 389.703 315.402 389.883 316.16 390.242C316.926 390.594 317.508 391.109 317.906 391.789C318.312 392.469 318.516 393.289 318.516 394.25C318.516 394.938 318.383 395.555 318.117 396.102C317.852 396.641 317.5 397.145 317.062 397.613C316.625 398.082 316.152 398.555 315.645 399.031C315.199 399.43 314.898 399.855 314.742 400.309C314.586 400.762 314.504 401.285 314.496 401.879ZM311.402 405.523C311.402 405.055 311.559 404.664 311.871 404.352C312.191 404.039 312.621 403.883 313.16 403.883C313.699 403.883 314.125 404.039 314.438 404.352C314.758 404.664 314.918 405.055 314.918 405.523C314.918 405.977 314.758 406.359 314.438 406.672C314.125 406.984 313.699 407.141 313.16 407.141C312.621 407.141 312.191 406.984 311.871 406.672C311.559 406.359 311.402 405.977 311.402 405.523Z"
              fill="white"
            />
          </g>
          <g id="askFinalContainer">
            <circle
              id="EllipseAskFinalContainer"
              cx="1137.5"
              cy="566.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_3"
              d="M1138.5 569.879H1135.7C1135.7 569.168 1135.76 568.559 1135.87 568.051C1135.99 567.543 1136.18 567.086 1136.45 566.68C1136.71 566.266 1137.07 565.844 1137.52 565.414C1137.88 565.078 1138.2 564.762 1138.48 564.465C1138.77 564.16 1139 563.844 1139.16 563.516C1139.33 563.18 1139.41 562.801 1139.41 562.379C1139.41 561.902 1139.33 561.504 1139.18 561.184C1139.03 560.863 1138.8 560.621 1138.51 560.457C1138.22 560.285 1137.86 560.199 1137.42 560.199C1137.06 560.199 1136.72 560.273 1136.4 560.422C1136.08 560.57 1135.82 560.801 1135.62 561.113C1135.43 561.418 1135.32 561.816 1135.31 562.309H1132.2C1132.23 561.285 1132.47 560.434 1132.93 559.754C1133.39 559.066 1134.01 558.555 1134.79 558.219C1135.57 557.875 1136.45 557.703 1137.42 557.703C1138.49 557.703 1139.4 557.883 1140.16 558.242C1140.93 558.594 1141.51 559.109 1141.91 559.789C1142.31 560.469 1142.52 561.289 1142.52 562.25C1142.52 562.938 1142.38 563.555 1142.12 564.102C1141.85 564.641 1141.5 565.145 1141.06 565.613C1140.62 566.082 1140.15 566.555 1139.64 567.031C1139.2 567.43 1138.9 567.855 1138.74 568.309C1138.59 568.762 1138.5 569.285 1138.5 569.879ZM1135.4 573.523C1135.4 573.055 1135.56 572.664 1135.87 572.352C1136.19 572.039 1136.62 571.883 1137.16 571.883C1137.7 571.883 1138.12 572.039 1138.44 572.352C1138.76 572.664 1138.92 573.055 1138.92 573.523C1138.92 573.977 1138.76 574.359 1138.44 574.672C1138.12 574.984 1137.7 575.141 1137.16 575.141C1136.62 575.141 1136.19 574.984 1135.87 574.672C1135.56 574.359 1135.4 573.977 1135.4 573.523Z"
              fill="white"
            />
          </g>
          <path
            id="pipe1_6A"
            d="M820 0H825C838.807 0 850 11.1929 850 25V152H820V0Z"
            fill="#848484"
          />
          <g id="Engine">
            <rect
              id="engine"
              x="205"
              y="125.5"
              width="190.086"
              height="90"
              rx="9.5"
              fill="#A76D16"
              stroke="black"
            />
            <rect
              id="switch7"
              x="215"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch6"
              x="238"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch5"
              x="261"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch4"
              x="284"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch3"
              x="320"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch2"
              x="343"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
            <rect
              id="switch1"
              x="366"
              y="148"
              width="19"
              height="45"
              rx="5"
              fill="#D9D9D9"
            />
          </g>
          {/* <g id="finalWater" filter="url(#filter0_d_502_65)">
          <rect x="780" y="657" width="327" height="158" fill="#10C6EE"/>
          <rect x="780.5" y="657.5" width="326" height="157" stroke="black"/>
        </g> */}
          <rect
            id="finalWater"
            x="780.5"
            y="657.5"
            width="326"
            height="146"
            fill="#0AD3FF"
            stroke="black"
          />
          <path id="pipe1_4A" d="M483 30H513V703H483V30Z" fill="#848484" />
          <rect
            id="pipe1_4B"
            x="581"
            y="75"
            width="30"
            height="642"
            fill="#B8B8B8"
          />
          <path
            id="pipe1_4C"
            d="M678 115C678 101.193 689.193 90 703 90H708V710H678V115Z"
            fill="#E1E1E1"
          />
          <path
            id="pipe3_3"
            d="M0 356C0 342.193 11.1929 331 25 331H40V894H0V356Z"
            fill="#E1E1E1"
          />
          <path id="pipe3_1" d="M926 815H966V888H926V815Z" fill="#E1E1E1" />
          <path id="pipe2B" d="M923 362H963V556H923V362Z" fill="#E1E1E1" />
          <path id="pipe2C" d="M1033 361H1073V555H1033V361Z" fill="#E1E1E1" />
          <rect
            id="startWater"
            x="98.5"
            y="566.5"
            width="312"
            height="146"
            fill="#0AD3FF"
            stroke="black"
          />
          <rect
            id="helpWaterB"
            x="888.5"
            y="273.5"
            width="108"
            height="88"
            fill="#10C6EE"
            stroke="black"
          />
          <rect
            id="helpWaterC"
            x="997.5"
            y="273.5"
            width="108"
            height="88"
            fill="#0AD3FF"
            stroke="black"
          />
          <path id="pipe3_4" d="M40 331H139.5H239V367H40V331Z" fill="#E1E1E1" />
          <path
            id="pipe1_5A"
            d="M483 25C483 11.1929 494.193 0 508 0H820V30H483V25Z"
            fill="#848484"
          />
          <path
            id="pompa2A"
            d="M863.5 529.5C863.5 545.524 850.732 558.5 835 558.5C819.268 558.5 806.5 545.524 806.5 529.5C806.5 513.476 819.268 500.5 835 500.5C850.732 500.5 863.5 513.476 863.5 529.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa2B"
            d="M971.5 529.5C971.5 545.524 958.732 558.5 943 558.5C927.268 558.5 914.5 545.524 914.5 529.5C914.5 513.476 927.268 500.5 943 500.5C958.732 500.5 971.5 513.476 971.5 529.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa2C"
            d="M1081.5 529.5C1081.5 545.524 1068.73 558.5 1053 558.5C1037.27 558.5 1024.5 545.524 1024.5 529.5C1024.5 513.476 1037.27 500.5 1053 500.5C1068.73 500.5 1081.5 513.476 1081.5 529.5Z"
            fill="red"
            stroke="black"
          />
          <g id="askEngine">
            <circle
              id="EllipseAskEngine"
              cx="427.5"
              cy="143.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_4"
              d="M428.496 145.879H425.695C425.703 145.168 425.762 144.559 425.871 144.051C425.988 143.543 426.18 143.086 426.445 142.68C426.711 142.266 427.07 141.844 427.523 141.414C427.883 141.078 428.203 140.762 428.484 140.465C428.773 140.16 429 139.844 429.164 139.516C429.328 139.18 429.41 138.801 429.41 138.379C429.41 137.902 429.332 137.504 429.176 137.184C429.027 136.863 428.805 136.621 428.508 136.457C428.219 136.285 427.855 136.199 427.418 136.199C427.059 136.199 426.719 136.273 426.398 136.422C426.078 136.57 425.82 136.801 425.625 137.113C425.43 137.418 425.324 137.816 425.309 138.309H422.203C422.227 137.285 422.469 136.434 422.93 135.754C423.391 135.066 424.012 134.555 424.793 134.219C425.574 133.875 426.449 133.703 427.418 133.703C428.488 133.703 429.402 133.883 430.16 134.242C430.926 134.594 431.508 135.109 431.906 135.789C432.312 136.469 432.516 137.289 432.516 138.25C432.516 138.938 432.383 139.555 432.117 140.102C431.852 140.641 431.5 141.145 431.062 141.613C430.625 142.082 430.152 142.555 429.645 143.031C429.199 143.43 428.898 143.855 428.742 144.309C428.586 144.762 428.504 145.285 428.496 145.879ZM425.402 149.523C425.402 149.055 425.559 148.664 425.871 148.352C426.191 148.039 426.621 147.883 427.16 147.883C427.699 147.883 428.125 148.039 428.438 148.352C428.758 148.664 428.918 149.055 428.918 149.523C428.918 149.977 428.758 150.359 428.438 150.672C428.125 150.984 427.699 151.141 427.16 151.141C426.621 151.141 426.191 150.984 425.871 150.672C425.559 150.359 425.402 149.977 425.402 149.523Z"
              fill="white"
            />
          </g>
          <g id="askStop">
            <circle
              id="EllipseAskStop"
              cx="122.5"
              cy="143.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_5"
              d="M123.496 145.879H120.695C120.703 145.168 120.762 144.559 120.871 144.051C120.988 143.543 121.18 143.086 121.445 142.68C121.711 142.266 122.07 141.844 122.523 141.414C122.883 141.078 123.203 140.762 123.484 140.465C123.773 140.16 124 139.844 124.164 139.516C124.328 139.18 124.41 138.801 124.41 138.379C124.41 137.902 124.332 137.504 124.176 137.184C124.027 136.863 123.805 136.621 123.508 136.457C123.219 136.285 122.855 136.199 122.418 136.199C122.059 136.199 121.719 136.273 121.398 136.422C121.078 136.57 120.82 136.801 120.625 137.113C120.43 137.418 120.324 137.816 120.309 138.309H117.203C117.227 137.285 117.469 136.434 117.93 135.754C118.391 135.066 119.012 134.555 119.793 134.219C120.574 133.875 121.449 133.703 122.418 133.703C123.488 133.703 124.402 133.883 125.16 134.242C125.926 134.594 126.508 135.109 126.906 135.789C127.312 136.469 127.516 137.289 127.516 138.25C127.516 138.938 127.383 139.555 127.117 140.102C126.852 140.641 126.5 141.145 126.062 141.613C125.625 142.082 125.152 142.555 124.645 143.031C124.199 143.43 123.898 143.855 123.742 144.309C123.586 144.762 123.504 145.285 123.496 145.879ZM120.402 149.523C120.402 149.055 120.559 148.664 120.871 148.352C121.191 148.039 121.621 147.883 122.16 147.883C122.699 147.883 123.125 148.039 123.438 148.352C123.758 148.664 123.918 149.055 123.918 149.523C123.918 149.977 123.758 150.359 123.438 150.672C123.125 150.984 122.699 151.141 122.16 151.141C121.621 151.141 121.191 150.984 120.871 150.672C120.559 150.359 120.402 149.977 120.402 149.523Z"
              fill="white"
            />
          </g>
          <g id="askHelpContainer">
            <circle
              id="EllipseAskHelpContainer"
              cx="1137.5"
              cy="169.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_6"
              d="M1138.5 172.879H1135.7C1135.7 172.168 1135.76 171.559 1135.87 171.051C1135.99 170.543 1136.18 170.086 1136.45 169.68C1136.71 169.266 1137.07 168.844 1137.52 168.414C1137.88 168.078 1138.2 167.762 1138.48 167.465C1138.77 167.16 1139 166.844 1139.16 166.516C1139.33 166.18 1139.41 165.801 1139.41 165.379C1139.41 164.902 1139.33 164.504 1139.18 164.184C1139.03 163.863 1138.8 163.621 1138.51 163.457C1138.22 163.285 1137.86 163.199 1137.42 163.199C1137.06 163.199 1136.72 163.273 1136.4 163.422C1136.08 163.57 1135.82 163.801 1135.62 164.113C1135.43 164.418 1135.32 164.816 1135.31 165.309H1132.2C1132.23 164.285 1132.47 163.434 1132.93 162.754C1133.39 162.066 1134.01 161.555 1134.79 161.219C1135.57 160.875 1136.45 160.703 1137.42 160.703C1138.49 160.703 1139.4 160.883 1140.16 161.242C1140.93 161.594 1141.51 162.109 1141.91 162.789C1142.31 163.469 1142.52 164.289 1142.52 165.25C1142.52 165.938 1142.38 166.555 1142.12 167.102C1141.85 167.641 1141.5 168.145 1141.06 168.613C1140.62 169.082 1140.15 169.555 1139.64 170.031C1139.2 170.43 1138.9 170.855 1138.74 171.309C1138.59 171.762 1138.5 172.285 1138.5 172.879ZM1135.4 176.523C1135.4 176.055 1135.56 175.664 1135.87 175.352C1136.19 175.039 1136.62 174.883 1137.16 174.883C1137.7 174.883 1138.12 175.039 1138.44 175.352C1138.76 175.664 1138.92 176.055 1138.92 176.523C1138.92 176.977 1138.76 177.359 1138.44 177.672C1138.12 177.984 1137.7 178.141 1137.16 178.141C1136.62 178.141 1136.19 177.984 1135.87 177.672C1135.56 177.359 1135.4 176.977 1135.4 176.523Z"
              fill="white"
            />
          </g>
          <g id="askPomp">
            <circle
              id="EllipseAskPomp"
              cx="546.5"
              cy="681.5"
              r="17.5"
              fill="#298E33"
            />
            <path
              id="?_7"
              d="M547.496 684.879H544.695C544.703 684.168 544.762 683.559 544.871 683.051C544.988 682.543 545.18 682.086 545.445 681.68C545.711 681.266 546.07 680.844 546.523 680.414C546.883 680.078 547.203 679.762 547.484 679.465C547.773 679.16 548 678.844 548.164 678.516C548.328 678.18 548.41 677.801 548.41 677.379C548.41 676.902 548.332 676.504 548.176 676.184C548.027 675.863 547.805 675.621 547.508 675.457C547.219 675.285 546.855 675.199 546.418 675.199C546.059 675.199 545.719 675.273 545.398 675.422C545.078 675.57 544.82 675.801 544.625 676.113C544.43 676.418 544.324 676.816 544.309 677.309H541.203C541.227 676.285 541.469 675.434 541.93 674.754C542.391 674.066 543.012 673.555 543.793 673.219C544.574 672.875 545.449 672.703 546.418 672.703C547.488 672.703 548.402 672.883 549.16 673.242C549.926 673.594 550.508 674.109 550.906 674.789C551.312 675.469 551.516 676.289 551.516 677.25C551.516 677.938 551.383 678.555 551.117 679.102C550.852 679.641 550.5 680.145 550.062 680.613C549.625 681.082 549.152 681.555 548.645 682.031C548.199 682.43 547.898 682.855 547.742 683.309C547.586 683.762 547.504 684.285 547.496 684.879ZM544.402 688.523C544.402 688.055 544.559 687.664 544.871 687.352C545.191 687.039 545.621 686.883 546.16 686.883C546.699 686.883 547.125 687.039 547.438 687.352C547.758 687.664 547.918 688.055 547.918 688.523C547.918 688.977 547.758 689.359 547.438 689.672C547.125 689.984 546.699 690.141 546.16 690.141C545.621 690.141 545.191 689.984 544.871 689.672C544.559 689.359 544.402 688.977 544.402 688.523Z"
              fill="white"
            />
          </g>
          <path
            id="pompa3"
            d="M290.5 434.5C290.5 450.524 277.732 463.5 262 463.5C246.268 463.5 233.5 450.524 233.5 434.5C233.5 418.476 246.268 405.5 262 405.5C277.732 405.5 290.5 418.476 290.5 434.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1A"
            d="M526.5 728.5C526.5 744.524 513.732 757.5 498 757.5C482.268 757.5 469.5 744.524 469.5 728.5C469.5 712.476 482.268 699.5 498 699.5C513.732 699.5 526.5 712.476 526.5 728.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1B"
            d="M624.5 730.5C624.5 746.524 611.732 759.5 596 759.5C580.268 759.5 567.5 746.524 567.5 730.5C567.5 714.476 580.268 701.5 596 701.5C611.732 701.5 624.5 714.476 624.5 730.5Z"
            fill="red"
            stroke="black"
          />
          <path
            id="pompa1C"
            d="M721.5 728.5C721.5 744.524 708.732 757.5 693 757.5C677.268 757.5 664.5 744.524 664.5 728.5C664.5 712.476 677.268 699.5 693 699.5C708.732 699.5 721.5 712.476 721.5 728.5Z"
            fill="red"
            stroke="black"
          />
          <g id="STOP">
            <rect
              id="stopBox"
              x="1.5"
              y="124.5"
              width="90"
              height="90"
              rx="9.5"
              fill="#F9E000"
              stroke="black"
            />
            <path
              id="stopButton"
              d="M75.5 181.5C75.5 197.524 62.7321 210.5 47 210.5C31.2679 210.5 18.5 197.524 18.5 181.5C18.5 165.476 31.2679 152.5 47 152.5C62.7321 152.5 75.5 165.476 75.5 181.5Z"
              fill="#AE1D2E"
              stroke="black"
            />
            <path
              id="STOP_2"
              d="M28.043 143.57C28.043 143.242 27.9922 142.949 27.8906 142.691C27.7969 142.426 27.6211 142.188 27.3633 141.977C27.1133 141.758 26.7578 141.547 26.2969 141.344C25.8438 141.133 25.2578 140.914 24.5391 140.688C23.7422 140.438 23 140.156 22.3125 139.844C21.625 139.531 21.0195 139.168 20.4961 138.754C19.9805 138.34 19.5781 137.863 19.2891 137.324C19 136.777 18.8555 136.145 18.8555 135.426C18.8555 134.723 19.0039 134.082 19.3008 133.504C19.6055 132.926 20.0352 132.43 20.5898 132.016C21.1445 131.594 21.7969 131.27 22.5469 131.043C23.3047 130.816 24.1406 130.703 25.0547 130.703C26.3203 130.703 27.4141 130.934 28.3359 131.395C29.2656 131.855 29.9844 132.48 30.4922 133.27C31 134.059 31.2539 134.945 31.2539 135.93H28.043C28.043 135.398 27.9297 134.93 27.7031 134.523C27.4844 134.117 27.1484 133.797 26.6953 133.562C26.25 133.328 25.6875 133.211 25.0078 133.211C24.3516 133.211 23.8047 133.309 23.3672 133.504C22.9375 133.699 22.6133 133.965 22.3945 134.301C22.1836 134.637 22.0781 135.012 22.0781 135.426C22.0781 135.738 22.1523 136.02 22.3008 136.27C22.4492 136.512 22.6719 136.742 22.9688 136.961C23.2656 137.172 23.6328 137.371 24.0703 137.559C24.5156 137.738 25.0312 137.918 25.6172 138.098C26.5547 138.379 27.375 138.691 28.0781 139.035C28.7891 139.379 29.3789 139.77 29.8477 140.207C30.3242 140.645 30.6797 141.137 30.9141 141.684C31.1562 142.23 31.2773 142.852 31.2773 143.547C31.2773 144.281 31.1328 144.938 30.8438 145.516C30.5547 146.094 30.1406 146.586 29.6016 146.992C29.0625 147.398 28.4141 147.707 27.6562 147.918C26.9062 148.129 26.0664 148.234 25.1367 148.234C24.3086 148.234 23.4883 148.125 22.6758 147.906C21.8711 147.68 21.1406 147.344 20.4844 146.898C19.8281 146.445 19.3047 145.875 18.9141 145.188C18.5234 144.492 18.3281 143.68 18.3281 142.75H21.5625C21.5625 143.289 21.6484 143.75 21.8203 144.133C22 144.508 22.25 144.816 22.5703 145.059C22.8984 145.293 23.2812 145.465 23.7188 145.574C24.1562 145.684 24.6289 145.738 25.1367 145.738C25.793 145.738 26.332 145.648 26.7539 145.469C27.1836 145.281 27.5039 145.023 27.7148 144.695C27.9336 144.367 28.043 143.992 28.043 143.57ZM41.0859 130.938V148H37.875V130.938H41.0859ZM46.3828 130.938V133.48H32.6367V130.938H46.3828ZM62.0156 139.035V139.914C62.0156 141.203 61.8438 142.363 61.5 143.395C61.1562 144.418 60.668 145.289 60.0352 146.008C59.4023 146.727 58.6484 147.277 57.7734 147.66C56.8984 148.043 55.9258 148.234 54.8555 148.234C53.8008 148.234 52.832 148.043 51.9492 147.66C51.0742 147.277 50.3164 146.727 49.6758 146.008C49.0352 145.289 48.5391 144.418 48.1875 143.395C47.8359 142.363 47.6602 141.203 47.6602 139.914V139.035C47.6602 137.738 47.8359 136.578 48.1875 135.555C48.5391 134.531 49.0312 133.66 49.6641 132.941C50.2969 132.215 51.0508 131.66 51.9258 131.277C52.8086 130.895 53.7773 130.703 54.832 130.703C55.9023 130.703 56.875 130.895 57.75 131.277C58.625 131.66 59.3789 132.215 60.0117 132.941C60.6523 133.66 61.1445 134.531 61.4883 135.555C61.8398 136.578 62.0156 137.738 62.0156 139.035ZM58.7578 139.914V139.012C58.7578 138.082 58.6719 137.266 58.5 136.562C58.3281 135.852 58.0742 135.254 57.7383 134.77C57.4023 134.285 56.9883 133.922 56.4961 133.68C56.0039 133.43 55.4492 133.305 54.832 133.305C54.207 133.305 53.6523 133.43 53.168 133.68C52.6914 133.922 52.2852 134.285 51.9492 134.77C51.6133 135.254 51.3555 135.852 51.1758 136.562C51.0039 137.266 50.918 138.082 50.918 139.012V139.914C50.918 140.836 51.0039 141.652 51.1758 142.363C51.3555 143.074 51.6133 143.676 51.9492 144.168C52.293 144.652 52.707 145.02 53.1914 145.27C53.6758 145.52 54.2305 145.645 54.8555 145.645C55.4805 145.645 56.0352 145.52 56.5195 145.27C57.0039 145.02 57.4102 144.652 57.7383 144.168C58.0742 143.676 58.3281 143.074 58.5 142.363C58.6719 141.652 58.7578 140.836 58.7578 139.914ZM71.3086 141.777H66.9141V139.246H71.3086C72.0273 139.246 72.6094 139.129 73.0547 138.895C73.5078 138.652 73.8398 138.324 74.0508 137.91C74.2617 137.488 74.3672 137.008 74.3672 136.469C74.3672 135.945 74.2617 135.457 74.0508 135.004C73.8398 134.551 73.5078 134.184 73.0547 133.902C72.6094 133.621 72.0273 133.48 71.3086 133.48H67.9688V148H64.7461V130.938H71.3086C72.6367 130.938 73.7695 131.176 74.707 131.652C75.6523 132.121 76.3711 132.773 76.8633 133.609C77.3633 134.438 77.6133 135.383 77.6133 136.445C77.6133 137.547 77.3633 138.496 76.8633 139.293C76.3711 140.09 75.6523 140.703 74.707 141.133C73.7695 141.562 72.6367 141.777 71.3086 141.777Z"
              fill="black"
            />
          </g>
        </g>
        {/* <defs>
      <filter id="filter0_d_502_65" x="776" y="657" width="335" height="166" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_502_65"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_502_65" result="shape"/>
      </filter>
      </defs> */}
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
    width: '75%',
    height: '80vh',
    marginLeft: '40vh',
    marginRight: 'auto',
    marginTop: '2%',
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
