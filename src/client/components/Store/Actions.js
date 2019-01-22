import { SELECT_EDITOR_LINES, SHOW_MESSAGE, HIDE_MESSAGE } from './Constants.js';

export function selectEditorLines(lines) {
  return {
    type: SELECT_EDITOR_LINES,
    lines,
  }
}

