import { SELECT_EDITOR_LINES, SHOW_EVM_STATE } from '../Constants.js';


export function selectLines(state = [0, 0], action) {
  switch (action.type) {
    case SELECT_EDITOR_LINES: return action.lines;
    default: return state;
  }
}

export function selectEVMState(state = '', action) {
  switch(action.type) {
    case SHOW_EVM_STATE: return action.evmState;
    default: return state;
  }
}
