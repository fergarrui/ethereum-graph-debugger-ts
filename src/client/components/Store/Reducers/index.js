import { combineReducers } from 'redux';

import { showModal, selectLines, showSideBar } from './reducers.js';

export default combineReducers({
  showModal,
  selectLines,
});