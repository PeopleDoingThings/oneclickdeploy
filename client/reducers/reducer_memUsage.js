import { USAGE_MEM } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_MEM:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}





