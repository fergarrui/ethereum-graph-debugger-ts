import { GET_FUNCTION } from './Constants.js';


const getTextFunction = (state = 'miao', action) => {
  switch (action.type) {
    case GET_FUNCTION: return 'ciao';
    default: return state;
  }
}

export default getTextFunction;