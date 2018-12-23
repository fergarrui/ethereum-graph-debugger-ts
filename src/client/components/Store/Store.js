import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getTextFunction from './Reducers';


export default function configureStore(initialState) {
  return createStore(
    getTextFunction,
    initialState,
    applyMiddleware(thunk),
  );
};
