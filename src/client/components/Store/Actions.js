import { SELECT_EDITOR_LINES, SHOW_EVM_STATE } from './Constants.js';

export function selectEditorLines(lines) {
  return {
    type: SELECT_EDITOR_LINES,
    lines,
  }
}

export function showEVMState(evmState) {
  return {
    type: SHOW_EVM_STATE,
    evmState,
  }
}