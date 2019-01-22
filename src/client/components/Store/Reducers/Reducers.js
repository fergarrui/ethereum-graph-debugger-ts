import { SELECT_EDITOR_LINES } from '../Constants.js';


export function selectLines(state = [0, 0], action) {
  switch (action.type) {
    case SELECT_EDITOR_LINES: return action.lines;
    default: return state;
  }
}
