import { USAGE_CPU } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_CPU:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}

