import { USAGE_RX } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_RX:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}





