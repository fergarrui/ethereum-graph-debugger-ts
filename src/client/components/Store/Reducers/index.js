import { combineReducers } from 'redux';

import { selectLines, selectEVMState } from './Reducers.js';

export default combineReducers({
  selectLines,
  selectEVMState,
});