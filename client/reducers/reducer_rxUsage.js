import { USAGE_RX } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_RX:  
      console.log('usage_RX reducer', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}





