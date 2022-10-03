/**
 * Create the store using Zustand
 */

import create from 'zustand';

import { Mode } from 'utils/types';

interface GlobalState {
  currentMode: Mode;
  realState: any;
  setRealState: (param: object) => void;
  switchMode: () => void;
}

export const useStore = create<GlobalState>()(set => ({
  currentMode: Mode.simulation,
  realState: {},
  setRealState: newRealState =>
    set(() => ({
      realState: newRealState,
    })),
  switchMode: () =>
    set(state => ({
      currentMode:
        state.currentMode == Mode.simulation ? Mode.real : Mode.simulation,
    })),
}));
