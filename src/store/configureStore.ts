/**
 * Create the store using Zustand
 */

import create from 'zustand';

import { Mode } from 'utils/types';

export const useStore = create(set => ({
  currentMode: Mode.simulation,
  switchMode: () =>
    set(state => ({
      currentMode:
        state.currentMode == Mode.simulation ? Mode.real : Mode.simulation,
    })),
}));
