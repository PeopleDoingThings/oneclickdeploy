import { DEPLOYED_REPO } from '../actions/index';
import { ERROR } from '../actions/index';

export default function(state = false, action) {
  switch (action.type) {
    
    case ERROR: 
      console.error("Server Error:", action.payload)
      return action.payload.data === undefined ? state : action.payload.data;


    default: return state;

  }
}