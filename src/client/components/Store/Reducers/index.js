import { combineReducers } from 'redux';

import { showModal, selectLines, showSideBar } from './Reducers.js';

export default combineReducers({
  showModal,
  selectLines,
});