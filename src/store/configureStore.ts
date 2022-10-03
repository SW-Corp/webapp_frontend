/**
 * Create the store using Zustand
 */

import create from 'zustand';

import { Mode } from 'utils/types';

interface GlobalState {
  currentMode: Mode;
  simulationState: any;
  realState: any; // lazy type, has to be changed!
  setRealState: (param: any) => void;
  setVolumes: (param: any) => void;
  switchMode: () => void;
}

export const useStore = create<GlobalState>()(set => ({
  currentMode: Mode.simulation,
  simulationState: {
    volumes: {
      // objetosc w litrach
      C1: 1,
      C2: 1,
      C3: 0.8,
      C4: 0.1,
      C5: 1,
    },
  },
  realState: {
    pumps: {
      P1: {
        voltage: 0,
        current: 0,
        is_on: false,
      },
      P4: {
        voltage: 0,
        current: 0,
        is_on: false,
      },
      P3: {
        voltage: 0,
        current: 0,
        is_on: false,
      },
      P2: {
        voltage: 0,
        current: 0,
        is_on: false,
      },
    },
    valves: {
      V3: {
        voltage: 0,
        current: 0,
        is_open: false,
      },
      V1: {
        voltage: 0,
        current: 0,
        is_open: false,
      },
      V2: {
        voltage: 0,
        current: 0,
        is_open: false,
      },
    },
    tanks: {
      C1: {
        pressure: 1000,
        offset: -1.5,
        water_level: 5.5,
        float_switch_up: false,
        water_volume: 1089,
      },
      C2: {
        pressure: 1000,
        offset: 1.5,
        water_level: 2.5,
        float_switch_up: false,
        water_volume: 250,
      },
      C3: {
        pressure: 1001,
        offset: -2.27,
        water_level: 7.27,
        float_switch_up: false,
        water_volume: 727,
      },
      C4: {
        pressure: 1000,
        offset: 0,
        water_level: 4,
        float_switch_up: false,
        water_volume: 400,
      },
      C5: {
        pressure: 1000,
        offset: -1,
        water_level: 15,
        float_switch_up: false,
        water_volume: 990,
      },
    },
    currentScenario: '',
    type: 'state',
  },
  setRealState: newRealState =>
    set(() => ({
      realState: newRealState,
    })),
  switchMode: () =>
    set(state => ({
      currentMode:
        state.currentMode == Mode.simulation ? Mode.real : Mode.simulation,
    })),
  setVolumes: newVolumes =>
    set(stat => ({
      simulationState: {
        ...stat.simulationState,
        volumes: newVolumes,
      },
    })),
}));
