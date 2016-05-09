import { SSH_CONSOLE } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    
      case SSH_CONSOLE:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}
