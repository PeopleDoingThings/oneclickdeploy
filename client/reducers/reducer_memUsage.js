import { USAGE_MEM } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case USAGE_MEM:  
      console.log('usage_mem reducer', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}





