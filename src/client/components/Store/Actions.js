import { SELECT_EDITOR_LINES, OPEN_MODAL, CLOSE_MODAL } from './Constants.js';

export function selectEditorLines(lines) {
  return {
    type: SELECT_EDITOR_LINES,
    lines,
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL,
    open: true,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    open: false,
  }
}
