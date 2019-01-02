import { SELECT_EDITOR_LINES } from './Constants.js';

export default function selectEditorLines(lines) {
  return {
    type: SELECT_EDITOR_LINES,
    lines,
  }
}
