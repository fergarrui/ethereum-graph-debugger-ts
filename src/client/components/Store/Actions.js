import { SELECT_EDITOR_LINES } from './Constants.js';

export function selectEditorLines(lines) {
  return {
    type: SELECT_EDITOR_LINES,
    lines,
  }
}
