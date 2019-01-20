import { SELECT_EDITOR_LINES, OPEN_MODAL, CLOSE_MODAL } from '../Constants.js';


export function selectLines(state = [0, 0], action) {
  switch (action.type) {
    case SELECT_EDITOR_LINES: return action.lines;
    default: return state;
  }
}

export function showModal(state = false, action) {
  switch(action.type) {
    case OPEN_MODAL: return action.open;
    case CLOSE_MODAL: return action.open;
    default: return state;
  }
}
