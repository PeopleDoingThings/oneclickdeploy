import { USAGE_TX } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_TX:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}





